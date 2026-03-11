// Class with friendly descriptions for FaceTecSDK Status Enums
//
// DEVELOPER NOTE:  These properties are for demonstration purposes only to help developers in getting familiar with the FaceTec SDK Status enum values
// In the code in your own App, you should design your own methods and appropriate feedback to end users
// This class is not intended for production code.

import type { FaceTecInitializationError, FaceTecSessionStatus } from "../core-sdk/FaceTecSDK.js/FaceTecPublicApi";
import { FaceTecSDK } from "../core-sdk/FaceTecSDK.js/FaceTecSDK";

export class FaceTecStatusEnumFriendlyText {
  public static descriptionForInitializationError(enumValue: FaceTecInitializationError): string {
    switch (enumValue) {
      case FaceTecSDK.FaceTecInitializationError.RejectedByServer:
        return "The FaceTec SDK Server could not validate this application.";
      case FaceTecSDK.FaceTecInitializationError.RequestAborted:
        return "The provided FaceTecSessionRequestProcessor called abortOnCatastrophicError() and the application could not be validated.";
      case FaceTecSDK.FaceTecInitializationError.DeviceNotSupported:
        return "This device/platform/browser/version combination is not supported by the FaceTec Browser SDK.";
      case FaceTecSDK.FaceTecInitializationError.ResourcesCouldNotBeLoadedOnLastInit:
        return "FaceTec SDK could not load resources.";
      case FaceTecSDK.FaceTecInitializationError.GetUserMediaRemoteHTTPNotSupported:
        return "Browser Camera APIs are only supported on localhost or https.";
      case FaceTecSDK.FaceTecInitializationError.UnknownInternalError:
        return "An unknown and unexpected error occurred.";
      default:
        return "Unexpected FaceTecInitializationError Value: " + enumValue;
    }
  }

  public static descriptionForSessionStatus(enumValue: FaceTecSessionStatus): string {
    switch (enumValue) {
      case FaceTecSDK.FaceTecSessionStatus.SessionCompleted:
        return "The Session was performed successfully.";
      case FaceTecSDK.FaceTecSessionStatus.RequestAborted:
        return "The application called abortOnCatastrophicError().";
      case FaceTecSDK.FaceTecSessionStatus.UserCancelledFaceScan:
        return "The user cancelled before performing enough Scans to Succeed.";
      case FaceTecSDK.FaceTecSessionStatus.UserCancelledIDScan:
        return "The user cancelled before performing enough Scans to Complete.";
      case FaceTecSDK.FaceTecSessionStatus.LockedOut:
        return "FaceTec Browser SDK is in a lockout state.";
      case FaceTecSDK.FaceTecSessionStatus.CameraError:
        return "Session cancelled because selected camera is not active.";
      case FaceTecSDK.FaceTecSessionStatus.CameraPermissionsDenied:
        return "The user did not enable the camera after prompting for camera permissions or camera permissions were previously denied.";
      case FaceTecSDK.FaceTecSessionStatus.IFrameNotAllowedWithoutPermission:
        return "The Session was cancelled because you do not have permission to run the FaceTec Browser SDK in an iFrame. Please contact FaceTec to request the needed code";
      case FaceTecSDK.FaceTecSessionStatus.UnknownInternalError:
        return "The Session was cancelled because of an Unknown Error.";
      default:
        return "Unexpected FaceTecSessionStatus Value: " + enumValue;
    }
  }
}
