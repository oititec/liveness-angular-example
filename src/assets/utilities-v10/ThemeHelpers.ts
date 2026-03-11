import { Config } from "../../../config-v10/Config";
import { FaceTecSDK } from "../core-sdk/FaceTecSDK.js/FaceTecSDK";
import { FaceTecCustomization } from "../core-sdk/FaceTecSDK.js/FaceTecCustomization";
import { SampleAppUtilities } from "./SampleAppUtilities";
import { SoundFileUtilities } from "./SoundFileUtilities";
import { DeveloperStatusMessages } from "./DeveloperStatusMessages";

export class ThemeHelpers {
  // Set the default theme
  private currentTheme: string = "Config Wizard Theme";
  private themeResourceDirectory: string = "../../sample-app-resources/images/themes/";

  // Save the current app theme in Config and update the SDK
  public setAppTheme = (theme: string): void => {
    Config.currentCustomization = this.getCustomizationForTheme(theme);
    Config.currentLowLightCustomization = this.getLowLightCustomizationForTheme(theme);
    Config.currentDynamicDimmingCustomization = this.getDynamicDimmingCustomizationForTheme(theme);

    FaceTecSDK.setCustomization(Config.currentCustomization);
    FaceTecSDK.setLowLightCustomization(Config.currentLowLightCustomization);
    FaceTecSDK.setDynamicDimmingCustomization(Config.currentDynamicDimmingCustomization);
  };

