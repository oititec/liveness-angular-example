# Este documento trata com detalhes a implementação do componente da Iproov no exemplo em Angular relacionado ao Liveness 3D.

## 1 - Informações da home

Ao abrir o endereço https://localhost:4200 no seu navegador web, você cairá na tela abaixo:
<br>
![image.png](https://i.ibb.co/7nscwCZ/Screenshot-2023-04-20-at-17-23-34-angular-App.png)

Copie e cole uma appkey válida e pressione o botão continuar

Você terá 3 itens no menu:

- [Liveness 2D](https://github.com/oititec/liveness-angular-example/blob/main/src/liveness-2d/README.md)
- [Liveness 3D](https://github.com/oititec/liveness-angular-example/blob/main/src/liveness-3d/README.md)
- Liveness 3D Iproov
- [Envio de documentos](https://github.com/oititec/liveness-angular-example/blob/main/src/send-documents/README.md) - Este último só estará disponível ao finalizar um do processos de Liveness

## 2 - Liveness 3D Iproov

<br>

Ao carregar a tela de Liveness 3D, um token de sessão será gerado, assim que esteja pronto o botão "Iniciar Validação Iproov" estará disponível. Ao clicá-lo, o componente do Iproov será inicializado com a mensagem "Inicializado" exibida na tela e o botão "3D Liveness Check" será habilitado. O processo de prova de vida em 3D poderá ser iniciado.

Quando a tela é carregada, o seguinte método é chamado no final de seu carregamento:
<br>
| Método | Descrição |
|--|--|
| getSessionToken() | Armazena o token de sessão e a url do Iproov nas variáveis sessionToken e iproovUrl respectivamente.
<br>

Ao clicar no botão Iniciar Validação Iproov, os seguintes métodos são chamados:
<br>
| Método | Descrição |
|--|--|
| startIproovValidation() | Responsável por iniciar a sessão de Liveness Iproov. Após a realização do Liveness 3D com sucesso, será gravado o hasLiveness no localStorage do navegador, liberando assim o usuário para fazer o envio de documentos caso desejar ao final do processo |
<br>

Ao finalizar o processo (caso o envio seja feito com sucesso), uma mensagem de confirmação de envio é exibido na tela.
