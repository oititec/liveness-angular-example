import { Component, OnInit } from '@angular/core';
import { FacecaptchaService } from '../backend/facecaptcha.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appkey',
  templateUrl: './appkey.component.html',
  styleUrls: ['./appkey.component.scss'],
})
export class AppkeyComponent implements OnInit {
  appkey: string = '';
  disabled: boolean = false;
  txtButton: string = 'Continuar';
  errorMessage: string = '';
  deviceType: string = '';
  os: string = '';
  userAgent: string = '';
  deviceModel: string = '';

  constructor(
    private facecaptchaService: FacecaptchaService,
    private router: Router
  ) {}

  ngOnInit() {
    if (window.localStorage.getItem('appkey')) {
      this.router.navigateByUrl('/home');
    }
  }

  onHandleAppKey(event: any) {
    this.appkey = event.target.value;
  }

  setAppKeyValue() {
    this.txtButton = 'Carregando';
    this.disabled = true;

    let result = this.facecaptchaService.checkAppKey(this.appkey);

    result.subscribe(
      (res: any) => {
        window.localStorage.setItem('appkey', this.appkey);

        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 1000);
      },
      (err: any) => {
        this.txtButton = 'Continuar';
        this.disabled = false;

        this.errorMessage = JSON.stringify(err.error.error);
      }
    );
  }

  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  async detectUserAgent() {
    let userAgent = navigator.userAgent;
    let returnMessage;
    let mobileBrand;

    if (/windows phone/i.test(userAgent)) {
      returnMessage = 'Windows Phone';
    } else if (/windows/i.test(userAgent)) {
      returnMessage = 'Windows';
    } else if (/Android/i.test(userAgent)) {
      returnMessage = 'Android';
    } else if (/iPad|iPhone|iPod/i.test(userAgent)) {
      returnMessage = 'iOS';
    } else if (/Unix/i.test(userAgent)) {
      returnMessage = 'Unix';
    } else if (/Mac/i.test(userAgent)) {
      returnMessage = 'Macos';
    } else if (/Linux/i.test(userAgent)) {
      returnMessage = 'Linux';
    } else if (/BlackBerry/i.test(userAgent)) {
      returnMessage = 'BlackBerry';
    } else {
      returnMessage = 'Desconhecido';
    }

    // Funciona apenas para Android
    if (/Android/i.test(userAgent)) {
      mobileBrand = await (navigator as any).userAgentData
        .getHighEntropyValues([
          'architecture',
          'model',
          'platform',
          'platformVersion',
          'fullVersionList',
        ])
        .then((ua: any) => {
          return ua.model;
        })
        .catch((err: any) => {
          return err;
        });
    } else {
      mobileBrand = navigator.platform;
    }

    this.deviceType = `Tipo de dispositivo: ${
      this.isMobile() ? 'Dispositívo móvel' : 'Desktop'
    }`;
    this.os = `Sistema operacional: ${returnMessage}`;
    this.userAgent = `User agent: ${userAgent}`;
    this.deviceModel = `${
      this.isMobile() ? `Modelo do aparelho: ${mobileBrand}` : ''
    }`;
  }
}
