import { Injectable } from '@angular/core';
import { SampleAppUtilities } from '../../assets/facetec-v10/utilities/SampleAppUtilities'

@Injectable({ providedIn: 'root' })
export class Facetecv10UiService {

    private domReady = false;

    markDomReady(): void {
        this.domReady = true;
    }

    private waitDom(): Promise<void> {
        return new Promise(resolve => {
            if (this.domReady) return resolve();
            setTimeout(() => resolve(), 50);
        });
    }

    async formatUIForDevice(): Promise<void> {
        await this.waitDom();

        try {
            const fn = (window as any).SampleAppUtilities?.formatUIForDevice;
            if (fn) fn();
        } catch (e) {
            console.warn('formatUIForDevice safe failed', e);
        }
    }

    async disableLivenessButton(): Promise<void> {
        await this.waitDom();

        const btn = document.getElementById('liveness-button') as HTMLButtonElement;

        if (btn) {
            btn.disabled = true;
        }
    }

    async showMainUI(): Promise<void> {
        await this.waitDom();

        const fn = (window as any).SampleAppUtilities?.showMainUI;
        if (fn) fn();
    }

    async prepareForSession(): Promise<void> {
        await this.waitDom();

        try {
            SampleAppUtilities.fadeOutMainUIAndPrepareForSession();
        } catch (e) {
            console.warn('prepareForSession error', e);
        }
    }
}