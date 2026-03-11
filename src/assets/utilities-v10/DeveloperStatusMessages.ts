import { FaceTecInitializationError, FaceTecSessionStatus } from "../core-sdk/FaceTecSDK.js/FaceTecPublicApi";
import { FaceTecSDK } from "../core-sdk/FaceTecSDK.js/FaceTecSDK";
import { FaceTecStatusEnumFriendlyText } from "./FaceTecStatusEnumFriendlyText";

// Helper class to log and or display SampleApp messages.
// This classes sole purpose is to help developers learn about the FaceTecSDK response statuses.
export class DeveloperStatusMessages {
  public static LOG_PREFIX: string = "FaceTec SampleApp:";
  // Display the message on the screen for the user
  public static displayMessage = (message: string): void => {
    (document.getElementById("status") as HTMLElement).innerHTML = message;
  };

  // Log the message to the console for the developer. Prefix with FaceTec SampleApp: so the messages can be filtered
  public static logMessage = (message: string): void => {
    console.log(`${this.LOG_PREFIX} ${message}`);
  };

  // Log the message and display on screen for the user
  public static logAndDisplayMessage = (message: string): void => {
    this.displayMessage(message);
    this.logMessage(message);
  };

  // Log FaceTecSDK Initialization Error result for the user
  public static logInitializationErrorResult = (enumValue: FaceTecInitializationError): void => {
    // User message to display
    const displayMessage: string = FaceTecStatusEnumFriendlyText.descriptionForInitializationError(enumValue);
    // Message to log for developer
    const logMessage: string = `FaceTecInitializationError: ${enumValue} "${displayMessage}"`;

    this.displayMessage(displayMessage);
    this.logMessage(logMessage);
  };

  // Process onFaceTecExit status from FaceTecSessionResult or FaceTecIDScanResult
  public static logSessionStatusOnFaceTecExit = (sessionStatus: FaceTecSessionStatus): void => {
    // User message to display
    let displayMessage: string = "See logs for details";
    // Message to log for developer
    let logMessage: string = "Unable to parse status message";

    if (sessionStatus != null) {
      // Special case message for user when the device is locked out
      if (sessionStatus === FaceTecSDK.FaceTecSessionStatus.LockedOut) {
        displayMessage = "The device is locked out of FaceTec Browser SDK.";
      }

      logMessage = `FaceTecSessionResult.status: ${sessionStatus} - "${FaceTecStatusEnumFriendlyText.descriptionForSessionStatus(sessionStatus)}"`;
    }

    this.displayMessage(displayMessage);
    this.logMessage(logMessage);
  };
}
