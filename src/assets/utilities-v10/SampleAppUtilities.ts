import { Config } from "../../../config-v10/Config";
import { FaceTecSDK } from "../core-sdk/FaceTecSDK.js/FaceTecSDK";
import { SampleAppUIFunctions } from "./SampleAppUIFunctions";
import { SoundFileUtilities } from "./SoundFileUtilities";
import { DeveloperStatusMessages } from "./DeveloperStatusMessages";
// import ocrLocalizationJSON = require("../../../../sample-app-resources/FaceTec_OCR_Customization.json");
import { SampleAppController } from "../SampleAppController";

enum VocalGuidanceMode {
  MINIMAL,
  FULL,
  OFF
}

export class SampleAppUtilities  {
  private static vocalGuidanceSoundFilesDirectory: string = "/assets/sample-app-resources/Vocal_Guidance_Audio_Files/";

    // private static vocalGuidanceSoundFilesDirectory: string = "../assets/sample-app-resources/Vocal_Guidance_Audio_Files/";

  private static vocalGuidanceOnPlayer: HTMLAudioElement = new Audio(this.vocalGuidanceSoundFilesDirectory + "vocal_guidance_on.mp3");
  private static vocalGuidanceOffPlayer: HTMLAudioElement = new Audio(this.vocalGuidanceSoundFilesDirectory + "vocal_guidance_off.mp3");
  private static vocalGuidanceMode: VocalGuidanceMode = VocalGuidanceMode.MINIMAL;

  public static setupAndFadeInMainUIOnInitializationSuccess(): void {
    SampleAppUtilities.setupVocalGuidancePlayers();
    SampleAppUtilities.fadeInMainUIContainer();
    SampleAppUtilities.enableControlButtons();

    if (SampleAppUtilities.isLikelyMobileDevice()) {
      SampleAppUtilities.fadeInVocalIconContainer();
    }
  }

  public static setupVocalGuidancePlayers(): void {
    SampleAppUtilities.vocalGuidanceOnPlayer.volume = 0.4;
    SampleAppUtilities.vocalGuidanceOffPlayer.volume = 0.4;

    SampleAppUtilities.vocalGuidanceOffPlayer.onended = function(): void {
      SampleAppUtilities.enableVocalGuidanceButtons();
    };

    SampleAppUtilities.vocalGuidanceOnPlayer.onended = function(): void {
      SampleAppUtilities.enableVocalGuidanceButtons();
    };
  }

  public static setVocalGuidanceMode(): void {
    this.disableVocalGuidanceButtons();

    if (!this.vocalGuidanceOnPlayer.paused || !this.vocalGuidanceOffPlayer.paused) {
      return;
    }

    let playPromise: Promise<void>;

    switch (SampleAppUtilities.vocalGuidanceMode) {
      case VocalGuidanceMode.OFF:
        SampleAppUtilities.vocalGuidanceMode = VocalGuidanceMode.MINIMAL;

        (document.getElementById("vocal-guidance-icon-minimal") as HTMLElement).style.display = "block";
        (document.getElementById("vocal-guidance-icon-full") as HTMLElement).style.display = "none";
        (document.getElementById("vocal-guidance-icon-off") as HTMLElement).style.display = "none";

        playPromise = SampleAppUtilities.vocalGuidanceOnPlayer.play();

        if (typeof playPromise !== "undefined") {
          playPromise.catch((_event: void): void => {
            // Play failed
          });
        }

        Config.currentCustomization.vocalGuidanceCustomization.mode = VocalGuidanceMode.MINIMAL;
        break;

      case VocalGuidanceMode.MINIMAL:
        SampleAppUtilities.vocalGuidanceMode = VocalGuidanceMode.FULL;

        (document.getElementById("vocal-guidance-icon-minimal") as HTMLElement).style.display = "none";
        (document.getElementById("vocal-guidance-icon-full") as HTMLElement).style.display = "block";
        (document.getElementById("vocal-guidance-icon-off") as HTMLElement).style.display = "none";

        playPromise = SampleAppUtilities.vocalGuidanceOnPlayer.play();

        if (typeof playPromise !== "undefined") {
          playPromise.catch((_event: void): void => {
            // Play failed
          });
        }

        Config.currentCustomization.vocalGuidanceCustomization.mode = VocalGuidanceMode.FULL;
        break;

      case VocalGuidanceMode.FULL:
        SampleAppUtilities.vocalGuidanceMode = VocalGuidanceMode.OFF;

        (document.getElementById("vocal-guidance-icon-minimal") as HTMLElement).style.display = "none";
        (document.getElementById("vocal-guidance-icon-full") as HTMLElement).style.display = "none";
        (document.getElementById("vocal-guidance-icon-off") as HTMLElement).style.display = "block";

        playPromise = SampleAppUtilities.vocalGuidanceOffPlayer.play();

        if (typeof playPromise !== "undefined") {
          playPromise.catch((_event: void): void => {
            // Play failed
          });
        }

        Config.currentCustomization.vocalGuidanceCustomization.mode = VocalGuidanceMode.OFF;
        break;
    }

    FaceTecSDK.setCustomization(Config.currentCustomization);
  }

