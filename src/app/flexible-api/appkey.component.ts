import { Component, OnInit } from '@angular/core';
import { FacecaptchaService } from '../backend/facecaptcha.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-appkey',
  templateUrl: './appkey.component.html',
  styleUrls: ['./appkey.component.scss']
})
export class AppkeyFlexibleComponent implements OnInit {
  appkey: string = '';
  ticket: string = '';
  disabled: boolean = false;
  txtButton: string = 'Continuar';
  errorMessage: string = '';

  constructor(
    private facecaptchaService: FacecaptchaService,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    window.localStorage.setItem('apiType', 'flexible-api');
  }

  onHandleAppKey(event: any) {
    this.appkey = event.target.value;
  }

  onHandleTicket(event: any) {
    this.ticket = event.target.value;
  }

  setAppKeyValue() {
    this.txtButton = 'Carregando';
    this.disabled = true;

    let result = this.facecaptchaService.checkAppKey(this.appkey)

    result.subscribe((res: any) => {
      // O código abaixo é apenas um exemplo para validar se o ticket é válido e está ativo.
      // Não deve ser implementado no front de maneira alguma.
      const url = `${environment.flexibleApiUrl}/bff-demo/result/${this.ticket !== '' ? this.ticket : 'undefined'}`;

      const headers = new HttpHeaders({
        'x-sub-org': '1',
        'x-group': '1',
        'x-branch': '1',
      });

      let ticketResult = this.http.get(url, { headers, observe: 'response' });

      ticketResult.subscribe((res: any) => {
        window.localStorage.setItem('appkey', this.appkey);
        window.localStorage.setItem('ticket', this.ticket);

        setTimeout(() => {
          this.router.navigateByUrl('/nav-menu');
        }, 1000);
      },
      (err: any) => {
        this.txtButton = 'Continuar';
        this.disabled = false;

        this.errorMessage = JSON.stringify(err.error.message);
      })
    },
    (err: any) => {
      this.txtButton = 'Continuar';
      this.disabled = false;

      this.errorMessage = JSON.stringify(err.error.error);
    })
  }

}
