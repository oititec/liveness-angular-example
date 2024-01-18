import { FacecaptchaService } from '../app/backend/facecaptcha.service';
import { Crypto } from 'src/assets/utilities/Crypto';
import { FaceTecSessionResult, FaceTecIDScanResult } from "../assets/core-sdk/FaceTecSDK.js/FaceTecPublicApi";
import { ThemeHelpers } from "src/assets/utilities/ThemeHelpers";
import { LivenessCheckProcessor } from "./processors/LivenessCheckProcessor";
import { Config } from '../../Config';
import { SampleAppUtilities } from "src/assets/utilities/SampleAppUtilities";
// import * as FaceTecStringsPtBr from "src/assets/core-sdk-optional/FaceTecStrings.pt-br";
import { environment as env } from 'src/environments/environment';

export var SampleApp = (function () {

  let resultProductKey = '';
  let latestEnrollmentIdentifier = "";
  let latestSessionResult: FaceTecSessionResult | null = null;
  let latestIDScanResult: FaceTecIDScanResult | null = null;
  let latestProcessor: LivenessCheckProcessor;
  let resultSessionToken: string = '';

  let status = 'Inicializando...';
  let deviceKeyIdentifier = env.DeviceKeyIdentifier;
  let publicFaceScanEncryptionKey = env.PublicFaceScanEncryptionKey;

  let userAgent: any = FaceTecSDK.createFaceTecAPIUserAgentString('');

  const loadAssets = () => {
    // Defina um caminho de diretório para outros recursos do FaceTec Browser SDK.
    FaceTecSDK.setResourceDirectory("/assets/core-sdk/FaceTecSDK.js/resources");

    // Defina o caminho do diretório para as imagens necessárias do FaceTec Browser SDK.
    FaceTecSDK.setImagesDirectory("/assets/core-sdk/FaceTec_images");

    // Defina as personalizações do FaceTec Device SDK.
    ThemeHelpers.setAppTheme(ThemeHelpers.getCurrentTheme());

    // Inicialize o FaceTec Browser SDK e configure os recursos da interface do usuário.
    FaceTecSDK.initializeInProductionMode(
      resultProductKey,
      deviceKeyIdentifier,
      publicFaceScanEncryptionKey,
      function (initializedSuccessfully) {
        if (initializedSuccessfully) {
          // Set localization
          SampleAppUtilities.enableControlButtons();

          // FaceTecSDK.configureLocalization(FaceTecStringsPtBr);
        }
        SampleAppUtilities.displayStatus(
          FaceTecSDK.getFriendlyDescriptionForFaceTecSDKStatus(
            FaceTecSDK.getStatus()
          )
        );

        if (
          FaceTecSDK.getFriendlyDescriptionForFaceTecSDKStatus(
            FaceTecSDK.getStatus()
          ) === 'Initialized Successfully.'
        ) {
          SampleAppUtilities.enableControlButtons();
        } else {
          SampleAppUtilities.disableControlButtons();
        }
      }
    );

    SampleAppUtilities.formatUIForDevice();
  };

  const onLivenessCheckPressed = (facecaptchaService: any, appkey: any) => {
    SampleAppUtilities.fadeOutMainUIAndPrepareForSession();

    getSessionToken(facecaptchaService, appkey);
  };

  const getProductionKey = async (facecaptchaService: any, appkey: any) => {
    await facecaptchaService.getProductionKey(appkey).subscribe((res: any) => {
      env.ProductionKeyText = JSON.parse(
        Crypto.decChData(res, appkey)
      ).productionKey;

      resultProductKey = env.ProductionKeyText;

      loadAssets();
    },
    (err: any) => {

      SampleAppUtilities.displayStatus(err.error.error);
    });
  };

  const getSessionToken = async (facecaptchaService: any, appkey: any) => {
    let result: any;

    await facecaptchaService.getSessionToken(appkey, userAgent).subscribe((res: any) => {
      result = JSON.parse(Crypto.decChData(res.body, appkey));

      resultSessionToken = result.sessionToken;

      window.localStorage.setItem('hasLiveness', 'true');

      latestProcessor = new LivenessCheckProcessor(resultSessionToken as string, SampleApp as any);
    },
    (err: any) => {
      console.log(err)
    });
  };

  const onComplete = () => {
    SampleAppUtilities.showMainUI();

    if (!latestProcessor.isSuccess()) {
      // Redefina o identificador de inscrição.
      latestEnrollmentIdentifier = '';

      // Mostrar mensagem de saída antecipada na tela. Se isso ocorrer, verifique os logs.
      SampleAppUtilities.displayStatus(
        'A sessão foi encerrada antecipadamente, consulte os logs para obter mais detalhes.'
      );

      return;
    }

    // Mostrar mensagem de sucesso na tela
    SampleAppUtilities.displayStatus('Enviado com sucesso');
  };

  const setLatestSessionResult = (sessionResult: any) => {
    latestSessionResult = sessionResult;
  };

  const setIDScanResult = (idScanResult: any) => {
    latestIDScanResult = idScanResult;
  };

  const getLatestEnrollmentIdentifier = () => {
    return latestEnrollmentIdentifier;
  };

  const setLatestServerResult = (responseJSON: any) => {};

  return {
    status,
    loadAssets,
    onLivenessCheckPressed,
    getProductionKey,
    getSessionToken,
    onComplete,
    setLatestSessionResult,
    setIDScanResult,
    getLatestEnrollmentIdentifier,
    setLatestServerResult,
  };
})();

