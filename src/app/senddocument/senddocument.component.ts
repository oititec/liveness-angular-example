import { Component, OnInit } from '@angular/core';
import { FacecaptchaService } from '../backend/facecaptcha.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-senddocument',
  templateUrl: './senddocument.component.html',
  styleUrls: ['./senddocument.component.scss']
})
export class SenddocumentComponent implements OnInit {
  ImgIcon = "/assets/img/img-icon.png";
  ChevronRight = "/assets/img/chevron-right.png";

  appkey: any;
  apiType: any;
  ticket: any;
  message: string = ''; // trocar para ''
  sendDocument: boolean = false; // trocar pra false
  isLoaded: boolean = false; // trocar pra false
  showUpload: boolean = false; // trocar pra false
  rotateCamera: boolean = false; // trocar pra false
  snapsCaptures: any = []; // trocar para []
  streams: any = ''; // trocar para ''
  snapTempDOM: string = ''; // trocar para ''
  btnControllers: boolean = false; // trocar pra false
  showIniciar: boolean = false; // trocar pra false
  uploadRequest: boolean = false; // trocar pra false
  multiCapture: boolean = false; // trocar pra false
  showTypeCapture: boolean = true; // trocar pra true
  processing: boolean = false; // trocar pra false
  showDesktop: boolean = false; // trocar pra false
  indexTempSnap: number = -1; // trocar para -1
  uploadResp: boolean = true; // trocar para true
  uploadButtonText: string = 'Enviar foto'; // trocar para 'Enviar foto'

  constructor(
    private facecaptchaService: FacecaptchaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.appkey = window.localStorage.getItem('appkey');
    this.apiType = window.localStorage.getItem('apiType');
    this.ticket = window.localStorage.getItem('ticket');

    let btnTipoCaptura1Foto: any = document.getElementById('btn-tipo-captura-1-foto')
    let btnTipoCaptura2Fotos: any = document.getElementById('btn-tipo-captura-2-fotos')

    if(!this.appkey) {
      btnTipoCaptura1Foto.classList.add('disabled');
      btnTipoCaptura2Fotos.classList.add('disabled');
    }
  }

  handleStream (stream: any) {
    setTimeout(() => {
      let video: any = document.getElementById('video');

      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');

      video.srcObject = stream;

      this.streams = stream.getVideoTracks();
      this.isLoaded = true;
      this.showIniciar = true;
      this.btnControllers = false;
      this.showUpload = false;
    }, 1000);
  };

  setTypeCapture(type: any) {
    if (type === 1) {
      this.message = 'Carregando...';
      this.sendDocument = true;
      this.multiCapture = false;
      this.showTypeCapture = false;
      this.uploadButtonText = 'Enviar foto';
      this.onResize();

      setTimeout(() => {
        this.message = '';
        this.isLoaded = false;
      }, 1000);
    } else {
      this.message = 'Carregando...';
      this.sendDocument = true;
      this.multiCapture = true;
      this.showTypeCapture = false;
      this.uploadButtonText = 'Enviar fotos';
      this.onResize();

      setTimeout(() => {
        this.message = '';
        this.isLoaded = false;
      }, 1000);
    }
  };

  onResize() {
    if (
      !this.showTypeCapture &&
      !this.processing &&
      this.multiCapture &&
      !this.showDesktop
    ) {
      this.stopCameraStreams();

      if (window.innerWidth > window.innerHeight) {
        this.rotateCamera = false;
        this.message = '';
        this.isLoaded = false;

        if (!this.btnControllers && !this.showUpload) {
          this.startCamera();
        }
      } else {
        this.rotateCamera = true;
        this.message = '';
        this.isLoaded = false;
      }
    } else if (
      !this.showTypeCapture &&
      !this.processing &&
      !this.multiCapture &&
      !this.showDesktop
    ) {
      if (
        window.innerWidth > window.innerHeight &&
        window.innerWidth < 1440 &&
        !this.showDesktop
      ) {
        this.rotateCamera = true;
        this.message = '';
        this.isLoaded = false;
      } else {
        this.rotateCamera = false;
        this.message = '';
        this.isLoaded = false;

        if (!this.btnControllers && !this.showUpload) {
          this.startCamera();
        }
      }
    } else if (this.showDesktop) {
      this.rotateCamera = false;
      this.message = '';

      if (!this.btnControllers && !this.showUpload) {
        this.startCamera();
      }
    } else if (this.processing) {
      if (this.multiCapture) {
        if (window.innerWidth < window.innerHeight) {
          this.rotateCamera = true;
        } else {
          this.rotateCamera = false;
        }
      } else {
        if (!this.showDesktop) {
          if (window.innerWidth < window.innerHeight) {
            this.rotateCamera = false;
          } else {
            this.rotateCamera = true;
          }
        }
      }
    }
  };

