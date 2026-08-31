import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaceTecSDK } from "../../assets/core-sdk-v10/core-sdk/FaceTecSDK.js/FaceTecSDK";
import { Config } from "../../assets/facetec-v10/Config";
import { FaceTecInitializationError, type FaceTecSDKInstance, FaceTecSessionResult } from '../../assets/core-sdk-v10/core-sdk/FaceTecSDK.js/FaceTecPublicApi';
import { SessionRequestProcessor } from '../../assets/facetec-v10/SessionRequestProcessor';
import { SampleAppUtilities } from '../../assets/facetec-v10/utilities/SampleAppUtilities';
import { ThemeHelpers } from 'src/assets/facetec-v10/utilities/ThemeHelpers';
import { DeveloperStatusMessages } from '../../assets/facetec-v10/utilities/DeveloperStatusMessages';
import { Facetecv10UiService } from './facetec-v10-ui.service';

@Component({
    selector: 'app-facetec-v10',
    templateUrl: './facetec-v10.component.html',
    styleUrls: ['./facetec-v10.component.css'],
    standalone: false
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
    private facetecv10UiService: Facetecv10UiService
  ) { }

  async ngOnInit() {
    this.appkey = window.localStorage.getItem('appkey');
    DeveloperStatusMessages.displayMessage("Inicializando...")

    await this.facetecv10UiService.formatUIForDevice();

    // Ajuste para carregar a localização pt-br
    const module = await import('src/assets/core-sdk-v10/core-sdk-optional/FaceTecStrings.pt-br.js');
    this.facetecStrings = module.default;

    await this.loadFaceTecV10();

    this.initializeFaceTecSDK();
  }

  public showLiveness3D() {
    SampleAppUtilities.fadeOutMainUIAndPrepareForSession();
    this.faceTecSDKInstance.start3DLiveness(new SessionRequestProcessor());
  };

  public deleteAppKey() {
    window.localStorage.removeItem('appkey');
    window.localStorage.removeItem('hasLiveness');

    this.router.navigateByUrl('/');
  };

  private initializeFaceTecSDK = (): void => {
    this.sdkV10.setResourceDirectory("../assets/core-sdk-v10/core-sdk/FaceTecSDK.js/resources");
    this.sdkV10.setImagesDirectory("../assets/core-sdk-v10/core-sdk/FaceTec_images");

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

  private onFaceTecSDKInitializationFailure = (initializationError: FaceTecInitializationError): void => {
    SampleAppUtilities.fadeInMainUIContainer();
    console.log(initializationError);
    switch (initializationError) {
      case 0:
        DeveloperStatusMessages.displayMessage("Servidor da FaceTec não pode validar esta aplicação");
        break;
      case 1:
        DeveloperStatusMessages.displayMessage("Sua appkey é inválida. Por favor, retorne para a home clicando no link no final da tela");
        break;
      case 2:
        DeveloperStatusMessages.displayMessage("Dispositivo não suportado");
        break;
      case 3:
        DeveloperStatusMessages.displayMessage("Ocorreu um erro inesperado");
        break;
      case 4:
        DeveloperStatusMessages.displayMessage("Falha ao carregar recursos na inicialização");
        break;
      case 5:
        DeveloperStatusMessages.displayMessage("APIs de câmera do browser funcionam apenas em localhost ou https");
        break;
      default:
        DeveloperStatusMessages.displayMessage("Erro interno");
        break;
    }
  };

  public static demonstrateHandlingFaceTecExit = (faceTecSessionResult: FaceTecSessionResult): void => {
    DeveloperStatusMessages.logSessionStatusOnFaceTecExit(faceTecSessionResult.status);
    console.log(faceTecSessionResult)

    switch (faceTecSessionResult.status) {
      case FaceTecSDK.FaceTecSessionStatus.RequestAborted:
        DeveloperStatusMessages.displayMessage("Prova de Vida reprovada. Insira uma nova appkey e tente novamente");
        break;
      case FaceTecSDK.FaceTecSessionStatus.SessionCompleted:
        DeveloperStatusMessages.displayMessage("Enviado com sucesso")
        break;
      case FaceTecSDK.FaceTecSessionStatus.UserCancelledFaceScan:
        DeveloperStatusMessages.displayMessage("Saiu da tela inteira sem concluir a prova de vida")
        break;
      case FaceTecSDK.FaceTecSessionStatus.LockedOut:
        DeveloperStatusMessages.displayMessage("O dispositivo está bloqueado do FaceTec Browser SDK");
        break;
      case FaceTecSDK.FaceTecSessionStatus.CameraPermissionsDenied:
        DeveloperStatusMessages.displayMessage("Não há permissão de câmera");
        break;
      case FaceTecSDK.FaceTecSessionStatus.IFrameNotAllowedWithoutPermission:
        DeveloperStatusMessages.displayMessage("FaceTec Browser SDK foi aberto em um IFrame sem permissão");
        break;
      default:
        DeveloperStatusMessages.displayMessage("Erro interno");
        break;
    }
    SampleAppUtilities.showMainUI();
  };

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

  private async loadFaceTecV10(): Promise<void> {
    (window as any).FaceTecSDK = undefined;
    await this.loadScript('assets/core-sdk-v10/core-sdk/FaceTecSDK.js/FaceTecSDK.js');
    this.sdkV10 = (window as any).FaceTecSDK;

    if (!this.sdkV10) {
      throw new Error('FaceTec SDK V10 não carregou corretamente');
    }

    this.themeHelpers = new ThemeHelpers(this.sdkV10);
    (window as any).FaceTecSDK = undefined;
  }
}
