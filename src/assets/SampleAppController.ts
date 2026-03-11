// This sample demonstrates how to integrate the FaceTec Device SDK.
//
// This sample demonstrates:
// - Initialization
// - 3D Liveness Checks
// - 3D Enrollment
// - 3D:3D Re-Verification
// - Photo ID Match
// - Standalone ID Scanning
// - Using FaceTec Device SDK Customization APIs to change the FaceTec UI
//
// Please use our technical support form to submit questions and issue reports:  https://dev.facetec.com/

import { Config } from "../../config-v10/Config";
import { FaceTecSDK } from "./core-sdk/FaceTecSDK.js/FaceTecSDK";
import { SampleAppUtilities } from "./utilities-v10/SampleAppUtilities";
import { ThemeHelpers } from "./utilities-v10/ThemeHelpers";
import { FaceTecInitializationError, FaceTecSessionResult, type FaceTecSDKInstance } from "./core-sdk/FaceTecSDK.js/FaceTecPublicApi";
import { DeveloperStatusMessages } from "./utilities-v10/DeveloperStatusMessages";
import { SessionRequestProcessor } from "./SessionRequestProcessor";
import { environment as env } from 'src/environments/environment';

export class SampleAppController {
  private themeHelpers: ThemeHelpers = new ThemeHelpers();
  private faceTecSDKInstance!: FaceTecSDKInstance;

  // For Official ID Photo Sessions, the FaceTec Sample App demonstrates getting the generated Official ID Photo from the Server's response,
  // storing it here to display the result on a sample screen once the FaceTec SDK exits.
  public static latestOfficialIDPhoto: string = "";

  // IMPORTANT NOTE:  In Your Production Application, DO NOT set or handle externalDatabaseRefID in your client-side code.
  //
  // The externalDatabaseRefID is used in the following calls for the following reasons:
  // - 3D Enrollment - Your internal identifier for the 3D Enrollment.
  // - 3D:3D Re-Verification - Your internal identifier for the 3D Enrollment that will be used to perform 3D:3D Matching against for the 3D FaceScan that will be created.
  // - Photo ID Match - Your internal identifier for the 3D Enrollment that will be used to to perform 3D:2D Matching of the ID Images to the 3D Enrollment.
  //
  // The FaceTec Sample App demonstrates generating the externalDatabaseRefID on the client-side *FOR DEMONSTRATION PURPOSES ONLY*.
  // In Production, you need to generate and manage the externalDatabaseRefIDs in your server-side code.
  // * If you expose externalDatabaseRefIDs in your front-end code, you will allow for attacks where externalDatabaseRefIDs can be
  // exposed by to attackers by hooking into device code or inspecting network transactions.
  public static demonstrationExternalDatabaseRefID: string = "";

  public constructor() {
    SampleAppUtilities.formatUIForDevice();

    this.initializeFaceTecSDK();
  }

  // Set up for loading the FaceTecSDK and initialize
  private initializeFaceTecSDK = (): void => {
    // let deviceKeyIdentifier = env['DeviceKeyIdentifier'];
    let FACETEC_SDK_PATH = '/assets/core-sdk/FaceTecSDK.js/resources';
    let FACETEC_IMAGES_PATH = '/assets/core-sdk/FaceTec_images"';

    // Set a the directory path for other FaceTec Browser SDK Resources.
    // original   
    // FaceTecSDK.setResourceDirectory("../../core-sdk/FaceTecSDK.js/resources");
    FaceTecSDK.setResourceDirectory(FACETEC_SDK_PATH);

    // Set the directory path for required FaceTec Browser SDK images.
    //original
    // FaceTecSDK.setImagesDirectory("../../core-sdk/FaceTec_images");
    FaceTecSDK.setImagesDirectory(FACETEC_IMAGES_PATH);

    // Initialize FaceTec Browser SDK
    // Required Parameters:
    // - deviceKeyIdentifier:  The public Device Key Identifier associated with your Application
    // - sessionRequestProcessor:  A SessionRequestProcessor class.  Please see the implementation of SessionRequestProcessor in this Sample App
    // - callback:  A FaceTecInitializeCallback.
    //      - The onSuccess callback is called with a FaceTecSDKInstance when successful.
    //      - The onError callback is called when your SessionRequestProcessor cannot make a connection to your Server, or an invalid Device Key Identifier was used.
    FaceTecSDK.initializeWithSessionRequest(Config.DeviceKeyIdentifier, new SessionRequestProcessor(), {
      onSuccess: (newFaceTecSdkInstance: FaceTecSDKInstance) => {
        this.faceTecSDKInstance = newFaceTecSdkInstance;
        this.onFaceTecSDKInitializationSuccess();
      },
      onError: (initializationError: FaceTecInitializationError) => {
        this.onFaceTecSDKInitializationFailure(initializationError);
      }
    });
  };

