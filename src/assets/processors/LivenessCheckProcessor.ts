//import { AngularSampleApp } from './../angular-sample-controller';
import { FaceTecSDK } from "../core-sdk/FaceTecSDK.js/FaceTecSDK";
import { FaceTecSessionResult, FaceTecFaceScanResultCallback, FaceTecFaceScanProcessor } from "../core-sdk/FaceTecSDK.js/FaceTecPublicApi";
import { environment } from 'src/environments/environment';
import { Crypto } from "../utilities/Crypto";

//
// Este é um exemplo de classe independente para realizar verificações de vivacidade com o FaceTec SDK.
// Você pode optar por componentes adicionais disso em seus próprios aplicativos com base em seus requisitos específicos.
//
export class LivenessCheckProcessor implements FaceTecFaceScanProcessor {
  latestNetworkRequest: XMLHttpRequest = new XMLHttpRequest();
  public latestSessionResult: FaceTecSessionResult | null;

  //
  // NOTA: Essas propriedades são apenas para fins de demonstração para que o Aplicativo de Amostra possa obter informações sobre o que está acontecendo no processor.
  // No código em seu próprio aplicativo, você pode transmitir sinais, sinalizadores, intermediários e resultados da maneira que desejar.
  //
  success: boolean;
  sampleAppControllerReference: any;
  appkey: string;

  constructor(sessionToken: string, sampleAppControllerReference: any) {
    //
    // NOTA: Essas propriedades são apenas para fins de demonstração para que o Aplicativo de Amostra possa obter informações sobre o que está acontecendo no processor.
    // No código em seu próprio aplicativo, você pode transmitir sinais, sinalizadores, intermediários e resultados da maneira que desejar.
    //
    this.success = false;
    this.sampleAppControllerReference = sampleAppControllerReference;
    this.latestSessionResult = null;

    //
    // Parte 1: Iniciando a Sessão FaceTec
    //
    // Parâmetros necessários:
    // - FaceTecFaceScanProcessor: Uma classe que implementa o FaceTecFaceScanProcessor, que trata o FaceScan quando o Usuário conclui uma Sessão. Neste exemplo, "this" implementa a classe.
    // - sessionToken: um token de sessão válido que você acabou de criar chamando sua API para obter um token de sessão do SDK do servidor.
    //
    new FaceTecSDK.FaceTecSession(
      this,
      sessionToken
    );
  }

