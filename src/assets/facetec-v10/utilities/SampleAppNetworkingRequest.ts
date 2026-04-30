import { environment } from "src/environments/environment";
import { FaceTecSessionRequestProcessorCallback } from "../../10.0.42/core-sdk/FaceTecSDK.js/FaceTecPublicApi";
import { SessionRequestProcessor } from "../SessionRequestProcessor";
import { DeveloperStatusMessages } from "./DeveloperStatusMessages";

export class SampleAppNetworkingRequest {

  public static send = (
    referencingProcessor: SessionRequestProcessor,
    sessionRequestBlob: string,
    sessionRequestCallback: FaceTecSessionRequestProcessorCallback
  ): void => {

    const appkey = window.localStorage.getItem('appkey');
    const userAgent = window.navigator.userAgent;

    const sessionRequestCallPayload: { requestBlob: string, appkey: any, userAgent: string } = {
      requestBlob: sessionRequestBlob,
      appkey: appkey,
      userAgent: userAgent
    };

    const request: XMLHttpRequest = new XMLHttpRequest();

    function openAndSendRequest(): any {
      request.open("POST", environment.apiUrl + '/facecaptcha/service/captcha/3d/process-request');
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify(sessionRequestCallPayload));
    }

    request.onload = (response: any): any => {
      const responseJSON = JSON.parse(
        response.target.response
      );
      console.log(responseJSON)

      const responseBlob: string | null = this.getResponseBlobOrHandleError(request);

      if (responseBlob !== null) {
        DeveloperStatusMessages.validateLivenessResult(responseJSON, sessionRequestCallback);
        referencingProcessor.onResponseBlobReceived(responseBlob, sessionRequestCallback);
      }
      else {
        referencingProcessor.onCatastrophicNetworkError(sessionRequestCallback);
      }
    };

    request.onerror = (ev: ProgressEvent): void => {
      DeveloperStatusMessages.logMessage(`SampleAppNetworkingRequest >> request.onerror >> Catastrophic error: ${ev}`);
      referencingProcessor.onCatastrophicNetworkError(sessionRequestCallback);
    };

    request.upload.onprogress = (ev: ProgressEvent): void => {
      referencingProcessor.onUploadProgress(ev.loaded / ev.total, sessionRequestCallback);
    };

    openAndSendRequest();
  };

  private static getResponseBlobOrHandleError = (request: XMLHttpRequest): string | null => {
    if (request.status === 200) {
      try {
        const parsedResponse: { responseBlob: string, result?: { [key: string]: string | undefined } } = JSON.parse(request.responseText);

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
}
