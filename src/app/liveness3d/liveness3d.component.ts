import { Component, OnDestroy, OnInit } from '@angular/core';
import { SampleApp } from 'src/assets/sample-app';
import { FacecaptchaService } from '../backend/facecaptcha.service';
import { Router } from '@angular/router';
import { FacetecHostService } from '../facetec-host.service';

@Component({
    selector: 'app-liveness3d',
    templateUrl: './liveness3d.component.html',
    styleUrls: ['./liveness3d.component.scss'],
    standalone: false
})
export class Liveness3dComponent implements OnInit, OnDestroy {
  FacetecLogo: string = '/assets/img/FaceTec_Logo.png';
  status: string = "";
  appkey: any;

  constructor(
    private facecaptchaService: FacecaptchaService,
    private router: Router,
    private facetecHost: FacetecHostService,
  ) { }

  async ngOnInit() {
    await this.facetecHost.prepare();

    this.appkey = window.localStorage.getItem('appkey');
    this.status = SampleApp.status;

    await SampleApp.getProductionKey(this.facecaptchaService, this.appkey);
  }

  ngOnDestroy(): void {
    SampleApp.reset();
    this.facetecHost.release((window as any).FaceTecSDK);
  }

  showLiveness3D() {
    SampleApp.onLivenessCheckPressed(this.facecaptchaService, this.appkey);
  };

  deleteAppKey() {
    window.localStorage.removeItem('appkey');
    window.localStorage.removeItem('hasLiveness');

    this.router.navigateByUrl('/');
  };
}