  // Get customizations for themes
  private getCustomizationForTheme = (theme: string): FaceTecCustomization => {
    var currentCustomization: FaceTecCustomization = new FaceTecSDK.FaceTecCustomization();

    // Add sound customization to the new theme customization
    var soundFileUtilities: SoundFileUtilities = new SoundFileUtilities();
    // currentCustomization = soundFileUtilities.setVocalGuidanceSoundFiles(currentCustomization);

    const retryScreenSlideshowImages: string[] = [this.themeResourceDirectory + "FaceTec_ideal_1.png", this.themeResourceDirectory + "FaceTec_ideal_2.png", this.themeResourceDirectory + "FaceTec_ideal_3.png", this.themeResourceDirectory + "FaceTec_ideal_4.png", this.themeResourceDirectory + "FaceTec_ideal_5.png"];

    if (theme === "Config Wizard Theme") {
      currentCustomization = Config.retrieveConfigurationWizardCustomization(FaceTecSDK);
    }
    else if (theme === "FaceTec Theme") {
      // Do nothing
    }
    else if (theme === "Pseudo-Fullscreen") {
      const primaryColor: string = "rgb(43, 43, 43)"; // Black
      const primaryColorLight: string = "rgb(86, 86, 86)"; // Lighter black
      const secondaryColor: string = "rgb(59, 195, 113)"; // Green
      const backgroundColor: string = "rgb(238, 246, 248)"; // White
      const buttonBackgroundDisabledColor: string = "rgb(173, 173, 173)";
      const buttonBackgroundHighlightColor: string = primaryColorLight;
      const font: string = "Futura,'Trebuchet MS',Arial,sans-serif";
      const shadow: string = "0px 3px 10px black";

      var activityIndicatorSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      activityIndicatorSVG.setAttribute("viewBox", "0 0 52 52");
      activityIndicatorSVG.classList.add("pseudo-fullscreen-activity-indicator-svg");
      activityIndicatorSVG.innerHTML = "<circle class='path' cx='26' cy='26' r='22'></circle>";

      var uploadActivityIndicatorSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      uploadActivityIndicatorSVG.setAttribute("viewBox", "0 0 52 52");
      uploadActivityIndicatorSVG.classList.add("pseudo-fullscreen-activity-indicator-svg");
      uploadActivityIndicatorSVG.innerHTML = "<circle class='path' cx='26' cy='26' r='22'></circle>";

      var successResultAnimationSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      successResultAnimationSVG.setAttribute("viewBox", "0 0 52 52");
      successResultAnimationSVG.classList.add("pseudo-fullscreen-success-svg");
      successResultAnimationSVG.innerHTML = "<circle class='circlePath' cx='26' cy='26' r='22'></circle><path class='checkmarkPath' d='M14.1 27.2l7.1 7.2 16.7-16.8'></path>";

      var unsuccessResultAnimationSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      unsuccessResultAnimationSVG.setAttribute("viewBox", "0 0 52 52");
      unsuccessResultAnimationSVG.classList.add("pseudo-fullscreen-unsuccess-svg");
      unsuccessResultAnimationSVG.innerHTML = "<circle class='circlePath' cx='26' cy='26' r='22'></circle><line class='crossPath1' x1='18' y1='18' x2='34' y2='34'></line><line class='crossPath2' x1='34' y1='18' x2='18' y2='34'></line>";

      // Initial Loading Animation Customization
      currentCustomization.initialLoadingAnimationCustomization.customAnimation = activityIndicatorSVG;
      currentCustomization.initialLoadingAnimationCustomization.animationRelativeScale = 1.0;
      currentCustomization.initialLoadingAnimationCustomization.backgroundColor = primaryColor;
      currentCustomization.initialLoadingAnimationCustomization.foregroundColor = backgroundColor;
      currentCustomization.initialLoadingAnimationCustomization.messageTextColor = primaryColor;
      currentCustomization.initialLoadingAnimationCustomization.messageFont = font;
      // Overlay Customization
      currentCustomization.overlayCustomization.backgroundColor = backgroundColor;
      currentCustomization.overlayCustomization.showBrandingImage = false;
      currentCustomization.overlayCustomization.brandingImage = "";
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
      currentCustomization.guidanceCustomization.buttonTextDisabledColor = backgroundColor;
      currentCustomization.guidanceCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentCustomization.guidanceCustomization.buttonBorderColor = "transparent";
      currentCustomization.guidanceCustomization.buttonBorderWidth = "0px";
      currentCustomization.guidanceCustomization.buttonCornerRadius = "20px";
      currentCustomization.guidanceCustomization.readyScreenOvalFillColor = "transparent";
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundColor = backgroundColor;
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundCornerRadius = "5px";
      currentCustomization.guidanceCustomization.retryScreenImageBorderColor = primaryColor;
      currentCustomization.guidanceCustomization.retryScreenImageBorderWidth = "2px";
      currentCustomization.guidanceCustomization.retryScreenImageCornerRadius = "10px";
      currentCustomization.guidanceCustomization.retryScreenOvalStrokeColor = backgroundColor;
      currentCustomization.guidanceCustomization.retryScreenSlideshowImages = retryScreenSlideshowImages;
      currentCustomization.guidanceCustomization.retryScreenSlideshowInterval = "2000ms";
      currentCustomization.guidanceCustomization.enableRetryScreenSlideshowShuffle = true;
      currentCustomization.guidanceCustomization.cameraPermissionsScreenImage = this.themeResourceDirectory + "pseudo-fullscreen/camera_shutter_black.png";
      currentCustomization.guidanceCustomization.cameraFeedIssueScreenImage = this.themeResourceDirectory + "pseudo-fullscreen/camera_shutter_black.png";
      // ID Scan Customization
      currentCustomization.idScanCustomization.showSelectionScreenDocumentImage = true;
      currentCustomization.idScanCustomization.selectionScreenDocumentImage = this.themeResourceDirectory + "pseudo-fullscreen/document_offblack.png";
      currentCustomization.idScanCustomization.selectionScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.captureScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.reviewScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.selectionScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.headerFont = font;
      currentCustomization.idScanCustomization.subtextFont = font;
      currentCustomization.idScanCustomization.buttonFont = font;
      currentCustomization.idScanCustomization.buttonTextNormalColor = backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundNormalColor = primaryColor;
      currentCustomization.idScanCustomization.buttonTextHighlightColor = backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentCustomization.idScanCustomization.buttonTextDisabledColor = backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentCustomization.idScanCustomization.buttonBorderColor = "transparent";
      currentCustomization.idScanCustomization.buttonBorderWidth = "0px";
      currentCustomization.idScanCustomization.buttonCornerRadius = "20px";
      currentCustomization.idScanCustomization.captureScreenTextBackgroundColor = backgroundColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor = primaryColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderWidth = "2px";
      currentCustomization.idScanCustomization.captureScreenTextBackgroundCornerRadius = "5px";
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundColor = backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor = primaryColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderWidth = "2px";
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderCornerRadius = "5px";
      currentCustomization.idScanCustomization.captureScreenBackgroundColor = backgroundColor;
      currentCustomization.idScanCustomization.captureFrameStrokeColor = primaryColor;
      currentCustomization.idScanCustomization.captureFrameStrokeWidth = "2px";
      currentCustomization.idScanCustomization.captureFrameCornerRadius = "12px";
      currentCustomization.idScanCustomization.additionalReviewScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.additionalReviewScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.additionalReviewScreenImage = this.themeResourceDirectory + "pseudo-fullscreen/review_offblack.png";
      currentCustomization.idScanCustomization.additionalReviewScreenAnimation = null;
      currentCustomization.idScanCustomization.idFeedbackScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.idFeedbackScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.idFeedbackScreenFlipIDFrontImage = "";
      currentCustomization.idScanCustomization.idFeedbackScreenFlipIDBackImage = "";
      currentCustomization.idScanCustomization.idFeedbackScreenFlipIDToBackAnimation = null;
      currentCustomization.idScanCustomization.idFeedbackScreenFlipIDToFrontAnimation = null;
      currentCustomization.idScanCustomization.additionalReviewScreenAnimationDisplayTime = 2.0;
      currentCustomization.idScanCustomization.idFeedbackScreenAnimationDisplayTime = 2.0;
      currentCustomization.idScanCustomization.enableAdditionalReviewTag = false;
      currentCustomization.idScanCustomization.additionalReviewTagImage = "";
      currentCustomization.idScanCustomization.additionalReviewTagImageColor = primaryColor;
      currentCustomization.idScanCustomization.additionalReviewTagTextColor = primaryColor;
      // OCR Confirmation Screen Customization
      currentCustomization.ocrConfirmationCustomization.backgroundColors = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor = secondaryColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineWidth = "2px";
      currentCustomization.ocrConfirmationCustomization.mainHeaderFont = font;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderFont = font;
      currentCustomization.ocrConfirmationCustomization.fieldLabelFont = font;
      currentCustomization.ocrConfirmationCustomization.fieldValueFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderFont = font;
      currentCustomization.ocrConfirmationCustomization.mainHeaderTextColor = secondaryColor;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderTextColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldLabelTextColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldValueTextColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldTextColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor = "rgba(59, 195, 113, 0.4)";
      currentCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor = "transparent";
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderColor = secondaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderWidth = "2px";
      currentCustomization.ocrConfirmationCustomization.inputFieldCornerRadius = "0px";
      currentCustomization.ocrConfirmationCustomization.showInputFieldBottomBorderOnly = true;
      currentCustomization.ocrConfirmationCustomization.buttonFont = font;
      currentCustomization.ocrConfirmationCustomization.buttonTextNormalColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextHighlightColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextDisabledColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentCustomization.ocrConfirmationCustomization.buttonBorderColor = "transparent";
      currentCustomization.ocrConfirmationCustomization.buttonBorderWidth = "0px";
      currentCustomization.ocrConfirmationCustomization.buttonCornerRadius = "20px";
      currentCustomization.ocrConfirmationCustomization.customScrollIndicatorAnimation = null;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundNormalColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundHighlightColor = primaryColorLight;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundNormalColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundHighlightColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBorderColor = "transparent";
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBorderWidth = "0px";
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorCornerRadius = "-1";
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorFont = font;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorShadow = shadow;
      currentCustomization.ocrConfirmationCustomization.enableScrollIndicator = true;
      currentCustomization.ocrConfirmationCustomization.enableScrollIndicatorTextAnimation = false;
      currentCustomization.ocrConfirmationCustomization.enableFixedConfirmButton = false;
      currentCustomization.ocrConfirmationCustomization.showScrollIndicatorImage = true;
      // Result Screen Customization
      currentCustomization.resultScreenCustomization.backgroundColors = backgroundColor;
      currentCustomization.resultScreenCustomization.foregroundColor = primaryColor;
      currentCustomization.resultScreenCustomization.messageFont = font;
      currentCustomization.resultScreenCustomization.activityIndicatorColor = primaryColor;
      currentCustomization.resultScreenCustomization.customActivityIndicatorImage = this.themeResourceDirectory + "pseudo-fullscreen/activity_indicator_faded_black.png";
      currentCustomization.resultScreenCustomization.customActivityIndicatorRotationInterval = "0.8s";
      currentCustomization.resultScreenCustomization.customActivityIndicatorAnimation = uploadActivityIndicatorSVG;
      currentCustomization.resultScreenCustomization.resultAnimationBackgroundColor = secondaryColor;
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundColor = secondaryColor;
      currentCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundColor = secondaryColor;
      currentCustomization.resultScreenCustomization.resultAnimationForegroundColor = backgroundColor;
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessForegroundColor = backgroundColor;
      currentCustomization.resultScreenCustomization.resultAnimationIDScanSuccessForegroundColor = backgroundColor;
      currentCustomization.resultScreenCustomization.sessionAbortAnimationForegroundColor = backgroundColor;
      currentCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage = "";
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage = "";
      currentCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundImage = "";
      currentCustomization.resultScreenCustomization.customResultAnimationIDScanSuccess = successResultAnimationSVG;
      currentCustomization.resultScreenCustomization.customResultAnimationSuccess = successResultAnimationSVG;
      currentCustomization.resultScreenCustomization.customResultAnimationUnsuccess = unsuccessResultAnimationSVG;
      currentCustomization.resultScreenCustomization.customSessionAbortAnimation = unsuccessResultAnimationSVG;
      currentCustomization.resultScreenCustomization.showUploadProgressBar = true;
      currentCustomization.resultScreenCustomization.uploadProgressTrackColor = "rgba(0, 0, 0, 0.2)";
      currentCustomization.resultScreenCustomization.uploadProgressFillColor = secondaryColor;
      currentCustomization.resultScreenCustomization.animationRelativeScale = 1.0;
      currentCustomization.resultScreenCustomization.resultAnimationDisplayTime = 2.0;
      currentCustomization.resultScreenCustomization.faceScanStillUploadingMessageDelayTime = 6.0;
      currentCustomization.resultScreenCustomization.idScanStillUploadingMessageDelayTime = 8.0;
      // Feedback Customization
      currentCustomization.feedbackCustomization.backgroundColor = secondaryColor;
      currentCustomization.feedbackCustomization.textColor = backgroundColor;
      currentCustomization.feedbackCustomization.textFont = font;
      currentCustomization.feedbackCustomization.cornerRadius = "5px";
      currentCustomization.feedbackCustomization.shadow = "0px 3px 10px black";
      // Frame Customization
      currentCustomization.frameCustomization.backgroundColor = backgroundColor;
      currentCustomization.frameCustomization.borderColor = primaryColor;
      currentCustomization.frameCustomization.borderWidth = "0px";
      currentCustomization.frameCustomization.borderCornerRadius = "0px";
      currentCustomization.frameCustomization.shadow = "none";
      // Oval Customization
      currentCustomization.ovalCustomization.strokeColor = primaryColor;
      currentCustomization.ovalCustomization.progressColor1 = "rgba(59, 195, 113, 0.7)";
      currentCustomization.ovalCustomization.progressColor2 = "rgba(59, 195, 113, 0.7)";
      // Cancel Button Customization
      currentCustomization.cancelButtonCustomization.customImage = this.themeResourceDirectory + "pseudo-fullscreen/single_chevron_left_black.png";
      currentCustomization.cancelButtonCustomization.location = FaceTecSDK.FaceTecCancelButtonLocation.Custom;
      currentCustomization.cancelButtonCustomization.setCustomLocation(20, 20, 20, 20);
      currentCustomization.cancelButtonCustomization.hideForCameraPermissions = false;
      // Orientation Screen Customization
      currentCustomization.orientationScreenCustomization.backgroundColors = backgroundColor;
      currentCustomization.orientationScreenCustomization.foregroundColor = primaryColor;
      currentCustomization.orientationScreenCustomization.iconImage = "";
      currentCustomization.orientationScreenCustomization.messageFont = font;

      // Guidance Customization -- Text Style Overrides
      // Ready Screen Header
      currentCustomization.guidanceCustomization.readyScreenHeaderFont = font;
      currentCustomization.guidanceCustomization.readyScreenHeaderTextColor = primaryColor;
      // Ready Screen Subtext
      currentCustomization.guidanceCustomization.readyScreenSubtextFont = font;
      currentCustomization.guidanceCustomization.readyScreenSubtextTextColor = "#565656";
      // Retry Screen Header
      currentCustomization.guidanceCustomization.retryScreenHeaderFont = font;
      currentCustomization.guidanceCustomization.retryScreenHeaderTextColor = primaryColor;
      // Retry Screen Subtext
      currentCustomization.guidanceCustomization.retryScreenSubtextFont = font;
      currentCustomization.guidanceCustomization.retryScreenSubtextTextColor = "#565656";
      // Security Watermark Customization
      currentCustomization.securityWatermarkCustomization.setSecurityWatermarkImage(FaceTecSDK.FaceTecSecurityWatermarkImage.FaceTec);
    }
    else if (theme === "Well-Rounded") {
      const primaryColor: string = "rgb(9, 181, 163)"; // Green
      const primaryColorLight: string = "rgb(49, 221, 203)"; // Lighter green
      const primaryColorDark: string = "rgb(0, 141, 123)"; // Darker green
      const backgroundColor: string = "white";
      const buttonBackgroundDisabledColor: string = primaryColorDark;
      const buttonBackgroundHighlightColor: string = primaryColorLight;
      const font: string = "'Source Sans Pro', Helvetica, sans-serif";
      const shadow: string = "0px 2px 8px 2px rgb(0, 0, 0, 0.4)";

      var successResultAnimationSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      successResultAnimationSVG.setAttribute("viewBox", "0 0 52 52");
      successResultAnimationSVG.classList.add("well-rounded-success-svg");
      successResultAnimationSVG.innerHTML = "<circle class='circlePath' cx='26' cy='26' r='19'></circle><path class='checkmarkPath' d='M16.1 27.7l5.1 6.2 13.7-13.3'></path>";

      var unsuccessResultAnimationSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      unsuccessResultAnimationSVG.setAttribute("viewBox", "0 0 52 52");
      unsuccessResultAnimationSVG.classList.add("well-rounded-unsuccess-svg");
      unsuccessResultAnimationSVG.innerHTML = "<circle class='circlePath' cx='26' cy='26' r='19'></circle><line class='crossPath1' x1='18' y1='18' x2='34' y2='34'></line><line class='crossPath2' x1='34' y1='18' x2='18' y2='34'></line>";

      var activityIndicatorSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      activityIndicatorSVG.setAttribute("viewBox", "0 0 52 52");
      activityIndicatorSVG.classList.add("well-rounded-activity-indicator-svg");
      activityIndicatorSVG.innerHTML = "<circle class='circleTrackPath' cx='26' cy='26' r='19'/><circle class='circleFillPath' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='2s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite'/></circle>";

      var uploadActivityIndicatorSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      uploadActivityIndicatorSVG.setAttribute("viewBox", "0 0 52 52");
      uploadActivityIndicatorSVG.classList.add("well-rounded-activity-indicator-svg");
      uploadActivityIndicatorSVG.innerHTML = "<circle class='circleTrackPath' cx='26' cy='26' r='19'/><circle class='circleFillPath' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='2s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite'/></circle>";

      var additionalReviewSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      additionalReviewSVG.setAttribute("viewBox", "0 0 122.93 79.21");
      additionalReviewSVG.innerHTML = "<defs><style>.d{fill:#ccc;}.e{stroke:#cbcbcb;stroke-width:4px;}.e,.f{fill:none;stroke-miterlimit:10;}.f{stroke:#ccc;}.d1{stroke-linecap:round;stroke-linejoin:round;}.d1,.e1{fill:none;stroke:#09B5A3;stroke-width:5px;}.e1{stroke-miterlimit:10;}</style></defs><g id='a'/><g id='b'><g id='c'><g><rect class='e' x='24.05' y='-19.75' width='74.82' height='118.7' rx='6.7' ry='6.7' transform='translate(100.84 -22.01) rotate(89.79)'/><g><g><rect class='d' x='50.05' y='58.39' width='20.25' height='3.4' rx='.88' ry='.88' transform='translate(-.22 .22) rotate(-.21)'/><rect class='d' x='99.86' y='38.43' width='11.96' height='3.4' rx='.88' ry='.88' transform='translate(-.15 .39) rotate(-.21)'/><rect class='d' x='99.82' y='28.53' width='11.96' height='3.4' rx='.88' ry='.88' transform='translate(-.11 .39) rotate(-.21)'/><rect class='d' x='50.01' y='48.46' width='37.84' height='3.4' rx='.88' ry='.88' transform='translate(-.18 .25) rotate(-.21)'/><rect class='d' x='49.98' y='38.57' width='37.84' height='3.4' rx='.88' ry='.88' transform='translate(-.15 .25) rotate(-.21)'/><rect class='d' x='49.94' y='28.67' width='37.84' height='3.4' rx='.88' ry='.88' transform='translate(-.11 .25) rotate(-.21)'/></g><path class='d' d='M25.13,31.3c-7.76,.03-14.06,6.37-14.02,14.13,.04,7.75,6.35,14.03,14.09,14.02,7.74-.01,14.08-6.29,14.06-14.12-.03-7.78-6.36-14.05-14.12-14.02Zm6.85,25.16c-1.29,.79-2.68,1.34-4.16,1.65-.86,.18-1.73,.27-2.62,.27-2.43,0-4.68-.63-6.77-1.87-.17-.1-.23-.19-.17-.4,.34-1.2,.69-2.41,1.15-3.57,.54-1.37,1.15-2.71,2.03-3.9,.28-.38,.57-.74,.85-1.12,.08-.1,.14-.11,.26-.05,1.72,.84,3.45,.82,5.17,0,.15-.07,.22-.05,.32,.07,1.02,1.31,1.9,2.7,2.54,4.25,.6,1.45,1.08,2.93,1.49,4.43,.04,.14-.01,.18-.11,.24Zm-10.15-10.85c-2.33-2.19-2.4-6.13-.16-8.41,2.15-2.18,5.55-1.97,7.41,.48,.8,1.05,1.22,2.29,1.23,3.63-.03,1.79-.64,3.33-2.02,4.51-1.92,1.63-4.61,1.54-6.46-.2Zm11.24,10.1c-.11-.37-.22-.74-.34-1.11-.32-1.04-.68-2.06-1.1-3.06-.56-1.35-1.28-2.61-2.12-3.81-.21-.3-.46-.57-.7-.84-.09-.1-.07-.14,.02-.23,1.72-1.47,2.54-3.35,2.45-5.59-.1-2.49-1.19-4.47-3.4-5.72-2.35-1.33-5.32-.77-7.18,1.3-2.53,2.82-2.28,7.4,.53,9.84q.3,.26,.05,.57c-.65,.82-1.22,1.69-1.75,2.59-.26,.43-.42,.91-.63,1.37-.65,1.46-1.11,2.97-1.56,4.5-.02,.06-.04,.13-.06,.2-3.65-2.67-6.15-7.83-4.8-13.47,1.36-5.67,6.49-9.79,12.36-9.92,6.04-.13,11.15,3.8,12.79,9.27,1.7,5.68-.66,11.2-4.59,14.1Z'/></g><line class='f' x1='7.74' y1='21.19' x2='115.19' y2='21.37'/><rect class='d' x='7.74' y='10.7' width='37.84' height='3.4' rx='.88' ry='.88' transform='translate(-.05 .1) rotate(-.21)'/></g></g></g><g id='a1'/><g id='b1' transform='translate(0 19.5)'><g id='c1'><g><circle class='e1' cx='25.71' cy='25.71' r='23.21'/><line class='d1' x1='42.42' y1='43.28' x2='52.55' y2='53.41'/><animateTransform attributeName='transform' attributeType='XML' dur='1.5s' type='translate' begin='indefinite' from='0 0' to='64.5 0' calcmode='spline' keysplines='0.42,0,0.58,1' keyTimes='0;1' fill='freeze'></animateTransform></g></g></g>";

      // Initial Loading Animation Customization
      currentCustomization.initialLoadingAnimationCustomization.customAnimation = activityIndicatorSVG;
      currentCustomization.initialLoadingAnimationCustomization.animationRelativeScale = 2.0;
      currentCustomization.initialLoadingAnimationCustomization.backgroundColor = "transparent";
      currentCustomization.initialLoadingAnimationCustomization.foregroundColor = backgroundColor;
      currentCustomization.initialLoadingAnimationCustomization.messageTextColor = backgroundColor;
      currentCustomization.initialLoadingAnimationCustomization.messageFont = font;
      // Overlay Customization
      currentCustomization.overlayCustomization.backgroundColor = "transparent";
      currentCustomization.overlayCustomization.showBrandingImage = false;
      currentCustomization.overlayCustomization.brandingImage = "";
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
      currentCustomization.guidanceCustomization.buttonTextDisabledColor = "rgb(215, 215, 215)";
      currentCustomization.guidanceCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentCustomization.guidanceCustomization.buttonBorderColor = "transparent";
      currentCustomization.guidanceCustomization.buttonBorderWidth = "0px";
      currentCustomization.guidanceCustomization.buttonCornerRadius = "20px";
      currentCustomization.guidanceCustomization.readyScreenOvalFillColor = "transparent";
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundColor = backgroundColor;
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundCornerRadius = "5px";
      currentCustomization.guidanceCustomization.retryScreenImageBorderColor = primaryColor;
      currentCustomization.guidanceCustomization.retryScreenImageBorderWidth = "2px";
      currentCustomization.guidanceCustomization.retryScreenImageCornerRadius = "10px";
      currentCustomization.guidanceCustomization.retryScreenOvalStrokeColor = backgroundColor;
      currentCustomization.guidanceCustomization.retryScreenSlideshowImages = [];
      currentCustomization.guidanceCustomization.retryScreenSlideshowInterval = "1500ms";
      currentCustomization.guidanceCustomization.enableRetryScreenSlideshowShuffle = true;
      currentCustomization.guidanceCustomization.cameraPermissionsScreenImage = this.themeResourceDirectory + "well-rounded/camera_green.png";
      currentCustomization.guidanceCustomization.cameraFeedIssueScreenImage = this.themeResourceDirectory + "well-rounded/camera_green.png";
      // ID Scan Customization
      currentCustomization.idScanCustomization.showSelectionScreenDocumentImage = true;
      currentCustomization.idScanCustomization.selectionScreenDocumentImage = this.themeResourceDirectory + "well-rounded/document_green.png";
      currentCustomization.idScanCustomization.selectionScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.captureScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.reviewScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.selectionScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.headerFont = font;
      currentCustomization.idScanCustomization.subtextFont = font;
      currentCustomization.idScanCustomization.buttonFont = font;
      currentCustomization.idScanCustomization.buttonTextNormalColor = backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundNormalColor = primaryColor;
      currentCustomization.idScanCustomization.buttonTextHighlightColor = backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentCustomization.idScanCustomization.buttonTextDisabledColor = "rgb(215, 215, 215)";
      currentCustomization.idScanCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentCustomization.idScanCustomization.buttonBorderColor = "transparent";
      currentCustomization.idScanCustomization.buttonBorderWidth = "0px";
      currentCustomization.idScanCustomization.buttonCornerRadius = "20px";
      currentCustomization.idScanCustomization.captureScreenTextBackgroundColor = backgroundColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor = primaryColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderWidth = "2px";
      currentCustomization.idScanCustomization.captureScreenTextBackgroundCornerRadius = "5px";
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundColor = backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor = primaryColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderWidth = "2px";
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderCornerRadius = "5px";
      currentCustomization.idScanCustomization.captureScreenBackgroundColor = backgroundColor;
      currentCustomization.idScanCustomization.captureFrameStrokeColor = primaryColor;
      currentCustomization.idScanCustomization.captureFrameStrokeWidth = "2px";
      currentCustomization.idScanCustomization.captureFrameCornerRadius = "12px";
      currentCustomization.idScanCustomization.additionalReviewScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.additionalReviewScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.additionalReviewScreenImage = "";
      currentCustomization.idScanCustomization.additionalReviewScreenAnimation = additionalReviewSVG;
      currentCustomization.idScanCustomization.idFeedbackScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.idFeedbackScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.idFeedbackScreenFlipIDFrontImage = "";
      currentCustomization.idScanCustomization.idFeedbackScreenFlipIDBackImage = "";
      currentCustomization.idScanCustomization.idFeedbackScreenFlipIDToBackAnimation = null;
      currentCustomization.idScanCustomization.idFeedbackScreenFlipIDToFrontAnimation = null;
      currentCustomization.idScanCustomization.additionalReviewScreenAnimationDisplayTime = 2.0;
      currentCustomization.idScanCustomization.idFeedbackScreenAnimationDisplayTime = 2.0;
      currentCustomization.idScanCustomization.enableAdditionalReviewTag = true;
      currentCustomization.idScanCustomization.additionalReviewTagImage = this.themeResourceDirectory + "well-rounded/warning_green.png";
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
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor = "rgba(9, 181, 163, 0.4)";
      currentCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor = "transparent";
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderWidth = "1px";
      currentCustomization.ocrConfirmationCustomization.inputFieldCornerRadius = "15px";
      currentCustomization.ocrConfirmationCustomization.showInputFieldBottomBorderOnly = false;
      currentCustomization.ocrConfirmationCustomization.buttonFont = font;
      currentCustomization.ocrConfirmationCustomization.buttonTextNormalColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextHighlightColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextDisabledColor = "rgb(215, 215, 215)";
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentCustomization.ocrConfirmationCustomization.buttonBorderColor = "transparent";
      currentCustomization.ocrConfirmationCustomization.buttonBorderWidth = "0px";
      currentCustomization.ocrConfirmationCustomization.buttonCornerRadius = "20px";
      currentCustomization.ocrConfirmationCustomization.customScrollIndicatorAnimation = null;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundNormalColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundHighlightColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundNormalColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundHighlightColor = primaryColorLight;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBorderColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBorderWidth = "2px";
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorCornerRadius = "-1";
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorFont = font;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorShadow = shadow;
      currentCustomization.ocrConfirmationCustomization.enableScrollIndicator = true;
      currentCustomization.ocrConfirmationCustomization.enableScrollIndicatorTextAnimation = true;
      currentCustomization.ocrConfirmationCustomization.enableFixedConfirmButton = false;
      currentCustomization.ocrConfirmationCustomization.showScrollIndicatorImage = true;
      // Result Screen Customization
      currentCustomization.resultScreenCustomization.backgroundColors = backgroundColor;
      currentCustomization.resultScreenCustomization.foregroundColor = primaryColor;
      currentCustomization.resultScreenCustomization.messageFont = font;
      currentCustomization.resultScreenCustomization.activityIndicatorColor = primaryColor;
      currentCustomization.resultScreenCustomization.customActivityIndicatorImage = "";
      currentCustomization.resultScreenCustomization.customActivityIndicatorRotationInterval = "1s";
      currentCustomization.resultScreenCustomization.customActivityIndicatorAnimation = uploadActivityIndicatorSVG;
      currentCustomization.resultScreenCustomization.resultAnimationBackgroundColor = "transparent";
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundColor = "transparent";
      currentCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundColor = "transparent";
      currentCustomization.resultScreenCustomization.resultAnimationForegroundColor = backgroundColor;
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessForegroundColor = backgroundColor;
      currentCustomization.resultScreenCustomization.resultAnimationIDScanSuccessForegroundColor = backgroundColor;
      currentCustomization.resultScreenCustomization.sessionAbortAnimationForegroundColor = backgroundColor;
      currentCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage = "";
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage = "";
      currentCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundImage = "";
      currentCustomization.resultScreenCustomization.customResultAnimationIDScanSuccess = successResultAnimationSVG;
      currentCustomization.resultScreenCustomization.customResultAnimationSuccess = successResultAnimationSVG;
      currentCustomization.resultScreenCustomization.customResultAnimationUnsuccess = unsuccessResultAnimationSVG;
      currentCustomization.resultScreenCustomization.customSessionAbortAnimation = unsuccessResultAnimationSVG;
      currentCustomization.resultScreenCustomization.showUploadProgressBar = false;
      currentCustomization.resultScreenCustomization.uploadProgressTrackColor = "rgba(0, 0, 0, 0.2)";
      currentCustomization.resultScreenCustomization.uploadProgressFillColor = primaryColor;
      currentCustomization.resultScreenCustomization.animationRelativeScale = 2.0;
      currentCustomization.resultScreenCustomization.resultAnimationDisplayTime = 2.0;
      currentCustomization.resultScreenCustomization.faceScanStillUploadingMessageDelayTime = 6.0;
      currentCustomization.resultScreenCustomization.idScanStillUploadingMessageDelayTime = 8.0;
      // Feedback Customization
      currentCustomization.feedbackCustomization.backgroundColor = primaryColor;
      currentCustomization.feedbackCustomization.textColor = backgroundColor;
      currentCustomization.feedbackCustomization.textFont = font;
      currentCustomization.feedbackCustomization.cornerRadius = "5px";
      currentCustomization.feedbackCustomization.shadow = shadow;
      // Frame Customization
      currentCustomization.frameCustomization.backgroundColor = backgroundColor;
      currentCustomization.frameCustomization.borderColor = primaryColor;
      currentCustomization.frameCustomization.borderWidth = "2px";
      currentCustomization.frameCustomization.borderCornerRadius = "20px";
      currentCustomization.frameCustomization.shadow = shadow;
      // Oval Customization
      currentCustomization.ovalCustomization.strokeColor = primaryColor;
      currentCustomization.ovalCustomization.progressColor1 = primaryColor;
      currentCustomization.ovalCustomization.progressColor2 = primaryColor;
      // Cancel Button Customization
      currentCustomization.cancelButtonCustomization.customImage = this.themeResourceDirectory + "well-rounded/cancel_round_green.png";
      currentCustomization.cancelButtonCustomization.location = FaceTecSDK.FaceTecCancelButtonLocation.TopLeft;
      currentCustomization.cancelButtonCustomization.hideForCameraPermissions = false;
      // Orientation Screen Customization
      currentCustomization.orientationScreenCustomization.backgroundColors = backgroundColor;
      currentCustomization.orientationScreenCustomization.foregroundColor = primaryColor;
      currentCustomization.orientationScreenCustomization.iconImage = "";
      currentCustomization.orientationScreenCustomization.messageFont = font;
    }
    else if (theme === "Bitcoin Exchange") {
      const primaryColor: string = "rgb(247, 150, 52)"; // Orange
      const primaryColorLight: string = "rgb(249,179,108)"; // Light orange
      const primaryColorDark: string = "rgb(196,102,8)"; // Dark orange
      const secondaryColor: string = "rgb(255, 255, 30)"; // Yellow
      const backgroundColor: string = "rgb(66, 66, 66)"; // Dark grey
      const backgroundColorLight: string = "rgb(117,117,117)"; // Grey
      const buttonBackgroundDisabledColor: string = primaryColorLight;
      const buttonBackgroundHighlightColor: string = primaryColorDark;
      const font: string = "'Source Sans Pro', Helvetica, sans-serif";
      const shadow: string = "0px 3px 10px rgba(66, 66, 66, 0.6)";

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
      currentCustomization.overlayCustomization.brandingImage = this.themeResourceDirectory + "bitcoin-exchange/bitcoin_exchange_logo.png";
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
      currentCustomization.guidanceCustomization.buttonTextDisabledColor = backgroundColorLight;
      currentCustomization.guidanceCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentCustomization.guidanceCustomization.buttonBorderColor = "transparent";
      currentCustomization.guidanceCustomization.buttonBorderWidth = "0px";
      currentCustomization.guidanceCustomization.buttonCornerRadius = "5px";
      currentCustomization.guidanceCustomization.readyScreenOvalFillColor = "transparent";
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundColor = backgroundColor;
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundCornerRadius = "5px";
      currentCustomization.guidanceCustomization.retryScreenImageBorderColor = primaryColor;
      currentCustomization.guidanceCustomization.retryScreenImageBorderWidth = "2px";
      currentCustomization.guidanceCustomization.retryScreenImageCornerRadius = "5px";
      currentCustomization.guidanceCustomization.retryScreenOvalStrokeColor = primaryColor;
      currentCustomization.guidanceCustomization.retryScreenSlideshowImages = [];
      currentCustomization.guidanceCustomization.retryScreenSlideshowInterval = "1500ms";
      currentCustomization.guidanceCustomization.enableRetryScreenSlideshowShuffle = true;
      currentCustomization.guidanceCustomization.cameraPermissionsScreenImage = this.themeResourceDirectory + "bitcoin-exchange/camera_orange.png";
      currentCustomization.guidanceCustomization.cameraFeedIssueScreenImage = this.themeResourceDirectory + "bitcoin-exchange/camera_orange.png";
      // ID Scan Customization
      currentCustomization.idScanCustomization.showSelectionScreenDocumentImage = true;
      currentCustomization.idScanCustomization.selectionScreenDocumentImage = this.themeResourceDirectory + "bitcoin-exchange/document_orange.png";
      currentCustomization.idScanCustomization.selectionScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.captureScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.reviewScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.selectionScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.headerFont = font;
      currentCustomization.idScanCustomization.subtextFont = font;
      currentCustomization.idScanCustomization.buttonFont = font;
      currentCustomization.idScanCustomization.buttonTextNormalColor = backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundNormalColor = primaryColor;
      currentCustomization.idScanCustomization.buttonTextHighlightColor = backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentCustomization.idScanCustomization.buttonTextDisabledColor = backgroundColorLight;
      currentCustomization.idScanCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentCustomization.idScanCustomization.buttonBorderColor = "transparent";
      currentCustomization.idScanCustomization.buttonBorderWidth = "0px";
      currentCustomization.idScanCustomization.buttonCornerRadius = "5px";
      currentCustomization.idScanCustomization.captureScreenTextBackgroundColor = backgroundColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor = primaryColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderWidth = "0px";
      currentCustomization.idScanCustomization.captureScreenTextBackgroundCornerRadius = "8px";
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundColor = backgroundColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor = primaryColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderWidth = "0px";
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderCornerRadius = "8px";
      currentCustomization.idScanCustomization.captureScreenBackgroundColor = backgroundColor;
      currentCustomization.idScanCustomization.captureFrameStrokeColor = primaryColor;
      currentCustomization.idScanCustomization.captureFrameStrokeWidth = "2px";
      currentCustomization.idScanCustomization.captureFrameCornerRadius = "12px";
      currentCustomization.idScanCustomization.additionalReviewScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.additionalReviewScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.additionalReviewScreenImage = "";
      currentCustomization.idScanCustomization.additionalReviewScreenAnimation = null;
      currentCustomization.idScanCustomization.idFeedbackScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.idFeedbackScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.idFeedbackScreenFlipIDFrontImage = "";
      currentCustomization.idScanCustomization.idFeedbackScreenFlipIDBackImage = "";
      currentCustomization.idScanCustomization.idFeedbackScreenFlipIDToBackAnimation = null;
      currentCustomization.idScanCustomization.idFeedbackScreenFlipIDToFrontAnimation = null;
      currentCustomization.idScanCustomization.additionalReviewScreenAnimationDisplayTime = 2.0;
      currentCustomization.idScanCustomization.idFeedbackScreenAnimationDisplayTime = 2.0;
      currentCustomization.idScanCustomization.enableAdditionalReviewTag = true;
      currentCustomization.idScanCustomization.additionalReviewTagImage = this.themeResourceDirectory + "bitcoin-exchange/warning_orange.png";
      currentCustomization.idScanCustomization.additionalReviewTagImageColor = primaryColor;
      currentCustomization.idScanCustomization.additionalReviewTagTextColor = primaryColor;
      // OCR Confirmation Screen Customization
      currentCustomization.ocrConfirmationCustomization.backgroundColors = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor = secondaryColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineWidth = "1px";
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
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor = "rgba(247, 150, 52, 0.4)";
      currentCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor = "transparent";
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderWidth = "1px";
      currentCustomization.ocrConfirmationCustomization.inputFieldCornerRadius = "5px";
      currentCustomization.ocrConfirmationCustomization.showInputFieldBottomBorderOnly = false;
      currentCustomization.ocrConfirmationCustomization.buttonFont = font;
      currentCustomization.ocrConfirmationCustomization.buttonTextNormalColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextHighlightColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextDisabledColor = backgroundColorLight;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentCustomization.ocrConfirmationCustomization.buttonBorderColor = "transparent";
      currentCustomization.ocrConfirmationCustomization.buttonBorderWidth = "0px";
      currentCustomization.ocrConfirmationCustomization.buttonCornerRadius = "5px";
      currentCustomization.ocrConfirmationCustomization.customScrollIndicatorAnimation = null;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundNormalColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundHighlightColor = primaryColorDark;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundNormalColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundHighlightColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBorderColor = "transparent";
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBorderWidth = "0px";
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorCornerRadius = "-1";
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorFont = font;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorShadow = shadow;
      currentCustomization.ocrConfirmationCustomization.enableScrollIndicator = true;
      currentCustomization.ocrConfirmationCustomization.enableScrollIndicatorTextAnimation = true;
      currentCustomization.ocrConfirmationCustomization.enableFixedConfirmButton = true;
      currentCustomization.ocrConfirmationCustomization.showScrollIndicatorImage = false;
      // Result Screen Customization
      currentCustomization.resultScreenCustomization.backgroundColors = backgroundColor;
      currentCustomization.resultScreenCustomization.foregroundColor = primaryColor;
      currentCustomization.resultScreenCustomization.messageFont = font;
      currentCustomization.resultScreenCustomization.activityIndicatorColor = primaryColor;
      currentCustomization.resultScreenCustomization.customActivityIndicatorImage = this.themeResourceDirectory + "bitcoin-exchange/activity_indicator_orange.png";
      currentCustomization.resultScreenCustomization.customActivityIndicatorRotationInterval = "1.5s";
      currentCustomization.resultScreenCustomization.customActivityIndicatorAnimation = null;
      currentCustomization.resultScreenCustomization.resultAnimationBackgroundColor = primaryColor;
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundColor = primaryColor;
      currentCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundColor = primaryColor;
      currentCustomization.resultScreenCustomization.resultAnimationForegroundColor = backgroundColor;
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessForegroundColor = backgroundColor;
      currentCustomization.resultScreenCustomization.resultAnimationIDScanSuccessForegroundColor = primaryColor;
      currentCustomization.resultScreenCustomization.sessionAbortAnimationForegroundColor = backgroundColor;
      currentCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage = "";
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage = "";
      currentCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundImage = "";
      currentCustomization.resultScreenCustomization.customResultAnimationIDScanSuccess = null;
      currentCustomization.resultScreenCustomization.customResultAnimationSuccess = null;
      currentCustomization.resultScreenCustomization.customResultAnimationUnsuccess = null;
      currentCustomization.resultScreenCustomization.customSessionAbortAnimation = null;
      currentCustomization.resultScreenCustomization.showUploadProgressBar = true;
      currentCustomization.resultScreenCustomization.uploadProgressTrackColor = "rgba(0, 0, 0, 0.2)";
      currentCustomization.resultScreenCustomization.uploadProgressFillColor = primaryColor;
      currentCustomization.resultScreenCustomization.animationRelativeScale = 1.0;
      currentCustomization.resultScreenCustomization.resultAnimationDisplayTime = 2.5;
      currentCustomization.resultScreenCustomization.faceScanStillUploadingMessageDelayTime = 6.0;
      currentCustomization.resultScreenCustomization.idScanStillUploadingMessageDelayTime = 8.0;
      // Feedback Customization
      currentCustomization.feedbackCustomization.backgroundColor = primaryColor;
      currentCustomization.feedbackCustomization.textColor = backgroundColor;
      currentCustomization.feedbackCustomization.textFont = font;
      currentCustomization.feedbackCustomization.cornerRadius = "5px";
      currentCustomization.feedbackCustomization.shadow = shadow;
      // Frame Customization
      currentCustomization.frameCustomization.backgroundColor = backgroundColor;
      currentCustomization.frameCustomization.borderColor = secondaryColor;
      currentCustomization.frameCustomization.borderWidth = "0px";
      currentCustomization.frameCustomization.borderCornerRadius = "5px";
      currentCustomization.frameCustomization.shadow = shadow;
      // Oval Customization
      currentCustomization.ovalCustomization.strokeColor = primaryColor;
      currentCustomization.ovalCustomization.progressColor1 = secondaryColor;
      currentCustomization.ovalCustomization.progressColor2 = secondaryColor;
      // Cancel Button Customization
      currentCustomization.cancelButtonCustomization.customImage = this.themeResourceDirectory + "bitcoin-exchange/single_chevron_left_orange.png";
      currentCustomization.cancelButtonCustomization.location = FaceTecSDK.FaceTecCancelButtonLocation.TopLeft;
      currentCustomization.cancelButtonCustomization.hideForCameraPermissions = false;
      // Orientation Screen Customization
      currentCustomization.orientationScreenCustomization.backgroundColors = backgroundColor;
      currentCustomization.orientationScreenCustomization.foregroundColor = primaryColor;
      currentCustomization.orientationScreenCustomization.iconImage = "";
      currentCustomization.orientationScreenCustomization.messageFont = font;

      // Guidance Customization -- Text Style Overrides
      // Ready Screen Header
      currentCustomization.guidanceCustomization.readyScreenHeaderFont = font;
      currentCustomization.guidanceCustomization.readyScreenHeaderTextColor = primaryColor;
      // Ready Screen Subtext
      currentCustomization.guidanceCustomization.readyScreenSubtextFont = font;
      currentCustomization.guidanceCustomization.readyScreenSubtextTextColor = secondaryColor;
      // Retry Screen Header
      currentCustomization.guidanceCustomization.retryScreenHeaderFont = font;
      currentCustomization.guidanceCustomization.retryScreenHeaderTextColor = primaryColor;
      // Retry Screen Subtext
      currentCustomization.guidanceCustomization.retryScreenSubtextFont = font;
      currentCustomization.guidanceCustomization.retryScreenSubtextTextColor = secondaryColor;
    }
    else if (theme === "eKYC") {
      const primaryColor: string = "rgb(237, 28, 36)"; // Red
      const primaryColorLight: string = "rgb(247, 148, 152)"; // Lighter red
      const secondaryColor: string = "black";
      const backgroundColor: string = "white";
      const buttonBackgroundDisabledColor: string = backgroundColor;
      const buttonBackgroundHighlightColor: string = primaryColor;
      const font: string = "'Source Sans Pro', Helvetica, sans-serif";
      const shadow: string = "0px 3px 6px 3px rgba(237, 28, 36, 0.7)";

      var scrollIndicatorSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      scrollIndicatorSVG.setAttribute("viewBox", "0 0 48 48");
      scrollIndicatorSVG.innerHTML = "<g transform='translate(24 12)'><path d='m12 1a11 11 0 1 0 11 11 11.013 11.013 0 0 0 -11-11zm5.707 9.707-5 5a1 1 0 0 1 -1.414 0l-5-5a1 1 0 0 1 1.414-1.414l4.293 4.293 4.293-4.293a1 1 0 0 1 1.414 1.414z'/><animateTransform attributeName='transform' attributeType='XML' dur='2s' type='translate' begin='0s' values='24 12; 24 12; 24 12; 24 12; 24 24; 24 12; 24 24; 24 12; 24 12; 24 12; 24 12;' calcmode='linear' fill='freeze' repeatCount='indefinite'></animateTransform></g>";

      var activityIndicatorSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      activityIndicatorSVG.setAttribute("viewBox", "0 0 52 52");
      activityIndicatorSVG.classList.add("ekyc-activity-indicator-svg");
      activityIndicatorSVG.innerHTML = "<defs><filter id='goo'><feGaussianBlur in='SourceGraphic' stdDeviation='2' result='blur' /><feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9' result='goo' /><feComposite in='SourceGraphic' in2='goo' operator='atop'/></filter></defs><g filter='url(#goo)'><g transform='translate(26 26)'><circle class='circlePath1' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' attributeType='XML' dur='1s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath2' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1.2s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' attributeType='XML' dur='1.2s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1.2s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath3' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1.5s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' dur='1.5s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1.5s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath4' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='2s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' dur='2s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='2s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g> </g>";

      var uploadActivityIndicatorSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      uploadActivityIndicatorSVG.setAttribute("viewBox", "0 0 52 52");
      uploadActivityIndicatorSVG.classList.add("ekyc-activity-indicator-svg");
      uploadActivityIndicatorSVG.innerHTML = "<defs><filter id='goo'><feGaussianBlur in='SourceGraphic' stdDeviation='2' result='blur' /><feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9' result='goo' /><feComposite in='SourceGraphic' in2='goo' operator='atop'/></filter></defs><g filter='url(#goo)'><g transform='translate(26 26)'><circle class='circlePath1' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' attributeType='XML' dur='1s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath2' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1.2s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' attributeType='XML' dur='1.2s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1.2s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath3' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1.5s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' dur='1.5s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1.5s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath4' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='2s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' dur='2s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='2s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g> </g>";

      var successResultAnimationSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      successResultAnimationSVG.setAttribute("viewBox", "0 0 52 52");
      successResultAnimationSVG.classList.add("ekyc-success-svg");
      successResultAnimationSVG.innerHTML = "<path class='checkmarkPath__back' d='M14.1 27.2l7.1 7.2 16.7-16.8'></path><path class='checkmarkPath__front' d='M14.1 27.2l7.1 7.2 16.7-16.8'></path>";

      var unsuccessResultAnimationSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      unsuccessResultAnimationSVG.setAttribute("viewBox", "0 0 52 52");
      unsuccessResultAnimationSVG.classList.add("ekyc-unsuccess-svg");
      unsuccessResultAnimationSVG.innerHTML = "<line class='crossPath1__back' x1='18' y1='18' x2='34' y2='34'></line><line class='crossPath2__back' x1='34' y1='18' x2='18' y2='34'></line><line class='crossPath1__front' x1='18' y1='18' x2='34' y2='34'></line><line class='crossPath2__front' x1='34' y1='18' x2='18' y2='34'></line>";

      // Initial Loading Animation Customization
      currentCustomization.initialLoadingAnimationCustomization.customAnimation = activityIndicatorSVG;
      currentCustomization.initialLoadingAnimationCustomization.animationRelativeScale = 1.0;
      currentCustomization.initialLoadingAnimationCustomization.backgroundColor = "transparent";
      currentCustomization.initialLoadingAnimationCustomization.foregroundColor = primaryColor;
      currentCustomization.initialLoadingAnimationCustomization.messageTextColor = secondaryColor;
      currentCustomization.initialLoadingAnimationCustomization.messageFont = font;
      // Overlay Customization
      currentCustomization.overlayCustomization.backgroundColor = "transparent";
      currentCustomization.overlayCustomization.showBrandingImage = true;
      currentCustomization.overlayCustomization.brandingImage = this.themeResourceDirectory + "ekyc/ekyc_logo.png";
      // Guidance Customization
      currentCustomization.guidanceCustomization.backgroundColors = backgroundColor;
      currentCustomization.guidanceCustomization.foregroundColor = secondaryColor;
      currentCustomization.guidanceCustomization.headerFont = font;
      currentCustomization.guidanceCustomization.subtextFont = font;
      currentCustomization.guidanceCustomization.buttonFont = font;
      currentCustomization.guidanceCustomization.buttonTextNormalColor = primaryColor;
      currentCustomization.guidanceCustomization.buttonBackgroundNormalColor = backgroundColor;
      currentCustomization.guidanceCustomization.buttonTextHighlightColor = backgroundColor;
      currentCustomization.guidanceCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentCustomization.guidanceCustomization.buttonTextDisabledColor = "rgba(237, 28, 36, 0.3)";
      currentCustomization.guidanceCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentCustomization.guidanceCustomization.buttonBorderColor = primaryColor;
      currentCustomization.guidanceCustomization.buttonBorderWidth = "2px";
      currentCustomization.guidanceCustomization.buttonCornerRadius = "8px";
      currentCustomization.guidanceCustomization.readyScreenOvalFillColor = "transparent";
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundColor = backgroundColor;
      currentCustomization.guidanceCustomization.readyScreenTextBackgroundCornerRadius = "3px";
      currentCustomization.guidanceCustomization.retryScreenImageBorderColor = primaryColor;
      currentCustomization.guidanceCustomization.retryScreenImageBorderWidth = "2px";
      currentCustomization.guidanceCustomization.retryScreenImageCornerRadius = "3px";
      currentCustomization.guidanceCustomization.retryScreenOvalStrokeColor = primaryColor;
      currentCustomization.guidanceCustomization.retryScreenSlideshowImages = retryScreenSlideshowImages;
      currentCustomization.guidanceCustomization.retryScreenSlideshowInterval = "1500ms";
      currentCustomization.guidanceCustomization.enableRetryScreenSlideshowShuffle = true;
      currentCustomization.guidanceCustomization.cameraPermissionsScreenImage = this.themeResourceDirectory + "ekyc/camera_red.png";
      currentCustomization.guidanceCustomization.cameraFeedIssueScreenImage = this.themeResourceDirectory + "ekyc/camera_red.png";
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
      currentCustomization.idScanCustomization.buttonTextNormalColor = primaryColor;
      currentCustomization.idScanCustomization.buttonBackgroundNormalColor = backgroundColor;
      currentCustomization.idScanCustomization.buttonTextHighlightColor = backgroundColor;
      currentCustomization.idScanCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentCustomization.idScanCustomization.buttonTextDisabledColor = "rgba(237, 28, 36, 0.3)";
      currentCustomization.idScanCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentCustomization.idScanCustomization.buttonBorderColor = primaryColor;
      currentCustomization.idScanCustomization.buttonBorderWidth = "2px";
      currentCustomization.idScanCustomization.buttonCornerRadius = "8px";
      currentCustomization.idScanCustomization.captureScreenTextBackgroundColor = primaryColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor = primaryColor;
      currentCustomization.idScanCustomization.captureScreenTextBackgroundBorderWidth = "0px";
      currentCustomization.idScanCustomization.captureScreenTextBackgroundCornerRadius = "2px";
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundColor = primaryColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor = primaryColor;
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderWidth = "0px";
      currentCustomization.idScanCustomization.reviewScreenTextBackgroundBorderCornerRadius = "2px";
      currentCustomization.idScanCustomization.captureScreenBackgroundColor = backgroundColor;
      currentCustomization.idScanCustomization.captureFrameStrokeColor = primaryColor;
      currentCustomization.idScanCustomization.captureFrameStrokeWidth = "2px";
      currentCustomization.idScanCustomization.captureFrameCornerRadius = "12px";
      currentCustomization.idScanCustomization.additionalReviewScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.additionalReviewScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.additionalReviewScreenImage = "";
      currentCustomization.idScanCustomization.additionalReviewScreenAnimation = null;
      currentCustomization.idScanCustomization.idFeedbackScreenBackgroundColors = backgroundColor;
      currentCustomization.idScanCustomization.idFeedbackScreenForegroundColor = primaryColor;
      currentCustomization.idScanCustomization.idFeedbackScreenFlipIDFrontImage = "";
      currentCustomization.idScanCustomization.idFeedbackScreenFlipIDBackImage = "";
      currentCustomization.idScanCustomization.idFeedbackScreenFlipIDToBackAnimation = null;
      currentCustomization.idScanCustomization.idFeedbackScreenFlipIDToFrontAnimation = null;
      currentCustomization.idScanCustomization.additionalReviewScreenAnimationDisplayTime = 2.0;
      currentCustomization.idScanCustomization.idFeedbackScreenAnimationDisplayTime = 2.0;
      currentCustomization.idScanCustomization.enableAdditionalReviewTag = true;
      currentCustomization.idScanCustomization.additionalReviewTagImage = "";
      currentCustomization.idScanCustomization.additionalReviewTagImageColor = primaryColor;
      currentCustomization.idScanCustomization.additionalReviewTagTextColor = secondaryColor;
      // OCR Confirmation Screen Customization
      currentCustomization.ocrConfirmationCustomization.backgroundColors = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor = secondaryColor;
      currentCustomization.ocrConfirmationCustomization.mainHeaderDividerLineWidth = "2px";
      currentCustomization.ocrConfirmationCustomization.mainHeaderFont = font;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderFont = font;
      currentCustomization.ocrConfirmationCustomization.fieldLabelFont = font;
      currentCustomization.ocrConfirmationCustomization.fieldValueFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldFont = font;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderFont = font;
      currentCustomization.ocrConfirmationCustomization.mainHeaderTextColor = secondaryColor;
      currentCustomization.ocrConfirmationCustomization.sectionHeaderTextColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldLabelTextColor = secondaryColor;
      currentCustomization.ocrConfirmationCustomization.fieldValueTextColor = secondaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldTextColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor = "rgba(255, 255, 255, 0.4)";
      currentCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor = secondaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.inputFieldBorderWidth = "0px";
      currentCustomization.ocrConfirmationCustomization.inputFieldCornerRadius = "8px";
      currentCustomization.ocrConfirmationCustomization.showInputFieldBottomBorderOnly = false;
      currentCustomization.ocrConfirmationCustomization.buttonFont = font;
      currentCustomization.ocrConfirmationCustomization.buttonTextNormalColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextHighlightColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentCustomization.ocrConfirmationCustomization.buttonTextDisabledColor = "rgba(237, 28, 36, 0.3)";
      currentCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentCustomization.ocrConfirmationCustomization.buttonBorderColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.buttonBorderWidth = "2px";
      currentCustomization.ocrConfirmationCustomization.buttonCornerRadius = "8px";
      currentCustomization.ocrConfirmationCustomization.customScrollIndicatorAnimation = scrollIndicatorSVG;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundNormalColor = primaryColor;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundHighlightColor = primaryColorLight;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundNormalColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundHighlightColor = backgroundColor;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBorderColor = "transparent";
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorBorderWidth = "0px";
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorCornerRadius = "8px";
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorFont = font;
      currentCustomization.ocrConfirmationCustomization.scrollIndicatorShadow = shadow;
      currentCustomization.ocrConfirmationCustomization.enableScrollIndicator = true;
      currentCustomization.ocrConfirmationCustomization.enableScrollIndicatorTextAnimation = true;
      currentCustomization.ocrConfirmationCustomization.enableFixedConfirmButton = false;
      currentCustomization.ocrConfirmationCustomization.showScrollIndicatorImage = true;
      // Result Screen Customization
      currentCustomization.resultScreenCustomization.backgroundColors = backgroundColor;
      currentCustomization.resultScreenCustomization.foregroundColor = secondaryColor;
      currentCustomization.resultScreenCustomization.messageFont = font;
      currentCustomization.resultScreenCustomization.activityIndicatorColor = primaryColor;
      currentCustomization.resultScreenCustomization.customActivityIndicatorImage = "";
      currentCustomization.resultScreenCustomization.customActivityIndicatorRotationInterval = "1.5s";
      currentCustomization.resultScreenCustomization.customActivityIndicatorAnimation = uploadActivityIndicatorSVG;
      currentCustomization.resultScreenCustomization.resultAnimationBackgroundColor = "transparent";
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundColor = "transparent";
      currentCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundColor = "transparent";
      currentCustomization.resultScreenCustomization.resultAnimationForegroundColor = "transparent";
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessForegroundColor = primaryColor;
      currentCustomization.resultScreenCustomization.resultAnimationIDScanSuccessForegroundColor = "transparent";
      currentCustomization.resultScreenCustomization.sessionAbortAnimationForegroundColor = primaryColor;
      currentCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage = "";
      currentCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage = "";
      currentCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundImage = "";
      currentCustomization.resultScreenCustomization.customResultAnimationIDScanSuccess = successResultAnimationSVG;
      currentCustomization.resultScreenCustomization.customResultAnimationSuccess = successResultAnimationSVG;
      currentCustomization.resultScreenCustomization.customResultAnimationUnsuccess = unsuccessResultAnimationSVG;
      currentCustomization.resultScreenCustomization.customSessionAbortAnimation = unsuccessResultAnimationSVG;
      currentCustomization.resultScreenCustomization.showUploadProgressBar = false;
      currentCustomization.resultScreenCustomization.uploadProgressTrackColor = "rgba(0, 0, 0, 0.2)";
      currentCustomization.resultScreenCustomization.uploadProgressFillColor = primaryColor;
      currentCustomization.resultScreenCustomization.animationRelativeScale = 1.0;
      currentCustomization.resultScreenCustomization.resultAnimationDisplayTime = 2.0;
      currentCustomization.resultScreenCustomization.faceScanStillUploadingMessageDelayTime = 6.0;
      currentCustomization.resultScreenCustomization.idScanStillUploadingMessageDelayTime = 8.0;
      // Feedback Customization
      currentCustomization.feedbackCustomization.backgroundColor = secondaryColor;
      currentCustomization.feedbackCustomization.textColor = backgroundColor;
      currentCustomization.feedbackCustomization.textFont = font;
      currentCustomization.feedbackCustomization.cornerRadius = "3px";
      currentCustomization.feedbackCustomization.shadow = shadow;
      // Frame Customization
      currentCustomization.frameCustomization.backgroundColor = backgroundColor;
      currentCustomization.frameCustomization.borderColor = primaryColor;
      currentCustomization.frameCustomization.borderWidth = "2px";
      currentCustomization.frameCustomization.borderCornerRadius = "8px";
      currentCustomization.frameCustomization.shadow = shadow;
      // Oval Customization
      currentCustomization.ovalCustomization.strokeColor = primaryColor;
      currentCustomization.ovalCustomization.progressColor1 = "rgba(237, 28, 36, 0.7)";
      currentCustomization.ovalCustomization.progressColor2 = "rgba(237, 28, 36, 0.7)";
      // Cancel Button Customization
      currentCustomization.cancelButtonCustomization.customImage = this.themeResourceDirectory + "ekyc/cancel_box_red.png";
      currentCustomization.cancelButtonCustomization.location = FaceTecSDK.FaceTecCancelButtonLocation.TopRight;
      currentCustomization.cancelButtonCustomization.hideForCameraPermissions = false;
      // Orientation Screen Customization
      currentCustomization.orientationScreenCustomization.backgroundColors = backgroundColor;
      currentCustomization.orientationScreenCustomization.foregroundColor = secondaryColor;
      currentCustomization.orientationScreenCustomization.iconImage = "";
      currentCustomization.orientationScreenCustomization.messageFont = font;
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
      currentCustomization.orientationScreenCustomization.iconImage = "";
      currentCustomization.orientationScreenCustomization.messageFont = font;
    }

    return currentCustomization;
  };

