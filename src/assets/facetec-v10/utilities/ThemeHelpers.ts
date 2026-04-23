import { Config } from "../../../assets/facetec-v10/Config";
import { FaceTecSDK } from "../../10.0.42/core-sdk/FaceTecSDK.js/FaceTecSDK";
import { FaceTecCustomization } from "../../10.0.42/core-sdk/FaceTecSDK.js/FaceTecCustomization";
import { SampleAppUtilities } from "./SampleAppUtilities";
import { SoundFileUtilities } from "./SoundFileUtilities";
import { DeveloperStatusMessages } from "./DeveloperStatusMessages";

export class ThemeHelpers {
  constructor(private sdk: any) { }

  // Set the default theme
  private currentTheme: string = "Pseudo-Fullscreen";
  private themeResourceDirectory = "assets/facetec-v10/sample-app-resources/images/themes/";

  // Save the current app theme in Config and update the SDK
  public setAppTheme = (theme: string): void => {
    const customization = this.getCustomizationForTheme(theme);
    const lowLightCustomization = this.getLowLightCustomizationForTheme(theme);
    const dynamicDimmingCustomization = this.getDynamicDimmingCustomizationForTheme(theme);

    this.sdk.setCustomization(customization);
    this.sdk.setLowLightCustomization(lowLightCustomization);
    this.sdk.setDynamicDimmingCustomization(dynamicDimmingCustomization);
  };

