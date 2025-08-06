import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppkeyComponent } from './appkey/appkey.component';
import { Liveness2dComponent } from './liveness2d/liveness2d.component';
import { Liveness3dComponent } from './liveness3d/liveness3d.component';
import { SenddocumentComponent } from './senddocument/senddocument.component';
import { SendDigitalCnhComponent } from './send-digital-cnh/send-digital-cnh.component';
import { IproovComponent } from './iproov/iproov.component';

const routes: Routes = [
  {
    path: '',
    component: AppkeyComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
