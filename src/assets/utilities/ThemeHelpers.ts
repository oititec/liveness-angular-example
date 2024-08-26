import { Config } from '../../../Config';
import { FaceTecCustomization } from '../core-sdk/FaceTecSDK.js/FaceTecCustomization';
import { SampleAppUtilities } from './SampleAppUtilities';
import { SoundFileUtilities } from './SoundFileUtilities';

export var ThemeHelpers = (function () {
  // Definindo o tema padrão
  var currentTheme: string = 'FaceTec Theme';
  var themeResourceDirectory = 'assets/sample-app-resources/images/themes/';

  function setAppTheme(theme: string) {
    Config.currentCustomization = getCustomizationForTheme(theme);
    Config.currentLowLightCustomization =
      getLowLightCustomizationForTheme(theme);
    Config.currentDynamicDimmingCustomization =
      getDynamicDimmingCustomizationForTheme(theme);

    FaceTecSDK.setCustomization(Config.currentCustomization);
    FaceTecSDK.setLowLightCustomization(Config.currentLowLightCustomization);
    FaceTecSDK.setDynamicDimmingCustomization(
      Config.currentDynamicDimmingCustomization
    );
  }

  function getCustomizationForTheme(theme: string): FaceTecCustomization {
    var currentCustomization: FaceTecCustomization =
      new FaceTecSDK.FaceTecCustomization();

    // Adicionar personalização de som a nova personalização de tema
    var soundFileUtilities = new SoundFileUtilities();
    currentCustomization =
      soundFileUtilities.setVocalGuidanceSoundFiles(currentCustomization);

    const retryScreenSlideshowImages: string[] = [
      themeResourceDirectory + 'FaceTec_ideal_1.png',
      themeResourceDirectory + 'FaceTec_ideal_2.png',
      themeResourceDirectory + 'FaceTec_ideal_3.png',
      themeResourceDirectory + 'FaceTec_ideal_4.png',
      themeResourceDirectory + 'FaceTec_ideal_5.png',
    ];

    if (theme === 'Config Wizard Theme') {
      currentCustomization =
        Config.retrieveConfigurationWizardCustomization(FaceTecSDK);
      // Defina a cor do texto do token da sessão de carregamento FaceTec do elemento do desenvolvedor
      document.getElementById('loading-session-token-text')!.style.color =
        'rgb(64, 127, 178)';
    } else if (theme === 'FaceTec Theme') {
      // Usando personalizações padrão
      // Defina a cor do texto do token da sessão de carregamento FaceTec do elemento do desenvolvedor
      document.getElementById('loading-session-token-text')!.style.color =
        'rgb(64, 127, 178)';
    } else if (theme === 'Oiti-Dark') {
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
        themeResourceDirectory + 'oiti/camera_icon.png';
      // Personalização de digitalização de documentos
      currentCustomization.idScanCustomization.showSelectionScreenDocumentImage =
        true;
      currentCustomization.idScanCustomization.selectionScreenDocumentImage =
        themeResourceDirectory + 'oiti/document_offblack.png';
      currentCustomization.idScanCustomization[
        'showSelectionScreenBrandingImage'
      ] = false;
      currentCustomization.idScanCustomization['selectionScreenBrandingImage'] =
        '';
      currentCustomization.idScanCustomization.selectionScreenBackgroundColors =
        backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenBackgroundColors =
        backgroundColor;
      currentCustomization.idScanCustomization.captureScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.reviewScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.selectionScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.headerFont = font;
      currentCustomization.idScanCustomization.subtextFont = font;
      currentCustomization.idScanCustomization.buttonFont = font;
      currentCustomization.idScanCustomization.buttonTextNormalColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentCustomization.idScanCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundHighlightColor =
        'rgb(86, 86, 86)';
      currentCustomization.idScanCustomization.buttonTextDisabledColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundDisabledColor =
        primaryColor;
      currentCustomization.idScanCustomization.buttonBorderColor =
        'transparent';
      currentCustomization.idScanCustomization.buttonBorderWidth = '0px';
      currentCustomization.idScanCustomization.buttonCornerRadius = '20px';
      currentCustomization.idScanCustomization.captureScreenTextBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor =
        primaryColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderWidth =
        '2px';
      currentCustomization.idScanCustomization.captureScreenTextBackgroundCornerRadius =
        '5px';
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor =
        primaryColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderWidth =
        '2px';
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderCornerRadius =
        '5px';
      currentCustomization.idScanCustomization.captureScreenBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.captureFrameStrokeColor =
        primaryColor;
      currentCustomization.idScanCustomization.captureFrameStrokeWidth = '2px';
      currentCustomization.idScanCustomization.captureFrameCornerRadius =
        '12px';
      // Personalização da tela de confirmação de OCR
      currentCustomization.ocrConfirmationCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor =
        secondaryColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineWidth =
        '2px';
      currentCustomization.ocrConfirmationCustomization.mainHeaderFont = font;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderFont =
        font;
      currentCustomization.ocrConfirmationCustomization.fieldLabelFont = font;
      currentCustomization.ocrConfirmationCustomization.fieldValueFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderFont =
        font;
      currentCustomization.ocrConfirmationCustomization.mainHeaderTextColor =
        secondaryColor;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldLabelTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldValueTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor =
        'rgba(59, 195, 113, 0.4)';
      currentCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor =
        'transparent';
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderColor =
        secondaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderWidth =
        '2px';
      currentCustomization.ocrConfirmationCustomization.inputFieldCornerRadius =
        '0px';
      currentCustomization.ocrConfirmationCustomization.showInputFieldBottomBorderOnly =
        true;
      currentCustomization.ocrConfirmationCustomization.buttonFont = font;
      currentCustomization.ocrConfirmationCustomization.buttonTextNormalColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor =
        'rgb(86, 86, 86)';
      currentCustomization.ocrConfirmationCustomization.buttonTextDisabledColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonBorderColor =
        'transparent';
      currentCustomization.ocrConfirmationCustomization.buttonBorderWidth =
        '0px';
      currentCustomization.ocrConfirmationCustomization.buttonCornerRadius =
        '20px';
      // Personalização da tela de resultados
      currentCustomization.resultScreenCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.resultScreenCustomization.foregroundColor =
        secondaryColor;
      currentCustomization.resultScreenCustomization.messageFont = font;
      currentCustomization.resultScreenCustomization.activityIndicatorColor =
        secondaryColor;
      currentCustomization.resultScreenCustomization.customActivityIndicatorImage =
        themeResourceDirectory + 'oiti/activity_indicator_faded_black.png';
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
        themeResourceDirectory + 'oiti/single_chevron_left_black.png';
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
    } else if (theme === 'Oiti-White') {
      const primaryColor = '#05D758'; // verde
      const secondaryColor = '#1E1E1E'; // preto
      const backgroundColor = '#FFFFFF'; // branco
      const font = "Futura,'Trebuchet MS',Arial,sans-serif";

      var successResultAnimationSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      successResultAnimationSVG.setAttribute('viewBox', '0 0 50 50');
      successResultAnimationSVG.classList.add('oiti-success-svg');
      successResultAnimationSVG.innerHTML =
        "<circle cx='25' cy='25' r='25' style='fill:#05D758;'/><polyline points='38,15 22,33 12,25' style='fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;'/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>";

      var unsuccessResultAnimationSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      unsuccessResultAnimationSVG.setAttribute('viewBox', '0 0 50 50');
      unsuccessResultAnimationSVG.classList.add('oiti-unsuccess-svg');
      unsuccessResultAnimationSVG.innerHTML =
        "<circle cx='25' cy='25' r='25' style='fill:#DD0101;'/><polyline xmlns='http://www.w3.org/2000/svg' points='16,34 25,25 34,16' style='fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;' /><polyline xmlns='http://www.w3.org/2000/svg' points='16,16 25,25 34,34' style='fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;'/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>";

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
        themeResourceDirectory + 'oiti/camera_icon.png';
      // Personalização de digitalização de documentos
      currentCustomization.idScanCustomization.showSelectionScreenDocumentImage =
        true;
      currentCustomization.idScanCustomization.selectionScreenDocumentImage =
        themeResourceDirectory + 'oiti/document_offblack.png';
      currentCustomization.idScanCustomization[
        'showSelectionScreenBrandingImage'
      ] = false;
      currentCustomization.idScanCustomization['selectionScreenBrandingImage'] =
        '';
      currentCustomization.idScanCustomization.selectionScreenBackgroundColors =
        backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenBackgroundColors =
        backgroundColor;
      currentCustomization.idScanCustomization.captureScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.reviewScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.selectionScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.headerFont = font;
      currentCustomization.idScanCustomization.subtextFont = font;
      currentCustomization.idScanCustomization.buttonFont = font;
      currentCustomization.idScanCustomization.buttonTextNormalColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentCustomization.idScanCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundHighlightColor =
        'rgb(86, 86, 86)';
      currentCustomization.idScanCustomization.buttonTextDisabledColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundDisabledColor =
        primaryColor;
      currentCustomization.idScanCustomization.buttonBorderColor =
        'transparent';
      currentCustomization.idScanCustomization.buttonBorderWidth = '0px';
      currentCustomization.idScanCustomization.buttonCornerRadius = '20px';
      currentCustomization.idScanCustomization.captureScreenTextBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor =
        primaryColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderWidth =
        '2px';
      currentCustomization.idScanCustomization.captureScreenTextBackgroundCornerRadius =
        '5px';
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor =
        primaryColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderWidth =
        '2px';
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderCornerRadius =
        '5px';
      currentCustomization.idScanCustomization.captureScreenBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.captureFrameStrokeColor =
        primaryColor;
      currentCustomization.idScanCustomization.captureFrameStrokeWidth = '2px';
      currentCustomization.idScanCustomization.captureFrameCornerRadius =
        '12px';
      // Personalização da tela de confirmação de OCR
      currentCustomization.ocrConfirmationCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor =
        secondaryColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineWidth =
        '2px';
      currentCustomization.ocrConfirmationCustomization.mainHeaderFont = font;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderFont =
        font;
      currentCustomization.ocrConfirmationCustomization.fieldLabelFont = font;
      currentCustomization.ocrConfirmationCustomization.fieldValueFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderFont =
        font;
      currentCustomization.ocrConfirmationCustomization.mainHeaderTextColor =
        secondaryColor;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldLabelTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldValueTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor =
        'rgba(59, 195, 113, 0.4)';
      currentCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor =
        'transparent';
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderColor =
        secondaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderWidth =
        '2px';
      currentCustomization.ocrConfirmationCustomization.inputFieldCornerRadius =
        '0px';
      currentCustomization.ocrConfirmationCustomization.showInputFieldBottomBorderOnly =
        true;
      currentCustomization.ocrConfirmationCustomization.buttonFont = font;
      currentCustomization.ocrConfirmationCustomization.buttonTextNormalColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor =
        'rgb(86, 86, 86)';
      currentCustomization.ocrConfirmationCustomization.buttonTextDisabledColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonBorderColor =
        'transparent';
      currentCustomization.ocrConfirmationCustomization.buttonBorderWidth =
        '0px';
      currentCustomization.ocrConfirmationCustomization.buttonCornerRadius =
        '20px';
      // Personalização da tela de resultados
      currentCustomization.resultScreenCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.resultScreenCustomization.foregroundColor =
        secondaryColor;
      currentCustomization.resultScreenCustomization.messageFont = font;
      currentCustomization.resultScreenCustomization.activityIndicatorColor =
        secondaryColor;
      currentCustomization.resultScreenCustomization.customActivityIndicatorImage =
        themeResourceDirectory + 'oiti/activity_indicator_faded_black.png';
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
        themeResourceDirectory + 'oiti/single_chevron_left_white.png';
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
    } else if (theme === 'Pseudo-Fullscreen') {
      const primaryColor = 'rgb(43, 43, 43)'; // preto
      const secondaryColor = 'rgb(59, 195, 113)'; // verde
      const backgroundColor = 'rgb(238, 246, 248)'; // branco
      const font = "Futura,'Trebuchet MS',Arial,sans-serif";

      var activityIndicatorSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      activityIndicatorSVG.setAttribute('viewBox', '0 0 52 52');
      activityIndicatorSVG.classList.add(
        'pseudo-fullscreen-activity-indicator-svg'
      );
      activityIndicatorSVG.innerHTML =
        "<circle class='path' cx='26' cy='26' r='22'></circle>";

      var uploadActivityIndicatorSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      uploadActivityIndicatorSVG.setAttribute('viewBox', '0 0 52 52');
      uploadActivityIndicatorSVG.classList.add(
        'pseudo-fullscreen-activity-indicator-svg'
      );
      uploadActivityIndicatorSVG.innerHTML =
        "<circle class='path' cx='26' cy='26' r='22'></circle>";

      var successResultAnimationSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      successResultAnimationSVG.setAttribute('viewBox', '0 0 52 52');
      successResultAnimationSVG.classList.add('pseudo-fullscreen-success-svg');
      successResultAnimationSVG.innerHTML =
        "<circle class='circlePath' cx='26' cy='26' r='22'></circle><path class='checkmarkPath' d='M14.1 27.2l7.1 7.2 16.7-16.8'></path>";

      var unsuccessResultAnimationSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      unsuccessResultAnimationSVG.setAttribute('viewBox', '0 0 52 52');
      unsuccessResultAnimationSVG.classList.add(
        'pseudo-fullscreen-unsuccess-svg'
      );
      unsuccessResultAnimationSVG.innerHTML =
        "<circle class='circlePath' cx='26' cy='26' r='22'></circle><line class='crossPath1' x1='18' y1='18' x2='34' y2='34'></line><line class='crossPath2' x1='34' y1='18' x2='18' y2='34'></line>";

      // Personalização da Animação de Carregamento Inicial
      currentCustomization.initialLoadingAnimationCustomization.customAnimation =
        activityIndicatorSVG;
      currentCustomization.initialLoadingAnimationCustomization.animationRelativeScale = 1.0;
      currentCustomization.initialLoadingAnimationCustomization.backgroundColor =
        primaryColor;
      currentCustomization.initialLoadingAnimationCustomization.foregroundColor =
        backgroundColor;
      currentCustomization.initialLoadingAnimationCustomization.messageTextColor =
        primaryColor;
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
      currentCustomization.guidanceCustomization.foregroundColor = primaryColor;
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
        themeResourceDirectory + 'pseudo-fullscreen/camera_shutter_black.png';
      // Personalização de digitalização de ID
      currentCustomization.idScanCustomization.showSelectionScreenDocumentImage =
        true;
      currentCustomization.idScanCustomization.selectionScreenDocumentImage =
        themeResourceDirectory + 'pseudo-fullscreen/document_offblack.png';
      currentCustomization.idScanCustomization[
        'showSelectionScreenBrandingImage'
      ] = false;
      currentCustomization.idScanCustomization['selectionScreenBrandingImage'] =
        '';
      currentCustomization.idScanCustomization.selectionScreenBackgroundColors =
        backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenBackgroundColors =
        backgroundColor;
      currentCustomization.idScanCustomization.captureScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.reviewScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.selectionScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.headerFont = font;
      currentCustomization.idScanCustomization.subtextFont = font;
      currentCustomization.idScanCustomization.buttonFont = font;
      currentCustomization.idScanCustomization.buttonTextNormalColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentCustomization.idScanCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundHighlightColor =
        'rgb(86, 86, 86)';
      currentCustomization.idScanCustomization.buttonTextDisabledColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundDisabledColor =
        primaryColor;
      currentCustomization.idScanCustomization.buttonBorderColor =
        'transparent';
      currentCustomization.idScanCustomization.buttonBorderWidth = '0px';
      currentCustomization.idScanCustomization.buttonCornerRadius = '20px';
      currentCustomization.idScanCustomization.captureScreenTextBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor =
        primaryColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderWidth =
        '2px';
      currentCustomization.idScanCustomization.captureScreenTextBackgroundCornerRadius =
        '5px';
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor =
        primaryColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderWidth =
        '2px';
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderCornerRadius =
        '5px';
      currentCustomization.idScanCustomization.captureScreenBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.captureFrameStrokeColor =
        primaryColor;
      currentCustomization.idScanCustomization.captureFrameStrokeWidth = '2px';
      currentCustomization.idScanCustomization.captureFrameCornerRadius =
        '12px';
      // Personalização da tela de confirmação de OCR
      currentCustomization.ocrConfirmationCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor =
        secondaryColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineWidth =
        '2px';
      currentCustomization.ocrConfirmationCustomization.mainHeaderFont = font;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderFont =
        font;
      currentCustomization.ocrConfirmationCustomization.fieldLabelFont = font;
      currentCustomization.ocrConfirmationCustomization.fieldValueFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderFont =
        font;
      currentCustomization.ocrConfirmationCustomization.mainHeaderTextColor =
        secondaryColor;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldLabelTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldValueTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor =
        'rgba(59, 195, 113, 0.4)';
      currentCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor =
        'transparent';
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderColor =
        secondaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderWidth =
        '2px';
      currentCustomization.ocrConfirmationCustomization.inputFieldCornerRadius =
        '0px';
      currentCustomization.ocrConfirmationCustomization.showInputFieldBottomBorderOnly =
        true;
      currentCustomization.ocrConfirmationCustomization.buttonFont = font;
      currentCustomization.ocrConfirmationCustomization.buttonTextNormalColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor =
        'rgb(86, 86, 86)';
      currentCustomization.ocrConfirmationCustomization.buttonTextDisabledColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonBorderColor =
        'transparent';
      currentCustomization.ocrConfirmationCustomization.buttonBorderWidth =
        '0px';
      currentCustomization.ocrConfirmationCustomization.buttonCornerRadius =
        '20px';
      // Personalização da tela de resultados
      currentCustomization.resultScreenCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.resultScreenCustomization.foregroundColor =
        primaryColor;
      currentCustomization.resultScreenCustomization.messageFont = font;
      currentCustomization.resultScreenCustomization.activityIndicatorColor =
        primaryColor;
      currentCustomization.resultScreenCustomization.customActivityIndicatorImage =
        themeResourceDirectory +
        'pseudo-fullscreen/activity_indicator_faded_black.png';
      currentCustomization.resultScreenCustomization.customActivityIndicatorRotationInterval =
        '0.8s';
      currentCustomization.resultScreenCustomization.customActivityIndicatorAnimation =
        uploadActivityIndicatorSVG;
      currentCustomization.resultScreenCustomization.resultAnimationBackgroundColor =
        secondaryColor;
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
        secondaryColor;
      currentCustomization.feedbackCustomization.textColor = backgroundColor;
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
        themeResourceDirectory +
        'pseudo-fullscreen/single_chevron_left_black.png';
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
        primaryColor;
      // SubTítulo da Tela Estou Pronto
      currentCustomization.guidanceCustomization.readyScreenSubtextFont = font;
      currentCustomization.guidanceCustomization.readyScreenSubtextTextColor =
        '#565656';
      // Título da tela Tentar Novamente
      currentCustomization.guidanceCustomization.retryScreenHeaderFont = font;
      currentCustomization.guidanceCustomization.retryScreenHeaderTextColor =
        primaryColor;
      // SubTítulo da tela Tentar Novamente
      currentCustomization.guidanceCustomization.retryScreenSubtextFont = font;
      currentCustomization.guidanceCustomization.retryScreenSubtextTextColor =
        '#565656';
      // Customização da marca d'água de segurança
      currentCustomization.securityWatermarkCustomization.setSecurityWatermarkImage(
        FaceTecSDK.FaceTecSecurityWatermarkImage.FaceTec
      );
    } else if (theme === 'Well-Rounded') {
      const primaryColor = 'rgb(9, 181, 163)'; // verde
      const backgroundColor = 'white';
      const font = "'Source Sans Pro', Helvetica, sans-serif";

      var successResultAnimationSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      successResultAnimationSVG.setAttribute('viewBox', '0 0 52 52');
      successResultAnimationSVG.classList.add('well-rounded-success-svg');
      successResultAnimationSVG.innerHTML =
        "<circle class='circlePath' cx='26' cy='26' r='19'></circle><path class='checkmarkPath' d='M16.1 27.7l5.1 6.2 13.7-13.3'></path>";

      var unsuccessResultAnimationSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      unsuccessResultAnimationSVG.setAttribute('viewBox', '0 0 52 52');
      unsuccessResultAnimationSVG.classList.add('well-rounded-unsuccess-svg');
      unsuccessResultAnimationSVG.innerHTML =
        "<circle class='circlePath' cx='26' cy='26' r='19'></circle><line class='crossPath1' x1='18' y1='18' x2='34' y2='34'></line><line class='crossPath2' x1='34' y1='18' x2='18' y2='34'></line>";

      var activityIndicatorSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      activityIndicatorSVG.setAttribute('viewBox', '0 0 52 52');
      activityIndicatorSVG.classList.add('well-rounded-activity-indicator-svg');
      activityIndicatorSVG.innerHTML =
        "<circle class='circleTrackPath' cx='26' cy='26' r='19'/><circle class='circleFillPath' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='2s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite'/></circle>";

      var uploadActivityIndicatorSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      uploadActivityIndicatorSVG.setAttribute('viewBox', '0 0 52 52');
      uploadActivityIndicatorSVG.classList.add(
        'well-rounded-activity-indicator-svg'
      );
      uploadActivityIndicatorSVG.innerHTML =
        "<circle class='circleTrackPath' cx='26' cy='26' r='19'/><circle class='circleFillPath' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='2s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite'/></circle>";

      // Personalização da Animação de Carregamento Inicial
      currentCustomization.initialLoadingAnimationCustomization.customAnimation =
        activityIndicatorSVG;
      currentCustomization.initialLoadingAnimationCustomization.animationRelativeScale = 2.0;
      currentCustomization.initialLoadingAnimationCustomization.backgroundColor =
        'transparent';
      currentCustomization.initialLoadingAnimationCustomization.foregroundColor =
        backgroundColor;
      currentCustomization.initialLoadingAnimationCustomization.messageTextColor =
        backgroundColor;
      currentCustomization.initialLoadingAnimationCustomization.messageFont =
        font;
      // Personalização de sobreposição
      currentCustomization.overlayCustomization.backgroundColor = 'transparent';
      currentCustomization.overlayCustomization.showBrandingImage = false;
      currentCustomization.overlayCustomization.brandingImage = '';
      // Personalização de Orientação
      currentCustomization.guidanceCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.guidanceCustomization.foregroundColor = primaryColor;
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
        'rgb(49, 221, 203)';
      currentCustomization.guidanceCustomization.buttonTextDisabledColor =
        'rgb(215, 215, 215)';
      currentCustomization.guidanceCustomization.buttonBackgroundDisabledColor =
        'rgb(148, 184, 180)';
      currentCustomization.guidanceCustomization.buttonBorderColor =
        'transparent';
      currentCustomization.guidanceCustomization.buttonBorderWidth = '0px';
      currentCustomization.guidanceCustomization.buttonCornerRadius = '20px';
      currentCustomization.guidanceCustomization.readyScreenOvalFillColor =
        'transparent';
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
        [];
      currentCustomization.guidanceCustomization.retryScreenSlideshowInterval =
        '1500ms';
      currentCustomization.guidanceCustomization.enableRetryScreenSlideshowShuffle =
        true;
      currentCustomization.guidanceCustomization.cameraPermissionsScreenImage =
        themeResourceDirectory + 'well-rounded/camera_green.png';
      // Personalização de digitalização de ID
      currentCustomization.idScanCustomization.showSelectionScreenDocumentImage =
        true;
      currentCustomization.idScanCustomization.selectionScreenDocumentImage =
        themeResourceDirectory + 'well-rounded/document_green.png';
      currentCustomization.idScanCustomization[
        'showSelectionScreenBrandingImage'
      ] = false;
      currentCustomization.idScanCustomization['selectionScreenBrandingImage'] =
        '';
      currentCustomization.idScanCustomization.selectionScreenBackgroundColors =
        backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenBackgroundColors =
        backgroundColor;
      currentCustomization.idScanCustomization.captureScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.reviewScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.selectionScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.headerFont = font;
      currentCustomization.idScanCustomization.subtextFont = font;
      currentCustomization.idScanCustomization.buttonFont = font;
      currentCustomization.idScanCustomization.buttonTextNormalColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentCustomization.idScanCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundHighlightColor =
        'rgb(49, 221, 203)';
      currentCustomization.idScanCustomization.buttonTextDisabledColor =
        'rgb(215, 215, 215)';
      currentCustomization.idScanCustomization.buttonBackgroundDisabledColor =
        'rgb(0, 141, 123)';
      currentCustomization.idScanCustomization.buttonBorderColor =
        'transparent';
      currentCustomization.idScanCustomization.buttonBorderWidth = '0px';
      currentCustomization.idScanCustomization.buttonCornerRadius = '20px';
      currentCustomization.idScanCustomization.captureScreenTextBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor =
        primaryColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderWidth =
        '2px';
      currentCustomization.idScanCustomization.captureScreenTextBackgroundCornerRadius =
        '5px';
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor =
        primaryColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderWidth =
        '2px';
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderCornerRadius =
        '5px';
      currentCustomization.idScanCustomization.captureScreenBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.captureFrameStrokeColor =
        primaryColor;
      currentCustomization.idScanCustomization.captureFrameStrokeWidth = '2px';
      currentCustomization.idScanCustomization.captureFrameCornerRadius =
        '12px';
      // Personalização da tela de confirmação de OCR
      currentCustomization.ocrConfirmationCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineWidth =
        '2px';
      currentCustomization.ocrConfirmationCustomization.mainHeaderFont = font;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderFont =
        font;
      currentCustomization.ocrConfirmationCustomization.fieldLabelFont = font;
      currentCustomization.ocrConfirmationCustomization.fieldValueFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderFont =
        font;
      currentCustomization.ocrConfirmationCustomization.mainHeaderTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldLabelTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldValueTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor =
        'rgba(9, 181, 163, 0.4)';
      currentCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor =
        'transparent';
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderWidth =
        '1px';
      currentCustomization.ocrConfirmationCustomization.inputFieldCornerRadius =
        '15px';
      currentCustomization.ocrConfirmationCustomization.showInputFieldBottomBorderOnly =
        false;
      currentCustomization.ocrConfirmationCustomization.buttonFont = font;
      currentCustomization.ocrConfirmationCustomization.buttonTextNormalColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor =
        'rgb(49, 221, 203)';
      currentCustomization.ocrConfirmationCustomization.buttonTextDisabledColor =
        'rgb(215, 215, 215)';
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor =
        'rgb(0, 141, 123)';
      currentCustomization.ocrConfirmationCustomization.buttonBorderColor =
        'transparent';
      currentCustomization.ocrConfirmationCustomization.buttonBorderWidth =
        '0px';
      currentCustomization.ocrConfirmationCustomization.buttonCornerRadius =
        '20px';
      // Personalização da tela de resultados
      currentCustomization.resultScreenCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.resultScreenCustomization.foregroundColor =
        primaryColor;
      currentCustomization.resultScreenCustomization.messageFont = font;
      currentCustomization.resultScreenCustomization.activityIndicatorColor =
        primaryColor;
      currentCustomization.resultScreenCustomization.customActivityIndicatorImage =
        '';
      currentCustomization.resultScreenCustomization.customActivityIndicatorRotationInterval =
        '1s';
      currentCustomization.resultScreenCustomization.customActivityIndicatorAnimation =
        uploadActivityIndicatorSVG;
      currentCustomization.resultScreenCustomization.resultAnimationBackgroundColor =
        'transparent';
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
        false;
      currentCustomization.resultScreenCustomization.uploadProgressTrackColor =
        'rgba(0, 0, 0, 0.2)';
      currentCustomization.resultScreenCustomization.uploadProgressFillColor =
        primaryColor;
      currentCustomization.resultScreenCustomization.animationRelativeScale = 2.0;
      // Personalização de comentários
      currentCustomization.feedbackCustomization.backgroundColor = primaryColor;
      currentCustomization.feedbackCustomization.textColor = backgroundColor;
      currentCustomization.feedbackCustomization.textFont = font;
      currentCustomization.feedbackCustomization.cornerRadius = '5px';
      currentCustomization.feedbackCustomization.shadow =
        '0px 2px 8px 2px rgb(0, 0, 0, 0.4)';
      // Personalização da moldura
      currentCustomization.frameCustomization.backgroundColor = backgroundColor;
      currentCustomization.frameCustomization.borderColor = primaryColor;
      currentCustomization.frameCustomization.borderWidth = '2px';
      currentCustomization.frameCustomization.borderCornerRadius = '20px';
      currentCustomization.frameCustomization.shadow =
        '0px 2px 8px 2px rgb(0, 0, 0, 0.4)';
      // Personalização da área Oval
      currentCustomization.ovalCustomization.strokeColor = primaryColor;
      currentCustomization.ovalCustomization.progressColor1 = primaryColor;
      currentCustomization.ovalCustomization.progressColor2 = primaryColor;
      // Customização do Botão Cancelar
      currentCustomization.cancelButtonCustomization.customImage =
        themeResourceDirectory + 'well-rounded/cancel_round_green.png';
      currentCustomization.cancelButtonCustomization.location =
        FaceTecSDK.FaceTecCancelButtonLocation.TopLeft;
    } else if (theme === 'Bitcoin Exchange') {
      const primaryColor = 'rgb(247, 150, 52)'; // laranja
      const secondaryColor = 'rgb(255, 255, 30)'; // amarelo
      const backgroundColor = 'rgb(66, 66, 66)'; // cinza escuro
      const font = "'Source Sans Pro', Helvetica, sans-serif";

      // Personalização da Animação de Carregamento Inicial
      currentCustomization.initialLoadingAnimationCustomization.customAnimation =
        null;
      currentCustomization.initialLoadingAnimationCustomization.animationRelativeScale = 1.0;
      currentCustomization.initialLoadingAnimationCustomization.backgroundColor =
        backgroundColor;
      currentCustomization.initialLoadingAnimationCustomization.foregroundColor =
        primaryColor;
      currentCustomization.initialLoadingAnimationCustomization.messageTextColor =
        backgroundColor;
      currentCustomization.initialLoadingAnimationCustomization.messageFont =
        font;
      // Personalização de sobreposição
      currentCustomization.overlayCustomization.backgroundColor = 'transparent';
      currentCustomization.overlayCustomization.showBrandingImage = true;
      currentCustomization.overlayCustomization.brandingImage =
        themeResourceDirectory + 'bitcoin-exchange/bitcoin_exchange_logo.png';
      // Personalização de Orientação
      currentCustomization.guidanceCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.guidanceCustomization.foregroundColor = primaryColor;
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
        primaryColor;
      currentCustomization.guidanceCustomization.buttonTextDisabledColor =
        'rgb(117,117,117)';
      currentCustomization.guidanceCustomization.buttonBackgroundDisabledColor =
        'rgb(191,174,156)';
      currentCustomization.guidanceCustomization.buttonBorderColor =
        'transparent';
      currentCustomization.guidanceCustomization.buttonBorderWidth = '0px';
      currentCustomization.guidanceCustomization.buttonCornerRadius = '5px';
      currentCustomization.guidanceCustomization.readyScreenOvalFillColor =
        'transparent';
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundColor =
        backgroundColor;
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundCornerRadius =
        '5px';
      currentCustomization.guidanceCustomization.retryScreenImageBorderColor =
        primaryColor;
      currentCustomization.guidanceCustomization.retryScreenImageBorderWidth =
        '2px';
      currentCustomization.guidanceCustomization.retryScreenImageCornerRadius =
        '5px';
      currentCustomization.guidanceCustomization.retryScreenOvalStrokeColor =
        primaryColor;
      currentCustomization.guidanceCustomization.retryScreenSlideshowImages =
        [];
      currentCustomization.guidanceCustomization.retryScreenSlideshowInterval =
        '1500ms';
      currentCustomization.guidanceCustomization.enableRetryScreenSlideshowShuffle =
        true;
      currentCustomization.guidanceCustomization.cameraPermissionsScreenImage =
        themeResourceDirectory + 'bitcoin-exchange/camera_orange.png';
      // Personalização de digitalização de ID
      currentCustomization.idScanCustomization.showSelectionScreenDocumentImage =
        true;
      currentCustomization.idScanCustomization.selectionScreenDocumentImage =
        themeResourceDirectory + 'bitcoin-exchange/document_orange.png';
      currentCustomization.idScanCustomization[
        'showSelectionScreenBrandingImage'
      ] = false;
      currentCustomization.idScanCustomization['selectionScreenBrandingImage'] =
        '';
      currentCustomization.idScanCustomization.selectionScreenBackgroundColors =
        backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenBackgroundColors =
        backgroundColor;
      currentCustomization.idScanCustomization.captureScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.reviewScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.selectionScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.headerFont = font;
      currentCustomization.idScanCustomization.subtextFont = font;
      currentCustomization.idScanCustomization.buttonFont = font;
      currentCustomization.idScanCustomization.buttonTextNormalColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentCustomization.idScanCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundHighlightColor =
        primaryColor;
      currentCustomization.idScanCustomization.buttonTextDisabledColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundDisabledColor =
        primaryColor;
      currentCustomization.idScanCustomization.buttonBorderColor =
        'transparent';
      currentCustomization.idScanCustomization.buttonBorderWidth = '0px';
      currentCustomization.idScanCustomization.buttonCornerRadius = '5px';
      currentCustomization.idScanCustomization.captureScreenTextBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor =
        primaryColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderWidth =
        '0px';
      currentCustomization.idScanCustomization.captureScreenTextBackgroundCornerRadius =
        '8px';
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor =
        primaryColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderWidth =
        '0px';
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderCornerRadius =
        '8px';
      currentCustomization.idScanCustomization.captureScreenBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.captureFrameStrokeColor =
        primaryColor;
      currentCustomization.idScanCustomization.captureFrameStrokeWidth = '2px';
      currentCustomization.idScanCustomization.captureFrameCornerRadius =
        '12px';
      // Personalização da tela de confirmação de OCR
      currentCustomization.ocrConfirmationCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor =
        secondaryColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineWidth =
        '1px';
      currentCustomization.ocrConfirmationCustomization.mainHeaderFont = font;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderFont =
        font;
      currentCustomization.ocrConfirmationCustomization.fieldLabelFont = font;
      currentCustomization.ocrConfirmationCustomization.fieldValueFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderFont =
        font;
      currentCustomization.ocrConfirmationCustomization.mainHeaderTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldLabelTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldValueTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor =
        'rgba(247, 150, 52, 0.4)';
      currentCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor =
        'transparent';
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderWidth =
        '1px';
      currentCustomization.ocrConfirmationCustomization.inputFieldCornerRadius =
        '5px';
      currentCustomization.ocrConfirmationCustomization.showInputFieldBottomBorderOnly =
        false;
      currentCustomization.ocrConfirmationCustomization.buttonFont = font;
      currentCustomization.ocrConfirmationCustomization.buttonTextNormalColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextDisabledColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonBorderColor =
        'transparent';
      currentCustomization.ocrConfirmationCustomization.buttonBorderWidth =
        '0px';
      currentCustomization.ocrConfirmationCustomization.buttonCornerRadius =
        '5px';
      // Personalização da tela de resultados
      currentCustomization.resultScreenCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.resultScreenCustomization.foregroundColor =
        primaryColor;
      currentCustomization.resultScreenCustomization.messageFont = font;
      currentCustomization.resultScreenCustomization.activityIndicatorColor =
        primaryColor;
      currentCustomization.resultScreenCustomization.customActivityIndicatorImage =
        themeResourceDirectory +
        'bitcoin-exchange/activity_indicator_orange.png';
      currentCustomization.resultScreenCustomization.customActivityIndicatorRotationInterval =
        '1.5s';
      currentCustomization.resultScreenCustomization.customActivityIndicatorAnimation =
        null;
      currentCustomization.resultScreenCustomization.resultAnimationBackgroundColor =
        primaryColor;
      currentCustomization.resultScreenCustomization.resultAnimationForegroundColor =
        backgroundColor;
      currentCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage =
        '';
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage =
        '';
      currentCustomization.resultScreenCustomization.customResultAnimationSuccess =
        null;
      currentCustomization.resultScreenCustomization.customResultAnimationUnsuccess =
        null;
      currentCustomization.resultScreenCustomization.showUploadProgressBar =
        true;
      currentCustomization.resultScreenCustomization.uploadProgressTrackColor =
        'rgba(0, 0, 0, 0.2)';
      currentCustomization.resultScreenCustomization.uploadProgressFillColor =
        primaryColor;
      currentCustomization.resultScreenCustomization.animationRelativeScale = 1.0;
      // Personalização de comentários
      currentCustomization.feedbackCustomization.backgroundColor = primaryColor;
      currentCustomization.feedbackCustomization.textColor = backgroundColor;
      currentCustomization.feedbackCustomization.textFont = font;
      currentCustomization.feedbackCustomization.cornerRadius = '5px';
      currentCustomization.feedbackCustomization.shadow =
        '0px 3px 10px rgba(66, 66, 66, 0.6)';
      // Personalização da moldura
      currentCustomization.frameCustomization.backgroundColor = backgroundColor;
      currentCustomization.frameCustomization.borderColor = secondaryColor;
      currentCustomization.frameCustomization.borderWidth = '0px';
      currentCustomization.frameCustomization.borderCornerRadius = '5px';
      currentCustomization.frameCustomization.shadow =
        '0px 3px 10px rgba(66, 66, 66, 0.6)';
      // Personalização da área Oval
      currentCustomization.ovalCustomization.strokeColor = primaryColor;
      currentCustomization.ovalCustomization.progressColor1 = secondaryColor;
      currentCustomization.ovalCustomization.progressColor2 = secondaryColor;
      // Customização do Botão Cancelar
      currentCustomization.cancelButtonCustomization.customImage =
        themeResourceDirectory +
        'bitcoin-exchange/single_chevron_left_orange.png';
      currentCustomization.cancelButtonCustomization.location =
        FaceTecSDK.FaceTecCancelButtonLocation.TopLeft;

      // Personalização de Orientação -- Text Style Overrides
      // Título da Tela Estou Pronto
      currentCustomization.guidanceCustomization.readyScreenHeaderFont = font;
      currentCustomization.guidanceCustomization.readyScreenHeaderTextColor =
        primaryColor;
      // SubTítulo da Tela Estou Pronto
      currentCustomization.guidanceCustomization.readyScreenSubtextFont = font;
      currentCustomization.guidanceCustomization.readyScreenSubtextTextColor =
        secondaryColor;
      // Título da tela Tentar Novamente
      currentCustomization.guidanceCustomization.retryScreenHeaderFont = font;
      currentCustomization.guidanceCustomization.retryScreenHeaderTextColor =
        primaryColor;
      // SubTítulo da tela Tentar Novamente
      currentCustomization.guidanceCustomization.retryScreenSubtextFont = font;
      currentCustomization.guidanceCustomization.retryScreenSubtextTextColor =
        secondaryColor;
    } else if (theme === 'eKYC') {
      const primaryColor = 'rgb(237, 28, 36)'; // red
      const secondaryColor = 'black';
      const backgroundColor = 'white';
      const font = "'Source Sans Pro', Helvetica, sans-serif";

      var activityIndicatorSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      activityIndicatorSVG.setAttribute('viewBox', '0 0 52 52');
      activityIndicatorSVG.classList.add('ekyc-activity-indicator-svg');
      activityIndicatorSVG.innerHTML =
        "<defs><filter id='goo'><feGaussianBlur in='SourceGraphic' stdDeviation='2' result='blur' /><feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9' result='goo' /><feComposite in='SourceGraphic' in2='goo' operator='atop'/></filter></defs><g filter='url(#goo)'><g transform='translate(26 26)'><circle class='circlePath1' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' attributeType='XML' dur='1s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath2' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1.2s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' attributeType='XML' dur='1.2s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1.2s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath3' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1.5s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' dur='1.5s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1.5s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath4' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='2s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' dur='2s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='2s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g> </g>";

      var uploadActivityIndicatorSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      uploadActivityIndicatorSVG.setAttribute('viewBox', '0 0 52 52');
      uploadActivityIndicatorSVG.classList.add('ekyc-activity-indicator-svg');
      uploadActivityIndicatorSVG.innerHTML =
        "<defs><filter id='goo'><feGaussianBlur in='SourceGraphic' stdDeviation='2' result='blur' /><feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9' result='goo' /><feComposite in='SourceGraphic' in2='goo' operator='atop'/></filter></defs><g filter='url(#goo)'><g transform='translate(26 26)'><circle class='circlePath1' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' attributeType='XML' dur='1s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath2' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1.2s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' attributeType='XML' dur='1.2s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1.2s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath3' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1.5s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' dur='1.5s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1.5s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath4' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='2s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' dur='2s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='2s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g> </g>";

      var successResultAnimationSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      successResultAnimationSVG.setAttribute('viewBox', '0 0 52 52');
      successResultAnimationSVG.classList.add('ekyc-success-svg');
      successResultAnimationSVG.innerHTML =
        "<path class='checkmarkPath__back' d='M14.1 27.2l7.1 7.2 16.7-16.8'></path><path class='checkmarkPath__front' d='M14.1 27.2l7.1 7.2 16.7-16.8'></path>";

      var unsuccessResultAnimationSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      unsuccessResultAnimationSVG.setAttribute('viewBox', '0 0 52 52');
      unsuccessResultAnimationSVG.classList.add('ekyc-unsuccess-svg');
      unsuccessResultAnimationSVG.innerHTML =
        "<line class='crossPath1__back' x1='18' y1='18' x2='34' y2='34'></line><line class='crossPath2__back' x1='34' y1='18' x2='18' y2='34'></line><line class='crossPath1__front' x1='18' y1='18' x2='34' y2='34'></line><line class='crossPath2__front' x1='34' y1='18' x2='18' y2='34'></line>";

      // Personalização da Animação de Carregamento Inicial
      currentCustomization.initialLoadingAnimationCustomization.customAnimation =
        activityIndicatorSVG;
      currentCustomization.initialLoadingAnimationCustomization.animationRelativeScale = 1.0;
      currentCustomization.initialLoadingAnimationCustomization.backgroundColor =
        'transparent';
      currentCustomization.initialLoadingAnimationCustomization.foregroundColor =
        primaryColor;
      currentCustomization.initialLoadingAnimationCustomization.messageTextColor =
        secondaryColor;
      currentCustomization.initialLoadingAnimationCustomization.messageFont =
        font;
      // Personalização de sobreposição
      currentCustomization.overlayCustomization.backgroundColor = 'transparent';
      currentCustomization.overlayCustomization.showBrandingImage = true;
      currentCustomization.overlayCustomization.brandingImage =
        themeResourceDirectory + 'ekyc/ekyc_logo.png';
      // Personalização de Orientação
      currentCustomization.guidanceCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.guidanceCustomization.foregroundColor =
        secondaryColor;
      currentCustomization.guidanceCustomization.headerFont = font;
      currentCustomization.guidanceCustomization.subtextFont = font;
      currentCustomization.guidanceCustomization.buttonFont = font;
      currentCustomization.guidanceCustomization.buttonTextNormalColor =
        primaryColor;
      currentCustomization.guidanceCustomization.buttonBackgroundNormalColor =
        backgroundColor;
      currentCustomization.guidanceCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentCustomization.guidanceCustomization.buttonBackgroundHighlightColor =
        primaryColor;
      currentCustomization.guidanceCustomization.buttonTextDisabledColor =
        'rgba(237, 28, 36, 0.3)';
      currentCustomization.guidanceCustomization.buttonBackgroundDisabledColor =
        backgroundColor;
      currentCustomization.guidanceCustomization.buttonBorderColor =
        primaryColor;
      currentCustomization.guidanceCustomization.buttonBorderWidth = '2px';
      currentCustomization.guidanceCustomization.buttonCornerRadius = '8px';
      currentCustomization.guidanceCustomization.readyScreenOvalFillColor =
        'transparent';
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundColor =
        backgroundColor;
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundCornerRadius =
        '3px';
      currentCustomization.guidanceCustomization.retryScreenImageBorderColor =
        primaryColor;
      currentCustomization.guidanceCustomization.retryScreenImageBorderWidth =
        '2px';
      currentCustomization.guidanceCustomization.retryScreenImageCornerRadius =
        '3px';
      currentCustomization.guidanceCustomization.retryScreenOvalStrokeColor =
        primaryColor;
      currentCustomization.guidanceCustomization.retryScreenSlideshowImages =
        retryScreenSlideshowImages;
      currentCustomization.guidanceCustomization.retryScreenSlideshowInterval =
        '1500ms';
      currentCustomization.guidanceCustomization.enableRetryScreenSlideshowShuffle =
        true;
      currentCustomization.guidanceCustomization.cameraPermissionsScreenImage =
        themeResourceDirectory + 'ekyc/camera_red.png';
      // Personalização de digitalização de ID
      currentCustomization.idScanCustomization.showSelectionScreenDocumentImage =
        false;
      currentCustomization.idScanCustomization.selectionScreenDocumentImage =
        '';
      currentCustomization.idScanCustomization[
        'showSelectionScreenBrandingImage'
      ] = false;
      currentCustomization.idScanCustomization['selectionScreenBrandingImage'] =
        '';
      currentCustomization.idScanCustomization.selectionScreenBackgroundColors =
        backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenBackgroundColors =
        backgroundColor;
      currentCustomization.idScanCustomization.captureScreenForegroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenForegroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.selectionScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.headerFont = font;
      currentCustomization.idScanCustomization.subtextFont = font;
      currentCustomization.idScanCustomization.buttonFont = font;
      currentCustomization.idScanCustomization.buttonTextNormalColor =
        primaryColor;
      currentCustomization.idScanCustomization.buttonBackgroundNormalColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundHighlightColor =
        primaryColor;
      currentCustomization.idScanCustomization.buttonTextDisabledColor =
        'rgba(237, 28, 36, 0.3)';
      currentCustomization.idScanCustomization.buttonBackgroundDisabledColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBorderColor = primaryColor;
      currentCustomization.idScanCustomization.buttonBorderWidth = '2px';
      currentCustomization.idScanCustomization.buttonCornerRadius = '8px';
      currentCustomization.idScanCustomization.captureScreenTextBackgroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor =
        primaryColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderWidth =
        '0px';
      currentCustomization.idScanCustomization.captureScreenTextBackgroundCornerRadius =
        '2px';
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor =
        primaryColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderWidth =
        '0px';
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderCornerRadius =
        '2px';
      currentCustomization.idScanCustomization.captureScreenBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.captureFrameStrokeColor =
        primaryColor;
      currentCustomization.idScanCustomization.captureFrameStrokeWidth = '2px';
      currentCustomization.idScanCustomization.captureFrameCornerRadius =
        '12px';
      // Personalização da tela de confirmação de OCR
      currentCustomization.ocrConfirmationCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor =
        secondaryColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineWidth =
        '2px';
      currentCustomization.ocrConfirmationCustomization.mainHeaderFont = font;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderFont =
        font;
      currentCustomization.ocrConfirmationCustomization.fieldLabelFont = font;
      currentCustomization.ocrConfirmationCustomization.fieldValueFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderFont =
        font;
      currentCustomization.ocrConfirmationCustomization.mainHeaderTextColor =
        secondaryColor;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldLabelTextColor =
        secondaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldValueTextColor =
        secondaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldTextColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor =
        'rgba(255, 255, 255, 0.4)';
      currentCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor =
        secondaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderWidth =
        '0px';
      currentCustomization.ocrConfirmationCustomization.inputFieldCornerRadius =
        '8px';
      currentCustomization.ocrConfirmationCustomization.showInputFieldBottomBorderOnly =
        false;
      currentCustomization.ocrConfirmationCustomization.buttonFont = font;
      currentCustomization.ocrConfirmationCustomization.buttonTextNormalColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextDisabledColor =
        'rgba(237, 28, 36, 0.3)';
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBorderColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonBorderWidth =
        '2px';
      currentCustomization.ocrConfirmationCustomization.buttonCornerRadius =
        '8px';
      // Personalização da tela de resultados
      currentCustomization.resultScreenCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.resultScreenCustomization.foregroundColor =
        secondaryColor;
      currentCustomization.resultScreenCustomization.messageFont = font;
      currentCustomization.resultScreenCustomization.activityIndicatorColor =
        primaryColor;
      currentCustomization.resultScreenCustomization.customActivityIndicatorImage =
        '';
      currentCustomization.resultScreenCustomization.customActivityIndicatorRotationInterval =
        '1.5s';
      currentCustomization.resultScreenCustomization.customActivityIndicatorAnimation =
        uploadActivityIndicatorSVG;
      currentCustomization.resultScreenCustomization.resultAnimationBackgroundColor =
        'transparent';
      currentCustomization.resultScreenCustomization.resultAnimationForegroundColor =
        'transparent';
      currentCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage =
        '';
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage =
        '';
      currentCustomization.resultScreenCustomization.customResultAnimationSuccess =
        successResultAnimationSVG;
      currentCustomization.resultScreenCustomization.customResultAnimationUnsuccess =
        unsuccessResultAnimationSVG;
      currentCustomization.resultScreenCustomization.showUploadProgressBar =
        false;
      currentCustomization.resultScreenCustomization.uploadProgressTrackColor =
        'rgba(0, 0, 0, 0.2)';
      currentCustomization.resultScreenCustomization.uploadProgressFillColor =
        primaryColor;
      currentCustomization.resultScreenCustomization.animationRelativeScale = 1.0;
      // Personalização de comentários
      currentCustomization.feedbackCustomization.backgroundColor =
        secondaryColor;
      currentCustomization.feedbackCustomization.textColor = backgroundColor;
      currentCustomization.feedbackCustomization.textFont = font;
      currentCustomization.feedbackCustomization.cornerRadius = '3px';
      currentCustomization.feedbackCustomization.shadow =
        '0px 3px 6px 3px rgba(237, 28, 36, 0.7)';
      // Personalização da moldura
      currentCustomization.frameCustomization.backgroundColor = backgroundColor;
      currentCustomization.frameCustomization.borderColor = primaryColor;
      currentCustomization.frameCustomization.borderWidth = '2px';
      currentCustomization.frameCustomization.borderCornerRadius = '8px';
      currentCustomization.frameCustomization.shadow =
        '0px 3px 6px 3px rgba(237, 28, 36, 0.7)';
      // Personalização da área Oval
      currentCustomization.ovalCustomization.strokeColor = primaryColor;
      currentCustomization.ovalCustomization.progressColor1 =
        'rgba(237, 28, 36, 0.7)';
      currentCustomization.ovalCustomization.progressColor2 =
        'rgba(237, 28, 36, 0.7)';
      // Customização do Botão Cancelar
      currentCustomization.cancelButtonCustomization.customImage =
        themeResourceDirectory + 'ekyc/cancel_box_red.png';
      currentCustomization.cancelButtonCustomization.location =
        FaceTecSDK.FaceTecCancelButtonLocation.TopRight;
    } else if (theme === 'Sample Bank') {
      const primaryColor = 'white';
      const backgroundColor = 'rgb(29, 23, 79)'; // azul marinho
      const font = "'Source Sans Pro', Helvetica, sans-serif";

      // Personalização da Animação de Carregamento Inicial
      currentCustomization.initialLoadingAnimationCustomization.customAnimation =
        null;
      currentCustomization.initialLoadingAnimationCustomization.animationRelativeScale = 1.0;
      currentCustomization.initialLoadingAnimationCustomization.backgroundColor =
        backgroundColor;
      currentCustomization.initialLoadingAnimationCustomization.foregroundColor =
        primaryColor;
      currentCustomization.initialLoadingAnimationCustomization.messageTextColor =
        backgroundColor;
      currentCustomization.initialLoadingAnimationCustomization.messageFont =
        font;
      // Personalização de sobreposição
      currentCustomization.overlayCustomization.backgroundColor = 'transparent';
      currentCustomization.overlayCustomization.showBrandingImage = true;
      currentCustomization.overlayCustomization.brandingImage =
        themeResourceDirectory + 'sample-bank/sample_bank_logo.png';
      // Personalização de Orientação
      currentCustomization.guidanceCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.guidanceCustomization.foregroundColor = primaryColor;
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
        'rgba(255, 255, 255, 0.8)';
      currentCustomization.guidanceCustomization.buttonTextDisabledColor =
        'rgba(29, 23, 79, 0.3)';
      currentCustomization.guidanceCustomization.buttonBackgroundDisabledColor =
        primaryColor;
      currentCustomization.guidanceCustomization.buttonBorderColor =
        backgroundColor;
      currentCustomization.guidanceCustomization.buttonBorderWidth = '2px';
      currentCustomization.guidanceCustomization.buttonCornerRadius = '2px';
      currentCustomization.guidanceCustomization.readyScreenOvalFillColor =
        'transparent';
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundColor =
        backgroundColor;
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundCornerRadius =
        '2px';
      currentCustomization.guidanceCustomization.retryScreenImageBorderColor =
        primaryColor;
      currentCustomization.guidanceCustomization.retryScreenImageBorderWidth =
        '2px';
      currentCustomization.guidanceCustomization.retryScreenImageCornerRadius =
        '2px';
      currentCustomization.guidanceCustomization.retryScreenOvalStrokeColor =
        primaryColor;
      currentCustomization.guidanceCustomization.retryScreenSlideshowImages =
        retryScreenSlideshowImages;
      currentCustomization.guidanceCustomization.retryScreenSlideshowInterval =
        '1500ms';
      currentCustomization.guidanceCustomization.enableRetryScreenSlideshowShuffle =
        false;
      currentCustomization.guidanceCustomization.cameraPermissionsScreenImage =
        themeResourceDirectory + 'sample-bank/camera_white_navy.png';
      // Personalização de digitalização de ID
      currentCustomization.idScanCustomization.showSelectionScreenDocumentImage =
        false;
      currentCustomization.idScanCustomization.selectionScreenDocumentImage =
        '';
      currentCustomization.idScanCustomization[
        'showSelectionScreenBrandingImage'
      ] = false;
      currentCustomization.idScanCustomization['selectionScreenBrandingImage'] =
        '';
      currentCustomization.idScanCustomization.selectionScreenBackgroundColors =
        backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenBackgroundColors =
        backgroundColor;
      currentCustomization.idScanCustomization.captureScreenForegroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenForegroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.selectionScreenForegroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.headerFont = font;
      currentCustomization.idScanCustomization.subtextFont = font;
      currentCustomization.idScanCustomization.buttonFont = font;
      currentCustomization.idScanCustomization.buttonTextNormalColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentCustomization.idScanCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundHighlightColor =
        'rgba(255, 255, 255, 0.8)';
      currentCustomization.idScanCustomization.buttonTextDisabledColor =
        'rgba(29, 23, 79, 0.3)';
      currentCustomization.idScanCustomization.buttonBackgroundDisabledColor =
        primaryColor;
      currentCustomization.idScanCustomization.buttonBorderColor =
        backgroundColor;
      currentCustomization.idScanCustomization.buttonBorderWidth = '2px';
      currentCustomization.idScanCustomization.buttonCornerRadius = '2px';
      currentCustomization.idScanCustomization.captureScreenTextBackgroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor =
        backgroundColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderWidth =
        '2px';
      currentCustomization.idScanCustomization.captureScreenTextBackgroundCornerRadius =
        '2px';
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundColor =
        primaryColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor =
        backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderWidth =
        '2px';
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderCornerRadius =
        '2px';
      currentCustomization.idScanCustomization.captureScreenBackgroundColor =
        backgroundColor;
      currentCustomization.idScanCustomization.captureFrameStrokeColor =
        primaryColor;
      currentCustomization.idScanCustomization.captureFrameStrokeWidth = '2px';
      currentCustomization.idScanCustomization.captureFrameCornerRadius =
        '12px';
      // Personalização da tela de confirmação de OCR
      currentCustomization.ocrConfirmationCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineWidth =
        '2px';
      currentCustomization.ocrConfirmationCustomization.mainHeaderFont = font;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderFont =
        font;
      currentCustomization.ocrConfirmationCustomization.fieldLabelFont = font;
      currentCustomization.ocrConfirmationCustomization.fieldValueFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderFont =
        font;
      currentCustomization.ocrConfirmationCustomization.mainHeaderTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldLabelTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldValueTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldTextColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor =
        'rgba(29, 23, 79, 0.4)';
      currentCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor =
        'transparent';
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderWidth =
        '2px';
      currentCustomization.ocrConfirmationCustomization.inputFieldCornerRadius =
        '0px';
      currentCustomization.ocrConfirmationCustomization.showInputFieldBottomBorderOnly =
        true;
      currentCustomization.ocrConfirmationCustomization.buttonFont = font;
      currentCustomization.ocrConfirmationCustomization.buttonTextNormalColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor =
        'rgba(255, 255, 255, 0.8)';
      currentCustomization.ocrConfirmationCustomization.buttonTextDisabledColor =
        'rgba(29, 23, 79, 0.3)';
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor =
        primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonBorderColor =
        backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBorderWidth =
        '2px';
      currentCustomization.ocrConfirmationCustomization.buttonCornerRadius =
        '2px';
      // Personalização da tela de resultados
      currentCustomization.resultScreenCustomization.backgroundColors =
        backgroundColor;
      currentCustomization.resultScreenCustomization.foregroundColor =
        primaryColor;
      currentCustomization.resultScreenCustomization.messageFont = font;
      currentCustomization.resultScreenCustomization.activityIndicatorColor =
        primaryColor;
      currentCustomization.resultScreenCustomization.customActivityIndicatorImage =
        themeResourceDirectory + 'sample-bank/activity_indicator_white.png';
      currentCustomization.resultScreenCustomization.customActivityIndicatorRotationInterval =
        '1s';
      currentCustomization.resultScreenCustomization.customActivityIndicatorAnimation =
        null;
      currentCustomization.resultScreenCustomization.resultAnimationBackgroundColor =
        'transparent';
      currentCustomization.resultScreenCustomization.resultAnimationForegroundColor =
        primaryColor;
      currentCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage =
        themeResourceDirectory + 'sample-bank/reticle_white.png';
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage =
        themeResourceDirectory + 'sample-bank/reticle_white.png';
      currentCustomization.resultScreenCustomization.customResultAnimationSuccess =
        null;
      currentCustomization.resultScreenCustomization.customResultAnimationUnsuccess =
        null;
      currentCustomization.resultScreenCustomization.showUploadProgressBar =
        true;
      currentCustomization.resultScreenCustomization.uploadProgressTrackColor =
        'rgba(255, 255, 255, 0.2)';
      currentCustomization.resultScreenCustomization.uploadProgressFillColor =
        primaryColor;
      currentCustomization.resultScreenCustomization.animationRelativeScale = 1.0;
      // Personalização de comentários
      currentCustomization.feedbackCustomization.backgroundColor = primaryColor;
      currentCustomization.feedbackCustomization.textColor = backgroundColor;
      currentCustomization.feedbackCustomization.textFont = font;
      currentCustomization.feedbackCustomization.cornerRadius = '2px';
      currentCustomization.feedbackCustomization.shadow = 'none';
      // Personalização da moldura
      currentCustomization.frameCustomization.backgroundColor = backgroundColor;
      currentCustomization.frameCustomization.borderColor = backgroundColor;
      currentCustomization.frameCustomization.borderWidth = '2px';
      currentCustomization.frameCustomization.borderCornerRadius = '2px';
      currentCustomization.frameCustomization.shadow = 'none';
      // Personalização da área Oval
      currentCustomization.ovalCustomization.strokeColor = primaryColor;
      currentCustomization.ovalCustomization.progressColor1 =
        'rgba(255, 255, 255, 0.8)';
      currentCustomization.ovalCustomization.progressColor2 =
        'rgba(255, 255, 255, 0.8)';
      // Customização do Botão Cancelar
      currentCustomization.cancelButtonCustomization.customImage =
        themeResourceDirectory + 'sample-bank/cancel_white.png';
      currentCustomization.cancelButtonCustomization.location =
        FaceTecSDK.FaceTecCancelButtonLocation.TopLeft;
    }

    return currentCustomization;
  }

  function getLowLightCustomizationForTheme(
    theme: string
  ): FaceTecCustomization | null {
    var currentLowLightCustomization: FaceTecCustomization =
      getCustomizationForTheme(theme);

    const retryScreenSlideshowImages: string[] = [
      themeResourceDirectory + 'FaceTec_ideal_1.png',
      themeResourceDirectory + 'FaceTec_ideal_2.png',
      themeResourceDirectory + 'FaceTec_ideal_3.png',
      themeResourceDirectory + 'FaceTec_ideal_4.png',
      themeResourceDirectory + 'FaceTec_ideal_5.png',
    ];

    if (theme === 'Config Wizard Theme') {
      currentLowLightCustomization =
        Config.retrieveLowLightConfigurationWizardCustomization(FaceTecSDK);
    } else if (theme === 'Bitcoin Exchange') {
      const primaryColor = 'rgb(247, 150, 52)'; // laranja
      const secondaryColor = 'rgb(255, 255, 30)'; // amarelo
      const backgroundColor = 'rgb(66, 66, 66)'; // cinza escuro

      // Personalização de sobreposição
      currentLowLightCustomization.overlayCustomization.brandingImage =
        themeResourceDirectory + 'bitcoin-exchange/bitcoin_exchange_logo.png';
      // Personalização de Orientação
      currentLowLightCustomization.guidanceCustomization.foregroundColor =
        backgroundColor;
      currentLowLightCustomization.guidanceCustomization.buttonTextNormalColor =
        'white';
      currentLowLightCustomization.guidanceCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentLowLightCustomization.guidanceCustomization.buttonTextHighlightColor =
        'white';
      currentLowLightCustomization.guidanceCustomization.buttonBackgroundHighlightColor =
        primaryColor;
      currentLowLightCustomization.guidanceCustomization.buttonTextDisabledColor =
        'white';
      currentLowLightCustomization.guidanceCustomization.buttonBackgroundDisabledColor =
        primaryColor;
      currentLowLightCustomization.guidanceCustomization.buttonBorderColor =
        'transparent';
      currentLowLightCustomization.guidanceCustomization.readyScreenOvalFillColor =
        'transparent';
      currentLowLightCustomization.guidanceCustomization.readyScreenTextBackgroundColor =
        'white';
      currentLowLightCustomization.guidanceCustomization.retryScreenImageBorderColor =
        primaryColor;
      currentLowLightCustomization.guidanceCustomization.retryScreenOvalStrokeColor =
        primaryColor;
      currentLowLightCustomization.guidanceCustomization.retryScreenSlideshowImages =
        [];
      // Personalização de digitalização de ID
      currentLowLightCustomization.idScanCustomization.selectionScreenDocumentImage =
        themeResourceDirectory + 'bitcoin-exchange/document_grey.png';
      currentLowLightCustomization.idScanCustomization[
        'selectionScreenBrandingImage'
      ] = '';
      currentLowLightCustomization.idScanCustomization.captureScreenForegroundColor =
        primaryColor;
      currentLowLightCustomization.idScanCustomization.reviewScreenForegroundColor =
        primaryColor;
      currentLowLightCustomization.idScanCustomization.selectionScreenForegroundColor =
        primaryColor;
      currentLowLightCustomization.idScanCustomization.buttonTextNormalColor =
        'white';
      currentLowLightCustomization.idScanCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentLowLightCustomization.idScanCustomization.buttonTextHighlightColor =
        'white';
      currentLowLightCustomization.idScanCustomization.buttonBackgroundHighlightColor =
        primaryColor;
      currentLowLightCustomization.idScanCustomization.buttonTextDisabledColor =
        'white';
      currentLowLightCustomization.idScanCustomization.buttonBackgroundDisabledColor =
        primaryColor;
      currentLowLightCustomization.idScanCustomization.buttonBorderColor =
        'transparent';
      currentLowLightCustomization.idScanCustomization.captureScreenTextBackgroundColor =
        backgroundColor;
      currentLowLightCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor =
        'transparent';
      currentLowLightCustomization.idScanCustomization.reviewScreenTextBackgroundColor =
        backgroundColor;
      currentLowLightCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor =
        'transparent';
      currentLowLightCustomization.idScanCustomization.captureFrameStrokeColor =
        primaryColor;
      // Personalização da tela de resultados
      currentLowLightCustomization.resultScreenCustomization.foregroundColor =
        backgroundColor;
      currentLowLightCustomization.resultScreenCustomization.activityIndicatorColor =
        primaryColor;
      currentLowLightCustomization.resultScreenCustomization.customActivityIndicatorImage =
        themeResourceDirectory +
        'bitcoin-exchange/activity_indicator_orange.png';
      currentLowLightCustomization.resultScreenCustomization.customActivityIndicatorAnimation =
        null;
      currentLowLightCustomization.resultScreenCustomization.resultAnimationBackgroundColor =
        primaryColor;
      currentLowLightCustomization.resultScreenCustomization.resultAnimationForegroundColor =
        'white';
      currentLowLightCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage =
        '';
      currentLowLightCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage =
        '';
      currentLowLightCustomization.resultScreenCustomization.customResultAnimationSuccess =
        null;
      currentLowLightCustomization.resultScreenCustomization.customResultAnimationUnsuccess =
        null;
      currentLowLightCustomization.resultScreenCustomization.uploadProgressTrackColor =
        'rgba(0, 0, 0, 0.2)';
      currentLowLightCustomization.resultScreenCustomization.uploadProgressFillColor =
        primaryColor;
      // Personalização de comentários
      currentLowLightCustomization.feedbackCustomization.backgroundColor =
        backgroundColor;
      currentLowLightCustomization.feedbackCustomization.textColor = 'white';
      // Personalização da moldura
      currentLowLightCustomization.frameCustomization.borderColor =
        backgroundColor;
      // Personalização da área Oval
      currentLowLightCustomization.ovalCustomization.strokeColor = primaryColor;
      currentLowLightCustomization.ovalCustomization.progressColor1 =
        secondaryColor;
      currentLowLightCustomization.ovalCustomization.progressColor2 =
        secondaryColor;
      // Customização do Botão Cancelar
      currentLowLightCustomization.cancelButtonCustomization.customImage =
        themeResourceDirectory +
        'bitcoin-exchange/single_chevron_left_orange.png';

      // Personalização de Orientação -- Text Style Overrides
      // Título da Tela Estou Pronto
      currentLowLightCustomization.guidanceCustomization.readyScreenHeaderTextColor =
        primaryColor;
      // SubTítulo da Tela Estou Pronto
      currentLowLightCustomization.guidanceCustomization.readyScreenSubtextTextColor =
        backgroundColor;
      // Título da tela Tentar Novamente
      currentLowLightCustomization.guidanceCustomization.retryScreenHeaderTextColor =
        primaryColor;
      // SubTítulo da tela Tentar Novamente
      currentLowLightCustomization.guidanceCustomization.retryScreenSubtextTextColor =
        backgroundColor;
    } else if (theme === 'Sample Bank') {
      const primaryColor = 'white';
      const backgroundColor = 'rgb(29, 23, 79)'; // azul marinho

      // Personalização de sobreposição
      currentLowLightCustomization.overlayCustomization.brandingImage =
        themeResourceDirectory + 'sample-bank/sample_bank_logo.png';
      // Personalização de Orientação
      currentLowLightCustomization.guidanceCustomization.foregroundColor =
        backgroundColor;
      currentLowLightCustomization.guidanceCustomization.buttonTextNormalColor =
        primaryColor;
      currentLowLightCustomization.guidanceCustomization.buttonBackgroundNormalColor =
        backgroundColor;
      currentLowLightCustomization.guidanceCustomization.buttonTextHighlightColor =
        primaryColor;
      currentLowLightCustomization.guidanceCustomization.buttonBackgroundHighlightColor =
        'rgba(29, 23, 79, 0.8)';
      currentLowLightCustomization.guidanceCustomization.buttonTextDisabledColor =
        'rgba(255, 255, 255, 0.3)';
      currentLowLightCustomization.guidanceCustomization.buttonBackgroundDisabledColor =
        backgroundColor;
      currentLowLightCustomization.guidanceCustomization.buttonBorderColor =
        backgroundColor;
      currentLowLightCustomization.guidanceCustomization.readyScreenOvalFillColor =
        'transparent';
      currentLowLightCustomization.guidanceCustomization.readyScreenTextBackgroundColor =
        primaryColor;
      currentLowLightCustomization.guidanceCustomization.retryScreenImageBorderColor =
        backgroundColor;
      currentLowLightCustomization.guidanceCustomization.retryScreenOvalStrokeColor =
        primaryColor;
      currentLowLightCustomization.guidanceCustomization.retryScreenSlideshowImages =
        retryScreenSlideshowImages;
      // Personalização de digitalização de ID
      currentLowLightCustomization.idScanCustomization.selectionScreenDocumentImage =
        '';
      currentLowLightCustomization.idScanCustomization[
        'selectionScreenBrandingImage'
      ] = '';
      currentLowLightCustomization.idScanCustomization.captureScreenForegroundColor =
        backgroundColor;
      currentLowLightCustomization.idScanCustomization.reviewScreenForegroundColor =
        backgroundColor;
      currentLowLightCustomization.idScanCustomization.selectionScreenForegroundColor =
        backgroundColor;
      currentLowLightCustomization.idScanCustomization.buttonTextNormalColor =
        primaryColor;
      currentLowLightCustomization.idScanCustomization.buttonBackgroundNormalColor =
        backgroundColor;
      currentLowLightCustomization.idScanCustomization.buttonTextHighlightColor =
        primaryColor;
      currentLowLightCustomization.idScanCustomization.buttonBackgroundHighlightColor =
        'rgba(29, 23, 79, 0.8)';
      currentLowLightCustomization.idScanCustomization.buttonTextDisabledColor =
        'rgba(255, 255, 255, 0.3)';
      currentLowLightCustomization.idScanCustomization.buttonBackgroundDisabledColor =
        backgroundColor;
      currentLowLightCustomization.idScanCustomization.buttonBorderColor =
        backgroundColor;
      currentLowLightCustomization.idScanCustomization.captureScreenTextBackgroundColor =
        primaryColor;
      currentLowLightCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor =
        backgroundColor;
      currentLowLightCustomization.idScanCustomization.reviewScreenTextBackgroundColor =
        primaryColor;
      currentLowLightCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor =
        backgroundColor;
      currentLowLightCustomization.idScanCustomization.captureFrameStrokeColor =
        primaryColor;
      // Personalização da tela de confirmação de OCR
      currentLowLightCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor =
        backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.mainHeaderTextColor =
        backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.sectionHeaderTextColor =
        backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.fieldLabelTextColor =
        backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.fieldValueTextColor =
        backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.inputFieldTextColor =
        backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor =
        'rgba(29, 23, 79, 0.4)';
      currentLowLightCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor =
        'transparent';
      currentLowLightCustomization.ocrConfirmationCustomization.inputFieldBorderColor =
        backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonTextNormalColor =
        primaryColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor =
        backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonTextHighlightColor =
        primaryColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor =
        'rgba(29, 23, 79, 0.8)';
      currentLowLightCustomization.ocrConfirmationCustomization.buttonTextDisabledColor =
        'rgba(255, 255, 255, 0.3)';
      currentLowLightCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor =
        backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonBorderColor =
        backgroundColor;
      // Personalização da tela de resultados
      currentLowLightCustomization.resultScreenCustomization.foregroundColor =
        backgroundColor;
      currentLowLightCustomization.resultScreenCustomization.activityIndicatorColor =
        backgroundColor;
      currentLowLightCustomization.resultScreenCustomization.customActivityIndicatorImage =
        themeResourceDirectory + 'sample-bank/activity_indicator_navy.png';
      currentLowLightCustomization.resultScreenCustomization.customActivityIndicatorAnimation =
        null;
      currentLowLightCustomization.resultScreenCustomization.resultAnimationBackgroundColor =
        'transparent';
      currentLowLightCustomization.resultScreenCustomization.resultAnimationForegroundColor =
        backgroundColor;
      currentLowLightCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage =
        themeResourceDirectory + 'sample-bank/reticle_navy.png';
      currentLowLightCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage =
        themeResourceDirectory + 'sample-bank/reticle_navy.png';
      currentLowLightCustomization.resultScreenCustomization.customResultAnimationSuccess =
        null;
      currentLowLightCustomization.resultScreenCustomization.customResultAnimationUnsuccess =
        null;
      currentLowLightCustomization.resultScreenCustomization.uploadProgressTrackColor =
        'rgba(0, 0, 0, 0.2)';
      currentLowLightCustomization.resultScreenCustomization.uploadProgressFillColor =
        backgroundColor;
      // Personalização de comentários
      currentLowLightCustomization.feedbackCustomization.backgroundColor =
        backgroundColor;
      currentLowLightCustomization.feedbackCustomization.textColor =
        primaryColor;
      // Personalização da moldura
      currentLowLightCustomization.frameCustomization.borderColor =
        backgroundColor;
      // Personalização da área Oval
      currentLowLightCustomization.ovalCustomization.strokeColor =
        backgroundColor;
      currentLowLightCustomization.ovalCustomization.progressColor1 =
        'rgba(29, 23, 79, 0.8)';
      currentLowLightCustomization.ovalCustomization.progressColor2 =
        'rgba(29, 23, 79, 0.8)';
      // Customização do Botão Cancelar
      currentLowLightCustomization.cancelButtonCustomization.customImage =
        themeResourceDirectory + 'sample-bank/cancel_navy.png';
    }

    return currentLowLightCustomization;
  }

  function getDynamicDimmingCustomizationForTheme(
    theme: string
  ): FaceTecCustomization | null {
    var currentDynamicDimmingCustomization: FaceTecCustomization =
      getCustomizationForTheme(theme);

    const retryScreenSlideshowImages: string[] = [
      themeResourceDirectory + 'FaceTec_ideal_1.png',
      themeResourceDirectory + 'FaceTec_ideal_2.png',
      themeResourceDirectory + 'FaceTec_ideal_3.png',
      themeResourceDirectory + 'FaceTec_ideal_4.png',
      themeResourceDirectory + 'FaceTec_ideal_5.png',
    ];

    if (theme === 'FaceTec Theme') {
      // Personalização da tela de confirmação de OCR
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.sectionHeaderTextColor =
        'white';
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.fieldLabelTextColor =
        'white';
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.fieldValueTextColor =
        'white';
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldTextColor =
        'white';
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor =
        'rgba(0, 0, 0, 0.4)';
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldBorderColor =
        'white';
    }
    if (theme === 'Config Wizard Theme') {
      currentDynamicDimmingCustomization =
        Config.retrieveDynamicDimmingConfigurationWizardCustomization(
          FaceTecSDK
        );
    } else if (theme === 'Pseudo-Fullscreen') {
      const primaryColor = 'rgb(238, 246, 248)'; // branco
      const secondaryColor = 'rgb(59, 195, 113)'; // verde
      const backgroundColor = 'black';

      var activityIndicatorSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      activityIndicatorSVG.setAttribute('viewBox', '0 0 52 52');
      activityIndicatorSVG.classList.add(
        'pseudo-fullscreen-activity-indicator-svg__offwhite'
      );
      activityIndicatorSVG.innerHTML =
        "<circle class='path' cx='26' cy='26' r='22'></circle>";

      var successResultAnimationSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      successResultAnimationSVG.setAttribute('viewBox', '0 0 52 52');
      successResultAnimationSVG.classList.add(
        'pseudo-fullscreen-success-svg__offwhite'
      );
      successResultAnimationSVG.innerHTML =
        "<circle class='circlePath' cx='26' cy='26' r='22'></circle><path class='checkmarkPath' d='M14.1 27.2l7.1 7.2 16.7-16.8'></path>";

      var unsuccessResultAnimationSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      unsuccessResultAnimationSVG.setAttribute('viewBox', '0 0 52 52');
      unsuccessResultAnimationSVG.classList.add(
        'pseudo-fullscreen-unsuccess-svg__offwhite'
      );
      unsuccessResultAnimationSVG.innerHTML =
        "<circle class='circlePath' cx='26' cy='26' r='22'></circle><line class='crossPath1' x1='18' y1='18' x2='34' y2='34'></line><line class='crossPath2' x1='34' y1='18' x2='18' y2='34'></line>";

      // Personalização de sobreposição
      currentDynamicDimmingCustomization.overlayCustomization.brandingImage =
        '';
      // Personalização de Orientação
      currentDynamicDimmingCustomization.guidanceCustomization.foregroundColor =
        primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonTextNormalColor =
        backgroundColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonBackgroundHighlightColor =
        'white';
      currentDynamicDimmingCustomization.guidanceCustomization.buttonTextDisabledColor =
        backgroundColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonBackgroundDisabledColor =
        'rgba(238, 246, 248, 0.3)';
      currentDynamicDimmingCustomization.guidanceCustomization.buttonBorderColor =
        'transparent';
      currentDynamicDimmingCustomization.guidanceCustomization.readyScreenOvalFillColor =
        'transparent';
      currentDynamicDimmingCustomization.guidanceCustomization.readyScreenTextBackgroundColor =
        backgroundColor;
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenImageBorderColor =
        primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenOvalStrokeColor =
        primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenSlideshowImages =
        retryScreenSlideshowImages;
      currentDynamicDimmingCustomization.guidanceCustomization.cameraPermissionsScreenImage =
        themeResourceDirectory + 'pseudo-fullscreen/camera_shutter_black.png';
      // Personalização de digitalização de ID
      currentDynamicDimmingCustomization.idScanCustomization.selectionScreenDocumentImage =
        themeResourceDirectory + 'pseudo-fullscreen/document_offwhite.png';
      currentDynamicDimmingCustomization.idScanCustomization[
        'selectionScreenBrandingImage'
      ] = '';
      currentDynamicDimmingCustomization.idScanCustomization.captureScreenForegroundColor =
        primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.reviewScreenForegroundColor =
        primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.selectionScreenForegroundColor =
        primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonTextNormalColor =
        backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonBackgroundHighlightColor =
        'white';
      currentDynamicDimmingCustomization.idScanCustomization.buttonTextDisabledColor =
        backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonBackgroundDisabledColor =
        'rgba(238, 246, 248, 0.3)';
      currentDynamicDimmingCustomization.idScanCustomization.buttonBorderColor =
        'transparent';
      currentDynamicDimmingCustomization.idScanCustomization.captureScreenTextBackgroundColor =
        backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor =
        primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.reviewScreenTextBackgroundColor =
        backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor =
        primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.captureFrameStrokeColor =
        primaryColor;
      // Personalização da tela de confirmação de OCR
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor =
        secondaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.mainHeaderTextColor =
        secondaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.sectionHeaderTextColor =
        primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.fieldLabelTextColor =
        primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.fieldValueTextColor =
        primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldTextColor =
        primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor =
        'rgba(59, 195, 113, 0.4)';
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor =
        'transparent';
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldBorderColor =
        secondaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonTextNormalColor =
        backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor =
        primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor =
        'white';
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonTextDisabledColor =
        backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor =
        'rgba(238, 246, 248, 0.3)';
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonBorderColor =
        'transparent';
      // Personalização da tela de resultados
      currentDynamicDimmingCustomization.resultScreenCustomization.foregroundColor =
        primaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.activityIndicatorColor =
        primaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.customActivityIndicatorImage =
        themeResourceDirectory +
        'pseudo-fullscreen/activity_indicator_faded_black.png';
      currentDynamicDimmingCustomization.resultScreenCustomization.customActivityIndicatorAnimation =
        activityIndicatorSVG;
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationBackgroundColor =
        secondaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationForegroundColor =
        backgroundColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage =
        '';
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage =
        '';
      currentDynamicDimmingCustomization.resultScreenCustomization.customResultAnimationSuccess =
        successResultAnimationSVG;
      currentDynamicDimmingCustomization.resultScreenCustomization.customResultAnimationUnsuccess =
        unsuccessResultAnimationSVG;
      currentDynamicDimmingCustomization.resultScreenCustomization.showUploadProgressBar =
        true;
      currentDynamicDimmingCustomization.resultScreenCustomization.uploadProgressTrackColor =
        'rgba(238, 246, 248, 0.2)';
      currentDynamicDimmingCustomization.resultScreenCustomization.uploadProgressFillColor =
        secondaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.animationRelativeScale = 1.0;
      // Personalização de comentários
      currentDynamicDimmingCustomization.feedbackCustomization.backgroundColor =
        secondaryColor;
      currentDynamicDimmingCustomization.feedbackCustomization.textColor =
        backgroundColor;
      currentDynamicDimmingCustomization.feedbackCustomization.shadow =
        '0px 3px 10px black';
      // Personalização da moldura
      currentDynamicDimmingCustomization.frameCustomization.borderColor =
        primaryColor;
      currentDynamicDimmingCustomization.frameCustomization.shadow = 'none';
      // Personalização da área Oval
      currentDynamicDimmingCustomization.ovalCustomization.strokeColor =
        primaryColor;
      currentDynamicDimmingCustomization.ovalCustomization.progressColor1 =
        'rgba(59, 195, 113, 0.7)';
      currentDynamicDimmingCustomization.ovalCustomization.progressColor2 =
        'rgba(59, 195, 113, 0.7)';
      // Customização do Botão Cancelar
      currentDynamicDimmingCustomization.cancelButtonCustomization.customImage =
        themeResourceDirectory +
        'pseudo-fullscreen/single_chevron_left_offwhite.png';

      // Personalização de Orientação -- Text Style Overrides
      // Título da Tela Estou Pronto
      currentDynamicDimmingCustomization.guidanceCustomization.readyScreenHeaderTextColor =
        primaryColor;
      // SubTítulo da Tela Estou Pronto
      currentDynamicDimmingCustomization.guidanceCustomization.readyScreenSubtextTextColor =
        primaryColor;
      // Título da tela Tentar Novamente
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenHeaderTextColor =
        primaryColor;
      // SubTítulo da tela Tentar Novamente
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenSubtextTextColor =
        primaryColor;
    } else if (theme === 'Bitcoin Exchange') {
      // Personalização de sobreposição
      currentDynamicDimmingCustomization.overlayCustomization.brandingImage =
        themeResourceDirectory +
        'bitcoin-exchange/bitcoin_exchange_logo_white.png';
    } else if (theme === 'eKYC') {
      const primaryColor = 'rgb(237, 28, 36)'; // vermelho
      const secondaryColor = 'white';
      const backgroundColor = 'black';

      var activityIndicatorSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      activityIndicatorSVG.setAttribute('viewBox', '0 0 52 52');
      activityIndicatorSVG.classList.add('ekyc-activity-indicator-svg__white');
      activityIndicatorSVG.innerHTML =
        "<defs><filter id='goo'><feGaussianBlur in='SourceGraphic' stdDeviation='2' result='blur' /><feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9' result='goo' /><feComposite in='SourceGraphic' in2='goo' operator='atop'/></filter></defs><g filter='url(#goo)'><g transform='translate(26 26)'><circle class='circlePath1' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' attributeType='XML' dur='1s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath2' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1.2s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' attributeType='XML' dur='1.2s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1.2s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath3' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1.5s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' dur='1.5s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1.5s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath4' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='2s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' dur='2s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='2s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g> </g>";

      var successResultAnimationSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      successResultAnimationSVG.setAttribute('viewBox', '0 0 52 52');
      successResultAnimationSVG.classList.add('ekyc-success-svg__white');
      successResultAnimationSVG.innerHTML =
        "<path class='checkmarkPath__back' d='M14.1 27.2l7.1 7.2 16.7-16.8'></path><path class='checkmarkPath__front' d='M14.1 27.2l7.1 7.2 16.7-16.8'></path>";

      var unsuccessResultAnimationSVG: SVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      unsuccessResultAnimationSVG.setAttribute('viewBox', '0 0 52 52');
      unsuccessResultAnimationSVG.classList.add('ekyc-unsuccess-svg__white');
      unsuccessResultAnimationSVG.innerHTML =
        "<line class='crossPath1__back' x1='18' y1='18' x2='34' y2='34'></line><line class='crossPath2__back' x1='34' y1='18' x2='18' y2='34'></line><line class='crossPath1__front' x1='18' y1='18' x2='34' y2='34'></line><line class='crossPath2__front' x1='34' y1='18' x2='18' y2='34'></line>";

      // Personalização de sobreposição
      currentDynamicDimmingCustomization.overlayCustomization.brandingImage =
        themeResourceDirectory + 'ekyc/ekyc_logo_white.png';
      // Personalização de Orientação
      currentDynamicDimmingCustomization.guidanceCustomization.foregroundColor =
        secondaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonTextNormalColor =
        primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonBackgroundNormalColor =
        backgroundColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonBackgroundHighlightColor =
        primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonTextDisabledColor =
        'rgba(237, 28, 36, 0.3)';
      currentDynamicDimmingCustomization.guidanceCustomization.buttonBackgroundDisabledColor =
        backgroundColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonBorderColor =
        primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.readyScreenOvalFillColor =
        'transparent';
      currentDynamicDimmingCustomization.guidanceCustomization.readyScreenTextBackgroundColor =
        backgroundColor;
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenImageBorderColor =
        primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenOvalStrokeColor =
        primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenSlideshowImages =
        retryScreenSlideshowImages;
      // Personalização de digitalização de ID
      currentDynamicDimmingCustomization.idScanCustomization.selectionScreenDocumentImage =
        '';
      currentDynamicDimmingCustomization.idScanCustomization[
        'selectionScreenBrandingImage'
      ] = '';
      currentDynamicDimmingCustomization.idScanCustomization.captureScreenForegroundColor =
        backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.reviewScreenForegroundColor =
        backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.selectionScreenForegroundColor =
        primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonTextNormalColor =
        primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonBackgroundNormalColor =
        backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonBackgroundHighlightColor =
        primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonTextDisabledColor =
        'rgba(237, 28, 36, 0.3)';
      currentDynamicDimmingCustomization.idScanCustomization.buttonBackgroundDisabledColor =
        backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonBorderColor =
        primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.captureScreenTextBackgroundColor =
        primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor =
        primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.reviewScreenTextBackgroundColor =
        primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor =
        primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.captureFrameStrokeColor =
        primaryColor;
      // Personalização da tela de confirmação de OCR
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor =
        secondaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.mainHeaderTextColor =
        secondaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.sectionHeaderTextColor =
        primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.fieldLabelTextColor =
        secondaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.fieldValueTextColor =
        secondaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldTextColor =
        backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor =
        'rgba(0, 0, 0, 0.4)';
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor =
        secondaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldBorderColor =
        primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonTextNormalColor =
        primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor =
        backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonTextHighlightColor =
        backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor =
        primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonTextDisabledColor =
        'rgba(237, 28, 36, 0.3)';
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor =
        backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonBorderColor =
        primaryColor;
      // Personalização da tela de resultados
      currentDynamicDimmingCustomization.resultScreenCustomization.foregroundColor =
        secondaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.activityIndicatorColor =
        primaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.customActivityIndicatorImage =
        '';
      currentDynamicDimmingCustomization.resultScreenCustomization.customActivityIndicatorAnimation =
        activityIndicatorSVG;
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationBackgroundColor =
        'transparent';
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationForegroundColor =
        'transparent';
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage =
        '';
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage =
        '';
      currentDynamicDimmingCustomization.resultScreenCustomization.customResultAnimationSuccess =
        successResultAnimationSVG;
      currentDynamicDimmingCustomization.resultScreenCustomization.customResultAnimationUnsuccess =
        unsuccessResultAnimationSVG;
      currentDynamicDimmingCustomization.resultScreenCustomization.uploadProgressTrackColor =
        'rgba(255, 255, 255, 0.2)';
      currentDynamicDimmingCustomization.resultScreenCustomization.uploadProgressFillColor =
        primaryColor;
      // Personalização de comentários
      currentDynamicDimmingCustomization.feedbackCustomization.backgroundColor =
        secondaryColor;
      currentDynamicDimmingCustomization.feedbackCustomization.textColor =
        backgroundColor;
      currentDynamicDimmingCustomization.feedbackCustomization.shadow =
        '0px 3px 6px 3px rgba(237, 28, 36, 0.7)';
      // Personalização da moldura
      currentDynamicDimmingCustomization.frameCustomization.borderColor =
        primaryColor;
      currentDynamicDimmingCustomization.frameCustomization.shadow =
        '0px 3px 6px 3px rgba(237, 28, 36, 0.7)';
      // Personalização da área Oval
      currentDynamicDimmingCustomization.ovalCustomization.strokeColor =
        primaryColor;
      currentDynamicDimmingCustomization.ovalCustomization.progressColor1 =
        'rgba(237, 28, 36, 0.7)';
      currentDynamicDimmingCustomization.ovalCustomization.progressColor2 =
        'rgba(237, 28, 36, 0.7)';
      // Customização do Botão Cancelar
      currentDynamicDimmingCustomization.cancelButtonCustomization.customImage =
        themeResourceDirectory + 'ekyc/cancel_box_red.png';
    }

    return currentDynamicDimmingCustomization;
  }

  function showNewTheme() {
    var themes: string[] = [''];
    if (Config.wasSDKConfiguredWithConfigWizard === true) {
      themes = [
        'Config Wizard Theme',
        'FaceTec Theme',
        'Pseudo-Fullscreen',
        'Well-Rounded',
        'Bitcoin Exchange',
        'eKYC',
        'Sample Bank',
      ];
    } else {
      themes = [
        'FaceTec Theme',
        'Pseudo-Fullscreen',
        'Well-Rounded',
        'Bitcoin Exchange',
        'eKYC',
        'Sample Bank',
      ];
    }

    var currentThemeIndex = themes.indexOf(currentTheme);
    currentThemeIndex =
      currentThemeIndex >= themes.length - 1 ? 0 : currentThemeIndex + 1;
    currentTheme = themes[currentThemeIndex];
    setAppTheme(currentTheme);
    updateThemeTransitionView();
    SampleAppUtilities.displayStatus('Theme set to: ' + currentTheme);
  }

  function updateThemeTransitionView() {
    var transitionViewImage = '';
    var transitionViewTextColor =
      Config.currentCustomization.guidanceCustomization.foregroundColor;
    var transitionViewClass = 'theme-transition-overlay__';
    var deviceType = 'desktop';
    if (SampleAppUtilities.isLikelyMobileDevice()) {
      deviceType = 'mobile';
    }
    switch (currentTheme) {
      case 'FaceTec Theme':
        transitionViewClass = 'default';
        break;
      case 'Pseudo-Fullscreen':
        transitionViewClass += 'default';
        break;
      case 'Well-Rounded':
        transitionViewImage =
          themeResourceDirectory +
          'well-rounded/well_rounded_' +
          deviceType +
          '_bg.svg';
        transitionViewClass += 'well-rounded';
        transitionViewTextColor =
          Config.currentCustomization.frameCustomization.backgroundColor;
        break;
      case 'Bitcoin Exchange':
        transitionViewImage =
          themeResourceDirectory +
          'bitcoin-exchange/bitcoin_exchange_' +
          deviceType +
          '_bg.svg';
        transitionViewClass += 'bitcoin-exchange';
        transitionViewTextColor =
          Config.currentCustomization.frameCustomization.backgroundColor;
        break;
      case 'eKYC':
        transitionViewImage =
          themeResourceDirectory + 'ekyc/ekyc_' + deviceType + '_bg.svg';
        transitionViewClass += 'ekyc';
        break;
      case 'Sample Bank':
        transitionViewImage =
          themeResourceDirectory +
          'sample-bank/sample_bank_' +
          deviceType +
          '_bg.svg';
        transitionViewClass += 'sample-bank';
        transitionViewTextColor =
          Config.currentCustomization.frameCustomization.backgroundColor;
        break;
      default:
        transitionViewClass = 'default';
        break;
    }
    transitionViewClass += '__' + deviceType;

    (
      document.getElementById(
        'theme-transition-overlay-img'
      ) as HTMLImageElement
    ).src = transitionViewImage;
    (
      document.getElementById('theme-transition-overlay') as HTMLElement
    ).className = transitionViewClass;
    (
      document.getElementById('loading-session-token-text') as HTMLElement
    ).style.color = transitionViewTextColor;
  }

  function getCurrentTheme() {
    // Neste operador ternário é definido qual tema será usado caso a variável wasSDKConfiguredWithConfigWizard
    // esteja configurada como true no arquivo Config.js
    currentTheme = Config.wasSDKConfiguredWithConfigWizard
      ? 'Oiti-Dark'
      : 'FaceTec Theme';

    return currentTheme;
  }

  return {
    getCurrentTheme,
    themeResourceDirectory,
    setAppTheme(theme: string) {
      setAppTheme(theme);
    },
    showNewTheme,
  };
})();
