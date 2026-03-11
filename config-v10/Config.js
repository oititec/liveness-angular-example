import { environment } from '../src/environments/environment'

export var Config = (function () {
    // -------------------------------------
    // REQUIRED
    // Available at https://dev.facetec.com/account
    // NOTE: This field is auto-populated by the FaceTec SDK Configuration Wizard.

    // var DeviceKeyIdentifier = "dF2CabwQ6OCLFJaV2QqZhP7OUErHv0uz";
    var DeviceKeyIdentifier = environment.DeviceKeyIdentifier;

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
    // This field is auto-populated by the FaceTec SDK Configuration Wizard.

    var YOUR_API_OR_FACETEC_TESTING_API_ENDPOINT = "https://api.facetec.com/api/v4/biometrics/process-request";
    // var YOUR_API_OR_FACETEC_TESTING_API_ENDPOINT = "http://facetec.hml.certiface.io:8080";

    // This app can modify the customization to demonstrate different look/feel preferences
    // NOTE: This function is auto-populated by the FaceTec SDK Configuration Wizard based on your UI Customizations you picked in the Configuration Wizard GUI.
    function retrieveConfigurationWizardCustomization(FaceTecSDK) {
        var sdkImageDirectory = "../../core-sdk/FaceTec_images/";
        
        // Set a Default Customization
        var defaultCustomization = new FaceTecSDK.FaceTecCustomization();

                return defaultCustomization;
    };

    // NOT WHITE TEXT COLOR START
    function retrieveLowLightConfigurationWizardCustomization(FaceTecSDK) {
        var defaultCustomization = retrieveConfigurationWizardCustomization(FaceTecSDK);
        this.currentLowLightCustomization = defaultCustomization;
        return defaultCustomization;
    }
    // NOT WHITE TEXT COLOR END
    // WHITE TEXT COLOR START
    // -------------------------------------
    // NOTE: Changing text color for Low Light mode so it's readable
    function retrieveLowLightConfigurationWizardCustomization(FaceTecSDK) {
        // CUSTOMIZATION PROPERTIES START
        // For Color Customization
        var textColor = "#000000";

        // Set a Default Customization
        var lowLightCustomization = retrieveConfigurationWizardCustomization(FaceTecSDK);

        // Set Guidance Customization
        lowLightCustomization.guidanceCustomization.foregroundColor = textColor;

        // Set Result Screen Customization
        lowLightCustomization.resultScreenCustomization.foregroundColor = textColor;

        // Set ID Scan Customization
        lowLightCustomization.idScanCustomization.selectionScreenForegroundColor = textColor;


        // CUSTOMIZATION PROPERTIES ASSIGNMENT END
        return lowLightCustomization;
    }
    // WHITE TEXT COLOR END
    // NOT BLACK TEXT COLOR START
    function retrieveDynamicDimmingConfigurationWizardCustomization(FaceTecSDK) {
        var defaultCustomization = retrieveConfigurationWizardCustomization(FaceTecSDK);
        this.currentDynamicDimmingCustomization = defaultCustomization;
        return defaultCustomization;
    }
    // NOT BLACK TEXT COLOR END
    // BLACK TEXT COLOR START
    // -------------------------------------
    // NOTE: Changing text color for Dynamic Dimming mode so it's readable
    function retrieveDynamicDimmingConfigurationWizardCustomization(FaceTecSDK) {
        // CUSTOMIZATION PROPERTIES START
        // For Color Customization
        var textColor = "#ffffff";

        // Set a Default Customization
        var dynamicDimmingCustomization = retrieveConfigurationWizardCustomization(FaceTecSDK);

        // Set Guidance Customization
        dynamicDimmingCustomization.guidanceCustomization.foregroundColor = textColor;

        // Set Result Screen Customization
        dynamicDimmingCustomization.resultScreenCustomization.foregroundColor = textColor;

        // Set ID Scan Customization
        dynamicDimmingCustomization.idScanCustomization.selectionScreenForegroundColor = textColor;


        // CUSTOMIZATION PROPERTIES ASSIGNMENT END
        return dynamicDimmingCustomization;
    }
    // BLACK TEXT COLOR END

    var currentCustomization;
    var currentLowLightCustomization;
    var currentDynamicDimmingCustomization;

    return {
        DeviceKeyIdentifier,
        YOUR_API_OR_FACETEC_TESTING_API_ENDPOINT,
        currentCustomization,
        currentLowLightCustomization,
        currentDynamicDimmingCustomization,
        retrieveConfigurationWizardCustomization,
        retrieveLowLightConfigurationWizardCustomization,
        retrieveDynamicDimmingConfigurationWizardCustomization
    };
})();
