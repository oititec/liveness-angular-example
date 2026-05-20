import { Config } from "../../../assets/facetec-v10/Config";
import { FaceTecSDK } from "../../core-sdk-v10/core-sdk/FaceTecSDK.js/FaceTecSDK";
import { FaceTecCustomization } from "../../core-sdk-v10/core-sdk/FaceTecSDK.js/FaceTecCustomization";
import { SoundFileUtilities } from "./SoundFileUtilities";

export class ThemeHelpers {
  constructor(private sdk: any) { }

  private currentTheme: string = "Config Wizard Theme";
  private themeResourceDirectory = "assets/facetec-v10/sample-app-resources/images/themes/";

  public setAppTheme = (theme: string): void => {
    const customization = this.getCustomizationForTheme(theme);
    const lowLightCustomization = this.getLowLightCustomizationForTheme(theme);
    const dynamicDimmingCustomization = this.getDynamicDimmingCustomizationForTheme(theme);

    this.sdk.setCustomization(customization);
    this.sdk.setLowLightCustomization(lowLightCustomization);
    this.sdk.setDynamicDimmingCustomization(dynamicDimmingCustomization);
  };

  private getCustomizationForTheme = (theme: string): FaceTecCustomization => {
    var currentCustomization: FaceTecCustomization = new FaceTecSDK.FaceTecCustomization();
    currentCustomization = Config.retrieveConfigurationWizardCustomization(this.sdk);

    var soundFileUtilities: SoundFileUtilities = new SoundFileUtilities();
    currentCustomization = soundFileUtilities.setVocalGuidanceSoundFiles(currentCustomization);

    const retryScreenSlideshowImages: string[] = [this.themeResourceDirectory + "FaceTec_ideal_1.png", this.themeResourceDirectory + "FaceTec_ideal_2.png", this.themeResourceDirectory + "FaceTec_ideal_3.png", this.themeResourceDirectory + "FaceTec_ideal_4.png", this.themeResourceDirectory + "FaceTec_ideal_5.png"];

    if (theme === "Config Wizard Theme") {
      currentCustomization = Config.retrieveConfigurationWizardCustomization(FaceTecSDK);
    }
    else if (theme === 'Oiti-Dark') {

      const primaryColor = '#05D758'; // verde
      const secondaryColor = '#FFFFFF'; // branco
      const backgroundColor = '#1E1E1E'; // preto
      const font = "Futura,'Trebuchet MS',Arial,sans-serif";

      var successResultAnimationSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      successResultAnimationSVG.setAttribute('viewBox', '0 0 50 50');
      successResultAnimationSVG.classList.add('oiti-success-svg');
      successResultAnimationSVG.innerHTML =
        "<circle cx='25' cy='25' r='25' style='fill:#FFFFFF;'/><polyline points='38,15 22,33 12,25' style='fill:none;stroke:#05D758;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;'/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>";

      var unsuccessResultAnimationSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      unsuccessResultAnimationSVG.setAttribute('viewBox', '0 0 50 50');
      unsuccessResultAnimationSVG.classList.add('oiti-unsuccess-svg');
      unsuccessResultAnimationSVG.innerHTML =
        "<circle cx='25' cy='25' r='25' style='fill:#FFFFFF;'/><polyline xmlns='http://www.w3.org/2000/svg' points='16,34 25,25 34,16' style='fill:none;stroke:#DD0101;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;' /><polyline xmlns='http://www.w3.org/2000/svg' points='16,16 25,25 34,34' style='fill:none;stroke:#DD0101;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;'/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>";

      var activityIndicatorSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      activityIndicatorSVG.setAttribute('viewBox', '0 0 100 100');
      activityIndicatorSVG.classList.add('oiti-activity-indicator-svg');
      activityIndicatorSVG.innerHTML =
        "<path fill='#05D758' d='M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z'><animateTransform attributeName='transform' attributeType='XML' type='rotate' dur='1s' from='0 50 50' to='360 50 50' repeatCount='indefinite' /></path>";

      var uploadActivityIndicatorSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      uploadActivityIndicatorSVG.setAttribute('viewBox', '0 0 100 100');
      uploadActivityIndicatorSVG.classList.add('oiti-activity-indicator-svg');
      uploadActivityIndicatorSVG.innerHTML =
        "<path fill='#05D758' d='M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z'><animateTransform attributeName='transform' attributeType='XML' type='rotate' dur='1s' from='0 50 50' to='360 50 50' repeatCount='indefinite' /></path>";

      // Personalização da Animação de Carregamento Inicial
      currentCustomization.initialLoadingAnimationCustomization.customAnimation =
        activityIndicatorSVG;
      currentCustomization.initialLoadingAnimationCustomization.animationRelativeScale = 1.0;
      currentCustomization.initialLoadingAnimationCustomization.backgroundColor =
        backgroundColor;
      currentCustomization.initialLoadingAnimationCustomization.foregroundColor =
        primaryColor;
      currentCustomization.initialLoadingAnimationCustomization.messageTextColor =
        secondaryColor;
      currentCustomization.initialLoadingAnimationCustomization.messageFont =
        font;
      // Personalização de sobreposição
      currentCustomization.overlayCustomization.backgroundColor =
        backgroundColor;
      currentCustomization.overlayCustomization.showBrandingImage = false;
      currentCustomization.overlayCustomization.brandingImage = '';
      // Personalização de Orientação
      currentCustomization.guidanceCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.guidanceCustomization.foregroundColor =
        secondaryColor;
      currentCustomization.guidanceCustomization.headerFont = font;
      currentCustomization.guidanceCustomization.subtextFont = font;
      currentCustomization.guidanceCustomization.buttonFont = font;
      currentCustomization.guidanceCustomization.buttonTextNormalColor =
        backgroundColor;
      currentCustomization.guidanceCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentCustomization.guidanceCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentCustomization.guidanceCustomization.buttonBackgroundHighlightColor =
        'rgb(86, 86, 86)';
      currentCustomization.guidanceCustomization.buttonTextDisabledColor =
        backgroundColor;
      currentCustomization.guidanceCustomization.buttonBackgroundDisabledColor =
        'rgb(173, 173, 173)';
      currentCustomization.guidanceCustomization.buttonBorderColor =
        'transparent';
      currentCustomization.guidanceCustomization.buttonBorderWidth = '0px';
      currentCustomization.guidanceCustomization.buttonCornerRadius = '20px';
      currentCustomization.guidanceCustomization.readyScreenOvalFillColor =
        'transparent';
      currentCustomization.guidanceCustomization.readyScreenHeaderTextColor =
        secondaryColor;
      currentCustomization.guidanceCustomization.readyScreenSubtextTextColor =
        secondaryColor;
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundColor =
        backgroundColor;
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundCornerRadius =
        '5px';
      currentCustomization.guidanceCustomization.retryScreenImageBorderColor =
        primaryColor;
      currentCustomization.guidanceCustomization.retryScreenImageBorderWidth =
        '2px';
      currentCustomization.guidanceCustomization.retryScreenImageCornerRadius =
        '10px';
      currentCustomization.guidanceCustomization.retryScreenOvalStrokeColor =
        backgroundColor;
      currentCustomization.guidanceCustomization.retryScreenSlideshowImages =
        retryScreenSlideshowImages;
      currentCustomization.guidanceCustomization.retryScreenSlideshowInterval =
        '2000ms';
      currentCustomization.guidanceCustomization.enableRetryScreenSlideshowShuffle =
        true;
      currentCustomization.guidanceCustomization.cameraPermissionsScreenImage =
        this.themeResourceDirectory + 'oiti/camera_icon.png';
      // Personalização da tela de resultados
      currentCustomization.resultScreenCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.resultScreenCustomization.foregroundColor =
        secondaryColor;
      currentCustomization.resultScreenCustomization.messageFont = font;
      currentCustomization.resultScreenCustomization.activityIndicatorColor =
        secondaryColor;
      currentCustomization.resultScreenCustomization.customActivityIndicatorImage =
        this.themeResourceDirectory + 'oiti/activity_indicator_faded_black.png';
      currentCustomization.resultScreenCustomization.customActivityIndicatorRotationInterval =
        '0.8s';
      currentCustomization.resultScreenCustomization.customActivityIndicatorAnimation =
        uploadActivityIndicatorSVG;
      currentCustomization.resultScreenCustomization.resultAnimationBackgroundColor =
        primaryColor;
      currentCustomization.resultScreenCustomization.resultAnimationForegroundColor =
        backgroundColor;
      currentCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage =
        '';
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage =
        '';
      currentCustomization.resultScreenCustomization.customResultAnimationSuccess =
        successResultAnimationSVG;
      currentCustomization.resultScreenCustomization.customResultAnimationUnsuccess =
        unsuccessResultAnimationSVG;
      currentCustomization.resultScreenCustomization.showUploadProgressBar =
        true;
      currentCustomization.resultScreenCustomization.uploadProgressTrackColor =
        'rgba(0, 0, 0, 0.2)';
      currentCustomization.resultScreenCustomization.uploadProgressFillColor =
        secondaryColor;
      currentCustomization.resultScreenCustomization.animationRelativeScale = 1.0;
      // Personalização de comentários
      currentCustomization.feedbackCustomization.backgroundColor =
        backgroundColor;
      currentCustomization.feedbackCustomization.textColor = secondaryColor;
      currentCustomization.feedbackCustomization.textFont = font;
      currentCustomization.feedbackCustomization.cornerRadius = '5px';
      currentCustomization.feedbackCustomization.shadow = '0px 3px 10px black';
      // Personalização da moldura
      currentCustomization.frameCustomization.backgroundColor = backgroundColor;
      currentCustomization.frameCustomization.borderColor = primaryColor;
      currentCustomization.frameCustomization.borderWidth = '0px';
      currentCustomization.frameCustomization.borderCornerRadius = '0px';
      currentCustomization.frameCustomization.shadow = 'none';
      // Personalização da área Oval
      currentCustomization.ovalCustomization.strokeColor = primaryColor;
      currentCustomization.ovalCustomization.progressColor1 =
        'rgba(59, 195, 113, 0.7)';
      currentCustomization.ovalCustomization.progressColor2 =
        'rgba(59, 195, 113, 0.7)';
      // Customização do Botão Cancelar
      currentCustomization.cancelButtonCustomization.customImage =
        this.themeResourceDirectory + 'oiti/single_chevron_left_black.png';
      currentCustomization.cancelButtonCustomization.location =
        FaceTecSDK.FaceTecCancelButtonLocation.Custom;
      currentCustomization.cancelButtonCustomization.setCustomLocation(
        20,
        20,
        20,
        20
      );

      // Personalização de orientação -- Substituições de estilo de texto
      // Título da Tela Estou Pronto
      currentCustomization.guidanceCustomization.readyScreenHeaderFont = font;
      currentCustomization.guidanceCustomization.readyScreenHeaderTextColor =
        secondaryColor;
      // SubTítulo da Tela Estou Pronto
      currentCustomization.guidanceCustomization.readyScreenSubtextFont = font;
      currentCustomization.guidanceCustomization.readyScreenSubtextTextColor =
        secondaryColor;
      // Título da tela Tentar Novamente
      currentCustomization.guidanceCustomization.retryScreenHeaderFont = font;
      currentCustomization.guidanceCustomization.retryScreenHeaderTextColor =
        secondaryColor;
      // SubTítulo da tela Tentar Novamente
      currentCustomization.guidanceCustomization.retryScreenSubtextFont = font;
      currentCustomization.guidanceCustomization.retryScreenSubtextTextColor =
        secondaryColor;
      // Customização da marca d'água de segurança
      currentCustomization.securityWatermarkCustomization.setSecurityWatermarkImage(
        FaceTecSDK.FaceTecSecurityWatermarkImage.FaceTec
      );
    }
    return currentCustomization;
  };

