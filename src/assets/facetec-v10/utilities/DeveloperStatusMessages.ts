import { FacetecV10Component } from "src/app/facetec-v10/facetec-v10.component";
import { FaceTecInitializationError, FaceTecSessionRequestProcessorCallback, FaceTecSessionStatus } from "../../core-sdk-v10/core-sdk/FaceTecSDK.js/FaceTecPublicApi";
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
    let logMessage: string = `FaceTecSessionResult.status: ${sessionStatus} - "${FaceTecStatusEnumFriendlyText.descriptionForSessionStatus(sessionStatus)}"`;
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
