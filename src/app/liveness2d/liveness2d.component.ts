import { Component, OnInit } from '@angular/core';
import { FacecaptchaService } from '../backend/facecaptcha.service'
import { Crypto } from '../crypto/crypto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liveness2d',
  templateUrl: './liveness2d.component.html',
  styleUrls: ['./liveness2d.component.scss']
})
export class Liveness2dComponent implements OnInit {
  EnvironmentIcon: string = "/assets/img/environment-icon.png";
  PersonIcon: string = "/assets/img/person-icon.png";
  ErrorIcon: string = "/assets/img/error.png";
  SuccessIcon: string = "/assets/img/success.png"

  handleShowModal: boolean = false;
  modalCssClasses: string = 'fade modal';

  appkey: any;

  liveness2DArea: any = false;
  video: any = false;
  divLoader: any = false;
  divMsg: any = false;
  imgMsg: any = false;
  spanMsg: any = false;
  imgChallenge: any = false;

  showIniciar: boolean = true;
  isLoaded: boolean = false;
  message: string = '';
  emojiBase64: string = '';
  msgBase64: string = '';
  challenge: any;
  fcvarSnaps: string = '';
  fcvarFirstSnap: string = '';
  livenessSuccess: boolean = false;
  livenessError: boolean = false;
  errorMessage: string = '';

  constructor(
    private facecaptchaService: FacecaptchaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initialState();
  }

  handleShow(show) {
    this.handleShowModal = show

    show ? this.modalCssClasses = 'fade modal show' : this.modalCssClasses = 'fade modal';
  }

  handleCloseModal() {
    this.handleShowModal = false;

    this.modalCssClasses = 'fade modal';
  }

  initialState() {
    this.appkey = window.localStorage.getItem('appkey');
    this.showIniciar = true;
    this.isLoaded = false;
    this.message = '';
    this.emojiBase64 = '';
    this.msgBase64 = '';
    this.challenge = '';
    this.fcvarSnaps = '';
    this.fcvarFirstSnap = '';
    this.livenessSuccess = false;
    this.livenessError = false;
  };

  showLiveness2D() {
    const body: any = document.getElementsByTagName('body');

    body[0].style.overflow = 'hidden';

    this.liveness2DArea = true;
    this.video = true;

    setTimeout(() => {
      const videoPlayer: any = document.getElementById('video');

      videoPlayer.setAttribute('autoplay', '');
      videoPlayer.setAttribute('muted', '');
      videoPlayer.setAttribute('playsinline', '');

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(function (mediaStream) {
          videoPlayer.srcObject = mediaStream;
          videoPlayer.play();
        })
        .catch(function (err) {
          console.log('Não há permissões para acessar a webcam');
        });
    }, 1000);
  }

  deleteAppKey() {
    window.localStorage.removeItem('appkey');
    window.localStorage.removeItem('hasLiveness');

    this.router.navigateByUrl('/');
  }

  startCapture() {
    this.showIniciar = false;
    this.isLoaded = true;
    this.divMsg = true;
    this.spanMsg = true;
    this.message = 'Iniciando...';

    this.getChallengeFromLib();
  };

  async getChallengeFromLib() {
    let result: any = '';

    await this.facecaptchaService.startChallenge(this.appkey).subscribe((res: any) => {
      result = JSON.parse(this.facecaptchaService.decryptChallenge(res.body, this.appkey));

      this.challenge = result;

      if (result.challenges.length > 0) {
        this.spanMsg = false;
        this.message = '';
        this.isLoaded = false;
      }

      this.prepareChallenge(0);
    },
    (err: any) => {
      console.log(err);
    });
  };

