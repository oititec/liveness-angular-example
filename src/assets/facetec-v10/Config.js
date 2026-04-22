import { environment } from "../../environments/environment";

export var Config = (function () {
    // -------------------------------------
    // REQUIRED
    // Available at https://dev.facetec.com/account
    // NOTE: This field is auto-populated by the FaceTec SDK Configuration Wizard.
    var DeviceKeyIdentifier = environment.DeviceKeyIdentifier;
    var BaseURL = environment.BaseURL;

    // -------------------------------------
    // REQUIRED
    // The URL to call to process FaceTec SDK Sessions.
    // In Production, you likely will handle network requests elsewhere and without the use of this variable.
    // See https://dev.facetec.com/security-best-practices#server-rest-endpoint-security for more information.
    //
    // Developer Note: In Your Production Application, networking requests from Your App will call Your Webservice.
    // Calling the FaceTec Server Webservice directly from Your App is not allowed (except for initial testing).
    // Please see the FaceTec Architecture Diagram here more information:  https://dev.facetec.com/configuration-options#zoom-architecture-and-data-flow
    //

    // This app can modify the customization to demonstrate different look/feel preferences
    // NOTE: This function is auto-populated by the FaceTec SDK Configuration Wizard based on your UI Customizations you picked in the Configuration Wizard GUI.
    function retrieveConfigurationWizardCustomization(FaceTecSDK) {
        var sdkImageDirectory = "../../assets/10.0.42/core-sdk/FaceTec_images/";
        
        // For Color Customization
        var outerBackgroundColor = "#ffffff";
        var frameColor = "#ffffff";
        var borderColor = "#417FB2";
        var ovalColor = "#417FB2";
        var dualSpinnerColor = "#417FB2";
        var textColor = "#417FB2";
        var buttonAndFeedbackBarColor =  "#417FB2";
        var buttonAndFeedbackBarTextColor = "#ffffff";
        var buttonColorHighlight = "#396E99";
        var buttonColorDisabled = "#B9CCDE";

        // For Frame Corner Radius Customization
        let frameCornerRadius = "20px";

        // For Cancel Button Customization
        var cancelButtonImage = sdkImageDirectory + "FaceTec_cancel.png";
        var cancelButtonLocation = FaceTecSDK.FaceTecCancelButtonLocation.TopLeft;

        // For Image Customization
        var yourAppLogoImage = sdkImageDirectory + "FaceTec_your_app_logo.png";
        var securityWatermarkImage = FaceTecSDK.FaceTecSecurityWatermarkImage.FaceTec;
        var rotateIconImage = sdkImageDirectory + "FaceTec_rotate.png";
        

        // Set a Default Customization
        var defaultCustomization = new FaceTecSDK.FaceTecCustomization();

        defaultCustomization.rotateIconImage = rotateIconImage;
        
        // Set Frame Customization
        defaultCustomization.frameCustomization.borderCornerRadius = frameCornerRadius;
        defaultCustomization.frameCustomization.backgroundColor = frameColor;
        defaultCustomization.frameCustomization.borderColor = borderColor;

        // Set Overlay Customization
        defaultCustomization.overlayCustomization.brandingImage = yourAppLogoImage;
        defaultCustomization.overlayCustomization.backgroundColor = outerBackgroundColor;

        // Set Guidance Customization
        defaultCustomization.guidanceCustomization.backgroundColors = frameColor;
        defaultCustomization.guidanceCustomization.foregroundColor = textColor;
        defaultCustomization.guidanceCustomization.buttonBackgroundNormalColor = buttonAndFeedbackBarColor;
        defaultCustomization.guidanceCustomization.buttonBackgroundDisabledColor = buttonColorDisabled;
        defaultCustomization.guidanceCustomization.buttonBackgroundHighlightColor = buttonColorHighlight;
        defaultCustomization.guidanceCustomization.buttonTextNormalColor = buttonAndFeedbackBarTextColor;
        defaultCustomization.guidanceCustomization.buttonTextDisabledColor = buttonAndFeedbackBarTextColor;
        defaultCustomization.guidanceCustomization.buttonTextHighlightColor = buttonAndFeedbackBarTextColor;
        defaultCustomization.guidanceCustomization.retryScreenImageBorderColor = borderColor;
        defaultCustomization.guidanceCustomization.retryScreenOvalStrokeColor = borderColor;

        // Set Oval Customization
        defaultCustomization.ovalCustomization.strokeColor = ovalColor;
        defaultCustomization.ovalCustomization.progressColor1 = dualSpinnerColor;
        defaultCustomization.ovalCustomization.progressColor2 = dualSpinnerColor;

        // Set Feedback Customization
        defaultCustomization.feedbackCustomization.backgroundColor = buttonAndFeedbackBarColor;
        defaultCustomization.feedbackCustomization.textColor = buttonAndFeedbackBarTextColor;

        // Set Cancel Customization
        defaultCustomization.cancelButtonCustomization.customImage = cancelButtonImage;
        defaultCustomization.cancelButtonCustomization.location = cancelButtonLocation;

        // Set Security Watermark Customization
        defaultCustomization.securityWatermarkCustomization.setSecurityWatermarkImage(securityWatermarkImage);

        // Set Result Screen Customization
        defaultCustomization.resultScreenCustomization.backgroundColors = frameColor;
        defaultCustomization.resultScreenCustomization.foregroundColor = textColor;
        defaultCustomization.resultScreenCustomization.activityIndicatorColor = buttonAndFeedbackBarColor;
        defaultCustomization.resultScreenCustomization.resultAnimationBackgroundColor = buttonAndFeedbackBarColor;
        defaultCustomization.resultScreenCustomization.resultAnimationForegroundColor = buttonAndFeedbackBarTextColor;
        defaultCustomization.resultScreenCustomization.uploadProgressFillColor = buttonAndFeedbackBarColor;

        // Set ID Scan Customization

        // Set Initial Loading Customization
        defaultCustomization.initialLoadingAnimationCustomization.backgroundColor = buttonAndFeedbackBarTextColor;
        defaultCustomization.initialLoadingAnimationCustomization.foregroundColor = buttonAndFeedbackBarColor;

        
        return defaultCustomization;
    };

    
    function retrieveLowLightConfigurationWizardCustomization(FaceTecSDK) {
        var defaultCustomization = retrieveConfigurationWizardCustomization(FaceTecSDK);
        this.currentLowLightCustomization = defaultCustomization;
        return defaultCustomization;
    }
    
        
    function retrieveDynamicDimmingConfigurationWizardCustomization(FaceTecSDK) {
        var defaultCustomization = retrieveConfigurationWizardCustomization(FaceTecSDK);
        this.currentDynamicDimmingCustomization = defaultCustomization;
        return defaultCustomization;
    }
    
    
    var currentCustomization;
    var currentLowLightCustomization;
    var currentDynamicDimmingCustomization;

    return {
        DeviceKeyIdentifier,
        BaseURL,
        currentCustomization,
        currentLowLightCustomization,
        currentDynamicDimmingCustomization,
        retrieveConfigurationWizardCustomization,
        retrieveLowLightConfigurationWizardCustomization,
        retrieveDynamicDimmingConfigurationWizardCustomization
    };
})();
