import { Component, OnInit } from '@angular/core';
import { FacecaptchaService } from '../backend/facecaptcha.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-senddocument',
  templateUrl: './senddocument.component.html',
  styleUrls: ['./senddocument.component.scss'],
})
export class SenddocumentComponent implements OnInit {
  ImgIcon = '/assets/img/img-icon.png';
  ChevronRight = '/assets/img/chevron-right.png';

  appkey: any;
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

  constructor(
    private facecaptchaService: FacecaptchaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.appkey = window.localStorage.getItem('appkey');
  }

  handleStream(stream: any) {
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
  }

  setTypeCapture(type: any) {
    if (this.isMobile()) {
      let capturaFoto: any = document.getElementById('captura-foto'); // voltar aqui

      capturaFoto.click();

      capturaFoto.addEventListener('change', () => {
        this.startCapture();
      });
    }

    // if (this.isMobile()) {
    //   this.multiCapture = type === 1 ? false : true
    // }

    if (type === 1) {
      this.message = 'Carregando...';
      this.sendDocument = true;
      this.multiCapture = false;
      this.showTypeCapture = false;
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
      this.onResize();

      setTimeout(() => {
        this.message = '';
        this.isLoaded = false;
      }, 1000);
    }
  }

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
  }

  startCamera() {
    if (this.multiCapture) {
      if (this.indexTempSnap !== -1) {
        this.message =
          this.indexTempSnap === 1
            ? 'Centralize o verso do documento'
            : 'Centralize a frente do documento';
        this.isLoaded = false;
      } else {
        this.message =
          this.snapsCaptures.length === 0
            ? 'Centralize a frente do documento'
            : 'Centralize o verso do documento';
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
        facingMode: 'environment',
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440,
        },
      },
    };

    // se mobile, ajusta configurações de video para mobile
    if (!this.isMobile()) {
      constraints.video = {
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440,
        },
        facingMode: 'environment',
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => this.handleStream(stream))
        .catch((err) => {
          console.log('Sem câmera! ' + err);
        });
    }
  }

  stopCameraStreams() {
    if (this.streams) {
      this.streams.forEach((stream: any) => {
        stream.stop();
      });

      this.streams = null;
    }
  }

  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  startCapture() {
    if (this.isMobile()) {
      this.snapCapture();
    } else {
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
    }
  }

  resetSnap() {
    const resetMobileImage = () => {
      let imgMobile: any = document.getElementById('img-mobile');
      imgMobile.setAttribute('src', '');

      let capturaFoto: any = document.getElementById('captura-foto');

      if (this.snapsCaptures.length < 1) {
        capturaFoto.click();
      }
    };

    const resetControls = () => {
      if (this.isMobile()) {
        resetMobileImage();
      }

      this.snapTempDOM = '';
      this.btnControllers = false;
    };

    const resetShowUpload = () => {
      let capturaFoto: any = document.getElementById('captura-foto');
      let imgMobile: any = document.getElementById('img-mobile');

      if (!this.isMobile()) {
        this.showUpload = true;
      } else {
        capturaFoto.value = '';
        imgMobile.src = '';

        this.showUpload = true;
      }
    };

    if (this.multiCapture) {
      if (this.snapsCaptures.length < 2) {
        resetControls();

        if (!this.isMobile()) {
          this.startCamera();
        } else {
          let capturaFoto: any = document.getElementById('captura-foto');

          capturaFoto.click();
        }
      } else {
        resetShowUpload();

        if (!this.isMobile()) {
          this.stopCameraStreams();
        }
      }
    } else {
      if (this.snapsCaptures.length < 1) {
        resetControls();

        if (!this.isMobile()) {
          this.startCamera();
        }
      } else {
        resetShowUpload();

        if (!this.isMobile()) {
          this.stopCameraStreams();
        }
      }
    }
  }

  snapCapture() {
    return (this.snapTempDOM = this.snap());
  }

  snapTick() {
    // Adiciona as fotos nas listas
    if (this.indexTempSnap !== -1) {
      this.snapsCaptures.splice(this.indexTempSnap, 0, this.snapTempDOM);
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
  }

  snap() {
    const capturaFoto: any = document.getElementById('captura-foto');
    const imgMobile: any = document.getElementById('img-mobile');
    const fotoCapturada: any = capturaFoto.files[0];
    const video: any = document.getElementById('video');
    const canvas: any = document.getElementById('fc_canvas');
    const ctx: any = canvas.getContext('2d');
    const img: any = new Image();

    let ratio = !this.isMobile() ? video.videoWidth / video.videoHeight : 0;
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
      ratio = !this.isMobile() ? video.videoWidth / video.videoHeight : 0;
      // verifica proporção
      if (ratio > 1.5) {
        widthReal = video.videoWidth;
        heightReal = video.videoHeight;
        startX = 0;
        startY = 0;
      } else {
        widthReal = !this.isMobile() ? video.videoHeight / 1.5 : 0;
        heightReal = !this.isMobile() ? video.videoHeight : 0;
        startX = (!this.isMobile() ? video.videoWidth - widthReal : 0) / 2;
        startY = 0;
      }
    }

    const resizeMe = (img: any) => {
      var width = img.width;
      var height = img.height;

      var max_width = 1200;
      var max_height = 1600;

      if (width > height) {
        if (width > max_width) {
          height = Math.round((height *= max_width / width));
          width = max_width;
        }
      } else {
        if (height > max_height) {
          width = Math.round((width *= max_height / height));
          height = max_height;
        }
      }

      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      return canvas.toDataURL('image/jpeg', 0.85);
    };

    if (this.isMobile()) {
      const reader = new FileReader();

      reader.readAsArrayBuffer(fotoCapturada);

      reader.onload = (e: any) => {
        let blob = new Blob([e.target.result]);
        window.URL = window.URL || window.webkitURL;
        let blobURL = window.URL.createObjectURL(blob);

        imgMobile.src = blobURL;

        imgMobile.onload = () => {
          let resized = resizeMe(imgMobile);

          let newinput = document.createElement('input');
          newinput.type = 'hidden';
          newinput.name = 'images[]';
          newinput.value = resized;

          setTimeout(() => {
            this.snapTempDOM = newinput.value;
            this.message = '';
            this.btnControllers = true;
            this.sendDocument = true;
            this.isLoaded = false;
            this.processing = false;

            return imgMobile.src;
          }, 100);
        };
      };
    } else {
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

      img.src = canvas.toDataURL('image/jpeg');

      return img.src;
    }
  }

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
  }

  async uploadPictures() {
    this.isLoaded = true;

    const snapsSend = this.snapsCaptures.map((snap: any) =>
      snap.replace('data:image/jpeg;base64,', '')
    );

    await this.facecaptchaService
      .sendDocument(this.appkey, snapsSend)
      .subscribe(
        (res: any) => {
          console.log(res);

          setTimeout(() => {
            this.isLoaded = false;
            this.uploadRequest = true;
            this.uploadResp = false;
          }, 1000);

          window.localStorage.removeItem('appkey');

          window.location.reload();
        },
        (err: any) => {
          console.log(err);

          setTimeout(() => {
            this.isLoaded = false;

            window.alert(
              'Documento não localizado! Por favor reenvie o documento.'
            );

            window.location.reload();
          }, 1000);
        }
      );
  }

  deleteAppKey() {
    window.localStorage.removeItem('appkey');
    window.localStorage.removeItem('hasLiveness');

    this.router.navigateByUrl('/');
  }
}