  public static setVocalGuidanceSoundFiles(): void {
    const soundFileUtilities: SoundFileUtilities = new SoundFileUtilities();
    Config.currentCustomization = soundFileUtilities.setVocalGuidanceSoundFiles(Config.currentCustomization);
    FaceTecSDK.setCustomization(Config.currentCustomization);
  }

  public static setOCRLocalization(): void {
    // Set the strings to be used for group names, field names, and placeholder texts for the FaceTec ID Scan User OCR Confirmation Screen.
    // DEVELOPER NOTE: For this demo, we are using the template json file, 'FaceTec_OCR_Customization.json,' as the parameter in calling the configureOCRLocalization API.
    // For the configureOCRLocalization API parameter, you may use any object that follows the same structure and key naming as the template json file, 'FaceTec_OCR_Customization.json'.
    // FaceTecSDK.configureOCRLocalization(ocrLocalizationJSON);
  }

  public static fadeInMainUIContainer(): void {
    new SampleAppUIFunctions("#theme-transition-overlay").fadeOut(800);
    new SampleAppUIFunctions(".wrapping-box-container").fadeIn(800);
    new SampleAppUIFunctions("footer").fadeIn(800);
    this.changeFooterStyleBasedOnWindowHeight();
  }

  public static fadeInVocalIconContainer(): void {
    new SampleAppUIFunctions("#vocal-icon-container").fadeIn(800);
  }

  private static fadeInMainUIControls(callback?: () => void): void {
    if (SampleAppUtilities.isLikelyMobileDevice()) {
      new SampleAppUIFunctions("#custom-logo-container").fadeIn(800);
      new SampleAppUIFunctions("#vocal-icon-container").fadeIn(800);
    }

    new SampleAppUIFunctions("footer").fadeIn(800);
    new SampleAppUIFunctions("#controls").fadeIn(800, () => {
      SampleAppUtilities.enableControlButtons();
      SampleAppUtilities.enableVocalGuidanceButtons();

      if (typeof callback !== "undefined") {
        callback();
      }
    });
  }

  // Calculate passed in element height (including margins) to allow for dynamic sizing of parent containers
  private static calculateElementHeightWithMargins(element: HTMLElement): number {
    const elementComputedStyle: CSSStyleDeclaration = window.getComputedStyle(element);
    const elementOffsetHeight: number = element.offsetHeight;
    const elementMarginTop: number = parseFloat(elementComputedStyle.marginTop);
    const elementMarginBottom: number = parseFloat(elementComputedStyle.marginBottom);

    return elementOffsetHeight + elementMarginTop + elementMarginBottom;
  }

