import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

  disableSendDocumentButton(id) {
    this.hasLivenessLocalStorage ?
      id.classList.remove('disabled') :
      id.classList.add('disabled');
  }

}
