import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
	providedIn: 'root'
})
export class FacecaptchaService {
	private SERVER_API_URL = environment.apiUrl;

  livenessCheck: any = document.getElementById('liveness-button');
  initializationMessage: any = document.getElementById('status');

	constructor(private http: HttpClient) {}

  disableLivenessCheck() {
    location.pathname === '/liveness-3D.html/index.html' &&
      this.livenessCheck.setAttribute('disabled', '');
  }

  disableInitializationMessage(text) {
    location.pathname === '/liveness-3D.html/index.html' &&
      (this.initializationMessage.innerHTML = text);
  }

  checkAppKey(appkey: string) {
    const url = `${this.SERVER_API_URL}/facecaptcha/service/captcha/checkauth?appkey=${appkey}`;

    return this.http.get(url);
  }

  startChallenge(appkey: any) {
		const url = `${this.SERVER_API_URL}/facecaptcha/service/captcha/challenge`;

		const body = new HttpParams().set('appkey', appkey);

		const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

		return this.http.post(url, body.toString(), { headers, observe: 'response' });
	}

  decryptChallenge(response: string, appkey: string) {
		const challenge = this.decChData(response, appkey);

		return challenge;
	}

  captcha(appkey: string, chkey: string, images: string) {
		const url = `${this.SERVER_API_URL}/facecaptcha/service/captcha`;

		const body = new HttpParams()
			.set('appkey', appkey)
			.set('chkey', chkey)
			.set('images', this.encChData(images, appkey));

		const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

		return this.http.post(url, body.toString(), { headers, observe: 'response' });
	}

  getProductionKey(appkey: string, modulo: string) {
    const url = `${this.SERVER_API_URL}/facecaptcha/service/captcha/3d/initialize`;

		const body = {
			appkey: appkey,
			platform: modulo
		}

		return this.http.post(url,body);
	}

  getSessionToken(session) {
    const url = `${this.SERVER_API_URL}/facecaptcha/service/captcha/3d/session-token`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    var body = JSON.stringify({
      appkey: session.appkey,
      userAgent: session.userAgent,
    });

    return this.http.post(url, body, { headers, observe: 'response' });
  }

  sendDocument(appkey: string, images: string) {
    const url = `${this.SERVER_API_URL}/facecaptcha/service/captcha/document`;

    return this.http.post(url, {
      'appkey': appkey,
      'images': images,
    });
  }

  private decChData(data: string, appkey: string) {
		const key = CryptoJS.enc.Latin1.parse(this.padKey(appkey));
		const iv = CryptoJS.enc.Latin1.parse(this.padKey(appkey.split('').reverse().join('')));
		let decripted2 = CryptoJS.enc.Utf8.stringify(
			CryptoJS.AES.decrypt(data, key, { iv: iv, padding: CryptoJS.pad.NoPadding, mode: CryptoJS.mode.CBC })
		);
		decripted2 = decripted2.substring(0, decripted2.lastIndexOf('}') + 1);
		decripted2 = decripted2.trim();
		return decripted2;
	}

	private encChData(data: string, appkey: string) {
		const key = CryptoJS.enc.Latin1.parse(this.padKey(appkey));
		const iv = CryptoJS.enc.Latin1.parse(this.padKey(appkey.split('').reverse().join('')));
		const result = CryptoJS.AES
			.encrypt(this.padMsg(data), key, { iv: iv, padding: CryptoJS.pad.Pkcs7, mode: CryptoJS.mode.CBC })
			.toString();
		return encodeURIComponent(result);
	}

	private padKey(source) {
		if (source.length > 16) {
			return source.substring(0, 16);
		}
		return this.padMsg(source);
	}

	private padMsg(source) {
		const paddingChar = ' ';
		const size = 16;
		const x = source.length % size;
		const padLength = size - x;
		for (let i = 0; i < padLength; i++) {
			source += paddingChar;
		}
		return source;
	}
}