  // Finish setup after initialization success
  private onFaceTecSDKInitializationSuccess = (): void => {
    SampleAppUtilities.setupAndFadeInMainUIOnInitializationSuccess();

    // Set your FaceTec Device SDK Customizations.
    this.themeHelpers.setAppTheme(this.themeHelpers.getCurrentTheme());

    // Set the sound files that are to be used for Vocal Guidance.
    SampleAppUtilities.setVocalGuidanceSoundFiles();

    // Set the strings to be used for group names, field names, and placeholder texts for the FaceTec ID Scan User OCR Confirmation Screen.
    SampleAppUtilities.setOCRLocalization();

    DeveloperStatusMessages.logAndDisplayMessage("Initialized Successfully.");
  };

  // Handle initialization unsuccess
  private onFaceTecSDKInitializationFailure = (initializationError: FaceTecInitializationError): void => {
    SampleAppUtilities.fadeInMainUIContainer();
    DeveloperStatusMessages.logInitializationErrorResult(initializationError);
  };

  // Initiate a 3D Liveness Check.
  public onLivenessCheckPressed = (): void => {
    SampleAppUtilities.fadeOutMainUIAndPrepareForSession();
    SampleAppController.demonstrationExternalDatabaseRefID = "";
    this.faceTecSDKInstance.start3DLiveness(new SessionRequestProcessor());
  };

  // Initiate a 3D Liveness Check, then storing the 3D FaceMap in the Database, also known as "Enrollment".  A random enrollmentIdentifier is generated each time to guarantee uniqueness.
  public onEnrollUserPressed = (): void => {
    SampleAppUtilities.fadeOutMainUIAndPrepareForSession();
    SampleAppController.demonstrationExternalDatabaseRefID = this.generateExternalDatabaseRefID();
    this.faceTecSDKInstance.start3DLiveness(new SessionRequestProcessor());
  };

  // Perform 3D to 3D Verification against the Enrollment previously performed.
  public onVerifyUserPressed = (): void => {
    // For demonstration purposes, verify that we have an enrollmentIdentifier to Verify against.
    if (SampleAppController.demonstrationExternalDatabaseRefID.length === 0) {
      DeveloperStatusMessages.logAndDisplayMessage("Please enroll first before trying verification.");
    }
    else {
      SampleAppUtilities.fadeOutMainUIAndPrepareForSession();
      this.faceTecSDKInstance.start3DLivenessThen3DFaceMatch(new SessionRequestProcessor());
    }
  };

  // Perform a 3D Liveness Check, then an ID Scan, then Match the 3D FaceMap to the ID Scan.
  public onPhotoIDMatchPressed = (): void => {
    SampleAppUtilities.fadeOutMainUIAndPrepareForSession();
    SampleAppController.demonstrationExternalDatabaseRefID = this.generateExternalDatabaseRefID();
    this.faceTecSDKInstance.start3DLivenessThen3D2DPhotoIDMatch(new SessionRequestProcessor());
  };

  // Perform Photo ID Scan, generating a username each time to guarantee uniqueness.
  public onPhotoIDScanPressed = (): void => {
    SampleAppUtilities.fadeOutMainUIAndPrepareForSession();
    SampleAppController.demonstrationExternalDatabaseRefID = this.generateExternalDatabaseRefID();
    this.faceTecSDKInstance.startIDScanOnly(new SessionRequestProcessor());
  };