  //
  // Parte 2: Manipulando o resultado de um FaceScan
  //
  public processSessionResultWhileFaceTecSDKWaits(sessionResult: FaceTecSessionResult, faceScanResultCallback: FaceTecFaceScanResultCallback) {

    // Salve o resultado da sessão atual
    this.latestSessionResult = sessionResult;

    //
    // Parte 3: Lida com cenários de saída antecipada onde não há FaceScan para lidar - ou seja, cancelamento do usuário, tempos limite, etc.
    //
    if(sessionResult.status !== FaceTecSDK.FaceTecSessionStatus.SessionCompletedSuccessfully) {
      console.log("Session was not completed successfully, cancelling.  Session Status: " + FaceTecSDK.FaceTecSessionStatus[sessionResult.status]);
      this.latestNetworkRequest.abort();
      faceScanResultCallback.cancel();
      return;
    }

    // IMPORTANTE: FaceTecSDK.FaceTecSessionStatus.SessionCompletedSuccessfully NÃO significa que a Verificação de Liveness foi bem-sucedida.
    // Significa simplesmente que o usuário concluiu a sessão e um FaceScan 3D foi criado. Você ainda precisa realizar o Liveness Check em seus servidores.

    //
    // Parte 4: Obtenha dados essenciais do FaceTecSessionResult
    //
    // TODO Inserir a appKey aqui !!!!
    this.appkey = window.localStorage.getItem('appkey');
    var parameters = {
      appkey: this.appkey,
      userAgent: FaceTecSDK.createFaceTecAPIUserAgentString(sessionResult.sessionId as string),
      faceScan: sessionResult.faceScan,
      auditTrailImage: sessionResult.auditTrail[0],
      lowQualityAuditTrailImage: sessionResult.lowQualityAuditTrail[0],
      sessionId: sessionResult.sessionId
    };

    //
    // Parte 5: Faça a chamada de rede para seus servidores. Abaixo está apenas um código de exemplo, você pode personalizar com base em como sua própria API funciona.
    //
    this.latestNetworkRequest = new XMLHttpRequest();
    this.latestNetworkRequest.open("POST", environment.apiUrl + "/facecaptcha/service/captcha/3d/liveness");
    this.latestNetworkRequest.setRequestHeader("Content-Type", "application/json");

    this.latestNetworkRequest.onreadystatechange = () => {

      //
      // Parte 6: Em nossa amostra, avaliamos uma resposta booleana e tratamos true como foi processada com sucesso e devemos prosseguir para a próxima etapa e lidar com todas as outras respostas cancelando.
      // Você pode ter diferentes paradigmas em sua própria API e pode personalizar com base neles.
      //
      if(this.latestNetworkRequest.readyState === XMLHttpRequest.DONE) {
        try {
          const responseJSON = JSON.parse(this.latestNetworkRequest.responseText);
          const scanResultBlob = responseJSON.scanResultBlob;

          // Verificamos se a Sesão do servidor nos retornou uma propriedade de codID.
          // O fluxo da interface do usuário do SDK do dispositivo agora é orientado pela função continueToNextStep, que deve receber o scanResultBlob da resposta do SDK do servidor.
          if(responseJSON.codID) {

            // Demonstra a configuração dinâmica da mensagem da tela de sucesso.
            FaceTecSDK.FaceTecCustomization.setOverrideResultScreenSuccessMessage("Liveness\nConfirmed");

            // Na v9.2.0+, basta passar scanResultBlob para a função continueToNextStep para avançar o fluxo do usuário.
            // scanResultBlob é um blob proprietário e criptografado que controla a lógica do que acontece em seguida para o usuário.
            faceScanResultCallback.proceedToNextStep(scanResultBlob);
          }
          else {
            // CASE: resposta INESPERADA da API. Nosso código de exemplo desliga um booleano wasProcessed na raiz do objeto JSON --> Você define seus próprios contratos de API consigo mesmo e pode optar por fazer algo diferente aqui com base no erro.
            console.log("Unexpected API response, cancelling out.");
            faceScanResultCallback.cancel();
          }
        }
        catch {
          // CASE: Falha ao analisar a resposta em JSON --> Você define seus próprios contratos de API consigo mesmo e pode optar por fazer algo diferente aqui com base no erro. O código sólido do lado do servidor deve garantir que você não chegue a esse caso.
          console.log("Exception while handling API response, cancelling out.");
          faceScanResultCallback.cancel();
        }
      }
    };

    this.latestNetworkRequest.onerror = () => {

      // CASE: A própria solicitação de rede está com erro --> Você define seus próprios contratos de API consigo mesmo e pode optar por fazer algo diferente aqui com base no erro.
      console.log("XHR error, cancelling.");
      faceScanResultCallback.cancel();
    };

    //
    // Parte 7: Demonstra a atualização da Barra de Progresso com base no evento de progresso.
    //
    this.latestNetworkRequest.upload.onprogress = (event) => {
      var progress = event.loaded / event.total;
      faceScanResultCallback.uploadProgress(progress);
    };

    //
    // Faz a criptografia dos parametros auditTrailImage e lowQualityAuditTrailImage
    //
    parameters.auditTrailImage = Crypto.encryptImages(parameters.auditTrailImage,this.appkey);
    parameters.lowQualityAuditTrailImage = Crypto.encryptImages(parameters.lowQualityAuditTrailImage,this.appkey);
    var jsonStringToUpload = JSON.stringify(parameters);

    //
    // Parte 8: Na verdade, envie a solicitação.
    //
    this.latestNetworkRequest.send(jsonStringToUpload);

    //
    // Parte 9: Para melhor UX, atualize o usuário se o upload estiver demorando. Você é livre para personalizar e aprimorar esse comportamento ao seu gosto.
    //
    window.setTimeout( () => {
      if(this.latestNetworkRequest.readyState === XMLHttpRequest.DONE) {
        return;
      }
      faceScanResultCallback.uploadMessageOverride("Ainda enviando...");
    }, 6000);
  }

  //
  // Parte 10: Esta função é chamada depois que o FaceTec SDK é completamente concluído. Não há parâmetros porque você já recebeu todos os dados na função processSessionWhileFaceTecSDKWaits e já lidou com todos os seus próprios resultados.
  //
  public onFaceTecSDKCompletelyDone = () => {

    //
    // NOTA: onFaceTecSDKCompletelyDone() é chamado após você sinalizar o FaceTec SDK com success() ou cancel().
    // Chamar uma função personalizada no Sample App Controller é feito para fins de demonstração para mostrar que é aqui que você obtém o controle do FaceTec SDK.
    //
    this.success = this.latestSessionResult!.isCompletelyDone;
    this.sampleAppControllerReference.onComplete(this.latestSessionResult, null, this.latestNetworkRequest.status);

    if (this.success) {
      this.sampleAppControllerReference.redirectSendDocument();
    }
  }

  //
  // NOTA: Este método de conveniência pública é apenas para fins de demonstração, para que o Aplicativo de Amostra possa obter informações sobre o que está acontecendo no processador.
  // No seu código, você pode nem querer ou precisar fazer isso.
  //
  public isSuccess = () => {
    return this.success;
  }
}