  startCamera() {
    if (this.multiCapture) {
      if (this.indexTempSnap !== -1) {
        this.message = this.indexTempSnap === 1 ? 'Centralize o verso do documento' : 'Centralize a frente do documento';
        this.isLoaded = false;
      } else {
        this.message = this.snapsCaptures.length === 0 ? 'Centralize a frente do documento' : 'Centralize o verso do documento';
        this.isLoaded = false;
      }
    } else {
      this.message = 'Centralize o documento';
    }

    this.showIniciar = false;
    this.isLoaded = true;
    this.processing = true;

    this.showIniciar = true;
    this.isLoaded = false;
    this.message = '';
    this.processing = false;

    (navigator as any).getUserMedia =
      (navigator as any).getUserMedia ||
      (navigator as any).webkitGetUserMedia ||
      (navigator as any).mozGetUserMedia ||
      (navigator as any).msGetUserMedia ||
      (navigator as any).mediaDevices.getUserMedia;

    // ajusta as configurações de video
    const constraints = {
      audio: false,
      video: {
        facingMode: 'right',
        width: { exact: 640 },
        height: { exact: 480 },
        aspectRatio: { ideal: 1 },
        focusMode: 'manual',
        focusDistance: 0.33,
      },
    };

    // se mobile, ajusta configurações de video para mobile
    if (this.isMobile()) {
      constraints.video = {
        width: { exact: 1280 },
        height: { exact: 720 },
        facingMode: 'environment',
        aspectRatio: { ideal: 1 },
        focusMode: 'manual',
        focusDistance: 0.33,
      };
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => this.handleStream(stream))
      .catch((err) => {
        console.log('Sem câmera! ' + err);
      });
  };

  stopCameraStreams() {
    if (this.streams) {
      this.streams.forEach((stream: any) => {
        stream.stop();
      });

      this.streams = null;
    }
  };

  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  startCapture() {
    this.processing = true;
    this.message = 'Processando...';
    this.showIniciar = false;
    this.isLoaded = true;

    setTimeout(() => {
      this.snapCapture();
      this.stopCameraStreams();

      this.message = '';
      this.btnControllers = true;
      this.isLoaded = false;
      this.processing = false;
    }, 1500);
  };

  resetSnap() {
    const resetControls = () => {
      this.snapTempDOM = '';
      this.btnControllers = false;
    };

    const resetShowUpload = () => {
      this.showUpload = true;
    };

    if (this.multiCapture) {
      if (this.snapsCaptures.length < 2) {
        resetControls();
        this.startCamera();
      } else {
        resetShowUpload();
        this.stopCameraStreams();
      }
    } else {
      if (this.snapsCaptures.length < 1) {
        resetControls();
        this.startCamera();
      } else {
        resetShowUpload();
        this.stopCameraStreams();
      }
    }
  };

  snapCapture() {
    this.snapTempDOM = this.snap();
  };

  snapTick() {
    // Adiciona as fotos nas listas
    if (this.indexTempSnap !== -1) {
      this.snapsCaptures.splice(
        this.indexTempSnap,
        0,
        this.snapTempDOM
      );
    } else {
      this.snapsCaptures.push(this.snapTempDOM);
    }

    const tempSnap = () => {
      this.indexTempSnap = -1;
      this.btnControllers = false;
      this.showTypeCapture = false;
      this.showUpload = false;
    };

    // Limpa as listas e reinicia a câmera
    tempSnap();
    this.resetSnap();
  };

