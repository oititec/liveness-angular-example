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

  constructor() { }

  ngOnInit() {
    window.localStorage.removeItem('apiType');
    window.localStorage.removeItem('appkey');
    window.localStorage.removeItem('ticket');
    window.localStorage.removeItem('errorMessage');
    window.localStorage.removeItem('hasLiveness');
  }
}
