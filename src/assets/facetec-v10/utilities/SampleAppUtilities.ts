import { Config } from "../../../assets/facetec-v10/Config"
import { FaceTecSDK } from "../../10.0.42/core-sdk/FaceTecSDK.js/FaceTecSDK";
import { SampleAppUIFunctions } from "./SampleAppUIFunctions";
import { SoundFileUtilities } from "./SoundFileUtilities";

enum VocalGuidanceMode {
  MINIMAL,
  FULL,
  OFF
}

export class SampleAppUtilities {
  private static vocalGuidanceSoundFilesDirectory: string = "../assets/facetec-v10/sample-app-resources/Vocal_Guidance_Audio_Files/";
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

    SampleAppUtilities.vocalGuidanceOffPlayer.onended = function (): void {
      SampleAppUtilities.enableVocalGuidanceButtons();
    };

    SampleAppUtilities.vocalGuidanceOnPlayer.onended = function (): void {
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
      SampleAppUtilities.enableVocalGuidanceButtons();

      if (typeof callback !== "undefined") {
        callback();
      }
    });
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
    document.querySelectorAll("#controls > button").forEach(function (button: Element) {
      button.setAttribute("disabled", "true");
    });
  }

  public static enableControlButtons(): void {
    document.querySelectorAll("#controls > button").forEach(function (button: Element) {
      button.removeAttribute("disabled");
    });

    this.enableVocalGuidanceButtons();
  }

  public static showMainUI(): void {
    SampleAppUtilities.fadeInMainUIContainer();
    SampleAppUtilities.fadeInMainUIControls();
  }

  public static formatUIForDevice(): void {
    window.addEventListener("keydown", SampleAppUtilities.onKeyDown);

    if (SampleAppUtilities.isLikelyMobileDevice()) {
      var windowWidth: number = window.innerWidth;

      // Adjust button sizing
      document.querySelectorAll("button").forEach(function (element: HTMLButtonElement) {
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
      document.querySelectorAll(".vocal-icon").forEach(function (icon: Element) {
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
        // Linhas comentada
        this.changeFooterStyleBasedOnWindowHeight();
      };

      SampleAppUtilities.displayElementsAfterStyling();
    }
  }

  // When the footer element gets close to the bottom of the content, change its style to set the position to prevent overlap
  private static changeFooterStyleBasedOnWindowHeight(): void {
    // This helper function is only needed on desktop
    if (this.isLikelyMobileDevice()) {
      return;
    }

    const wrappingBoxContainerElementRect: DOMRect = document.querySelector(".wrapping-box-container")!.getBoundingClientRect();
    const footerElement: HTMLElement = document.querySelector("footer")!;
    const footerElementTopOffset: number = wrappingBoxContainerElementRect.top + wrappingBoxContainerElementRect.height;

    if (window.innerHeight - 53 <= wrappingBoxContainerElementRect.height) {
      footerElement.style.removeProperty("bottom");
      new SampleAppUIFunctions("footer").css({
        top: footerElementTopOffset + "px"
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
    document.querySelectorAll("button").forEach(function (element: HTMLButtonElement) {
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
    (document.getElementById("liveness-button") as HTMLElement).setAttribute("disabled", "true");
  }

  public static enableAllButtons(): void {
    (document.getElementById("liveness-button") as HTMLElement).removeAttribute("disabled");
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
