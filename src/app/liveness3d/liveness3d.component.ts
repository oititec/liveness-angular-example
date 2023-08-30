import { Component, OnInit } from '@angular/core';
import { SampleApp } from 'src/assets/sample-app';
import { FacecaptchaService } from '../backend/facecaptcha.service';

@Component({
  selector: 'app-liveness3d',
  templateUrl: './liveness3d.component.html',
  styleUrls: ['./liveness3d.component.scss']
})
export class Liveness3dComponent implements OnInit {
  FacetecLogo: string = '/assets/img/FaceTec_Logo.png';

  status: string = "";

  constructor(
    private facecaptchaService: FacecaptchaService,
  ) { }

  ngOnInit() {
    this.status = SampleApp.status;

    SampleApp.getProductionKey(this.facecaptchaService);
  }

  showLiveness3D() {
    SampleApp.onLivenessCheckPressed(this.facecaptchaService);
  };

  deleteAppKey() {
    window.localStorage.removeItem('appkey');
    window.localStorage.removeItem('hasLiveness');

    window.location.href = '/';
  };
}