  public static fadeOutMainUIControlsAndFadeInOfficialIDInstructionsUI(): void {
    new SampleAppUIFunctions("#main-interface, #controls, #status, #custom-logo-container, #vocal-icon-container, #official-id-photo-session-cancel-container, footer").fadeOut(600, () => {
      (document.getElementById("official-id-photo-result-container") as HTMLElement).classList.add("display-none");
      (document.getElementById("official-id-photo-intro-container") as HTMLElement).classList.remove("display-none");
      (document.getElementById("official-id-photo-session-cancel-container") as HTMLElement).classList.remove("display-none");

      // Dynamically set the main interface container height based upon the height of the intro content
      var officialIDPhotoIntroContainerHeight: number = this.calculateElementHeightWithMargins((document.getElementById("official-id-photo-intro-container") as HTMLElement));
      (document.getElementById("main-interface") as HTMLElement).style.height = `${ officialIDPhotoIntroContainerHeight }px`;

      // Dynamically set the cancel button position to the top left corner within the main interface border if on desktop
      if (!this.isLikelyMobileDevice()) {
        (document.getElementById("official-id-photo-session-cancel-container") as HTMLElement).style.left = `${ ((window.innerWidth / 2)) - ((document.getElementById("main-interface") as HTMLElement).offsetWidth / 2) }px`;
      }

      this.enableAllButtons();
      new SampleAppUIFunctions("#main-interface, #official-id-photo-session-cancel-container, #official-id-photo-container").fadeIn(600);
    });

  }

  public static fadeOutOfficialIDPhotoUIAndFadeInMainUIControls(): void {
    this.disableAllButtons();
    new SampleAppUIFunctions(".wrapping-box-container, #official-id-photo-session-cancel-container, #official-id-photo-container").fadeOut(600, () => {
      // Remove height property on main interface that was dynamically set for Official ID Photo content and revert to value defined by CSS
      (document.getElementById("main-interface") as HTMLElement).style.removeProperty("height");

      (document.getElementById("official-id-photo-intro-container") as HTMLElement).classList.add("display-none");
      (document.getElementById("official-id-photo-result-container") as HTMLElement).classList.add("display-none");
      (document.getElementById("official-id-photo-session-cancel-container") as HTMLElement).classList.add("display-none");

      SampleAppUtilities.enableVocalGuidanceButtons();
      this.enableAllButtons();
      new SampleAppUIFunctions(".wrapping-box-container, #controls, #status, #custom-logo-container, #vocal-icon-container, footer").fadeIn(600);
    });
  }

  public static fadeInOfficialIDPhotoResultsUI(): void {
    (document.getElementById("official-id-photo-result-image") as HTMLElement).setAttribute("src", `data:image/jpeg;base64, ${SampleAppController.latestOfficialIDPhoto}`);
    (document.getElementById("official-id-photo-intro-container") as HTMLElement).classList.add("display-none");
    (document.getElementById("official-id-photo-result-container") as HTMLElement).classList.remove("display-none");
    (document.getElementById("official-id-photo-session-cancel-container") as HTMLElement).classList.remove("display-none");
    (document.querySelector(".wrapping-box-container") as HTMLElement).style.display = "block";

    // Dynamically set the main interface container height based upon the height of the result content
    var officialIDPhotoResultContainerHeight: number = this.calculateElementHeightWithMargins((document.getElementById("official-id-photo-result-container") as HTMLElement));
    (document.getElementById("main-interface") as HTMLElement).style.height = `${ officialIDPhotoResultContainerHeight }px`;

    // Dynamically set the cancel button position to the top left corner within the main interface border if on desktop
    if (!this.isLikelyMobileDevice()) {
      (document.getElementById("official-id-photo-session-cancel-container") as HTMLElement).style.left = `${ ((window.innerWidth / 2)) - ((document.getElementById("main-interface") as HTMLElement).offsetWidth / 2) }px`;
    }

    setTimeout(function() {
      new SampleAppUIFunctions(".wrapping-box-container, #official-id-photo-session-cancel-container, #official-id-photo-container").fadeIn(400);
    }, 200);
  }

  public static hideOfficialIDPhotoUIAndShowMainUIControlsDueToUnsuccessfulSession(): void {
    // Remove height property on main interface that was dynamically set for Official ID Photo content and revert to value defined by CSS
    (document.getElementById("main-interface") as HTMLElement).style.removeProperty("height");

    new SampleAppUIFunctions("#official-id-photo-container, #official-id-photo-session-cancel-container").fadeOut(0);
    new SampleAppUIFunctions("#controls, #status, #custom-logo-container, #vocal-icon-container").fadeIn(0);
  }

