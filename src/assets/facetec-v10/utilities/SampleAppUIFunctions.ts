// UI Convenience Methods
export class SampleAppUIFunctions {
  private currentElements: NodeListOf<Element> | [Element];

  public constructor(elementString: string) {
    // Get the element(s) for ui operations from the elementString;
    this.currentElements = document.querySelectorAll(elementString);
  }

  // Save the original display property of the element before hiding it
  private saveDisplayForElement = (el: HTMLElement): void  => {
    var display = window.getComputedStyle(el).display;

    if (typeof display !== "undefined" && display !== "none") {
      el.setAttribute("displaytype", display);
    }
  };

  // Set the display of the element to either block or restore it's original value
  private  setDisplayForElement = (el: HTMLElement): void  => {
    var display = "block";

    if (el.getAttribute("displaytype") !== null) {
      display = el.getAttribute("displaytype")!;
    }

    el.style.display = display;
  };

  // Fade in the element to opacity over duration ms with an optional callback
  private _fadeIn = (el: HTMLElement, opacity?: string, duration?: number, callback?: () => void): void => {
    if (!el) {
      return;
    }

    opacity = opacity || "1";
    duration = duration || 1;
    var computedStyle: CSSStyleDeclaration = window.getComputedStyle(el);

    if (computedStyle.display === "none" && computedStyle.opacity === "1") {
      el.style.opacity = "0";
    }

    el.style.visibility = "visible";
    this.saveDisplayForElement(el);
    this.setDisplayForElement(el);
    // @ts-ignore
    el.style["-webkit-transition"] = "opacity " + duration + "ms";
    // @ts-ignore
    el.style["-moz-transition"] = "opacity " + duration + "ms";
    // @ts-ignore
    el.style["-o-transition"] = "opacity " + duration + "ms";
    el.style.transition = "opacity " + duration + "ms";
    // Allow JS to clear execution stack
    window.setTimeout((): void => {
      requestAnimationFrame((): void => {
        el.style.opacity = opacity!;
      });
    });
    window.setTimeout((): void => {
      this.setDisplayForElement(el);

      if (callback != null) {
        callback();
      }
    }, duration);
  };

  // Fade out the element to opacity over duration ms with an optional callback
  private _fadeOut = (el: HTMLElement, opacity?: string, duration?: number, callback?: () => void): void => {
    if (!el) {
      return;
    }

    this.saveDisplayForElement(el);
    opacity = opacity || "0";
    duration = duration || 1;
    // @ts-ignore
    el.style["-webkit-transition"] = "opacity " + duration + "ms";
    // @ts-ignore
    el.style["-moz-transition"] = "opacity " + duration + "ms";
    // @ts-ignore
    el.style["-o-transition"] = "opacity " + duration + "ms";
    el.style.transition = "opacity " + duration + "ms";
    // Allow JS to clear execution stack
    window.setTimeout((): void => {
      requestAnimationFrame((): void => {
        el.style.opacity = opacity!;
      });
    });
    window.setTimeout((): void => {
      el.style.display = "none";

      if (callback != null) {
        callback();
      }
    }, duration);
  };

  public fadeOut = (duration?: any, callback?: any): void => {
    this.currentElements.forEach((element: Element): void => {
      this._fadeOut(element as HTMLElement, "0", duration, callback);
    });
  };

  public fadeIn = (duration?: any, callback?: any): void => {
    this.currentElements.forEach((element: Element): void => {
      this._fadeIn(element as HTMLElement, "1", duration, callback);
    });
  };

  public show = (): void => {
    this.currentElements.forEach((element: Element): void => {
      (element as HTMLElement).style.opacity = "1";
      this.setDisplayForElement(element as HTMLElement);
    });
  };

  public hide = (): void => {
    this.currentElements.forEach((element: Element): void => {
      (element as HTMLElement).style.opacity = "0";
      (element as HTMLElement).style.visibility = "visible";
      this.saveDisplayForElement(element as HTMLElement);
      this.setDisplayForElement(element as HTMLElement);
    });
  };

  public scrollTop = (value: number): void => {
    this.currentElements.forEach((element: Element): void => {
      (element as HTMLElement).scrollTop = value;
    });
  };

  public css =  (styleProperTies: any): void => {
    if (typeof styleProperTies !== "object") {
      throw new Error("UI.css must be called with an object");
      return;
    }

    this.currentElements.forEach((element: Element): void => {
      Object.keys(styleProperTies).forEach((style: string): void => {
        // @ts-ignore
        (element as HTMLElement).style[style] = styleProperTies[style];
      });
    });
  };
}