  private getLowLightCustomizationForTheme = (theme: string): FaceTecCustomization => {
    var currentLowLightCustomization: FaceTecCustomization = this.getCustomizationForTheme(theme);

    const retryScreenSlideshowImages: string[] = [this.themeResourceDirectory + "FaceTec_ideal_1.png", this.themeResourceDirectory + "FaceTec_ideal_2.png", this.themeResourceDirectory + "FaceTec_ideal_3.png", this.themeResourceDirectory + "FaceTec_ideal_4.png", this.themeResourceDirectory + "FaceTec_ideal_5.png"];

    if (theme === "Config Wizard Theme") {
      currentLowLightCustomization = Config.retrieveLowLightConfigurationWizardCustomization(FaceTecSDK);
    }
    else if (theme === "Bitcoin Exchange") {
      const primaryColor: string = "rgb(247, 150, 52)"; // Orange
      const primaryColorLight: string = "rgb(249,179,108)"; // Light orange
      const primaryColorDark: string = "rgb(196,102,8)"; // Dark orange
      const secondaryColor: string = "rgb(255, 255, 30)"; // Yellow
      const backgroundColor: string = "rgb(66, 66, 66)"; // Dark grey
      const buttonBackgroundDisabledColor: string = primaryColorLight;
      const buttonBackgroundHighlightColor: string = primaryColorDark;

      var additionalReviewSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      additionalReviewSVG.setAttribute("viewBox", "0 0 122.93 79.21");
      additionalReviewSVG.innerHTML = "<defs><style>.d{fill:#ccc;}.e{stroke:#cbcbcb;stroke-width:4px;}.e,.f{fill:none;stroke-miterlimit:10;}.f{stroke:#ccc;}.d1{stroke-linecap:round;stroke-linejoin:round;}.d1,.e1{fill:none;stroke:#e89a4a;stroke-width:5px;}.e1{stroke-miterlimit:10;}</style></defs><g id='a'/><g id='b'><g id='c'><g><rect class='e' x='24.05' y='-19.75' width='74.82' height='118.7' rx='6.7' ry='6.7' transform='translate(100.84 -22.01) rotate(89.79)'/><g><g><rect class='d' x='50.05' y='58.39' width='20.25' height='3.4' rx='.88' ry='.88' transform='translate(-.22 .22) rotate(-.21)'/><rect class='d' x='99.86' y='38.43' width='11.96' height='3.4' rx='.88' ry='.88' transform='translate(-.15 .39) rotate(-.21)'/><rect class='d' x='99.82' y='28.53' width='11.96' height='3.4' rx='.88' ry='.88' transform='translate(-.11 .39) rotate(-.21)'/><rect class='d' x='50.01' y='48.46' width='37.84' height='3.4' rx='.88' ry='.88' transform='translate(-.18 .25) rotate(-.21)'/><rect class='d' x='49.98' y='38.57' width='37.84' height='3.4' rx='.88' ry='.88' transform='translate(-.15 .25) rotate(-.21)'/><rect class='d' x='49.94' y='28.67' width='37.84' height='3.4' rx='.88' ry='.88' transform='translate(-.11 .25) rotate(-.21)'/></g><path class='d' d='M25.13,31.3c-7.76,.03-14.06,6.37-14.02,14.13,.04,7.75,6.35,14.03,14.09,14.02,7.74-.01,14.08-6.29,14.06-14.12-.03-7.78-6.36-14.05-14.12-14.02Zm6.85,25.16c-1.29,.79-2.68,1.34-4.16,1.65-.86,.18-1.73,.27-2.62,.27-2.43,0-4.68-.63-6.77-1.87-.17-.1-.23-.19-.17-.4,.34-1.2,.69-2.41,1.15-3.57,.54-1.37,1.15-2.71,2.03-3.9,.28-.38,.57-.74,.85-1.12,.08-.1,.14-.11,.26-.05,1.72,.84,3.45,.82,5.17,0,.15-.07,.22-.05,.32,.07,1.02,1.31,1.9,2.7,2.54,4.25,.6,1.45,1.08,2.93,1.49,4.43,.04,.14-.01,.18-.11,.24Zm-10.15-10.85c-2.33-2.19-2.4-6.13-.16-8.41,2.15-2.18,5.55-1.97,7.41,.48,.8,1.05,1.22,2.29,1.23,3.63-.03,1.79-.64,3.33-2.02,4.51-1.92,1.63-4.61,1.54-6.46-.2Zm11.24,10.1c-.11-.37-.22-.74-.34-1.11-.32-1.04-.68-2.06-1.1-3.06-.56-1.35-1.28-2.61-2.12-3.81-.21-.3-.46-.57-.7-.84-.09-.1-.07-.14,.02-.23,1.72-1.47,2.54-3.35,2.45-5.59-.1-2.49-1.19-4.47-3.4-5.72-2.35-1.33-5.32-.77-7.18,1.3-2.53,2.82-2.28,7.4,.53,9.84q.3,.26,.05,.57c-.65,.82-1.22,1.69-1.75,2.59-.26,.43-.42,.91-.63,1.37-.65,1.46-1.11,2.97-1.56,4.5-.02,.06-.04,.13-.06,.2-3.65-2.67-6.15-7.83-4.8-13.47,1.36-5.67,6.49-9.79,12.36-9.92,6.04-.13,11.15,3.8,12.79,9.27,1.7,5.68-.66,11.2-4.59,14.1Z'/></g><line class='f' x1='7.74' y1='21.19' x2='115.19' y2='21.37'/><rect class='d' x='7.74' y='10.7' width='37.84' height='3.4' rx='.88' ry='.88' transform='translate(-.05 .1) rotate(-.21)'/></g></g></g><g id='a1'/><g id='b1' transform='translate(0 19.5)'><g id='c1'><g><circle class='e1' cx='25.71' cy='25.71' r='23.21'/><line class='d1' x1='42.42' y1='43.28' x2='52.55' y2='53.41'/><animateTransform attributeName='transform' attributeType='XML' dur='1.5s' type='translate' begin='indefinite' from='0 0' to='64.5 0' calcmode='spline' keysplines='0.42,0,0.58,1' keyTimes='0;1' fill='freeze'></animateTransform></g></g></g>";

      // Overlay Customization
      currentLowLightCustomization.overlayCustomization.brandingImage = this.themeResourceDirectory + "bitcoin-exchange/bitcoin_exchange_logo.png";
      // Guidance Customization
      currentLowLightCustomization.guidanceCustomization.foregroundColor = backgroundColor;
      currentLowLightCustomization.guidanceCustomization.buttonTextNormalColor = "white";
      currentLowLightCustomization.guidanceCustomization.buttonBackgroundNormalColor = primaryColor;
      currentLowLightCustomization.guidanceCustomization.buttonTextHighlightColor = "white";
      currentLowLightCustomization.guidanceCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentLowLightCustomization.guidanceCustomization.buttonTextDisabledColor = "white";
      currentLowLightCustomization.guidanceCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentLowLightCustomization.guidanceCustomization.buttonBorderColor = "transparent";
      currentLowLightCustomization.guidanceCustomization.readyScreenOvalFillColor = "transparent";
      currentLowLightCustomization.guidanceCustomization.readyScreenTextBackgroundColor = "white";
      currentLowLightCustomization.guidanceCustomization.retryScreenImageBorderColor = primaryColor;
      currentLowLightCustomization.guidanceCustomization.retryScreenOvalStrokeColor = primaryColor;
      currentLowLightCustomization.guidanceCustomization.retryScreenSlideshowImages = [];
      // ID Scan Customization
      currentLowLightCustomization.idScanCustomization.selectionScreenDocumentImage = this.themeResourceDirectory + "bitcoin-exchange/document_grey.png";
      currentLowLightCustomization.idScanCustomization.captureScreenForegroundColor = primaryColor;
      currentLowLightCustomization.idScanCustomization.reviewScreenForegroundColor = primaryColor;
      currentLowLightCustomization.idScanCustomization.selectionScreenForegroundColor = primaryColor;
      currentLowLightCustomization.idScanCustomization.buttonTextNormalColor = "white";
      currentLowLightCustomization.idScanCustomization.buttonBackgroundNormalColor = primaryColor;
      currentLowLightCustomization.idScanCustomization.buttonTextHighlightColor = "white";
      currentLowLightCustomization.idScanCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentLowLightCustomization.idScanCustomization.buttonTextDisabledColor = "white";
      currentLowLightCustomization.idScanCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentLowLightCustomization.idScanCustomization.buttonBorderColor = "transparent";
      currentLowLightCustomization.idScanCustomization.captureScreenTextBackgroundColor = backgroundColor;
      currentLowLightCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor = "transparent";
      currentLowLightCustomization.idScanCustomization.reviewScreenTextBackgroundColor = backgroundColor;
      currentLowLightCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor = "transparent";
      currentLowLightCustomization.idScanCustomization.captureFrameStrokeColor = primaryColor;
      currentLowLightCustomization.idScanCustomization.additionalReviewScreenForegroundColor = primaryColor;
      currentLowLightCustomization.idScanCustomization.additionalReviewScreenImage = "";
      currentLowLightCustomization.idScanCustomization.additionalReviewScreenAnimation = additionalReviewSVG;
      currentLowLightCustomization.idScanCustomization.idFeedbackScreenForegroundColor = primaryColor;
      currentLowLightCustomization.idScanCustomization.idFeedbackScreenFlipIDFrontImage = "";
      currentLowLightCustomization.idScanCustomization.idFeedbackScreenFlipIDBackImage = "";
      currentLowLightCustomization.idScanCustomization.idFeedbackScreenFlipIDToBackAnimation = null;
      currentLowLightCustomization.idScanCustomization.idFeedbackScreenFlipIDToFrontAnimation = null;
      currentLowLightCustomization.idScanCustomization.additionalReviewTagImage = this.themeResourceDirectory + "bitcoin-exchange/warning_orange.png";
      currentLowLightCustomization.idScanCustomization.additionalReviewTagImageColor = backgroundColor;
      currentLowLightCustomization.idScanCustomization.additionalReviewTagTextColor = backgroundColor;
      // OCR Confirmation Screen Customization
      currentLowLightCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor = secondaryColor;
      currentLowLightCustomization.ocrConfirmationCustomization.mainHeaderTextColor = primaryColor;
      currentLowLightCustomization.ocrConfirmationCustomization.sectionHeaderTextColor = primaryColor;
      currentLowLightCustomization.ocrConfirmationCustomization.fieldLabelTextColor = primaryColor;
      currentLowLightCustomization.ocrConfirmationCustomization.fieldValueTextColor = primaryColor;
      currentLowLightCustomization.ocrConfirmationCustomization.inputFieldTextColor = primaryColor;
      currentLowLightCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor = "rgba(247, 150, 52, 0.4)";
      currentLowLightCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor = "transparent";
      currentLowLightCustomization.ocrConfirmationCustomization.inputFieldBorderColor = primaryColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonTextNormalColor = backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor = primaryColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonTextHighlightColor = backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonTextDisabledColor = "white";
      currentLowLightCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentLowLightCustomization.ocrConfirmationCustomization.buttonBorderColor = "transparent";
      currentLowLightCustomization.ocrConfirmationCustomization.customScrollIndicatorAnimation = null;
      currentLowLightCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundNormalColor = primaryColor;
      currentLowLightCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundHighlightColor = primaryColorLight;
      currentLowLightCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundNormalColor = backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundHighlightColor = backgroundColor;
      currentLowLightCustomization.ocrConfirmationCustomization.scrollIndicatorBorderColor = "transparent";
      // Result Screen Customization
      currentLowLightCustomization.resultScreenCustomization.foregroundColor = backgroundColor;
      currentLowLightCustomization.resultScreenCustomization.activityIndicatorColor = primaryColor;
      currentLowLightCustomization.resultScreenCustomization.customActivityIndicatorImage = this.themeResourceDirectory + "bitcoin-exchange/activity_indicator_orange.png";
      currentLowLightCustomization.resultScreenCustomization.customActivityIndicatorAnimation = null;
      currentLowLightCustomization.resultScreenCustomization.resultAnimationBackgroundColor = primaryColor;
      currentLowLightCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundColor = primaryColor;
      currentLowLightCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundColor = primaryColor;
      currentLowLightCustomization.resultScreenCustomization.resultAnimationForegroundColor = "white";
      currentLowLightCustomization.resultScreenCustomization.resultAnimationUnsuccessForegroundColor = "white";
      currentLowLightCustomization.resultScreenCustomization.resultAnimationIDScanSuccessForegroundColor = primaryColor;
      currentLowLightCustomization.resultScreenCustomization.sessionAbortAnimationForegroundColor = primaryColor;
      currentLowLightCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage = "";
      currentLowLightCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage = "";
      currentLowLightCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundImage = "";
      currentLowLightCustomization.resultScreenCustomization.customResultAnimationIDScanSuccess = null;
      currentLowLightCustomization.resultScreenCustomization.customResultAnimationSuccess = null;
      currentLowLightCustomization.resultScreenCustomization.customResultAnimationUnsuccess = null;
      currentLowLightCustomization.resultScreenCustomization.customSessionAbortAnimation = null;
      currentLowLightCustomization.resultScreenCustomization.uploadProgressTrackColor = "rgba(0, 0, 0, 0.2)";
      currentLowLightCustomization.resultScreenCustomization.uploadProgressFillColor = primaryColor;
      // Feedback Customization
      currentLowLightCustomization.feedbackCustomization.backgroundColor = backgroundColor;
      currentLowLightCustomization.feedbackCustomization.textColor = "white";
      // Frame Customization
      currentLowLightCustomization.frameCustomization.borderColor = backgroundColor;
      // Oval Customization
      currentLowLightCustomization.ovalCustomization.strokeColor = primaryColor;
      currentLowLightCustomization.ovalCustomization.progressColor1 = secondaryColor;
      currentLowLightCustomization.ovalCustomization.progressColor2 = secondaryColor;
      // Cancel Button Customization
      currentLowLightCustomization.cancelButtonCustomization.customImage = this.themeResourceDirectory + "bitcoin-exchange/single_chevron_left_orange.png";
      // Orientation Screen Customization
      currentLowLightCustomization.orientationScreenCustomization.foregroundColor = backgroundColor;
      currentLowLightCustomization.orientationScreenCustomization.iconImage = "";

      // Guidance Customization -- Text Style Overrides
      // Ready Screen Header
      currentLowLightCustomization.guidanceCustomization.readyScreenHeaderTextColor = primaryColor;
      // Ready Screen Subtext
      currentLowLightCustomization.guidanceCustomization.readyScreenSubtextTextColor = backgroundColor;
      // Retry Screen Header
      currentLowLightCustomization.guidanceCustomization.retryScreenHeaderTextColor = primaryColor;
      // Retry Screen Subtext
      currentLowLightCustomization.guidanceCustomization.retryScreenSubtextTextColor = backgroundColor;
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
      currentLowLightCustomization.orientationScreenCustomization.iconImage = "";
    }

    return currentLowLightCustomization;
  };

