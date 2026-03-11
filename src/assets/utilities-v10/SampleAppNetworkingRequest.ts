import { Config } from "../../../config-v10/Config";
import { FaceTecSessionRequestProcessorCallback } from "../core-sdk/FaceTecSDK.js/FaceTecPublicApi";
import { FaceTecSDK } from "../core-sdk/FaceTecSDK.js/FaceTecSDK";
import { SampleAppController } from "../SampleAppController";
import { SessionRequestProcessor } from "../SessionRequestProcessor";
import { DeveloperStatusMessages } from "./DeveloperStatusMessages";

// Sample class for handling networking calls needed in order for FaceTec to function correctly.
// In Your App, please use the networking constructs and protocols that meet your security requirements.
//
// Notes:
// - Adding additional logic to this code is not allowed.  Do not add any additional logic outside of what is demonstrated in this Sample.
// - Adding additional asynchronous calls to this code is not allowed.  Only make your own additional asynchronous calls once the FaceTec UI is closed.
// - Adding code that modifies any App UI (Yours or FaceTec's) is not allowed.  Only add code that modifies your own App UI once the FaceTec UI is closed.
export class SampleAppNetworkingRequest {

  private static readonly MAX_ERRORS_ALLOWED = 2;

  public static send = (
    referencingProcessor: SessionRequestProcessor,
    sessionRequestBlob: string,
    sessionRequestCallback: FaceTecSessionRequestProcessorCallback
  ): void => {
    //
    // Step 1: Construct the payload.
    //
    // - The payload contains the Session Request Blob
    // - Please see the notes below about correctly handling externalDatabaseRefID for certain call types.
    //
    const sessionRequestCallPayload: { requestBlob: string, externalDatabaseRefID?: string } = {
      requestBlob: sessionRequestBlob
    };

    // Please see extensive notes in SampleAppActivity for more details.
    // externalDatabaseRefID is included in FaceTec Device SDK Sample App Code for demonstration purposes.
    // In Your App, you will be setting and handling this in Your Webservice code.
    if (SampleAppController.demonstrationExternalDatabaseRefID !== "") {
      sessionRequestCallPayload.externalDatabaseRefID = SampleAppController.demonstrationExternalDatabaseRefID;
    }

    //
    // Step 2: Set up the networking request.
    //
    // - This Sample App demonstrates making calls to the FaceTec Testing API by default.
    // - In Your App, please use the webservice endpoint you have set up that accepts networking requests from Your App.
    // - In Your Webservice, build an endpoint that takes incoming requests, and forwards them to FaceTec Server.
    // - This code should never call your server directly. It should contact middleware you have created that forwards requests to your server.
    //

    const request: XMLHttpRequest = new XMLHttpRequest();
    request.timeout = 2 * 60 * 1000;

    function openAndSendRequest() {
      request.open("POST", Config.YOUR_API_OR_FACETEC_TESTING_API_ENDPOINT);
      request.setRequestHeader("Content-Type", "application/json");

      // Developer Note: This is ONLY needed for calls to the FaceTec Testing API.
      // You should remove this when using Your App connected to Your Webservice + FaceTec Server
      request.setRequestHeader("X-Device-Key", Config.DeviceKeyIdentifier);

      // Developer Note: This is ONLY needed for calls to the FaceTec Testing API.
      // You should remove this when using Your App connected to Your Webservice + FaceTec Server
      request.setRequestHeader("X-Testing-API-Header", FaceTecSDK.getTestingAPIHeader());

      request.send(JSON.stringify(sessionRequestCallPayload));
    }

    let errorCount = 0;

    //
    // Step 3: Make the API Call, and handle the response.
    //
    // - Unless there is a networking error, or an error in your webservice or infrastructure, the Response Blob is retrieved and passed back into processResponse.
    // - For error cases, abortOnCatastrophicError is called as this would indicate a networking issue on the User device or network, or an error in Your Webservice.
    //

    request.onload = (): void => {
      //
      // Step 4:  Get the Response Blob and call processResponse on the Session Request Callback.
      //
      // - Call a convenience function that either gets a valid Response Blob, or handles the error and returns null.
      // - Checks for null, indicating an error was detected and handled.
      //

      const responseBlob: string | null = this.getResponseBlobOrHandleError(request);

      if (responseBlob !== null) {
        referencingProcessor.onResponseBlobReceived(responseBlob, sessionRequestCallback);
      }
      else {
        referencingProcessor.onCatastrophicNetworkError(sessionRequestCallback);
      }
    };

    request.onerror = (ev: ProgressEvent): void => {
      if (errorCount < SampleAppNetworkingRequest.MAX_ERRORS_ALLOWED) {
        // Retry the request after a delay in case this was a temporary network connection issue
        errorCount++;
        setTimeout(openAndSendRequest, errorCount * 1000);
        return;
      }

      // On catastrophic error call the onCatastrophicNetworkError handler
      // This should never be called except when a hard server error occurs. For example the user loses network connectivity.
      // You may want to implement some sort of retry logic here
      DeveloperStatusMessages.logMessage(`SampleAppNetworkingRequest >> request.onerror >> Catastrophic error: ${ev}`);
      referencingProcessor.onCatastrophicNetworkError(sessionRequestCallback);
    };

    request.upload.onprogress = (ev: ProgressEvent): void => {
      // Developer Note: With the Sample Networking library in this Sample App,
      // this code demonstrates getting the networking request progress and making
      // the appropriate call in the FaceTec Device SDK to update the upload progress.
      // This is how the FaceTec Upload Progress Bar gets changed.
      referencingProcessor.onUploadProgress(ev.loaded / ev.total, sessionRequestCallback);
    };

    openAndSendRequest();
  };

  private static getResponseBlobOrHandleError = (request: XMLHttpRequest): string | null => {
    if (request.status === 200) {
      try {
        const parsedResponse: { responseBlob: string, result?: { [key: string]: string | undefined } } = JSON.parse(request.responseText);

        // Developer Note:  This is a special case for Official ID Photo Mode.
        // To demonstrate behavior in the Sample App where the Official ID Photo is shown to the UI,
        // here we store that off if it exists for future code to handle.
        this.storeOfficialIDPhotoIfApplicable(parsedResponse);

        return parsedResponse.responseBlob;
      }
      catch (e) {
        DeveloperStatusMessages.logMessage(`SampleAppNetworkingRequest >> request.onload >> Failed to parse responseText: ${e}`);
      }
    }
    else {
      DeveloperStatusMessages.logMessage(`SampleAppNetworkingRequest >> request.onload >> Server Status: ${request.status}`);
    }

    return null;
  };

  private static storeOfficialIDPhotoIfApplicable = (parsedResponse: { responseBlob: string, result?: { [key: string]: string | undefined } }): void => {
    // Retrieve the Official ID Photo if it exists in the response
    if (parsedResponse.result !== undefined && typeof parsedResponse.result['officialIDPhotoImage'] === "string" && parsedResponse.result['officialIDPhotoImage'] !== "") {
      SampleAppController.latestOfficialIDPhoto = parsedResponse.result['officialIDPhotoImage'];
    }
  };
}
