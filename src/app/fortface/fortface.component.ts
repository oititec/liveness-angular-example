import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FortfaceSdkElement } from './interfaces/types';
import { Router } from '@angular/router';
import { FacecaptchaService } from '../backend/facecaptcha.service';

@Component({
    selector: 'app-fortface',
    templateUrl: './fortface.component.html',
    styleUrls: ['./fortface.component.css'],
    standalone: false
})
export class FortfaceComponent implements AfterViewInit {

  @ViewChild('fortfaceContainer', { static: true })
  fortfaceContainer!: ElementRef<HTMLDivElement>;

  private fortfaceSdk!: FortfaceSdkElement;

  fortfaceLogo: string = '/assets/img/Fortface_Logo.png';
  enableButton: boolean = false;
  status: any
  statusRequest: any;

  appkey: any
  userAgent: any

  deviceRequestInfo: any;
  sessionId: any;
  sessionKey: any;
  sessionToken: any;

  constructor(
    private router: Router,
    private facecaptchaService: FacecaptchaService,
    private ngZone: NgZone) { }

  async ngAfterViewInit() {
    this.updateStatus('Inicializando...');

    await (window as any).FortfaceSDK.load();

    await customElements.whenDefined('fortface-sdk');

    await this.createFreshSdk();

    window.localStorage.removeItem('hasLiveness');

    this.appkey = window.localStorage.getItem('appkey');
    this.userAgent = window.navigator.userAgent;

    await this.createSession();
  }

  async createFreshSdk() {
    this.fortfaceSdk = undefined as any;
    this.deviceRequestInfo = undefined;
    this.sessionKey = undefined;
    this.sessionToken = undefined;
    this.sessionId = undefined;

    await (window as any).FortfaceSDK.load();

    const container = this.fortfaceContainer.nativeElement;
    container.querySelectorAll('fortface-sdk')
      .forEach(e => e.remove());

    const sdk = document.createElement('fortface-sdk') as FortfaceSdkElement;
    container.appendChild(sdk);

    await customElements.whenDefined('fortface-sdk');

    this.fortfaceSdk = sdk;
    this.deviceRequestInfo = await sdk.start();

    const customizerProps = {
      version: '1.0.0',
      face_recognition: {
        instructions_screen: {
          continue_button: {
            content: 'Começar',
            background_color: 'rgb(80, 175, 8)',
            text_color: 'rgb(255, 255, 255)',
            corner_radius: 30
          }
        }
      }
    };

    await sdk.setCustomizer(customizerProps);
  }

  async createSession() {
    try {
      const resp: any = await firstValueFrom(
        this.facecaptchaService.createFortfaceSession(this.appkey, this.userAgent, this.deviceRequestInfo)
      );

      this.sessionId = resp.body.sessionId;
      this.sessionKey = resp.body.sessionKey;
      this.sessionToken = resp.body.sessionToken;

      this.enableButton = true;
      this.updateStatus('Inicializado com sucesso');

    } catch (error) {
      this.updateStatus('Sua appkey é inválida. Por favor, retorne a home para gerar uma nova.');
    }
  }

  async startLivenessValidation() {
    this.fortfaceSdk.startSession(
      this.fortfaceFinishSession.bind(this),
      this.sessionId,
      this.sessionKey,
      {
        returnMetrics: true,
      })
  }

  async fortfaceFinishSession(fortfaceSessionResult: any) {
    const { action, data, sessionDetails } = fortfaceSessionResult;
    switch (action) {
      case 'capture':
        await this.handleResult(data);
        break;
      case 'cancel':
        this.updateStatus('Captura cancelada pelo usuário');
        break;
      case 'timeout':
        this.updateStatus('Tempo de captura esgotado');
        break;
      case 'timeout_ready':
        this.updateStatus('Tempo de inicialização esgotado');
        break
      case 'error':
        this.updateStatus(`Erro Fortface: ${sessionDetails?.errorCode || "desconhecido"}`);
        break;
      default:
        this.updateStatus(`Ação inesperada: ${action}`);
        break;
    }
  }

  async handleResult(data: any) {
    this.enableButton = false;
    this.updateStatus('Enviando...');

    const livenessInfo = {
      appkey: this.appkey,
      userAgent: window.navigator.userAgent,
      sessionToken: this.sessionToken,
      sessionId: this.sessionId,
      key: data.encryptData.key,
      data: data.encryptData.data,
      imgData: data.encryptData.imgData,
    }

    try {
      const response: any = await firstValueFrom(
        this.facecaptchaService.verifyFortfaceLiveness(livenessInfo)
      );

      if (response.body.codID === 300.1 || response.body.codID === 300.2) {
        this.updateStatus('Prova de Vida reprovada');
      } else {
        this.updateStatus('Enviado com sucesso');
      }
    } catch (error) {
      this.updateStatus('Erro ao enviar');
    }

    window.localStorage.setItem('hasLiveness', 'true');
  }

  updateStatus(message: any) {
    this.ngZone.run(() => {
      this.status = message;
    });
  }

  deleteAppKey() {
    window.localStorage.removeItem('appkey');
    window.localStorage.removeItem('hasLiveness');

    this.router.navigateByUrl('/');
  };
}