  prepareChallenge(index) {
    var me = this;

    this.emojiBase64 = '';
    this.msgBase64 = '';
    this.message = '';

    if (index >= this.challenge.numberOfChallenges) {
      this.stopChallenge();
      return;
    }

    // Intervalo de captura de image do video
    for (let i = 1; i <= this.challenge.snapNumber; i++) {
      setTimeout(function () {
        console.log(index + ' - snap: ' + i);
        me.snapTick(me.challenge.challenges[index]);
      }, this.challenge.snapFrequenceInMillis * i);
    }

    // atribui imagem Desafio (msg)
    this.msgBase64 = `data:image/jpeg;base64,${this.challenge.challenges[index].mensagem}`;

    // atribui imagem Desafio (emojji)
    this.emojiBase64 = `data:image/jpeg;base64,${this.challenge.challenges[index].tipoFace.imagem}`;

    setTimeout(function () {
      // Proximo desafio. Recursive
      index++;
      me.prepareChallenge(index);
    }, (this.challenge.totalTime / this.challenge.numberOfChallenges) * 1000);
  };

  stopChallenge() {
    this.spanMsg = true;
    this.message = 'Enviando...';
    this.isLoaded = true;
    this.msgBase64 = '';
    this.emojiBase64 = '';

    this.getLivenessCaptchaFromLib(this.appkey, this.challenge.chkey, this.fcvarSnaps);
  };

  snapTick(fcvarCurCha) {
    let snapb64: any = this.snap();

    if (this.fcvarFirstSnap === '') {
      this.fcvarFirstSnap = snapb64;
    }

    // necessario adicionar o codigo do tipoFace entre o 'data:image/jpeg' e o snapb64
    snapb64 = snapb64.split('data:image/jpeg;base64,');
    snapb64 = `data:image/jpeg;base64,${snapb64[0]}type:${fcvarCurCha.tipoFace.codigo},${snapb64[1]}`;

    this.fcvarSnaps += snapb64;
  };

  snap() {
    const video: any = document.getElementById('video');
    const canvas: any = document.getElementById('fc_canvas');
    const ctx: any = canvas.getContext('2d');

    ctx.canvas.width = 320;
    ctx.canvas.height = 480;

    var ratio = video.videoWidth / video.videoHeight;
    var widthReal,
      heightReal = 0;
    var startX,
      startY = 0;

    if (ratio >= 1) {
      // paisagem
      widthReal = video.videoHeight / 1.5;
      heightReal = video.videoHeight;

      startX = (video.videoWidth - widthReal) / 2;
      startY = 0;
    } else {
      // retrato
      ratio = video.videoHeight / video.videoWidth;

      // verifica proporção
      if (ratio > 1.5) {
        widthReal = video.videoWidth;
        heightReal = video.videoWidth * 1.5;

        startX = 0;
        startY = (video.videoHeight - heightReal) / 2;
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

    var img = new Image();
    img.src = canvas.toDataURL('image/jpeg');

    return img.src;
  };

  async getLivenessCaptchaFromLib(appkey, chkey, images) {
    let result: any = '';

    await this.facecaptchaService.captcha(appkey, chkey, images).subscribe((res: any) => {
      result = res.body;

      if (result.valid === true) {
        this.livenessSuccess = true;
        this.livenessError = false;

        setTimeout(() => {
          setTimeout(() => {
            this.closeLiveness2D(appkey);
          }, 5000);
        }, 1000);
      } else {
        this.livenessSuccess = false;
        this.livenessError = true;

        setTimeout(() => {
          this.errorMessage = `${result.codID} - ${result.cause}`;

          this.livenessError && this.handleShow(true);

          this.closeLiveness2D(appkey);
        }, 1000);
      }
    },
    (err: any) => {
      console.log(err);
    });
  };

  closeLiveness2D(appkey) {
    const body: any = document.getElementsByTagName('body');
    const videoPlayer: any = document.getElementById('video');

    body[0].removeAttribute('style');

    this.liveness2DArea = false;
    this.video = false;

    videoPlayer.removeAttribute('autoplay');
    videoPlayer.removeAttribute('muted');
    videoPlayer.removeAttribute('playsinline');

    videoPlayer.srcObject.getTracks()[0].stop();
    videoPlayer.src = '';

    window.localStorage.setItem('hasLiveness', 'true');

    this.initialState();
  };
}
