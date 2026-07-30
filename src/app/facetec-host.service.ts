import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FacetecHostService {
  private static readonly HOST_CLASS = 'facetec-host';

  private teardown: Promise<void> = Promise.resolve();

  async prepare(): Promise<void> {
    await this.whenDocumentLoaded();
    await this.whenIdle();

    this.acquireHostLayout();
  }

  private whenDocumentLoaded(): Promise<void> {
    if (document.readyState === 'complete') {
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      window.addEventListener('load', () => resolve(), { once: true });
    });
  }

  private whenIdle(): Promise<void> {
    return this.teardown;
  }

  private acquireHostLayout(): void {
    document.documentElement.classList.add(FacetecHostService.HOST_CLASS);
  }

  release(sdk: any): void {
    this.teardown = this.teardown
      .then(() => this.deinitialize(sdk))
      .then(() => this.releaseHostLayout());
  }

  private releaseHostLayout(): void {
    document.documentElement.classList.remove(FacetecHostService.HOST_CLASS);
  }

  private deinitialize(sdk: any): Promise<void> {
    return new Promise<void>((resolve) => {
      if (!sdk || typeof sdk.deinitialize !== 'function') {
        resolve();
        return;
      }

      try {
        sdk.deinitialize(() => resolve());
      } catch (e) {
        console.warn('FaceTec deinitialize failed', e);
        resolve();
      }
    });
  }
}
