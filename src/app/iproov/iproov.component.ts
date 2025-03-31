import { Component, OnInit } from '@angular/core';
// import { Iproov } from "@iproov/web";
import "@iproov/web"

@Component({
  selector: 'app-iproov',
  standalone: true,
  imports: [],
  templateUrl: './iproov.component.html',
  // styleUrl: './iproov.component.css'
})
export class IproovComponent implements OnInit {


  ngOnInit() {
  }

  startIproovValidation() {
    const content = document.querySelector('#certiface-iproov');
    const livenessIproov = document.createElement('iproov-me')

    const slots = `
    <div slot="grant_permission" class="w-full px-10 pt-6">
                        <div class="items-center gap-4 p-6 md:p-4 lg:p-0">
                            <div class="flex justify-center items-center">
                                <div class="rounded-full p-3 bg-brand-primary-pure">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                                        class="text-white w-8 h-8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <circle cx="12" cy="12" r="3.2"></circle>
                                        <path
                                            d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="grid justify-center">
                                <h1 class="font-highlight font-extrabold text-2xl text-center">Permissões da câmera desativadas.
                                </h1>
                                <span class="text-center pt-3">Necessário habilitar a câmera do seu sistema operacional</span>
                            </div>
                        </div>
                    </div>
                    <div slot="grant_button" class="grid w-full px-10 pt-6">
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 buttonPrimary text-lg text-slate-900 hover:bg-brand-primary-medium focus:bg-brand-primary-medium p-3 px-20"
                            type="button">Habilitar permissão</button>
                    </div>
                    <div slot="ready" class="grid gap-5 w-full px-10">
                        <div>
                            <h1 class="font-highlight font-extrabold text-xl leading-10">Reconhecimento facial</h1>
                            <span class="text-sm">Isto garante que você, é você mesmo.</span>
                        </div>
                        <div class="flex justify-start items-center gap-4">
                            <div class="rounded-full p-4 bg-neutral-high-light border border-y-neutral-high-dark">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                                    class="w-8 h-8 text-highlight-pure" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path
                                        d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z">
                                    </path>
                                </svg>
                            </div>
                            <div class="items-center">
                                <span class="font-base text-base font-bold">Escolha um ambiente bem
                                    iluminado.</span>
                            </div>
                        </div>
                        <div class="flex justify-start items-center gap-4">
                            <div class="rounded-full p-4 bg-neutral-high-light border border-y-neutral-high-dark">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                                    class="w-8 h-8 text-highlight-pure" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path
                                        d="M9 11.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm6 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37a9.974 9.974 0 0 0 10.41 3.97c.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z">
                                    </path>
                                </svg>
                            </div>
                            <div class="items-center">
                                <span class="font-base text-base font-bold">Não use acessórios como
                                    bonés, máscaras e afins.</span>
                            </div>
                        </div>
                    </div>
                    <div slot="button" class="grid w-full px-10 pt-6">
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 buttonPrimary text-lg text-slate-900 hover:bg-brand-primary-medium focus:bg-brand-primary-medium p-3 px-20"
                            type="button">Continuar</button>
                    </div>
                    <div slot="progress" class="w-full px-10 pt-6">
                        <div><svg aria-hidden="true" class="animate-spin text-white fill-brand-primary-pure w-12 h-12 font-2xl"
                                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"></path>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"></path>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div slot="passed" class="w-full px-10 pt-6">
                        <div class="items-center gap-4 p-6 md:p-4 lg:p-0">
                            <div class="flex justify-center items-center">
                                <div class="rounded-full p-3 bg-brand-primary-pure">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                                        class="text-white w-8 h-8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <h1 class="font-highlight font-extrabold text-2xl text-center">Tudo certo!</h1>
                            </div>
                        </div>
                    </div>
                    <div slot="error" class="grid gap-2 gap-y-10 w-full px-10">
                        <div class="items-center gap-4 p-6 md:p-4 lg:p-0">
                            <div class="flex justify-center items-center">
                                <div class="rounded-full p-3 bg-feedback-warning-pure">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                                        class="text-white w-8 h-8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path
                                            d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <h1 class="font-highlight font-extrabold text-2xl text-center">Não foi possível avançar com
                                    sua verificação. Uma nova sessão deve ser gerada.</h1>
                            </div>
                            <div class="flex items-center justify-center">
                                <a class="text-lg focus:bg-brand-primary-medium inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-100 text-slate-900 hover:bg-slate-100/80 p-3 px-20"
                                    href="/">Fechar</a>
                            </div>
                        </div>
                    </div>
                    <div slot="failed" class="grid gap-2 gap-y-10 w-full px-10">
                        <div class="items-center gap-4 p-6 md:p-4 lg:p-0">
                            <div class="flex justify-center items-center">
                                <div class="rounded-full p-3 bg-feedback-warning-pure">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                                        class="text-white w-8 h-8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path
                                            d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <h1 class="font-highlight font-extrabold text-2xl text-center">Não foi possível avançar com
                                    sua verificação. Uma nova sessão deve ser gerada.</h1>
                            </div>
                            <div class="flex items-center justify-center">
                                <a class="text-lg focus:bg-brand-primary-medium inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-100 text-slate-900 hover:bg-slate-100/80 p-3 px-20"
                                    href="/">Fechar</a>
                            </div>
                        </div>
                    </div>
                    <div slot="canceled" class="grid gap-2 gap-y-10 w-full px-10">
                        <div class="items-center gap-4 p-6 md:p-4 lg:p-0">
                            <div class="flex justify-center items-center">
                                <div class="rounded-full p-3 bg-feedback-warning-pure">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                                        class="text-white w-8 h-8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path
                                            d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <h1 class="font-highlight font-extrabold text-2xl text-center">Saiu da tela inteira sem
                                    concluir a prova de vida. Uma nova sessão deve ser gerada.</h1>
                            </div>
                            <div class="flex items-center justify-center">
                                <a class="text-lg focus:bg-brand-primary-medium inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-100 text-slate-900 hover:bg-slate-100/80 p-3 px-20"
                                    href="/">Fechar</a>
                            </div>
                        </div>
                    </div>
                    <div slot="permission_denied" class="w-full px-10 pt-6">
                        <div class="items-center gap-4 p-6 md:p-4 lg:p-0 py-6">
                            <div class="flex justify-center items-center">
                                <div class="rounded-full p-3 bg-feedback-warning-pure">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                                        class="text-white w-8 h-8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <circle cx="12" cy="12" r="3.2"></circle>
                                        <path
                                            d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="grid justify-center">
                                <h1 class="font-highlight font-extrabold text-2xl text-center">Precisamos acessar sua
                                    câmera.</h1>
                                <span class="text-center pt-3">Em seu aparelho, habilite o uso da câmera
                                    para continuar.</span>
                            </div>
                            <div class="flex items-center justify-center">
                                <a class="text-lg focus:bg-brand-primary-medium inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-100 text-slate-900 hover:bg-slate-100/80 p-3 px-20"
                                    href="/">Cancelar</a>
                            </div>
                        </div>
                    </div>
                    <div slot="unsupported" class="grid gap-2 gap-y-10 w-full px-10">
                        <div class="items-center gap-4 p-6 md:p-4 lg:p-0">
                            <div class="flex justify-center items-center">
                                <div class="rounded-full p-3 bg-feedback-warning-pure">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                                        class="text-white w-8 h-8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path
                                            d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <h1 class="font-highlight font-extrabold text-2xl text-center">Dispositivo / Navegador não
                                    suportado.</h1>
                            </div>
                            <div class="flex items-center justify-center">
                                <a class="text-lg focus:bg-brand-primary-medium inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-100 text-slate-900 hover:bg-slate-100/80 p-3 px-20"
                                    href="/">Fechar</a>
                            </div>
                        </div>
                    </div>
    `

    livenessIproov.setAttribute('token', '7615010f99b9337bc867b1aae15a5d7f4700863a8c721afab888adef1801vi18')
    livenessIproov.setAttribute('base_url', 'https://latam.rp.secure.iproov.me')
    livenessIproov.setAttribute('custom_title', 'Siga as instruções')
    livenessIproov.setAttribute('filter', 'classic')
    livenessIproov.innerHTML = slots

    livenessIproov.addEventListener('passed', () => {
      console.log('passed')
      // this.completeFlow(
      //   { ticket: '', token: this.sessionToken },
      //   this.interceptors,
      // )
    })
    livenessIproov.addEventListener('failed', () => {
      console.log('failed')
    })
    livenessIproov.addEventListener('ready', () => {
      console.log('ready')
    })

    content?.appendChild(livenessIproov)


  }

  completeIproov() {

  }

}
