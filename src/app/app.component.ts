import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FacecaptchaService } from './backend/facecaptcha.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'liveness-angular-example';
  logoCertiFace = '/assets/img/logo_certiface_trans.png';
  statusAppkey: string = '';
  statusResult: string = '';

  exibirBotoesMenu = false;
  exibirBotaoResult = false;
  menuOpen = false;

  result = {
    success: false,
    message: '',
    data: null as any
  };

  @ViewChild('resultadoModal')
  modalElement!: ElementRef;

  constructor(
    private router: Router,
    private facecaptchaService: FacecaptchaService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.exibirBotoesMenu = this.router.url === '/home';
        this.exibirBotaoResult = this.isLivenessUrl(this.router.url);
      });
  }

  ngOnInit(): void {
    console.log("Angular version: " + VERSION.full);
  }

  gerarAppKey() {
    const cpf = window.localStorage.getItem('cpf');
    const nome = window.localStorage.getItem('nome');
    const nascimento = window.localStorage.getItem('nascimento');
    this.facecaptchaService.gerarAppkey(cpf, nome, nascimento).subscribe(
      (res: any) => {
        window.localStorage.setItem('appkey', res.body.appkey);
        window.localStorage.removeItem('hasLiveness');
        this.exibirBotaoResult = false;
        this.statusAppkey = 'AppKey gerada!'
      },
      (error) => {
        this.statusAppkey = 'Sessão expirada!'
        console.log('Erro ao gerar AppKey', error);
      }
    );
  }

  alterarDados() {
    this.limparLocalStorage();
    this.router.navigateByUrl('/appkey');
  }

  novaSessao() {
    window.localStorage.removeItem('login');
    window.localStorage.removeItem('credentialResponse');
    this.limparLocalStorage();
    this.router.navigateByUrl('/');
  }

  limparLocalStorage() {
    window.localStorage.removeItem('hasLiveness');
    window.localStorage.removeItem('appkey');
    window.localStorage.removeItem('cpf');
    window.localStorage.removeItem('nome');
    window.localStorage.removeItem('nascimento');
  }

  isLivenessUrl(url: any) {
    return url === '/liveness-2d' || url === '/liveness-3d' || url === '/liveness-iproov' || url === '/facetec-v10'
  }

  abrirModal(): void {
    const appkey = localStorage.getItem('appkey');
    this.facecaptchaService.getLivenessResult(appkey).subscribe((res: any) => {
      this.result = {
        success: true,
        message: 'Resultado obtido com sucesso',
        data: res.body
      };
      const modal = new Modal(this.modalElement.nativeElement);
      modal.show();
    }, (error) => {
      this.result = {
        success: false,
        message: 'Liveness não executado!',
        data: null
      };
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
