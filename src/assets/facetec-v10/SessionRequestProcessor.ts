import { FacetecV10Component } from "src/app/facetec-v10/facetec-v10.component";
import { FaceTecSessionRequestProcessor, FaceTecSessionResult, type FaceTecSessionRequestProcessorCallback } from "../core-sdk-v10/core-sdk/FaceTecSDK.js/FaceTecPublicApi";
import { SampleAppNetworkingRequest } from "./utilities/SampleAppNetworkingRequest";

export class SessionRequestProcessor implements FaceTecSessionRequestProcessor {
  public onSessionRequest = (sessionRequestBlob: string, sessionRequestCallback: FaceTecSessionRequestProcessorCallback): void => {
    SampleAppNetworkingRequest.send(this, sessionRequestBlob, sessionRequestCallback);
  };

  public onResponseBlobReceived = (responseBlob: string, sessionRequestCallback: FaceTecSessionRequestProcessorCallback): void => {
    sessionRequestCallback.processResponse(responseBlob);
  };

  public onUploadProgress = (progress: number, sessionRequestCallback: FaceTecSessionRequestProcessorCallback): void => {
    sessionRequestCallback.updateProgress(progress);
  };

  public onCatastrophicNetworkError = (sessionRequestCallback: FaceTecSessionRequestProcessorCallback): void => {
    sessionRequestCallback.abortOnCatastrophicError();
  };

  public onFaceTecExit = (faceTecSessionResult: FaceTecSessionResult): void => {
    FacetecV10Component.demonstrateHandlingFaceTecExit(faceTecSessionResult);
  };
}
