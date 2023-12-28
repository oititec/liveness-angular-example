import { Component, OnInit } from '@angular/core';
import { SampleApp } from 'src/assets/sample-app';
import { FacecaptchaService } from '../backend/facecaptcha.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liveness3d',
  templateUrl: './liveness3d.component.html',
  styleUrls: ['./liveness3d.component.scss']
})
export class Liveness3dComponent implements OnInit {
  FacetecLogo: string = '/assets/img/FaceTec_Logo.png';

  status: string = "";

  appkey: any;


  constructor(
    private facecaptchaService: FacecaptchaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.appkey = window.localStorage.getItem('appkey');
    this.status = SampleApp.status;

    SampleApp.getProductionKey(this.facecaptchaService, this.appkey);
  }

  showLiveness3D() {
    SampleApp.onLivenessCheckPressed(this.facecaptchaService, this.appkey);
  };

  deleteAppKey() {
    window.localStorage.removeItem('apiType');
    window.localStorage.removeItem('appkey');
    window.localStorage.removeItem('ticket');
    window.localStorage.removeItem('errorMessage');
    window.localStorage.removeItem('hasLiveness');

    this.router.navigateByUrl('/');
  };
}
