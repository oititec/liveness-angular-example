import { FaceTecCustomization } from "../../core-sdk-v10/core-sdk/FaceTecSDK.js/FaceTecCustomization";

let FACESCAN_SOUND_FILE_V10 = 'assets/facetec-v10/sample-app-resources/Vocal_Guidance_Audio_Files';

export class SoundFileUtilities {
  public setVocalGuidanceSoundFiles = (currentCustomization: FaceTecCustomization): FaceTecCustomization => {
    currentCustomization.vocalGuidanceCustomization.pleaseFrameYourFaceInTheOvalSoundFile = `${FACESCAN_SOUND_FILE_V10}/please_frame_your_face_sound_file.mp3`;
    currentCustomization.vocalGuidanceCustomization.pleaseMoveCloserSoundFile = `${FACESCAN_SOUND_FILE_V10}/please_move_closer_sound_file.mp3`;
    currentCustomization.vocalGuidanceCustomization.pleaseRetrySoundFile = `${FACESCAN_SOUND_FILE_V10}/please_retry_sound_file.mp3`;
    currentCustomization.vocalGuidanceCustomization.uploadingSoundFile = `${FACESCAN_SOUND_FILE_V10}/uploading_sound_file.mp3`;
    currentCustomization.vocalGuidanceCustomization.facescanSuccessfulSoundFile = `${FACESCAN_SOUND_FILE_V10}/facescan_successful_sound_file.mp3`;
    currentCustomization.vocalGuidanceCustomization.pleasePressTheButtonToStartSoundFile = `${FACESCAN_SOUND_FILE_V10}/please_press_button_sound_file.mp3`;
    return currentCustomization;
  };
}
