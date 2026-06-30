import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacecaptchaService } from '../backend/facecaptcha.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formulario: FormGroup<any>;
  status: string = '';

  constructor(
    private router: Router,
    private facecaptchaService: FacecaptchaService,
    private formBuilder: FormBuilder,
  ) {
    this.formulario = this.formBuilder.group({
      login: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  enviar() {
    this.facecaptchaService.credential(
      this.formulario.get('login')?.value,
      CryptoJS.MD5(this.formulario.get('senha')?.value).toString()).subscribe(
        (res: any) => {
          window.localStorage.setItem('login', this.formulario.get('login')?.value)
          window.localStorage.setItem('credentialResponse', JSON.stringify(res.body))
          this.router.navigateByUrl('/appkey');
        },
        (error) => {
          this.status = 'Login ou senha incorretos!'
          console.log('Erro ao enviar', error);
        }
      );
  }
}
