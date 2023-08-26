# Nome do Produto
> Chat - Desenvolvimento Web II - Engenharia de Software - UnigranNet

## Instalação

```sh
npm install 
```


## Exemplo de Utilização

Para iniciar o servidor (http + websocket) você executa o servidor com o `node server.js`

Para criar instancias do chat você deve, no navegador, fazer uma requisição para: `http://localhost`.
Cada instância do navegador é um usuário do chat.

A primeira mensagem enviada pelo usuário será seu nome no chat.
Após isso o servidor envia todas as outras mensagens para todos os usuários que estiverem conectadas no servidor.