  private getLowLightCustomizationForTheme = (theme: string): FaceTecCustomization => {
    var currentLowLightCustomization: FaceTecCustomization = this.getCustomizationForTheme(theme);

    if (theme === "Config Wizard Theme") {
      currentLowLightCustomization = Config.retrieveLowLightConfigurationWizardCustomization(FaceTecSDK);
    }
    else if (theme == "Oiti-Dark") {
      currentLowLightCustomization.ovalCustomization.strokeColor = "#000000";

      currentLowLightCustomization.feedbackCustomization.backgroundColor = "#000000";
      currentLowLightCustomization.feedbackCustomization.textColor = "#FFFFFF";

      currentLowLightCustomization.guidanceCustomization.buttonBackgroundNormalColor = "#000000";
      currentLowLightCustomization.guidanceCustomization.buttonTextNormalColor = "#FFFFFF";

      currentLowLightCustomization.frameCustomization.borderColor = "#FFFFFF";

      currentLowLightCustomization.guidanceCustomization.foregroundColor = "#000000";

      currentLowLightCustomization.guidanceCustomization.readyScreenHeaderTextColor = "#000000";
      currentLowLightCustomization.guidanceCustomization.readyScreenSubtextTextColor = "#000000";
      currentLowLightCustomization.guidanceCustomization.retryScreenHeaderTextColor = "#000000";
      currentLowLightCustomization.guidanceCustomization.retryScreenSubtextTextColor = "#000000";

      currentLowLightCustomization.resultScreenCustomization.uploadProgressFillColor =
        "#000000";
      currentLowLightCustomization.resultScreenCustomization.foregroundColor = "#000000";
      currentLowLightCustomization.resultScreenCustomization.activityIndicatorColor = "#000000";
    }

    return currentLowLightCustomization;
  };

