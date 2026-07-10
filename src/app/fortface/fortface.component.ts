import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { CertiFaceSaasService } from '../backend/certiface-saas.service';
import { firstValueFrom } from 'rxjs';
import { FortfaceSdkElement } from './interfaces/types';

@Component({
  selector: 'app-fortface',
  templateUrl: './fortface.component.html',
  styleUrls: ['./fortface.component.css'],
})
export class FortfaceComponent implements AfterViewInit {

  @ViewChild('fortfaceContainer', { static: true })
  fortfaceContainer!: ElementRef<HTMLDivElement>;

  private fortfaceSdk!: FortfaceSdkElement;
  private location?: GeolocationPosition;

  FortfaceLogo: string = '/assets/img/Fortface_Logo.png';
  saasBearerToken: any;
  saasUuid: any
  status: any
  statusRequest: any;
  enableButton: boolean = false;
  deviceRequestInfo: any;
  sessionId: any;
  retornoLiveness: any;
  sessionKey: any;

  constructor(
    private certifaceSaasService: CertiFaceSaasService,
    private ngZone: NgZone) { }

  async ngAfterViewInit() {
    await (window as any).FortfaceSDK.load();

    await customElements.whenDefined('fortface-sdk');

    await this.createFreshSdk();
    await this.login();
    await this.createToken();
    await this.livenessResolve();

    window.localStorage.removeItem('hasLiveness');

    this.enableButton = true;
    this.updateStatus('Inicializado com sucesso');
  }

  async login() {
    const resp: any = await firstValueFrom(
      this.certifaceSaasService.login()
    );
    this.saasBearerToken = resp.body.token;
  }

  async createToken() {
    const resp: any = await firstValueFrom(
      this.certifaceSaasService.createToken(this.saasBearerToken)
    );
    this.saasUuid = resp.body.uuid;
  }

  async livenessResolve() {
    const resp: any = await firstValueFrom(
      this.certifaceSaasService.livenessResolve(this.saasUuid)
    );
  }

  async startLivenessValidation() {
    try {

      this.updateStatus('Verificando localização...');

      this.location = await this.getUserLocation();

    } catch (error) {

      this.updateStatus(
        'É necessário permitir o acesso à localização para continuar.'
      );

      return;
    }

    const resp: any = await firstValueFrom(
      this.certifaceSaasService.initialize(this.saasUuid, this.deviceRequestInfo)
    );
    this.sessionId = resp.body.payload.session.sessionId;
    this.sessionKey = resp.body.payload.session.sessionKey;
    window.localStorage.setItem('appkey', resp.body.payload.appKey)

    this.fortfaceSdk.startSession(
      this.fortfaceFinishSession.bind(this),
      this.sessionId,
      resp.body.payload.session.sessionKey,
      {
        returnMetrics: true,
      })
  }

  async fortfaceFinishSession(fortfaceSessionResult: any) {
    const { action, data, sessionDetails } = fortfaceSessionResult;
    switch (action) {
      case 'capture':
        await this.handleResult(action, data, sessionDetails);
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

  async handleResult(action: any, data: any, sessionDetails: any) {
    this.enableButton = false;
    this.updateStatus('Enviando...');

    const livenessInfo = {
      userAgent: window.navigator.userAgent,
      sessionId: this.sessionId,
      arrived: 'other',
      action,
      key: data.encryptData.key,
      data: data.encryptData.data,
      imgData: data.encryptData.imgData,
      externalTransactionId: this.saasUuid,
    }

    const resp: any = await firstValueFrom(this.certifaceSaasService
      .verifyLiveness(this.saasUuid, livenessInfo, this.location));

    if (!resp.body.liveness.valid && resp.body.liveness.canRetry) {
      this.updateStatus('Preparando nova tentativa...');

      await new Promise(resolve => setTimeout(resolve, 2000));

      this.updateStatus('');

      await this.createFreshSdk();

      this.startLivenessValidation();

    } else if (!resp.body.liveness.valid) {
      this.updateStatus('Prova de Vida reprovada');
    } else {
      this.updateStatus('Enviado com sucesso');
    }
    window.localStorage.setItem('hasLiveness', 'true');
  }

  async createFreshSdk() {
    this.fortfaceSdk = undefined as any;
    this.deviceRequestInfo = undefined;
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
  }

  updateStatus(message: any) {
    this.ngZone.run(() => {
      this.status = message;
    });
  }

  async getUserLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {

      if (!navigator.geolocation) {
        reject(new Error('Geolocalização não suportada pelo navegador.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );

    });
  }
}
