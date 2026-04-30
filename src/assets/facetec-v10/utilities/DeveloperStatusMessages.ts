import { FaceTecInitializationError, FaceTecSessionRequestProcessorCallback, FaceTecSessionStatus } from "../../10.0.42/core-sdk/FaceTecSDK.js/FaceTecPublicApi";
import { FaceTecSDK } from "../../10.0.42/core-sdk/FaceTecSDK.js/FaceTecSDK";
import { FaceTecStatusEnumFriendlyText } from "./FaceTecStatusEnumFriendlyText";

export class DeveloperStatusMessages {
  public static LOG_PREFIX: string = "FaceTec SampleApp:";
  public static displayMessage = (message: string): void => {
    (document.getElementById("status") as HTMLElement).innerHTML = message;
  };

  public static logMessage = (message: string): void => {
    console.log(`${this.LOG_PREFIX} ${message}`);
  };

  public static logAndDisplayMessage = (message: string): void => {
    this.displayMessage(message);
    this.logMessage(message);
  };

  public static logInitializationErrorResult = (enumValue: FaceTecInitializationError): void => {
    const displayMessage: string = FaceTecStatusEnumFriendlyText.descriptionForInitializationError(enumValue);
    const logMessage: string = `FaceTecInitializationError: ${enumValue} "${displayMessage}"`;

    this.displayMessage(displayMessage);
    this.logMessage(logMessage);
  };

  public static logSessionStatusOnFaceTecExit = (sessionStatus: FaceTecSessionStatus): void => {
    let displayMessage: string = "";
    let logMessage: string = "Unable to parse status message";

    if (sessionStatus != null) {
      switch (sessionStatus) {
        case FaceTecSDK.FaceTecSessionStatus.LockedOut:
          displayMessage = "O dispositivo está bloqueado do FaceTec Browser SDK.";
          break;
        case FaceTecSDK.FaceTecSessionStatus.CameraPermissionsDenied:
          displayMessage = "Não há permissão de câmera";
          break;
        default:
          break;
      }

      logMessage = `FaceTecSessionResult.status: ${sessionStatus} - "${FaceTecStatusEnumFriendlyText.descriptionForSessionStatus(sessionStatus)}"`;
    }

    this.displayMessage(displayMessage);
    this.logMessage(logMessage);
  };

  public static validateLivenessResult = (responseJSON: any, sessionRequestCallback: FaceTecSessionRequestProcessorCallback): void => {
    if (responseJSON.codID) {
      if (responseJSON.codID === 300.1 || responseJSON.codID === 300.2) {
        sessionRequestCallback.abortOnCatastrophicError();
      }
    }
    if (responseJSON.error) {
      throw Error
    }
  }
}
