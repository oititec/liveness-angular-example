# Este documento trata com detalhes a implementação do componente da Fortface no exemplo em Angular relacionado ao Liveness 3D.

## 1 - Login e inserção de dados

Ao abrir o endereço https://localhost:4200 no seu navegador web, você cairá na tela de login
<br>
Utilize um operador cadastrado em nosso sistema para acessar a tela de inserção de dados
<br>
Informe seu CPF, nome e data de nascimento.
<br>
Você terá os seguintes itens no menu:

- [Liveness 2D](https://github.com/oititec/liveness-angular-example/blob/main/src/app/liveness2d/README.md)
- [Liveness 3D](https://github.com/oititec/liveness-angular-example/blob/main/src/app/liveness3d/README.md)
- [Liveness 3D Facetec v10](https://github.com/oititec/liveness-angular-example/blob/main/src/app/facetec-v10/README.md)
- [Liveness 3D Iproov](https://github.com/oititec/liveness-angular-example/blob/main/src/app/iproov/README.md)
- [Liveness 3D Fortface](https://github.com/oititec/liveness-angular-example/blob/main/src/app/fortface/README.md)
- [Envio de documentos](https://github.com/oititec/liveness-angular-example/blob/main/src/app/senddocument/README.md) - Este último só estará disponível ao finalizar um do processos de Liveness

## 2 - Liveness 3D Fortface

O **Liveness 3D Fortface** é disponibilizado como um **WebComponent**, carregado via script no arquivo `index.html`, não sendo necessária a instalação de bibliotecas NPM.

Durante a inicialização da aplicação são executadas as etapas de autenticação e preparação da sessão. A validação de liveness é iniciada somente quando o usuário aciona o botão **"Iniciar Validação Fortface"**.

---

## Fluxo da Aplicação

```text
FortfaceSDK.load()
        │
        ▼
createFreshSdk()
        │
        ▼
login()
        │
        ▼
createToken()
        │
        ▼
livenessResolve()
        │
        ▼
Aplicação pronta
        │
        ▼
Usuário inicia validação
        │
        ▼
Obtém geolocalização
        │
        ▼
initialize()
        │
        ▼
Fortface.startSession()
        │
        ▼
Captura da prova de vida
        │
        ▼
verifyLiveness()
        │
        ▼
Resultado
```

---

## Métodos do WebComponent Fortface

| Método | Descrição |
| ------- | --------- |
| `load()` | Realiza o carregamento do SDK. |
| `start()` | Inicializa o componente e retorna o `deviceRequestInfo`. |
| `startSession()` | Inicia a captura da prova de vida. |

---

## Métodos da implementação Angular

| Método | Descrição |
| ------- | --------- |
| `createFreshSdk()` | Remove qualquer instância anterior do WebComponent, cria uma nova instância e obtém o `deviceRequestInfo`. |
| `login()` | Autentica o usuário na API SaaS e obtém um Token. |
| `createToken()` | Cria uma nova sessão de jornada e retorna o UUID utilizado durante todo o processo. |
| `livenessResolve()` | Associa o provedor de liveness ao token criado. |
| `startLivenessValidation()` | Solicita a localização do usuário, inicializa a sessão e inicia a captura da prova de vida. |
| `fortfaceFinishSession()` | Recebe os eventos retornados pelo SDK (captura, cancelamento, timeout ou erro). |
| `handleResult()` | Envia os dados capturados para validação e trata o resultado retornado pela API. |
| `getUserLocation()` | Obtém a localização do usuário através da API de Geolocalização do navegador. |
| `updateStatus()` | Atualiza a mensagem de status exibida na interface. |

---

## Estrutura da Interface

A tela possui uma implementação simples composta por:

- Botão para iniciar a validação.
- Área de exibição do status da operação.
- Container onde o WebComponent `fortface-sdk` é inserido dinamicamente.
- Logo da Fortface.

O componente é criado dinamicamente através do método `createFreshSdk()`, permitindo recriar a instância em caso de nova tentativa de validação.

---

## Fluxo dos Serviços

O serviço `CertiFaceSaasService` encapsula toda a comunicação com a API.

| Método | Endpoint | Objetivo |
| ------- | -------- | -------- |
| `login()` | `/api/v1/login` | Autenticação do usuário. |
| `createToken()` | `/api/v1/protected/genToken` | Criação da jornada e obtenção do UUID. |
| `livenessResolve()` | `/api/v1/token/{uuid}/liveness/resolve` | Associação do provedor de liveness à jornada. |
| `initialize()` | `/api/v1/token/{uuid}/liveness/initialize` | Inicialização da sessão Fortface. Aqui é retornada a AppKey |
| `verifyLiveness()` | `/api/v1/token/{uuid}/liveness/verify` | Envio da captura para validação. |

---

## Sequência da Validação

1. Carrega o SDK Fortface.
2. Cria uma instância do WebComponent.
3. Realiza autenticação.
4. Gera o token da jornada.
5. Resolve o provedor de liveness.
6. Aguarda a ação do usuário.
7. Solicita permissão de geolocalização.
8. Inicializa a sessão de captura.
9. Executa a prova de vida.
10. Envia os dados para validação.
11. Exibe o resultado.
12. Caso permitido pela API, recria automaticamente o SDK para uma nova tentativa.

---

## Observações

- O WebComponent é recriado a cada nova tentativa para garantir uma sessão limpa.
- A geolocalização é obrigatória para iniciar a validação.
- O `deviceRequestInfo` retornado pelo SDK deve ser enviado na chamada de `initialize()`
- Em caso de falha no liveness, uma nova appkey é gerada a cada tentativa (limite padrão de 3 tentativas)
````