  // Disable buttons to prevent hammering, fade out main interface elements, and reset the Session Review Screen data.
  public static fadeOutMainUIAndPrepareForSession(): void {
    SampleAppUtilities.disableControlButtons();

    if (SampleAppUtilities.isLikelyMobileDevice()) {
      new SampleAppUIFunctions("#custom-logo-container").fadeOut(800);
      new SampleAppUIFunctions("#vocal-icon-container").fadeOut(800);

      SampleAppUtilities.disableVocalGuidanceButtons();
    }

    new SampleAppUIFunctions("footer").fadeOut(800);
    new SampleAppUIFunctions("#controls").fadeOut(800);
    new SampleAppUIFunctions(".wrapping-box-container").fadeOut(800);
    new SampleAppUIFunctions("#official-id-photo-session-cancel-container").fadeOut(800);
    new SampleAppUIFunctions("#theme-transition-overlay").fadeIn(800);
  }

  private static disableControlButtons(): void {
    document.querySelectorAll("#controls > button").forEach(function(button: Element) {
      button.setAttribute("disabled", "true");
    });
  }

  public static enableControlButtons(): void {
    document.querySelectorAll("#controls > button").forEach(function(button: Element) {
      button.removeAttribute("disabled");
    });

    this.enableVocalGuidanceButtons();
  }

  public static showMainUI(): void {
    SampleAppUtilities.fadeInMainUIContainer();
    SampleAppUtilities.fadeInMainUIControls();
  }

  public static handleErrorGettingServerSessionToken(): void {
    SampleAppUtilities.showMainUI();
    DeveloperStatusMessages.logAndDisplayMessage("Session could not be started due to an unexpected issue during the network request.");
  }

  public static generateUUId(): string {
    // @ts-ignore
    return ("" + [1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => { return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16); });
  }

