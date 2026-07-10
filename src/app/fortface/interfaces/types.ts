export type FortfaceSessionAction =
  | "abort"
  | "cancel"
  | "capture"
  | "timeout"
  | "timeout_ready"
  | "error";

export interface FortfaceEncryptedData {
  data: string;
  imgData?: string;
  key: string;
}

export interface FortfaceSessionResult {
  action: FortfaceSessionAction;
  data: {
    encryptData?: FortfaceEncryptedData;
    imgPreview?: string;
  };
  sessionDetails?: {
    errorCode?: string;
    metrics?: {
      downloadFiles: number;
      openCamera: number;
      totalCaptureTime: number;
      captureTime: number;
    };
  };
}

export type FortfaceCustomizer = Record<string, unknown>;

export interface FortfaceSessionDetails {
  returnMetrics?: boolean;
  useBackCamera?: boolean;
  getGeolocation?: boolean;
}

export interface FortfaceSdkElement extends HTMLElement {
  start: () => Promise<string>;
  startSession: (
    callback: (result: FortfaceSessionResult) => void,
    sessionId: string,
    sessionKey: string,
    sessionDetails?: FortfaceSessionDetails
  ) => Promise<void>;
  setCustomizer: (customizer: FortfaceCustomizer) => Promise<void>;
  getVersion: () => Promise<string>;
}