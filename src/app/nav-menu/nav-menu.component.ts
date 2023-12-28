import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  Liveness2D: string = '/assets/img/liveness-2d.png';
  Liveness3D: string = '/assets/img/liveness-3d.png';
  SendDocuments: string = '/assets/img/send-documents.png';
  ChevronRight: string = '/assets/img/chevron-right.png';

  hasLivenessLocalStorage: any = window.localStorage.getItem('hasLiveness');

  constructor() { }

  ngOnInit() {
    let lnkLiveness2D = document.getElementById('liveness-2d');
    let lnkLiveness3D = document.getElementById('liveness-3d');
    let lnkSendDocument = document.getElementById('send-document');

    this.hasLiveness();
    this.disableSendDocumentButton(lnkSendDocument);
  }

  hasLiveness() {
    return this.hasLivenessLocalStorage !== null ? true : false;
  }

  disableSendDocumentButton(id: any) {
    this.hasLivenessLocalStorage ?
      id.classList.remove('disabled') :
      id.classList.add('disabled');
  }
}
