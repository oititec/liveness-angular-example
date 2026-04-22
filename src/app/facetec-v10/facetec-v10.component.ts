import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaceTecSDK } from "../../assets/10.0.42/core-sdk/FaceTecSDK.js/FaceTecSDK";
import { Config } from "../../assets/facetec-v10/Config";
import { FaceTecInitializationError, type FaceTecSDKInstance, FaceTecSessionResult } from '../../assets/10.0.42/core-sdk/FaceTecSDK.js/FaceTecPublicApi';
import { SessionRequestProcessor } from '../../assets/facetec-v10/SessionRequestProcessor';
import { SampleAppUtilities } from '../../assets/facetec-v10/utilities/SampleAppUtilities';
import { ThemeHelpers } from 'src/assets/facetec-v10/utilities/ThemeHelpers';
import { DeveloperStatusMessages } from '../../assets/facetec-v10/utilities/DeveloperStatusMessages';

@Component({
  selector: 'app-facetec-v10',
  templateUrl: './facetec-v10.component.html',
  styleUrls: ['./facetec-v10.component.css']
})
export class FacetecV10Component implements OnInit {
  FacetecLogo: string = '/assets/img/FaceTec_Logo.png';
  status: string = "";
  appkey: any;
  facetecStrings: any;

  private faceTecSDKInstance!: FaceTecSDKInstance;
  private themeHelpers!: ThemeHelpers;
  private sdkV10: any

  constructor(
    private router: Router,
  ) { }

  async ngOnInit() {
    this.appkey = window.localStorage.getItem('appkey');
    DeveloperStatusMessages.displayMessage("Inicializando...")

    SampleAppUtilities.formatUIForDevice();

    // Ajuste para carregar a localização pt-br
    const module = await import('src/assets/10.0.42/core-sdk-optional/FaceTecStrings.pt-br.js');
    this.facetecStrings = module.default;

    await this.loadFaceTecV10();

    this.initializeFaceTecSDK();
  }

  showLiveness3D() {
    SampleAppUtilities.fadeOutMainUIAndPrepareForSession();
    this.faceTecSDKInstance.start3DLiveness(new SessionRequestProcessor());
  };

  deleteAppKey() {
    window.localStorage.removeItem('appkey');
    window.localStorage.removeItem('hasLiveness');

    this.router.navigateByUrl('/');
  };

  private initializeFaceTecSDK = (): void => {
    this.sdkV10.setResourceDirectory("../assets/10.0.42/core-sdk/FaceTecSDK.js/resources");
    this.sdkV10.setImagesDirectory("../assets/10.0.42/core-sdk/FaceTec_images");

    this.sdkV10.initializeWithSessionRequest(Config.DeviceKeyIdentifier, new SessionRequestProcessor(),
      {
        onSuccess: (newFaceTecSdkInstance: FaceTecSDKInstance) => {
          this.faceTecSDKInstance = newFaceTecSdkInstance;
          this.onFaceTecSDKInitializationSuccess();
        },
        onError: (initializationError: FaceTecInitializationError) => {
          this.onFaceTecSDKInitializationFailure(initializationError);
        }
      }
    );
  };

  private onFaceTecSDKInitializationSuccess = (): void => {
    this.sdkV10.configureLocalization(this.facetecStrings);

    this.themeHelpers.setAppTheme("Oiti-Dark");

    SampleAppUtilities.setupAndFadeInMainUIOnInitializationSuccess();

    DeveloperStatusMessages.logAndDisplayMessage("Inicializado com sucesso");
  };

  public static demonstrateHandlingFaceTecExit = (FaceTecSessionResult: FaceTecSessionResult): void => {
    DeveloperStatusMessages.logSessionStatusOnFaceTecExit(FaceTecSessionResult.status);

    switch (FaceTecSessionResult.status) {
      case FaceTecSDK.FaceTecSessionStatus.RequestAborted:
        DeveloperStatusMessages.displayMessage("Prova de Vida Reprovada. Insira uma nova appkey e tente novamente.");
        break;
      case FaceTecSDK.FaceTecSessionStatus.SessionCompleted:
        DeveloperStatusMessages.displayMessage("Enviado com sucesso")
        break;
      default:
        break;
    }
    SampleAppUtilities.showMainUI();
  };

  private onFaceTecSDKInitializationFailure = (initializationError: FaceTecInitializationError): void => {
    SampleAppUtilities.fadeInMainUIContainer();
    console.log(initializationError);
    DeveloperStatusMessages.displayMessage("Sua appkey é inválida. Por favor, retorne para a home clicando no link no final da tela.")
  };

  // Necessario apenas para manter as duas versões do SDK no projeto
  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;

      script.onload = () => resolve();
      script.onerror = () => reject(`Erro ao carregar ${src}`);

      document.body.appendChild(script);
    });
  }

  // Necessario apenas para manter as duas versões do SDK no projeto
  private async loadFaceTecV10(): Promise<void> {
    // Limpa qualquer versão anterior
    (window as any).FaceTecSDK = undefined;

    await this.loadScript('assets/10.0.42/core-sdk/FaceTecSDK.js/FaceTecSDK.js');

    this.sdkV10 = (window as any).FaceTecSDK;

    if (!this.sdkV10) {
      throw new Error('FaceTec SDK V10 não carregou corretamente');
    }

    this.themeHelpers = new ThemeHelpers(this.sdkV10);

    // Limpa global (evita conflito com outras versões)
    (window as any).FaceTecSDK = undefined;
  }
}
