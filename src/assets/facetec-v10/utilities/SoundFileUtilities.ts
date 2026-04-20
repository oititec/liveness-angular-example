import { FaceTecCustomization } from "../../10.0.42/core-sdk/FaceTecSDK.js/FaceTecCustomization";

// import FACESCAN_SUCCESSFUL_SOUND_FILE from "../../../assets/facetec-v10/sample-app-resources/Vocal_Guidance_Audio_Files/facescan_successful_sound_file.mp3";
// import PLEASE_FRAME_YOUR_FACE_SOUND_FILE from "../../../assets/facetec-v10/sample-app-resources/Vocal_Guidance_Audio_Files/please_frame_your_face_sound_file.mp3";
// import PLEASE_MOVE_CLOSER_SOUND_FILE from "../../../assets/facetec-v10/sample-app-resources/Vocal_Guidance_Audio_Files/please_move_closer_sound_file.mp3";
// import PLEASE_PRESS_BUTTON_SOUND_FILE from "../../../assets/facetec-v10/sample-app-resources/Vocal_Guidance_Audio_Files/please_press_button_sound_file.mp3";
// import PLEASE_RETRY_SOUND_FILE from "../../../assets/facetec-v10/sample-app-resources/Vocal_Guidance_Audio_Files/please_retry_sound_file.mp3";
// import UPLOADING_SOUND_FILE from "../../../assets/facetec-v10/sample-app-resources/Vocal_Guidance_Audio_Files/uploading_sound_file.mp3";


// Load custom sound files
let FACESCAN_SOUND_FILE_V10 = 'assets/facetec-v10/sample-app-resources/Vocal_Guidance_Audio_Files';

export class SoundFileUtilities {
  // Return the customization object updated with custom sound files
  public setVocalGuidanceSoundFiles = (currentCustomization: FaceTecCustomization): FaceTecCustomization => {
    currentCustomization.vocalGuidanceCustomization.pleaseFrameYourFaceInTheOvalSoundFile = `${FACESCAN_SOUND_FILE_V10}/please_frame_your_face_sound_file.mp3`;
    currentCustomization.vocalGuidanceCustomization.pleaseMoveCloserSoundFile = `${FACESCAN_SOUND_FILE_V10}/please_move_closer_sound_file.mp3`;
    currentCustomization.vocalGuidanceCustomization.pleaseRetrySoundFile = `${FACESCAN_SOUND_FILE_V10}/please_retry_sound_file.mp3`;
    currentCustomization.vocalGuidanceCustomization.uploadingSoundFile = `${FACESCAN_SOUND_FILE_V10}/uploading_sound_file.mp3`;
    currentCustomization.vocalGuidanceCustomization.facescanSuccessfulSoundFile = `${FACESCAN_SOUND_FILE_V10}/facescan_successful_sound_file.mp3`;
    currentCustomization.vocalGuidanceCustomization.pleasePressTheButtonToStartSoundFile = `${FACESCAN_SOUND_FILE_V10}/please_press_button_sound_file.mp3`;
    return currentCustomization;
  };


    // public setVocalGuidanceSoundFiles = (currentCustomization: FaceTecCustomization): FaceTecCustomization => {
    //   currentCustomization.vocalGuidanceCustomization.pleaseFrameYourFaceInTheOvalSoundFile = PLEASE_FRAME_YOUR_FACE_SOUND_FILE as string;
    //   currentCustomization.vocalGuidanceCustomization.pleaseMoveCloserSoundFile = PLEASE_MOVE_CLOSER_SOUND_FILE as string;
    //   currentCustomization.vocalGuidanceCustomization.pleaseRetrySoundFile = PLEASE_RETRY_SOUND_FILE as string;
    //   currentCustomization.vocalGuidanceCustomization.uploadingSoundFile = UPLOADING_SOUND_FILE as string;
    //   currentCustomization.vocalGuidanceCustomization.facescanSuccessfulSoundFile = FACESCAN_SUCCESSFUL_SOUND_FILE as string;
    //   currentCustomization.vocalGuidanceCustomization.pleasePressTheButtonToStartSoundFile = PLEASE_PRESS_BUTTON_SOUND_FILE as string;
    //   return currentCustomization;
    // };
}
