import { Component, OnInit } from '@angular/core';
import { FacecaptchaService } from '../backend/facecaptcha.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facetec-v10',
  templateUrl: './facetec-v10.component.html',
  styleUrls: ['./facetec-v10.component.scss']
})
export class FacetecV10Component implements OnInit {
    FacetecLogo: string = '/assets/img/FaceTec_Logo.png';
  
    status: string = "";
  
    appkey: any;
  
  
    constructor(
      private facecaptchaService: FacecaptchaService,
      private router: Router,
    ) { }
  
    ngOnInit() {
      // this.appkey = window.localStorage.getItem('appkey');
      // this.status = SampleApp.status;
  
      // SampleApp.getProductionKey(this.facecaptchaService, this.appkey);
    }
  
    showLiveness3D() {
      // SampleApp.onLivenessCheckPressed(this.facecaptchaService, this.appkey);
    };
  
    deleteAppKey() {
      // window.localStorage.removeItem('appkey');
      // window.localStorage.removeItem('hasLiveness');
  
      // this.router.navigateByUrl('/');
    };
}
