import { FaceTecCustomization } from "../core-sdk/FaceTecSDK.js/FaceTecCustomization";

// Load custom sound files
let FACESCAN_SOUND_FILE = 'assets/sample-app-resources/Vocal_Guidance_Audio_Files';


export class SoundFileUtilities {
  // Return the customization object updated with custom sound files
  public setVocalGuidanceSoundFiles = (currentCustomization: FaceTecCustomization): FaceTecCustomization => {
    currentCustomization.vocalGuidanceCustomization.pleaseFrameYourFaceInTheOvalSoundFile = `${FACESCAN_SOUND_FILE}/please_frame_your_face_sound_file.mp3`;
    currentCustomization.vocalGuidanceCustomization.pleaseMoveCloserSoundFile = `${FACESCAN_SOUND_FILE}/please_move_closer_sound_file.mp3"`;
    currentCustomization.vocalGuidanceCustomization.pleaseRetrySoundFile = `${FACESCAN_SOUND_FILE}/please_retry_sound_file.mp3"`;
    currentCustomization.vocalGuidanceCustomization.uploadingSoundFile = `${FACESCAN_SOUND_FILE}/uploading_sound_file.mp3"`;
    currentCustomization.vocalGuidanceCustomization.facescanSuccessfulSoundFile = `${FACESCAN_SOUND_FILE}/facescan_successful_sound_file.mp3"`;
    currentCustomization.vocalGuidanceCustomization.pleasePressTheButtonToStartSoundFile = `${FACESCAN_SOUND_FILE}/please_press_button_sound_file.mp3"`;
    return currentCustomization;
  };
}