import { Component, OnInit } from '@angular/core';
import { FacecaptchaService } from '../backend/facecaptcha.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appkey',
  templateUrl: './appkey.component.html',
  styleUrls: ['./appkey.component.scss']
})
export class AppkeyComponent implements OnInit {
  appkey: string = '';
  disabled: boolean = false;
  txtButton: string = 'Continuar';
  errorMessage: string = '';

  constructor(
    private facecaptchaService: FacecaptchaService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (window.localStorage.getItem('appkey')) {
      this.router.navigateByUrl('/home');
    }
  }

  onHandleAppKey(event) {
    this.appkey = event.target.value;
  }

  setAppKeyValue() {
    this.txtButton = 'Carregando';
    this.disabled = true;

    let result = this.facecaptchaService.checkAppKey(this.appkey)

    result.subscribe((res: any) => {
      window.localStorage.setItem('appkey', this.appkey);

      setTimeout(() => {
        this.router.navigateByUrl('/home');
      }, 1000);
    },
    (err: any) => {
      this.txtButton = 'Continuar';
      this.disabled = false;

      this.errorMessage = JSON.stringify(err.error.error);
    })
  }

}