  private getDynamicDimmingCustomizationForTheme = (theme: string): FaceTecCustomization  => {
    var currentDynamicDimmingCustomization: FaceTecCustomization = this.getCustomizationForTheme(theme);

    const retryScreenSlideshowImages: string[] = [this.themeResourceDirectory + "FaceTec_ideal_1.png", this.themeResourceDirectory + "FaceTec_ideal_2.png", this.themeResourceDirectory + "FaceTec_ideal_3.png", this.themeResourceDirectory + "FaceTec_ideal_4.png", this.themeResourceDirectory + "FaceTec_ideal_5.png"];

    if (theme === "FaceTec Theme") {
      // OCR Confirmation Screen Customization
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.sectionHeaderTextColor = "white";
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.fieldLabelTextColor = "white";
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.fieldValueTextColor = "white";
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldTextColor = "white";
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor = "rgba(0, 0, 0, 0.4)";
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldBorderColor = "white";
    }

    if (theme === "Config Wizard Theme") {
      currentDynamicDimmingCustomization = Config.retrieveDynamicDimmingConfigurationWizardCustomization(FaceTecSDK);
    }
    else if (theme === "Pseudo-Fullscreen") {
      const primaryColor: string = "rgb(238, 246, 248)"; // Off-white
      const primaryColorLight: string = "white"; // White
      const secondaryColor: string = "rgb(59, 195, 113)"; // Green
      const backgroundColor: string = "black";
      const buttonBackgroundDisabledColor: string = "rgba(238, 246, 248, 0.3)";
      const buttonBackgroundHighlightColor: string = "white";

      var activityIndicatorSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      activityIndicatorSVG.setAttribute("viewBox", "0 0 52 52");
      activityIndicatorSVG.classList.add("pseudo-fullscreen-activity-indicator-svg__offwhite");
      activityIndicatorSVG.innerHTML = "<circle class='path' cx='26' cy='26' r='22'></circle>";

      var successResultAnimationSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      successResultAnimationSVG.setAttribute("viewBox", "0 0 52 52");
      successResultAnimationSVG.classList.add("pseudo-fullscreen-success-svg__offwhite");
      successResultAnimationSVG.innerHTML = "<circle class='circlePath' cx='26' cy='26' r='22'></circle><path class='checkmarkPath' d='M14.1 27.2l7.1 7.2 16.7-16.8'></path>";

      var unsuccessResultAnimationSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      unsuccessResultAnimationSVG.setAttribute("viewBox", "0 0 52 52");
      unsuccessResultAnimationSVG.classList.add("pseudo-fullscreen-unsuccess-svg__offwhite");
      unsuccessResultAnimationSVG.innerHTML = "<circle class='circlePath' cx='26' cy='26' r='22'></circle><line class='crossPath1' x1='18' y1='18' x2='34' y2='34'></line><line class='crossPath2' x1='34' y1='18' x2='18' y2='34'></line>";

      // Overlay Customization
      currentDynamicDimmingCustomization.overlayCustomization.brandingImage = "";
      // Guidance Customization
      currentDynamicDimmingCustomization.guidanceCustomization.foregroundColor = primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonTextNormalColor = backgroundColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonBackgroundNormalColor = primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonTextHighlightColor = backgroundColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonTextDisabledColor = backgroundColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonBorderColor = "transparent";
      currentDynamicDimmingCustomization.guidanceCustomization.readyScreenOvalFillColor = "transparent";
      currentDynamicDimmingCustomization.guidanceCustomization.readyScreenTextBackgroundColor = backgroundColor;
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenImageBorderColor = primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenOvalStrokeColor = primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenSlideshowImages = retryScreenSlideshowImages;
      currentDynamicDimmingCustomization.guidanceCustomization.cameraPermissionsScreenImage = this.themeResourceDirectory + "pseudo-fullscreen/camera_shutter_black.png";
      currentDynamicDimmingCustomization.guidanceCustomization.cameraFeedIssueScreenImage = this.themeResourceDirectory + "pseudo-fullscreen/camera_shutter_black.png";
      // ID Scan Customization
      currentDynamicDimmingCustomization.idScanCustomization.selectionScreenDocumentImage = this.themeResourceDirectory + "pseudo-fullscreen/document_offwhite.png";
      currentDynamicDimmingCustomization.idScanCustomization.captureScreenForegroundColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.reviewScreenForegroundColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.selectionScreenForegroundColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonTextNormalColor = backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonBackgroundNormalColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonTextHighlightColor = backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonTextDisabledColor = backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonBorderColor = "transparent";
      currentDynamicDimmingCustomization.idScanCustomization.captureScreenTextBackgroundColor = backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.reviewScreenTextBackgroundColor = backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.captureFrameStrokeColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.additionalReviewScreenForegroundColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.additionalReviewScreenImage = this.themeResourceDirectory + "pseudo-fullscreen/review_offwhite.png";
      currentDynamicDimmingCustomization.idScanCustomization.additionalReviewScreenAnimation = null;
      currentDynamicDimmingCustomization.idScanCustomization.idFeedbackScreenForegroundColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.idFeedbackScreenFlipIDFrontImage = "";
      currentDynamicDimmingCustomization.idScanCustomization.idFeedbackScreenFlipIDBackImage = "";
      currentDynamicDimmingCustomization.idScanCustomization.idFeedbackScreenFlipIDToBackAnimation = null;
      currentDynamicDimmingCustomization.idScanCustomization.idFeedbackScreenFlipIDToFrontAnimation = null;
      currentDynamicDimmingCustomization.idScanCustomization.additionalReviewTagImage = "";
      currentDynamicDimmingCustomization.idScanCustomization.additionalReviewTagImageColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.additionalReviewTagTextColor = primaryColor;
      // OCR Confirmation Screen Customization
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor = secondaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.mainHeaderTextColor = secondaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.sectionHeaderTextColor = primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.fieldLabelTextColor = primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.fieldValueTextColor = primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldTextColor = primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor = "rgba(59, 195, 113, 0.4)";
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor = "transparent";
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldBorderColor = secondaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonTextNormalColor = backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor = primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonTextHighlightColor = backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonTextDisabledColor = backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonBorderColor = "transparent";
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.customScrollIndicatorAnimation = null;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundNormalColor = primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundHighlightColor = primaryColorLight;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundNormalColor = backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundHighlightColor = backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorBorderColor = "transparent";
      // Result Screen Customization
      currentDynamicDimmingCustomization.resultScreenCustomization.foregroundColor = primaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.activityIndicatorColor = primaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.customActivityIndicatorImage = this.themeResourceDirectory + "pseudo-fullscreen/activity_indicator_faded_black.png";
      currentDynamicDimmingCustomization.resultScreenCustomization.customActivityIndicatorAnimation = activityIndicatorSVG;
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationBackgroundColor = secondaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundColor = secondaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundColor = secondaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationForegroundColor = backgroundColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationUnsuccessForegroundColor = backgroundColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationIDScanSuccessForegroundColor = primaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.sessionAbortAnimationForegroundColor = backgroundColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage = "";
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage = "";
      currentDynamicDimmingCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundImage = "";
      currentDynamicDimmingCustomization.resultScreenCustomization.customResultAnimationIDScanSuccess = successResultAnimationSVG;
      currentDynamicDimmingCustomization.resultScreenCustomization.customResultAnimationSuccess = successResultAnimationSVG;
      currentDynamicDimmingCustomization.resultScreenCustomization.customResultAnimationUnsuccess = unsuccessResultAnimationSVG;
      currentDynamicDimmingCustomization.resultScreenCustomization.customSessionAbortAnimation = unsuccessResultAnimationSVG;
      currentDynamicDimmingCustomization.resultScreenCustomization.showUploadProgressBar = true;
      currentDynamicDimmingCustomization.resultScreenCustomization.uploadProgressTrackColor = "rgba(238, 246, 248, 0.2)";
      currentDynamicDimmingCustomization.resultScreenCustomization.uploadProgressFillColor = secondaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.animationRelativeScale = 1.0;
      // Feedback Customization
      currentDynamicDimmingCustomization.feedbackCustomization.backgroundColor = secondaryColor;
      currentDynamicDimmingCustomization.feedbackCustomization.textColor = backgroundColor;
      currentDynamicDimmingCustomization.feedbackCustomization.shadow = "0px 3px 10px black";
      // Frame Customization
      currentDynamicDimmingCustomization.frameCustomization.borderColor = primaryColor;
      currentDynamicDimmingCustomization.frameCustomization.shadow = "none";
      // Oval Customization
      currentDynamicDimmingCustomization.ovalCustomization.strokeColor = primaryColor;
      currentDynamicDimmingCustomization.ovalCustomization.progressColor1 = "rgba(59, 195, 113, 0.7)";
      currentDynamicDimmingCustomization.ovalCustomization.progressColor2 = "rgba(59, 195, 113, 0.7)";
      // Cancel Button Customization
      currentDynamicDimmingCustomization.cancelButtonCustomization.customImage = this.themeResourceDirectory + "pseudo-fullscreen/single_chevron_left_offwhite.png";
      // Orientation Screen Customization
      currentDynamicDimmingCustomization.orientationScreenCustomization.foregroundColor = primaryColor;
      currentDynamicDimmingCustomization.orientationScreenCustomization.iconImage = "";

      // Guidance Customization -- Text Style Overrides
      // Ready Screen Header
      currentDynamicDimmingCustomization.guidanceCustomization.readyScreenHeaderTextColor = primaryColor;
      // Ready Screen Subtext
      currentDynamicDimmingCustomization.guidanceCustomization.readyScreenSubtextTextColor = primaryColor;
      // Retry Screen Header
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenHeaderTextColor = primaryColor;
      // Retry Screen Subtext
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenSubtextTextColor = primaryColor;
    }
    else if (theme === "Well-Rounded") {
      const backgroundColor: string = "black";

      // OCR Confirmation Screen Customization
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundNormalColor = backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundHighlightColor = backgroundColor;
    }
    else if (theme === "Bitcoin Exchange") {
      const primaryColor: string = "rgb(247, 150, 52)"; // Orange
      const backgroundColor: string = "black";

      // Result Screen Customization
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundColor = primaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundColor = primaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationUnsuccessForegroundColor = backgroundColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.sessionAbortAnimationForegroundColor = backgroundColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationIDScanSuccessForegroundColor = primaryColor;
      // Overlay Customization
      currentDynamicDimmingCustomization.overlayCustomization.brandingImage = this.themeResourceDirectory + "bitcoin-exchange/bitcoin_exchange_logo_white.png";
    }
    else if (theme === "eKYC") {
      const primaryColor: string = "rgb(237, 28, 36)"; // Red
      const primaryColorLight: string = "rgb(237, 28, 36, 0.8)"; // Lighter red
      const secondaryColor: string = "white";
      const backgroundColor: string = "black";
      const buttonBackgroundDisabledColor: string = backgroundColor;
      const buttonBackgroundHighlightColor: string = primaryColor;

      var activityIndicatorSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      activityIndicatorSVG.setAttribute("viewBox", "0 0 52 52");
      activityIndicatorSVG.classList.add("ekyc-activity-indicator-svg");
      activityIndicatorSVG.innerHTML = "<defs><filter id='goo'><feGaussianBlur in='SourceGraphic' stdDeviation='2' result='blur' /><feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9' result='goo' /><feComposite in='SourceGraphic' in2='goo' operator='atop'/></filter></defs><g filter='url(#goo)'><g transform='translate(26 26)'><circle class='circlePath1' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' attributeType='XML' dur='1s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath2' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1.2s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' attributeType='XML' dur='1.2s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1.2s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath3' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='1.5s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' dur='1.5s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='1.5s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g>  <g transform='translate(26 26)'><circle class='circlePath4' cx='7' cy='26' r='3'><animateTransform attributeName='transform' dur='2s' type='translate' values='0,0; -6,-26; 0,0' repeatCount='indefinite' begin='0s'/><animateTransform attributeName='transform' dur='2s' type='scale' values='1;2;1' repeatCount='indefinite' additive='sum' begin='0s'/></circle><animateTransform attributeName='transform' dur='2s' type='rotate' from='0 26 26' to='360 26 26' repeatCount='indefinite' begin='0s'/></g> </g>";

      var successResultAnimationSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      successResultAnimationSVG.setAttribute("viewBox", "0 0 52 52");
      successResultAnimationSVG.classList.add("ekyc-success-svg__white");
      successResultAnimationSVG.innerHTML = "<path class='checkmarkPath__back' d='M14.1 27.2l7.1 7.2 16.7-16.8'></path><path class='checkmarkPath__front' d='M14.1 27.2l7.1 7.2 16.7-16.8'></path>";

      var unsuccessResultAnimationSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      unsuccessResultAnimationSVG.setAttribute("viewBox", "0 0 52 52");
      unsuccessResultAnimationSVG.classList.add("ekyc-unsuccess-svg__white");
      unsuccessResultAnimationSVG.innerHTML = "<line class='crossPath1__back' x1='18' y1='18' x2='34' y2='34'></line><line class='crossPath2__back' x1='34' y1='18' x2='18' y2='34'></line><line class='crossPath1__front' x1='18' y1='18' x2='34' y2='34'></line><line class='crossPath2__front' x1='34' y1='18' x2='18' y2='34'></line>";

      // Overlay Customization
      currentDynamicDimmingCustomization.overlayCustomization.brandingImage = this.themeResourceDirectory + "ekyc/ekyc_logo_white.png";
      // Guidance Customization
      currentDynamicDimmingCustomization.guidanceCustomization.foregroundColor = secondaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonTextNormalColor = primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonBackgroundNormalColor = backgroundColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonTextHighlightColor = backgroundColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonTextDisabledColor = "rgba(237, 28, 36, 0.3)";
      currentDynamicDimmingCustomization.guidanceCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentDynamicDimmingCustomization.guidanceCustomization.buttonBorderColor = primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.readyScreenOvalFillColor = "transparent";
      currentDynamicDimmingCustomization.guidanceCustomization.readyScreenTextBackgroundColor = backgroundColor;
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenImageBorderColor = primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenOvalStrokeColor = primaryColor;
      currentDynamicDimmingCustomization.guidanceCustomization.retryScreenSlideshowImages = retryScreenSlideshowImages;
      // ID Scan Customization
      currentDynamicDimmingCustomization.idScanCustomization.selectionScreenDocumentImage = "";
      currentDynamicDimmingCustomization.idScanCustomization.captureScreenForegroundColor = backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.reviewScreenForegroundColor = backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.selectionScreenForegroundColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonTextNormalColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonBackgroundNormalColor = backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonTextHighlightColor = backgroundColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonTextDisabledColor = "rgba(237, 28, 36, 0.3)";
      currentDynamicDimmingCustomization.idScanCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentDynamicDimmingCustomization.idScanCustomization.buttonBorderColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.captureScreenTextBackgroundColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.captureScreenTextBackgroundBorderColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.reviewScreenTextBackgroundColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.reviewScreenTextBackgroundBorderColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.captureFrameStrokeColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.additionalReviewScreenForegroundColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.additionalReviewScreenImage = "";
      currentDynamicDimmingCustomization.idScanCustomization.additionalReviewScreenAnimation = null;
      currentDynamicDimmingCustomization.idScanCustomization.idFeedbackScreenForegroundColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.idFeedbackScreenFlipIDFrontImage = "";
      currentDynamicDimmingCustomization.idScanCustomization.idFeedbackScreenFlipIDBackImage = "";
      currentDynamicDimmingCustomization.idScanCustomization.idFeedbackScreenFlipIDToBackAnimation = null;
      currentDynamicDimmingCustomization.idScanCustomization.idFeedbackScreenFlipIDToFrontAnimation = null;
      currentDynamicDimmingCustomization.idScanCustomization.additionalReviewTagImage = "";
      currentDynamicDimmingCustomization.idScanCustomization.additionalReviewTagImageColor = primaryColor;
      currentDynamicDimmingCustomization.idScanCustomization.additionalReviewTagTextColor = secondaryColor;
      // OCR Confirmation Screen Customization
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.mainHeaderDividerLineColor = secondaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.mainHeaderTextColor = secondaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.sectionHeaderTextColor = primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.fieldLabelTextColor = secondaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.fieldValueTextColor = secondaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldTextColor = backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor = "rgba(0, 0, 0, 0.4)";
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldBackgroundColor = secondaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldBorderColor = primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonTextNormalColor = primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonBackgroundNormalColor = backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonTextHighlightColor = backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonBackgroundHighlightColor = buttonBackgroundHighlightColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonTextDisabledColor = "rgba(237, 28, 36, 0.3)";
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonBackgroundDisabledColor = buttonBackgroundDisabledColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.buttonBorderColor = primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.customScrollIndicatorAnimation = null;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundNormalColor = primaryColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorBackgroundHighlightColor = primaryColorLight;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundNormalColor = backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorForegroundHighlightColor = backgroundColor;
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.scrollIndicatorBorderColor = "transparent";
      // Result Screen Customization
      currentDynamicDimmingCustomization.resultScreenCustomization.foregroundColor = secondaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.activityIndicatorColor = primaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.customActivityIndicatorImage = "";
      currentDynamicDimmingCustomization.resultScreenCustomization.customActivityIndicatorAnimation = activityIndicatorSVG;
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationBackgroundColor = "transparent";
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundColor = "transparent";
      currentDynamicDimmingCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundColor = "transparent";
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationForegroundColor = "transparent";
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationUnsuccessForegroundColor = primaryColor;
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationIDScanSuccessForegroundColor = "transparent";
      currentDynamicDimmingCustomization.resultScreenCustomization.sessionAbortAnimationForegroundColor = "transparent";
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationSuccessBackgroundImage = "";
      currentDynamicDimmingCustomization.resultScreenCustomization.resultAnimationUnsuccessBackgroundImage = "";
      currentDynamicDimmingCustomization.resultScreenCustomization.sessionAbortAnimationBackgroundImage = "";
      currentDynamicDimmingCustomization.resultScreenCustomization.customResultAnimationIDScanSuccess = successResultAnimationSVG;
      currentDynamicDimmingCustomization.resultScreenCustomization.customResultAnimationSuccess = successResultAnimationSVG;
      currentDynamicDimmingCustomization.resultScreenCustomization.customResultAnimationUnsuccess = unsuccessResultAnimationSVG;
      currentDynamicDimmingCustomization.resultScreenCustomization.customSessionAbortAnimation = unsuccessResultAnimationSVG;
      currentDynamicDimmingCustomization.resultScreenCustomization.uploadProgressTrackColor = "rgba(255, 255, 255, 0.2)";
      currentDynamicDimmingCustomization.resultScreenCustomization.uploadProgressFillColor = primaryColor;
      // Feedback Customization
      currentDynamicDimmingCustomization.feedbackCustomization.backgroundColor = secondaryColor;
      currentDynamicDimmingCustomization.feedbackCustomization.textColor = backgroundColor;
      currentDynamicDimmingCustomization.feedbackCustomization.shadow = "0px 3px 6px 3px rgba(237, 28, 36, 0.7)";
      // Frame Customization
      currentDynamicDimmingCustomization.frameCustomization.borderColor = primaryColor;
      currentDynamicDimmingCustomization.frameCustomization.shadow = "0px 3px 6px 3px rgba(237, 28, 36, 0.7)";
      // Oval Customization
      currentDynamicDimmingCustomization.ovalCustomization.strokeColor = primaryColor;
      currentDynamicDimmingCustomization.ovalCustomization.progressColor1 = "rgba(237, 28, 36, 0.7)";
      currentDynamicDimmingCustomization.ovalCustomization.progressColor2 = "rgba(237, 28, 36, 0.7)";
      // Cancel Button Customization
      currentDynamicDimmingCustomization.cancelButtonCustomization.customImage = this.themeResourceDirectory + "ekyc/cancel_box_red.png";
      // Orientation Screen Customization
      currentDynamicDimmingCustomization.orientationScreenCustomization.foregroundColor = secondaryColor;
      currentDynamicDimmingCustomization.orientationScreenCustomization.iconImage = "";
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
