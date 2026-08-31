import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppkeyComponent } from './appkey/appkey.component';
import { Liveness2dComponent } from './liveness2d/liveness2d.component';
import { Liveness3dComponent } from './liveness3d/liveness3d.component';
import { SenddocumentComponent } from './senddocument/senddocument.component';
import { FaceTecSDK as FaceTecSDKType } from 'src/assets/core-sdk/FaceTecSDK.js/FaceTecSDK';
import { SendDigitalCnhComponent } from './send-digital-cnh/send-digital-cnh.component';
import { IproovComponent } from './iproov/iproov.component';
import { FacetecV10Component } from './facetec-v10/facetec-v10.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FortfaceComponent } from './fortface/fortface.component';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        AppkeyComponent,
        Liveness2dComponent,
        Liveness3dComponent,
        SenddocumentComponent,
        SendDigitalCnhComponent,
        SenddocumentComponent,
        IproovComponent,
        FacetecV10Component,
        LoginComponent,
        FortfaceComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }

declare global {
  const FaceTecSDK: typeof FaceTecSDKType;
}
