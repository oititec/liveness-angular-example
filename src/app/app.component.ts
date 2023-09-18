import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'liveness-angular-example';
  logoOiti = '/assets/img/logo-oiti.png';

  ngOnInit(): void {
    console.log("Angular version: " + VERSION.full);
  }
}
