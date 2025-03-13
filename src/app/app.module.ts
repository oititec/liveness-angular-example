import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppkeyComponent } from './appkey/appkey.component';
import { Liveness2dComponent } from './liveness2d/liveness2d.component';
import { Liveness3dComponent } from './liveness3d/liveness3d.component';
import { SenddocumentComponent } from './senddocument/senddocument.component';
import { FaceTecSDK as FaceTecSDKType } from 'src/assets/core-sdk/FaceTecSDK.js/FaceTecSDK';
import { SendDigitalCnhComponent } from './send-digital-cnh/send-digital-cnh.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppkeyComponent,
    Liveness2dComponent,
    Liveness3dComponent,
    SenddocumentComponent,
    SendDigitalCnhComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

declare global {
  const FaceTecSDK: typeof FaceTecSDKType;
}
