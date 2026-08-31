import { Component, OnInit } from '@angular/core';
import { FacecaptchaService } from '../backend/facecaptcha.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-appkey',
    templateUrl: './appkey.component.html',
    styleUrls: ['./appkey.component.css'],
    standalone: false
})
export class AppkeyComponent implements OnInit {
  status: string = '';
  formulario: FormGroup<any>;

  ngOnInit(): void {

  }

  constructor(
    private router: Router,
    private facecaptchaService: FacecaptchaService,
    private formBuilder: FormBuilder,
  ) {
    this.formulario = this.formBuilder.group({
      cpf: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.pattern(/^.+\s+.+$/)]],
      nascimento: '',
    });
    this.status = '';
  }

  enviar() {
    const cpf = this.formulario.get('cpf')?.value.replace(/\D/g, '');
    const nome = this.formulario.get('nome')?.value;
    const nascimento = this.formulario.get('nascimento')?.value;

    this.facecaptchaService.gerarAppkey(cpf, nome, nascimento).subscribe(
      (res: any) => {
        window.localStorage.setItem('cpf', cpf);
        window.localStorage.setItem('nome', nome);
        window.localStorage.setItem('nascimento', nascimento);
        window.localStorage.setItem('appkey', res.body.appkey);

        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 1000);
      },
      (error) => {
        this.status = 'Dados inválidos!'
        console.log('Erro ao enviar', error);
      }
    );
  }

  onCpfInput(event: any): void {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length > 11) {
      value = value.substring(0, 11);
    }

    value = value.replace(/^(\d{3})(\d)/, '$1.$2');
    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/\.(\d{3})(\d)/, '.$1-$2');

    this.formulario.get('cpf')?.setValue(value, { emitEvent: false });
  }

  onDataNascimentoInput(event: any): void {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length > 8) {
      value = value.substring(0, 8);
    }

    if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d)/, '$1/$2');
    }

    if (value.length > 5) {
      value = value.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
    }

    this.formulario.get('nascimento')?.setValue(value, { emitEvent: false });
  }
}
