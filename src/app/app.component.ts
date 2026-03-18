import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'liveness-angular-example';
  logoCertiFace = '/assets/img/logo_certiface_trans.png';

  ngOnInit(): void {
    console.log("Angular version: " + VERSION.full);
  }
}