  // Initiate an Official ID Photo session by displaying the Official ID Photo instructions screen
  public onOfficialIDPhotoPressed = (): void => {
    alert("This is a Paid Extra-Feature, please contact FaceTec before use.");

    // Uncomment this code to use Official ID Photo
    // SampleAppUtilities.fadeOutMainUIControlsAndFadeInOfficialIDInstructionsUI();
  };

  // Continue an Official ID Photo session once continue button is pressed from the Official ID Photo instructions screen
  public onContinueOfficialIDPhotoPressed = (): void => {
    SampleAppUtilities.fadeOutMainUIAndPrepareForSession();
    SampleAppController.demonstrationExternalDatabaseRefID = this.generateExternalDatabaseRefID();
    this.faceTecSDKInstance.startSecureOfficialIDPhotoCapture(new SessionRequestProcessor());
  };

  // Upon cancellation of Official ID Photo sesison, clear the latest Session data and show the main UI
  public onCancelOfficialIDPhotoPressed = (): void => {
    SampleAppController.demonstrationExternalDatabaseRefID = "";
    SampleAppController.latestOfficialIDPhoto = "";

    SampleAppUtilities.fadeOutOfficialIDPhotoUIAndFadeInMainUIControls();
  };

  // Handle download of Official ID Photo
  public onDownloadOfficialIDPhotoPressed = (): void => {
    // Generate a formatted date string (offset by the users time zone) for use in building a unique filename suffix (format YYYY-MM-DD).
    const dateTimeNow: Date = new Date();
    const dateTimeNowArray: string[] = new Date(dateTimeNow.getTime() - (dateTimeNow.getTimezoneOffset() * 60 * 1000)).toISOString().split("T");
    const formattedDate: string = `${dateTimeNowArray[0]}`;

    const downloadLink: HTMLAnchorElement = document.createElement("a");
    downloadLink.href = `data:image/jpeg;base64, ${SampleAppController.latestOfficialIDPhoto}`;
    downloadLink.download = `FaceTec_Generated_Official_ID_Photo_${formattedDate}_${crypto.randomUUID().substring(0, 8)}.jpg`;
    downloadLink.click();
  };

  // Set a new customization for FaceTec Browser SDK.
  public onDesignShowcasePressed(): void {
    this.themeHelpers.showNewTheme();
  }

  // Set vocal guidance mode
  public onVocalGuidanceSettingsButtonPressed(): void {
    SampleAppUtilities.setVocalGuidanceMode();
  }

  // Create a new externalDatabaseRefID
  private generateExternalDatabaseRefID = (): string => {
    return "browser_sample_app_" + SampleAppUtilities.generateUUId();
  };

  // Handle the FaceTec Session result returned on FaceTec SDK exit
  public static demonstrateHandlingFaceTecExit = (FaceTecSessionResult: FaceTecSessionResult): void => {
    DeveloperStatusMessages.logSessionStatusOnFaceTecExit(FaceTecSessionResult.status);

    if (FaceTecSessionResult.status === FaceTecSDK.FaceTecSessionStatus.SessionCompleted) {
      if (SampleAppController.latestOfficialIDPhoto.length > 0) {
        // Case: Official ID Photo Session completed successfully
        // Show the Official ID Photo results screen if the session is an Official ID Photo session
        SampleAppUtilities.fadeInOfficialIDPhotoResultsUI();
        return;
      }
    }
    else {
      SampleAppController.demonstrationExternalDatabaseRefID = "";
      SampleAppController.latestOfficialIDPhoto = "";
      SampleAppUtilities.hideOfficialIDPhotoUIAndShowMainUIControlsDueToUnsuccessfulSession();
    }

    SampleAppUtilities.showMainUI();
  };
}

window.onload = (): void => {
  (window as any).sampleAppController = new SampleAppController();
};