  private getDynamicDimmingCustomizationForTheme = (theme: string): FaceTecCustomization => {
    var currentDynamicDimmingCustomization: FaceTecCustomization = this.getCustomizationForTheme(theme);

    if (theme === "Config Wizard Theme") {
      currentDynamicDimmingCustomization = Config.retrieveDynamicDimmingConfigurationWizardCustomization(FaceTecSDK);
    }
    else if (theme === "Oiti-Dark") {
      currentDynamicDimmingCustomization.initialLoadingAnimationCustomization.messageTextColor =
        "#FFFFFF";

      currentDynamicDimmingCustomization.ovalCustomization.strokeColor = "#FFFFFF";

      currentDynamicDimmingCustomization.feedbackCustomization.backgroundColor = "#FFFFFF";
      currentDynamicDimmingCustomization.feedbackCustomization.textColor = "#000000";

      currentDynamicDimmingCustomization.guidanceCustomization.buttonTextNormalColor = "#000000";

      currentDynamicDimmingCustomization.frameCustomization.borderColor = "#FFFFFF";

      currentDynamicDimmingCustomization.guidanceCustomization.foregroundColor = "#FFFFFF";

      currentDynamicDimmingCustomization.guidanceCustomization.readyScreenHeaderTextColor = "#FFFFFF";
      currentDynamicDimmingCustomization.guidanceCustomization.readyScreenSubtextTextColor = "#FFFFFF";
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenHeaderTextColor = "#FFFFFF";
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenSubtextTextColor = "#FFFFFF";

      currentDynamicDimmingCustomization.resultScreenCustomization.uploadProgressFillColor =
        "#FFFFFF";
      currentDynamicDimmingCustomization.resultScreenCustomization.foregroundColor = "#FFFFFF";
      currentDynamicDimmingCustomization.resultScreenCustomization.activityIndicatorColor = "#FFFFFF";
    }

    return currentDynamicDimmingCustomization;
  };

  public getCurrentTheme = (): string => {
    return this.currentTheme;
  };
}