  public static formatUIForDevice(): void {
    window.addEventListener("keydown", SampleAppUtilities.onKeyDown);

    if (SampleAppUtilities.isLikelyMobileDevice()) {
      var windowWidth: number = window.innerWidth;

      // Adjust button sizing
      document.querySelectorAll("button").forEach(function(element: HTMLButtonElement) {
        if (element.className === "big-button") {
          (element as HTMLElement).style.height = "40px";

          if (windowWidth <= 320) {
            (element as HTMLElement).style.fontSize = "16px";
          }
          else {
            (element as HTMLElement).style.fontSize = "18px";
          }
        }
        else if (element.className === "medium-button") {
          (element as HTMLElement).style.height = "30px";
          (element as HTMLElement).style.fontSize = "14px";
        }

        // Set specific button properties
        if (element.id === "official-id-photo-intro-continue-button" || element.id === "official-id-photo-result-download-button") {
          (element as HTMLElement).style.width = "80%";
        }
        else if (element.id === "official-id-photo-session-cancel-button") {
          (element as HTMLElement).style.width = "20px";
        }
        else {
          (element as HTMLElement).style.width = "60%";
        }
      });
      // Adjust main interface display
      (document.getElementById("main-interface") as HTMLElement).style.display = "contents";
      (document.getElementById("main-interface") as HTMLElement).style.backgroundColor = "transparent";
      (document.getElementById("main-interface") as HTMLElement).style.borderColor = "transparent";
      (document.getElementById("main-interface") as HTMLElement).style.width = "unset";

      // Hide border around control panel and adjust height
      (document.getElementById("controls") as HTMLElement).style.height = "auto";
      (document.getElementById("controls") as HTMLElement).style.backgroundColor = "transparent";
      // Hide status label text background and decrease label font size
      (document.getElementById("status") as HTMLElement).style.backgroundColor = "transparent";
      (document.getElementById("status") as HTMLElement).style.fontSize = "12px";
      (document.getElementById("status") as HTMLElement).style.position = "inherit";
      (document.getElementById("status") as HTMLElement).style.width = "90%";
      (document.getElementById("status") as HTMLElement).style.margin = "0 auto";
      (document.getElementById("status") as HTMLElement).style.bottom = "unset";
      // Move and update vocal guidance icon
      (document.getElementById("vocal-icon-container") as HTMLElement)!.parentNode!.parentNode!.parentNode!.parentNode!.insertBefore(document.getElementById("vocal-icon-container")!,
          (document.getElementById("vocal-icon-container") as HTMLElement)!.parentNode!.parentNode!.parentNode!.parentNode!.firstChild);
      document.querySelectorAll(".vocal-icon").forEach(function(icon: Element) {
        (<HTMLElement>icon).style.height = "30px";
        (<HTMLElement>icon).style.margin = "20px";
        (<HTMLElement>icon).style.transform = "translateX(calc(-100% - 40px))";
      });
      new SampleAppUIFunctions("#vocal-icon-container").fadeOut(1);
      // Move logo above buttons
      (document.getElementById("custom-logo-container") as HTMLElement)!.parentNode!.insertBefore(document.getElementById("custom-logo-container")!, document.getElementById("custom-logo-container")!.parentNode!.firstChild);
      (document.getElementById("custom-logo-container") as HTMLElement)!.style.margin = "0px 0px 20px 0px";
      (document.querySelector("#custom-logo-container img") as HTMLElement).style.height = "40px";
      // Center control interface on screen
      (document.getElementsByClassName("wrapping-box-container")[0] as HTMLElement).style.top = "50%";
      (document.getElementsByClassName("wrapping-box-container")[0] as HTMLElement).style.left = "50%";
      (document.getElementsByClassName("wrapping-box-container")[0] as HTMLElement).style.transform = "translate(-50%, -50%)";
      // Adjust button margins
      (document.getElementById("liveness-button") as HTMLElement).style.marginTop = "unset";
      (document.getElementById("design-showcase-button") as HTMLElement).style.marginBottom = "unset";
      // Setup footer sizing
      var footerFontSize = "100%";

      if (windowWidth < 768) {
        footerFontSize = "9px";
      }

      if (windowWidth < 415) {
        footerFontSize = "8px";
      }

      if (windowWidth <= 360) {
        footerFontSize = "7px";
      }

      new SampleAppUIFunctions("footer").css({
        "font-size": footerFontSize,
        "line-height": "9px"
      });
      new SampleAppUIFunctions("footer span p").css({ "font-size": "inherit" });
      new SampleAppUIFunctions("footer span, footer span p").css({ margin: 0 });
      (document.querySelector("hr") as HTMLElement).classList.remove("display-none");
      var computedFooterFontSize = window.getComputedStyle((document.querySelector("footer span p") as HTMLElement)).fontSize;
      new SampleAppUIFunctions("#copy-right-length").css({ "font-size": computedFooterFontSize });
      var copyRightStringLength = (document.getElementById("copy-right-length") as HTMLElement).clientWidth;
      new SampleAppUIFunctions("hr").css({ width: copyRightStringLength + "px" });

      // Allow time for the UI to fully load before fading in the body
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          SampleAppUtilities.displayElementsAfterStyling();
        });
      });
    }
    else {
      window.onresize = (): void => {
        this.changeFooterStyleBasedOnWindowHeight();
      };

      SampleAppUtilities.displayElementsAfterStyling();
    }

    // Setup Official ID Photo sizing
    // Comentando Photo ID por conta da estilizacao quebrada do PhotoId  (nao sei o que é nem se é importante)
    this.formatOfficialIDPhotoUIForDevice();
  }

  // When the footer element gets close to the bottom of the content, change its style to set the position to prevent overlap
  private static changeFooterStyleBasedOnWindowHeight(): void {
    // This helper function is only needed on desktop
    if (this.isLikelyMobileDevice()) {
      return;
    }

    const wrappingBoxContainerElementRect: DOMRect  = document.querySelector(".wrapping-box-container")!.getBoundingClientRect();
    const footerElement: HTMLElement = document.querySelector("footer")!;
    const footerElementTopOffset: number = wrappingBoxContainerElementRect.top + wrappingBoxContainerElementRect.height;

    if (window.innerHeight - 53 <= wrappingBoxContainerElementRect.height) {
      footerElement.style.removeProperty("bottom");
      new SampleAppUIFunctions("footer").css({
        top: footerElementTopOffset + "px"
      });
    }
    else {
      // footerElement.style.removeProperty("top");

      // CSS bottom property value coincides with the value defined in the style sheet

      // new SampleAppUIFunctions("footer").css({
      //   bottom: "4px"
      // });
    }
  }

  private static formatOfficialIDPhotoUIForDevice(): void {
    var windowHeight: number = window.innerHeight;
    var scalingFactor: number = 1;

    const elementSizeMap: {[key: string]: number} = {
      containerVerticalMargin: 20,
      headerFontSize: 28,
      headerMarginBottom: 20,
      subheaderFontSize: 16,
      subheaderMarginBottom: 20,
      fontSize: 16,
      margin: 14,
      instructionImageHeight: 36,
      resultImageHeight: 240,
      resultImageMarginBottom: 28,
      buttonHeight: 50,
      buttonFontSize: 18,
      cancelButtonSize: 18,
      cancelButtonSizeMobile: 20,
      cancelContainerTop: 10,
      cancelContainerLeft: 5
    };

    // For mobile devices - determine if scaling is required based upon vertical resolution (respecting the minimum height as set by CSS)
    if (this.isLikelyMobileDevice()) {
      if (windowHeight < 600) {
        scalingFactor = Math.max(360, windowHeight) / 600;
        // Official ID Photo container CSS min-height property set to 360px
        Object.keys(elementSizeMap).forEach((key: string) => {
          elementSizeMap[key] *= scalingFactor;
        });
      }
    }

    // Set styling to scale Official ID Photo UI Elements
    new SampleAppUIFunctions("#official-id-photo-intro-container").css({
      "margin-top": elementSizeMap['containerVerticalMargin'] + "px",
      "margin-bottom": elementSizeMap['containerVerticalMargin'] + "px"
    });
    new SampleAppUIFunctions("#official-id-photo-intro-header-text, #official-id-photo-result-header-text").css({
      "font-size": elementSizeMap['headerFontSize'] + "px",
      "margin-bottom": elementSizeMap['headerMarginBottom'] + "px"
    });
    new SampleAppUIFunctions(".official-id-photo-intro-span, .official-id-photo-result-span").css({
      "font-size": elementSizeMap['subheaderFontSize'] + "px",
      "margin-bottom": elementSizeMap['subheaderMarginBottom'] + "px"
    });
    new SampleAppUIFunctions("#official-id-photo-intro-container-instructions").css({
      "margin-bottom": elementSizeMap['margin'] + "px"
    });
    new SampleAppUIFunctions(".official-id-photo-intro-instruction-item-container").css({
      "font-size": elementSizeMap['fontSize'] + "px",
      "margin-bottom": elementSizeMap['margin'] + "px"
    });
    new SampleAppUIFunctions(".official-id-photo-intro-instruction-item-img").css({
      "height": elementSizeMap['instructionImageHeight'] + "px",
      "margin-right": elementSizeMap['margin'] + "px"
    });
    new SampleAppUIFunctions("#official-id-photo-result-image").css({
      height: elementSizeMap['resultImageHeight'] + "px",
      "margin-bottom": elementSizeMap['subheaderMarginBottom'] + "px"
    });
    new SampleAppUIFunctions("#official-id-photo-intro-continue-button, #official-id-photo-result-download-button").css({
      "height": elementSizeMap['buttonHeight'] + "px",
      "font-size": elementSizeMap['buttonFontSize'] + "px"
    });

    // Set styling for Official ID Photo Cancel Button
    if (this.isLikelyMobileDevice()) {
      new SampleAppUIFunctions("#official-id-photo-session-cancel-button").css({
        // Setting width for the cancel button to ensure proper aspect ratio and sizing for some browsers and platforms
        "height": elementSizeMap['cancelButtonSizeMobile'] + "px",
        "width": elementSizeMap['cancelButtonSizeMobile'] + "px"
      });
      new SampleAppUIFunctions("#official-id-photo-session-cancel-container").css({
        "top": elementSizeMap['cancelContainerTop'] + "px",
        "left": elementSizeMap['cancelContainerLeft'] + "px"
      });
    }
    else {
      new SampleAppUIFunctions("#official-id-photo-session-cancel-button").css({
        "height": elementSizeMap['cancelButtonSize'] + "px"
      });
    }
  }

  public static keyboardAccessibilityStylingOn: boolean = false;

  public static onKeyDown(e: KeyboardEvent): void {
    if (e.key === "Tab") {
      SampleAppUtilities.enableKeyboardAccessibilityStyling(true);
    }
  }

  private static enableKeyboardAccessibilityStyling(enable: boolean): void {
    // Mobile not supported
    if (SampleAppUtilities.isLikelyMobileDevice() || SampleAppUtilities.keyboardAccessibilityStylingOn) { return; }

    SampleAppUtilities.keyboardAccessibilityStylingOn = true;

    const buttons: HTMLCollectionOf<Element> = document.getElementsByClassName("ft-button");

    for (var i: number = 0; i < buttons.length; i++) {
      const element: HTMLElement = buttons[i] as HTMLElement;

      if (enable) {
        element.style.outline = "revert";
      }
      else {
        element.style.outline = "none";
      }
    }
  }

  private static displayElementsAfterStyling(): void {
    document.querySelectorAll("button").forEach(function(element: HTMLButtonElement) {
      element.classList.add("button-transitions");
    });
    new SampleAppUIFunctions("body").fadeIn(800);
  }

  private static disableVocalGuidanceButtons(): void {
    document.querySelectorAll(".vocal-icon").forEach((button: Element) => {
      (<HTMLButtonElement>button).setAttribute("disabled", "true");
    });
  }

  private static enableVocalGuidanceButtons(): void {
    document.querySelectorAll(".vocal-icon").forEach((button: Element) => {
      (<HTMLButtonElement>button).removeAttribute("disabled");
    });
  }

  public static isLikelyMobileDevice(): boolean {
    var isMobileDeviceUA: boolean = !!(/Android|iPhone|iPad|iPod|IEMobile|Mobile|mobile/i.test(navigator.userAgent || ""));

    // ChromeOS/Chromebook detection.
    if (isMobileDeviceUA && ((navigator.userAgent.indexOf("CrOS") !== -1) || (navigator.userAgent.indexOf("Chromebook") !== -1))) {
      isMobileDeviceUA = false;
    }

    // Mobile device determination based on portrait / landscape and user agent.
    if (screen.width < screen.height || isMobileDeviceUA) {
      // Assume mobile device when in portrait mode or when determined by the user agent.
      return true;
    }
    else {
      return false;
    }
  }

  public static disableAllButtons(): void {
    (document.getElementById("enroll-button") as HTMLElement).setAttribute("disabled", "true");
    (document.getElementById("id-scan-button") as HTMLElement).setAttribute("disabled", "true");
    (document.getElementById("photo-id-scan-button") as HTMLElement).setAttribute("disabled", "true");
    (document.getElementById("liveness-button") as HTMLElement).setAttribute("disabled", "true");
    (document.getElementById("verify-button") as HTMLElement).setAttribute("disabled", "true");
    (document.getElementById("design-showcase-button") as HTMLElement).setAttribute("disabled", "true");
    (document.getElementById("official-id-photo-button") as HTMLElement).setAttribute("disabled", "true");
    (document.getElementById("official-id-photo-session-cancel-button") as HTMLElement).setAttribute("disabled", "true");
    (document.getElementById("official-id-photo-intro-continue-button") as HTMLElement).setAttribute("disabled", "true");
    (document.getElementById("official-id-photo-result-download-button") as HTMLElement).setAttribute("disabled", "true");
  }

  public static enableAllButtons(): void {
    (document.getElementById("enroll-button") as HTMLElement).removeAttribute("disabled");
    (document.getElementById("id-scan-button") as HTMLElement).removeAttribute("disabled");
    (document.getElementById("photo-id-scan-button") as HTMLElement).removeAttribute("disabled");
    (document.getElementById("liveness-button") as HTMLElement).removeAttribute("disabled");
    (document.getElementById("verify-button") as HTMLElement).removeAttribute("disabled");
    (document.getElementById("design-showcase-button") as HTMLElement).removeAttribute("disabled");
    (document.getElementById("official-id-photo-button") as HTMLElement).removeAttribute("disabled");
    (document.getElementById("official-id-photo-session-cancel-button") as HTMLElement).removeAttribute("disabled");
    (document.getElementById("official-id-photo-intro-continue-button") as HTMLElement).removeAttribute("disabled");
    (document.getElementById("official-id-photo-result-download-button") as HTMLElement).removeAttribute("disabled");
  }

  public static fadeInBlurOverlay(): void {
    (document.getElementById("controls") as HTMLElement).classList.add("blur-content");
  }

  public static fadeOutBlurOverlay(): void {
    if ((document.getElementById("controls") as HTMLElement).classList.contains("blur-content")) {
      (document.getElementById("controls") as HTMLElement).classList.remove("blur-content");
    }
  }
}
