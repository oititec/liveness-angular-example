import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppkeyComponent } from './appkey/appkey.component';
import { Liveness2dComponent } from './liveness2d/liveness2d.component';
import { Liveness3dComponent } from './liveness3d/liveness3d.component';
import { SenddocumentComponent } from './senddocument/senddocument.component';
import { SendDigitalCnhComponent } from './send-digital-cnh/send-digital-cnh.component';
import { IproovComponent } from './iproov/iproov.component';
import { FacetecV10Component } from './facetec-v10/facetec-v10.component';
import { LoginComponent } from './login/login.component';
import { FortfaceComponent } from './fortface/fortface.component';

const routes: Routes = [
  {
    path: 'appkey',
    component: AppkeyComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'liveness-2d',
    component: Liveness2dComponent,
  },
  {
    path: 'liveness-3d',
    component: Liveness3dComponent,
  },
  {
    path: 'facetec-v10',
    component: FacetecV10Component,
  },
  {
    path: 'send-document',
    component: SenddocumentComponent,
  },
  {
    path: 'send-digital-cnh',
    component: SendDigitalCnhComponent,
  },
  {
    path: 'liveness-iproov',
    component: IproovComponent
  },
  {
    path: 'fortface',
    component: FortfaceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
