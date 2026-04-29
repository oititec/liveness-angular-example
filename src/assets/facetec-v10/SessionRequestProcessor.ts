import { FacetecV10Component } from "src/app/facetec-v10/facetec-v10.component";
import { FaceTecSessionRequestProcessor, FaceTecSessionResult, type FaceTecSessionRequestProcessorCallback } from "../10.0.42/core-sdk/FaceTecSDK.js/FaceTecPublicApi";
import { SampleAppNetworkingRequest } from "./utilities/SampleAppNetworkingRequest";

export class SessionRequestProcessor implements FaceTecSessionRequestProcessor {
  // The onSessionRequest API is the core method called by the FaceTec SDK when a request needs to be processed by the FaceTec SDK.
  // Your code must retrieve the Session Request Blob and send to your FaceTec Server.
  // Your code must retrieve the Response Blob from FaceTec Server and call processResponse, passing in the Response Blob.
  public onSessionRequest = (sessionRequestBlob: string, sessionRequestCallback: FaceTecSessionRequestProcessorCallback): void => {
    // When you receive a Session Request Blob, call your webservice API that handles this object and passes it to FaceTec Server.
    // SampleAppNetworkingRequest is a demonstration class for making a networking call that passes the Session Request Blob, and handles the response.
    SampleAppNetworkingRequest.send(this, sessionRequestBlob, sessionRequestCallback);
  };

  // When the request blob has been received, send it back to the FaceTecSDK for continued processing
  public onResponseBlobReceived = (responseBlob: string, sessionRequestCallback: FaceTecSessionRequestProcessorCallback): void => {
    sessionRequestCallback.processResponse(responseBlob);
  };

  // When upload progress is received from your webservice, call updateProgress to update the Progress Bar state.
  // Please note that onUploadProgress is a convenience function set up on this class,
  // so that this function can be called asynchronously when your networking code receives an upload progress event.
  public onUploadProgress = (progress: number, sessionRequestCallback: FaceTecSessionRequestProcessorCallback): void => {
    sessionRequestCallback.updateProgress(progress);
  };

  // Calling abortOnCatastrophicError is not allowed except for catastrophic network failures.
  // Calling abortOnCatastrophicError to exit the FaceTec UI with custom logic is not allowed.
  public onCatastrophicNetworkError = (sessionRequestCallback: FaceTecSessionRequestProcessorCallback): void => {
    sessionRequestCallback.abortOnCatastrophicError();
  };

  // The onFaceTecExit API is the method called when the FaceTec SDK completes or cancels.
  public onFaceTecExit = (faceTecSessionResult: FaceTecSessionResult): void => {
    FacetecV10Component.demonstrateHandlingFaceTecExit(faceTecSessionResult);
  };
}