  snap() {
    const video: any = document.getElementById('video');
    const canvas: any = document.getElementById('fc_canvas');
    const ctx: any = canvas.getContext('2d');

    let ratio = video.videoWidth / video.videoHeight;
    let widthReal = 0;
    let heightReal = 0;
    let startX = 0;
    let startY = 0;

    if (ratio >= 1 && !this.showDesktop) {
      ctx.canvas.width = 1280;
      ctx.canvas.height = 768;
      widthReal = video.videoWidth;
      heightReal = video.videoHeight;
      startX = 0;
      startY = 0;
    } else {
      // retrato
      ctx.canvas.width = 640;
      ctx.canvas.height = 960;
      ratio = video.videoHeight / video.videoWidth;
      // verifica proporção
      if (ratio > 1.5) {
        widthReal = video.videoWidth;
        heightReal = video.videoHeight;
        startX = 0;
        startY = 0;
      } else {
        widthReal = video.videoHeight / 1.5;
        heightReal = video.videoHeight;
        startX = (video.videoWidth - widthReal) / 2;
        startY = 0;
      }
    }

    // crop image video
    ctx.drawImage(
      video,
      startX,
      startY,
      widthReal,
      heightReal,
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );

    const img = new Image();
    img.src = canvas.toDataURL('image/jpeg');

    return img.src;
  };

  removeSnapFromLists(index: any) {
    const snapRemoval = () => {
      this.indexTempSnap = index;
      this.showUpload = false;
      this.message = 'Carregando...';
      this.sendDocument = true;
      this.showTypeCapture = false;
      this.snapsCaptures.splice(index, 1);
    };

    setTimeout(() => {
      this.message = '';
      this.isLoaded = false;
    }, 300);

    snapRemoval();
    this.resetSnap();
  };

  uploadResponse(res: any) {
    console.log(res);

    setTimeout(() => {
      this.isLoaded = false;
      this.uploadRequest = true;
      this.uploadResp = false;
      this.uploadButtonText = `Enviar foto${this.snapsCaptures.length === 2 ? 's' : ''}`;
    }, 1000);

    window.alert('Documento enviado com sucesso');

    window.localStorage.removeItem('apiType');
    window.localStorage.removeItem('appkey');
    window.localStorage.removeItem('ticket');
    window.localStorage.removeItem('errorMessage');
    window.localStorage.removeItem('hasLiveness');

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  uploadError(err: any) {
    console.log(err);

    setTimeout(() => {
      this.isLoaded = false;
      this.uploadButtonText = `Enviar foto${this.snapsCaptures.length === 2 ? 's' : ''}`;

      window.alert(
        'Documento não localizado! Por favor reenvie o documento.'
      );

      window.location.reload();
    }, 1000);
  }

  async uploadPictures() {
    this.isLoaded = true;
    this.uploadButtonText = 'Enviando...';

    const snapsSend = this.snapsCaptures.map((snap: any) =>
      snap.replace('data:image/jpeg;base64,', '')
    );

    if (this.apiType === 'flexible-api') {
      await this.facecaptchaService.sendCertifaceData(this.ticket, this.appkey, snapsSend).subscribe(
        (res: any) => {
          this.uploadResponse(res);
        },
        (err: any) => {
          this.uploadError(err);
        }
      )
    } else {
      await this.facecaptchaService.sendDocument(this.appkey, snapsSend).subscribe(
        (res: any) => {
          this.uploadResponse(res);
        },
        (err: any) => {
          this.uploadError(err);
        }
      );
    }
  };

  deleteAppKey() {
    window.localStorage.removeItem('apiType');
    window.localStorage.removeItem('appkey');
    window.localStorage.removeItem('ticket');
    window.localStorage.removeItem('errorMessage');
    window.localStorage.removeItem('hasLiveness');

    this.router.navigateByUrl('/');
  };
}