  // Get customizations for themes
  private getCustomizationForTheme = (theme: string): FaceTecCustomization => {
    var currentCustomization: FaceTecCustomization = new FaceTecSDK.FaceTecCustomization();
    currentCustomization = Config.retrieveConfigurationWizardCustomization(this.sdk);

    // Add sound customization to the new theme customization
    var soundFileUtilities: SoundFileUtilities = new SoundFileUtilities();
    currentCustomization = soundFileUtilities.setVocalGuidanceSoundFiles(currentCustomization);

    const retryScreenSlideshowImages: string[] = [this.themeResourceDirectory + "FaceTec_ideal_1.png", this.themeResourceDirectory + "FaceTec_ideal_2.png", this.themeResourceDirectory + "FaceTec_ideal_3.png", this.themeResourceDirectory + "FaceTec_ideal_4.png", this.themeResourceDirectory + "FaceTec_ideal_5.png"];

    if (theme === "Config Wizard Theme") {
      currentCustomization = Config.retrieveConfigurationWizardCustomization(FaceTecSDK);
    }
    else if (theme === "Sample Bank") {
      const primaryColor: string = "white";
      const primaryColorLight: string = "rgba(255, 255, 255, 0.8)";
      const backgroundColor: string = "rgb(29, 23, 79)"; // Navy
      const buttonBackgroundDisabledColor: string = primaryColor;
      const buttonBackgroundHighlightColor: string = primaryColorLight;
      const font: string = "'Source Sans Pro', Helvetica, sans-serif";

      // Initial Loading Animation Customization
      currentCustomization.initialLoadingAnimationCustomization.customAnimation = null;
      currentCustomization.initialLoadingAnimationCustomization.animationRelativeScale = 1.0;
      currentCustomization.initialLoadingAnimationCustomization.backgroundColor = backgroundColor;
      currentCustomization.initialLoadingAnimationCustomization.foregroundColor = primaryColor;
      currentCustomization.initialLoadingAnimationCustomization.messageTextColor = backgroundColor;
      currentCustomization.initialLoadingAnimationCustomization.messageFont = font;
      // Overlay Customization
      currentCustomization.overlayCustomization.backgroundColor = "transparent";
      currentCustomization.overlayCustomization.showBrandingImage = true;
      currentCustomization.overlayCustomization.brandingImage = this.themeResourceDirectory + "sample-bank/sample_bank_logo.png";
      // Guidance Customization
      currentCustomization.guidanceCustomization.backgroundColors = backgroundColor;
      currentCustomization.guidanceCustomization.foregroundColor = primaryColor;
      currentCustomization.guidanceCustomization.headerFont = font;
      currentCustomization.guidanceCustomization.subtextFont = font;
      currentCustomization.guidanceCustomization.buttonFont = font;
      currentCustomization.guidanceCustomization.buttonTextNormalColor = backgroundColor;
      currentCustomization.guidanceCustomization.buttonBackgroundNormalColor = primaryColor;
      currentCustomization.guidanceCustomization.buttonTextHighlightColor = backgroundColor;
      currentCustomization.guidanceCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentCustomization.guidanceCustomization.buttonTextDisabledColor = "rgba(29, 23, 79, 0.3)";
      currentCustomization.guidanceCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentCustomization.guidanceCustomization.buttonBorderColor = backgroundColor;
      currentCustomization.guidanceCustomization.buttonBorderWidth = "2px";
      currentCustomization.guidanceCustomization.buttonCornerRadius = "2px";
      currentCustomization.guidanceCustomization.readyScreenOvalFillColor = "transparent";
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundColor = backgroundColor;
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundCornerRadius = "2px";
      currentCustomization.guidanceCustomization.retryScreenImageBorderColor = primaryColor;
      currentCustomization.guidanceCustomization.retryScreenImageBorderWidth = "2px";
      currentCustomization.guidanceCustomization.retryScreenImageCornerRadius = "2px";
      currentCustomization.guidanceCustomization.retryScreenOvalStrokeColor = primaryColor;
      currentCustomization.guidanceCustomization.retryScreenSlideshowImages = retryScreenSlideshowImages;
      currentCustomization.guidanceCustomization.retryScreenSlideshowInterval = "1500ms";
      currentCustomization.guidanceCustomization.enableRetryScreenSlideshowShuffle = false;
      currentCustomization.guidanceCustomization.cameraPermissionsScreenImage = this.themeResourceDirectory + "sample-bank/camera_white_navy.png";
      currentCustomization.guidanceCustomization.cameraFeedIssueScreenImage = this.themeResourceDirectory + "sample-bank/camera_white_navy.png";
      // ID Scan Customization
      currentCustomization.idScanCustomization.showSelectionScreenDocumentImage = false;
      currentCustomization.idScanCustomization.selectionScreenDocumentImage = "";
      currentCustomization.idScanCustomization.selectionScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.captureScreenForegroundColor = backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenForegroundColor = backgroundColor;
      currentCustomization.idScanCustomization.selectionScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.headerFont = font;
      currentCustomization.idScanCustomization.subtextFont = font;
      currentCustomization.idScanCustomization.buttonFont = font;
      currentCustomization.idScanCustomization.buttonTextNormalColor = backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundNormalColor = primaryColor;
      currentCustomization.idScanCustomization.buttonTextHighlightColor = backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentCustomization.idScanCustomization.buttonTextDisabledColor = "rgba(29, 23, 79, 0.3)";
      currentCustomization.idScanCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentCustomization.idScanCustomization.buttonBorderColor = backgroundColor;
      currentCustomization.idScanCustomization.buttonBorderWidth = "2px";
      currentCustomization.idScanCustomization.buttonCornerRadius = "2px";
      currentCustomization.idScanCustomization.captureScreenTextBackgroundColor = primaryColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor = backgroundColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderWidth = "2px";
      currentCustomization.idScanCustomization.captureScreenTextBackgroundCornerRadius = "2px";
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundColor = primaryColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor = backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderWidth = "2px";
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderCornerRadius = "2px";
      currentCustomization.idScanCustomization.captureScreenBackgroundColor = backgroundColor;
      currentCustomization.idScanCustomization.captureFrameStrokeColor = primaryColor;
      currentCustomization.idScanCustomization.captureFrameStrokeWidth = "2px";
      currentCustomization.idScanCustomization.captureFrameCornerRadius = "12px";
      currentCustomization.idScanCustomization.additionalReviewScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.additionalReviewScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.additionalReviewScreenImage = this.themeResourceDirectory + "sample-bank/review_white.png";
      currentCustomization.idScanCustomization.additionalReviewScreenAnimation = null;
      currentCustomization.idScanCustomization.additionalReviewScreenAnimationDisplayTime = 2.0;
      currentCustomization.idScanCustomization.idFeedbackScreenAnimationDisplayTime = 2.0;
      currentCustomization.idScanCustomization.enableAdditionalReviewTag = true;
      currentCustomization.idScanCustomization.additionalReviewTagImage = this.themeResourceDirectory + "sample-bank/warning_white.png";
      currentCustomization.idScanCustomization.additionalReviewTagImageColor = primaryColor;
      currentCustomization.idScanCustomization.additionalReviewTagTextColor = primaryColor;
      // OCR Confirmation Screen Customization
      currentCustomization.ocrConfirmationCustomization.backgroundColors = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineWidth = "2px";
      currentCustomization.ocrConfirmationCustomization.mainHeaderFont = font;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderFont = font;
      currentCustomization.ocrConfirmationCustomization.fieldLabelFont = font;
      currentCustomization.ocrConfirmationCustomization.fieldValueFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderFont = font;
      currentCustomization.ocrConfirmationCustomization.mainHeaderTextColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderTextColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldLabelTextColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldValueTextColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldTextColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor = "rgba(29, 23, 79, 0.4)";
      currentCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor = "transparent";
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderWidth = "2px";
      currentCustomization.ocrConfirmationCustomization.inputFieldCornerRadius = "0px";
      currentCustomization.ocrConfirmationCustomization.showInputFieldBottomBorderOnly = true;
      currentCustomization.ocrConfirmationCustomization.buttonFont = font;
      currentCustomization.ocrConfirmationCustomization.buttonTextNormalColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextHighlightColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextDisabledColor = "rgba(29, 23, 79, 0.3)";
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentCustomization.ocrConfirmationCustomization.buttonBorderColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBorderWidth = "2px";
      currentCustomization.ocrConfirmationCustomization.buttonCornerRadius = "2px";
      currentCustomization.ocrConfirmationCustomization.customScrollIndicatorAnimation = null;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundNormalColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundHighlightColor = primaryColorLight;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundNormalColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundHighlightColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBorderColor = "transparent";
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBorderWidth = "0px";
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorCornerRadius = "2px";
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorFont = font;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorShadow = "none";
      currentCustomization.ocrConfirmationCustomization.enableScrollIndicator = true;
      currentCustomization.ocrConfirmationCustomization.enableScrollIndicatorTextAnimation = true;
      currentCustomization.ocrConfirmationCustomization.enableFixedConfirmButton = true;
      currentCustomization.ocrConfirmationCustomization.showScrollIndicatorImage = false;
      // Result Screen Customization
      currentCustomization.resultScreenCustomization.backgroundColors = backgroundColor;
      currentCustomization.resultScreenCustomization.foregroundColor = primaryColor;
      currentCustomization.resultScreenCustomization.messageFont = font;
      currentCustomization.resultScreenCustomization.activityIndicatorColor = primaryColor;
      currentCustomization.resultScreenCustomization.customActivityIndicatorImage = this.themeResourceDirectory + "sample-bank/activity_indicator_white.png";
      currentCustomization.resultScreenCustomization.customActivityIndicatorRotationInterval = "1s";
      currentCustomization.resultScreenCustomization.customActivityIndicatorAnimation = null;
      currentCustomization.resultScreenCustomization.resultAnimationBackgroundColor = "transparent";
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundColor = "transparent";
      currentCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundColor = "transparent";
      currentCustomization.resultScreenCustomization.resultAnimationForegroundColor = primaryColor;
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessForegroundColor = primaryColor;
      currentCustomization.resultScreenCustomization.resultAnimationIDScanSuccessForegroundColor = primaryColor;
      currentCustomization.resultScreenCustomization.sessionAbortAnimationForegroundColor = primaryColor;
      currentCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage = this.themeResourceDirectory + "sample-bank/reticle_white.png";
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage = this.themeResourceDirectory + "sample-bank/reticle_white.png";
      currentCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundImage = this.themeResourceDirectory + "sample-bank/reticle_white.png";
      currentCustomization.resultScreenCustomization.customResultAnimationIDScanSuccess = null;
      currentCustomization.resultScreenCustomization.customResultAnimationSuccess = null;
      currentCustomization.resultScreenCustomization.customResultAnimationUnsuccess = null;
      currentCustomization.resultScreenCustomization.customSessionAbortAnimation = null;
      currentCustomization.resultScreenCustomization.showUploadProgressBar = true;
      currentCustomization.resultScreenCustomization.uploadProgressTrackColor = "rgba(255, 255, 255, 0.2)";
      currentCustomization.resultScreenCustomization.uploadProgressFillColor = primaryColor;
      currentCustomization.resultScreenCustomization.animationRelativeScale = 1.0;
      currentCustomization.resultScreenCustomization.resultAnimationDisplayTime = 2.0;
      currentCustomization.resultScreenCustomization.faceScanStillUploadingMessageDelayTime = 6.0;
      currentCustomization.resultScreenCustomization.idScanStillUploadingMessageDelayTime = 8.0;
      // Feedback Customization
      currentCustomization.feedbackCustomization.backgroundColor = primaryColor;
      currentCustomization.feedbackCustomization.textColor = backgroundColor;
      currentCustomization.feedbackCustomization.textFont = font;
      currentCustomization.feedbackCustomization.cornerRadius = "2px";
      currentCustomization.feedbackCustomization.shadow = "none";
      // Frame Customization
      currentCustomization.frameCustomization.backgroundColor = backgroundColor;
      currentCustomization.frameCustomization.borderColor = backgroundColor;
      currentCustomization.frameCustomization.borderWidth = "2px";
      currentCustomization.frameCustomization.borderCornerRadius = "2px";
      currentCustomization.frameCustomization.shadow = "none";
      // Oval Customization
      currentCustomization.ovalCustomization.strokeColor = primaryColor;
      currentCustomization.ovalCustomization.progressColor1 = "rgba(255, 255, 255, 0.8)";
      currentCustomization.ovalCustomization.progressColor2 = "rgba(255, 255, 255, 0.8)";
      // Cancel Button Customization
      currentCustomization.cancelButtonCustomization.customImage = this.themeResourceDirectory + "sample-bank/cancel_white.png";
      currentCustomization.cancelButtonCustomization.location = FaceTecSDK.FaceTecCancelButtonLocation.TopLeft;
      currentCustomization.cancelButtonCustomization.hideForCameraPermissions = true;
      // Orientation Screen Customization
      currentCustomization.orientationScreenCustomization.backgroundColors = backgroundColor;
      currentCustomization.orientationScreenCustomization.foregroundColor = primaryColor;
      currentCustomization.orientationScreenCustomization.iconImage = "/assets/10.0.42/core-sdk/FaceTec_images/FaceTec_rotate.png";
      currentCustomization.orientationScreenCustomization.messageFont = font;

    }
    else if (theme === 'Oiti-Dark') {
      console.log('aqui no Oiti-Dark')

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
      // Linhas comentadas
      currentCustomization.guidanceCustomization.cameraPermissionsScreenImage =
        this.themeResourceDirectory + 'oiti/camera_icon.png';
      // Personalização de digitalização de documentos
      currentCustomization.idScanCustomization.showSelectionScreenDocumentImage =
        true;
      // Linhas comentadas 
      currentCustomization.idScanCustomization.selectionScreenDocumentImage =
        this.themeResourceDirectory + 'oiti/document_offblack.png';
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
      // Linhas comentadas
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
      // Linhas comentadas
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

    const retryScreenSlideshowImages: string[] = [this.themeResourceDirectory + "FaceTec_ideal_1.png", this.themeResourceDirectory + "FaceTec_ideal_2.png", this.themeResourceDirectory + "FaceTec_ideal_3.png", this.themeResourceDirectory + "FaceTec_ideal_4.png", this.themeResourceDirectory + "FaceTec_ideal_5.png"];

    if (theme === "Config Wizard Theme") {
      currentLowLightCustomization = Config.retrieveLowLightConfigurationWizardCustomization(FaceTecSDK);
    }
    else if (theme === "Sample Bank") {
      const primaryColor: string = "white";
      const backgroundColor: string = "rgb(29, 23, 79)"; // Navy
      const backgroundColorLight: string = "rgba(29, 23, 79, 0.8)"; // Lighter navy
      const buttonBackgroundDisabledColor: string = backgroundColor;
      const buttonBackgroundHighlightColor: string = backgroundColorLight;

      // Overlay Customization
      currentLowLightCustomization.overlayCustomization.brandingImage = this.themeResourceDirectory + "sample-bank/sample_bank_logo.png";
      // Guidance Customization
      currentLowLightCustomization.guidanceCustomization.foregroundColor = backgroundColor;
      currentLowLightCustomization.guidanceCustomization.buttonTextNormalColor = primaryColor;
      currentLowLightCustomization.guidanceCustomization.buttonBackgroundNormalColor = backgroundColor;
      currentLowLightCustomization.guidanceCustomization.buttonTextHighlightColor = primaryColor;
      currentLowLightCustomization.guidanceCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentLowLightCustomization.guidanceCustomization.buttonTextDisabledColor = "rgba(255, 255, 255, 0.3)";
      currentLowLightCustomization.guidanceCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentLowLightCustomization.guidanceCustomization.buttonBorderColor = backgroundColor;
      currentLowLightCustomization.guidanceCustomization.readyScreenOvalFillColor = "transparent";
      currentLowLightCustomization.guidanceCustomization.readyScreenTextBackgroundColor = primaryColor;
      currentLowLightCustomization.guidanceCustomization.retryScreenImageBorderColor = backgroundColor;
      currentLowLightCustomization.guidanceCustomization.retryScreenOvalStrokeColor = primaryColor;
      currentLowLightCustomization.guidanceCustomization.retryScreenSlideshowImages = retryScreenSlideshowImages;
      // ID Scan Customization
      currentLowLightCustomization.idScanCustomization.selectionScreenDocumentImage = "";
      currentLowLightCustomization.idScanCustomization.captureScreenForegroundColor = backgroundColor;
      currentLowLightCustomization.idScanCustomization.reviewScreenForegroundColor = backgroundColor;
      currentLowLightCustomization.idScanCustomization.selectionScreenForegroundColor = backgroundColor;
      currentLowLightCustomization.idScanCustomization.buttonTextNormalColor = primaryColor;
      currentLowLightCustomization.idScanCustomization.buttonBackgroundNormalColor = backgroundColor;
      currentLowLightCustomization.idScanCustomization.buttonTextHighlightColor = primaryColor;
      currentLowLightCustomization.idScanCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentLowLightCustomization.idScanCustomization.buttonTextDisabledColor = "rgba(255, 255, 255, 0.3)";
      currentLowLightCustomization.idScanCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentLowLightCustomization.idScanCustomization.buttonBorderColor = backgroundColor;
      currentLowLightCustomization.idScanCustomization.captureScreenTextBackgroundColor = primaryColor;
      currentLowLightCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor = backgroundColor;
      currentLowLightCustomization.idScanCustomization.reviewScreenTextBackgroundColor = primaryColor;
      currentLowLightCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor = backgroundColor;
      currentLowLightCustomization.idScanCustomization.captureFrameStrokeColor = primaryColor;
      currentLowLightCustomization.idScanCustomization.additionalReviewScreenForegroundColor = primaryColor;
      currentLowLightCustomization.idScanCustomization.additionalReviewScreenImage = this.themeResourceDirectory + "sample-bank/review_navy.png";
      currentLowLightCustomization.idScanCustomization.additionalReviewScreenAnimation = null;
      currentLowLightCustomization.idScanCustomization.additionalReviewTagImage = this.themeResourceDirectory + "sample-bank/warning_navy.png";
      currentLowLightCustomization.idScanCustomization.additionalReviewTagImageColor = backgroundColor;
      currentLowLightCustomization.idScanCustomization.additionalReviewTagTextColor = backgroundColor;
      // OCR Confirmation Screen Customization
      currentLowLightCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor = backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.mainHeaderTextColor = backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.sectionHeaderTextColor = backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.fieldLabelTextColor = backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.fieldValueTextColor = backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.inputFieldTextColor = backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor = "rgba(29, 23, 79, 0.4)";
      currentLowLightCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor = "transparent";
      currentLowLightCustomization.ocrConfirmationCustomization.inputFieldBorderColor = backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonTextNormalColor = primaryColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor = backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonTextHighlightColor = primaryColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonTextDisabledColor = "rgba(255, 255, 255, 0.3)";
      currentLowLightCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonBorderColor = backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.customScrollIndicatorAnimation = null;
      currentLowLightCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundNormalColor = backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundHighlightColor = backgroundColorLight;
      currentLowLightCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundNormalColor = primaryColor;
      currentLowLightCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundHighlightColor = primaryColor;
      currentLowLightCustomization.ocrConfirmationCustomization.scrollIndicatorBorderColor = "transparent";
      // Result Screen Customization
      currentLowLightCustomization.resultScreenCustomization.foregroundColor = backgroundColor;
      currentLowLightCustomization.resultScreenCustomization.activityIndicatorColor = backgroundColor;
      currentLowLightCustomization.resultScreenCustomization.customActivityIndicatorImage = this.themeResourceDirectory + "sample-bank/activity_indicator_navy.png";
      currentLowLightCustomization.resultScreenCustomization.customActivityIndicatorAnimation = null;
      currentLowLightCustomization.resultScreenCustomization.resultAnimationBackgroundColor = "transparent";
      currentLowLightCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundColor = "transparent";
      currentLowLightCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundColor = "transparent";
      currentLowLightCustomization.resultScreenCustomization.resultAnimationForegroundColor = backgroundColor;
      currentLowLightCustomization.resultScreenCustomization.resultAnimationUnsuccessForegroundColor = backgroundColor;
      currentLowLightCustomization.resultScreenCustomization.resultAnimationIDScanSuccessForegroundColor = backgroundColor;
      currentLowLightCustomization.resultScreenCustomization.sessionAbortAnimationForegroundColor = backgroundColor;
      currentLowLightCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage = this.themeResourceDirectory + "sample-bank/reticle_navy.png";
      currentLowLightCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage = this.themeResourceDirectory + "sample-bank/reticle_navy.png";
      currentLowLightCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundImage = this.themeResourceDirectory + "sample-bank/reticle_navy.png";
      currentLowLightCustomization.resultScreenCustomization.customResultAnimationIDScanSuccess = null;
      currentLowLightCustomization.resultScreenCustomization.customResultAnimationSuccess = null;
      currentLowLightCustomization.resultScreenCustomization.customResultAnimationUnsuccess = null;
      currentLowLightCustomization.resultScreenCustomization.customSessionAbortAnimation = null;
      currentLowLightCustomization.resultScreenCustomization.uploadProgressTrackColor = "rgba(0, 0, 0, 0.2)";
      currentLowLightCustomization.resultScreenCustomization.uploadProgressFillColor = backgroundColor;
      // Feedback Customization
      currentLowLightCustomization.feedbackCustomization.backgroundColor = backgroundColor;
      currentLowLightCustomization.feedbackCustomization.textColor = primaryColor;
      // Frame Customization
      currentLowLightCustomization.frameCustomization.borderColor = backgroundColor;
      // Oval Customization
      currentLowLightCustomization.ovalCustomization.strokeColor = backgroundColor;
      currentLowLightCustomization.ovalCustomization.progressColor1 = "rgba(29, 23, 79, 0.8)";
      currentLowLightCustomization.ovalCustomization.progressColor2 = "rgba(29, 23, 79, 0.8)";
      // Cancel Button Customization
      currentLowLightCustomization.cancelButtonCustomization.customImage = this.themeResourceDirectory + "sample-bank/cancel_navy.png";
      // Orientation Screen Customization
      currentLowLightCustomization.orientationScreenCustomization.foregroundColor = backgroundColor;
      currentLowLightCustomization.orientationScreenCustomization.iconImage = "/assets/10.0.42/core-sdk/FaceTec_images/FaceTec_rotate.png";
    }
    else if (theme == "Oiti-Dark") {
      // Mais contraste
      currentLowLightCustomization.ovalCustomization.strokeColor = '#FFFFFF';

      // Feedback mais visível
      currentLowLightCustomization.feedbackCustomization.backgroundColor = '#000000';
      currentLowLightCustomization.feedbackCustomization.textColor = '#FFFFFF';

      // Botões mais claros
      currentLowLightCustomization.guidanceCustomization.buttonBackgroundNormalColor = '#FFFFFF';
      currentLowLightCustomization.guidanceCustomization.buttonTextNormalColor = '#000000';

      // Frame mais destacado
      currentLowLightCustomization.frameCustomization.borderColor = '#FFFFFF';

      currentLowLightCustomization.guidanceCustomization.foregroundColor = '#FFFFFF';
      currentLowLightCustomization.guidanceCustomization.readyScreenHeaderTextColor = '#FFFFFF';
      currentLowLightCustomization.guidanceCustomization.readyScreenSubtextTextColor = '#FFFFFF';
      currentLowLightCustomization.guidanceCustomization.retryScreenHeaderTextColor = '#FFFFFF';
      currentLowLightCustomization.guidanceCustomization.retryScreenSubtextTextColor = '#FFFFFF';
    }

    return currentLowLightCustomization;
  };

  private getDynamicDimmingCustomizationForTheme = (theme: string): FaceTecCustomization => {
    var currentDynamicDimmingCustomization: FaceTecCustomization = this.getCustomizationForTheme(theme);

    const retryScreenSlideshowImages: string[] = [this.themeResourceDirectory + "FaceTec_ideal_1.png", this.themeResourceDirectory + "FaceTec_ideal_2.png", this.themeResourceDirectory + "FaceTec_ideal_3.png", this.themeResourceDirectory + "FaceTec_ideal_4.png", this.themeResourceDirectory + "FaceTec_ideal_5.png"];

    if (theme === "Config Wizard Theme") {
      currentDynamicDimmingCustomization = Config.retrieveDynamicDimmingConfigurationWizardCustomization(FaceTecSDK);
    }
    else if (theme === "Sample Bank") {
      const primaryColor: string = "black";
      const backgroundColor: string = "rgb(29, 23, 79)"; // Navy
      const backgroundColorLight: string = "rgba(29, 23, 79, 0.8)"; // Lighter navy

      // OCR Confirmation Screen Customization
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.customScrollIndicatorAnimation = null;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundNormalColor = backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundHighlightColor = backgroundColorLight;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundNormalColor = primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundHighlightColor = primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorBorderColor = "transparent";
    }
    else if (theme === "Oiti-Dark") {
      // Leve ajuste no oval
      currentDynamicDimmingCustomization.ovalCustomization.progressColor1 = '#05D758';
      currentDynamicDimmingCustomization.ovalCustomization.progressColor2 = '#A5F2C5';

      // Feedback adaptável
      currentDynamicDimmingCustomization.feedbackCustomization.shadow = '0px 3px 15px rgba(0,0,0,0.5)';

      currentDynamicDimmingCustomization.guidanceCustomization.foregroundColor = '#F5F5F5';

      currentDynamicDimmingCustomization.feedbackCustomization.textColor = '#F5F5F5';

      currentDynamicDimmingCustomization.resultScreenCustomization.foregroundColor = '#F5F5F5';
    }

    return currentDynamicDimmingCustomization;
  };

  public showNewTheme = (): void => {
    var themes: string[] = ["Config Wizard Theme", "FaceTec Theme", "Pseudo-Fullscreen", "Well-Rounded", "Bitcoin Exchange", "eKYC", "Sample Bank"];
    var currentThemeIndex: number = themes.indexOf(this.currentTheme);
    currentThemeIndex = currentThemeIndex >= themes.length - 1 ? 0 : currentThemeIndex + 1;
    this.currentTheme = themes[currentThemeIndex];
    this.setAppTheme(this.currentTheme);
    this.updateThemeTransitionView();
    DeveloperStatusMessages.logAndDisplayMessage("Theme set to: " + this.currentTheme);
  };

  private updateThemeTransitionView = (): void => {
    var transitionViewImage: string = "";
    var transitionViewClass: string = "theme-transition-overlay__";
    var deviceType: string = "desktop";

    if (SampleAppUtilities.isLikelyMobileDevice() === true) {
      deviceType = "mobile";
    }

    switch (this.currentTheme) {
      case "FaceTec Theme":
        transitionViewClass = "default";
        break;
      case "Pseudo-Fullscreen":
        transitionViewClass += "default";
        break;
      case "Well-Rounded":
        transitionViewImage = this.themeResourceDirectory + "well-rounded/well_rounded_" + deviceType + "_bg.svg";
        transitionViewClass += "well-rounded";
        break;
      case "Bitcoin Exchange":
        transitionViewImage = this.themeResourceDirectory + "bitcoin-exchange/bitcoin_exchange_" + deviceType + "_bg.svg";
        transitionViewClass += "bitcoin-exchange";
        break;
      case "eKYC":
        transitionViewImage = this.themeResourceDirectory + "ekyc/ekyc_" + deviceType + "_bg.svg";
        transitionViewClass += "ekyc";
        break;
      case "Sample Bank":
        transitionViewImage = this.themeResourceDirectory + "sample-bank/sample_bank_" + deviceType + "_bg.svg";
        transitionViewClass += "sample-bank";
        break;
      default:
        transitionViewClass = "default";
        break;
    }

    transitionViewClass += "__" + deviceType;

    (document.getElementById("theme-transition-overlay-img") as HTMLImageElement).src = transitionViewImage;
    (document.getElementById("theme-transition-overlay") as HTMLElement).className = transitionViewClass;
  };

  public getCurrentTheme = (): string => {
    return this.currentTheme;
  };
}
