// Importa componentes para iniciar servidor
const http = require('http');
const url = require('url');
const S = require('string');
var mime = require('mime-types');
const fs = require('fs');
const WebSocket = require('ws');
// Importa função de investimento
const funcao = require ('./investimento');

//Carrega e roda pagina 
const server = http.createServer((request, response)=>{
	var  diretorio = __dirname;
	var q = url.parse(request.url, true);
	q.pathname = (q.pathname=="/")?"/index.html":q.pathname;
	var arquivo = S(q.pathname).splitLeft('/');
	var tipoArquivo = mime.lookup(arquivo[arquivo.length-1]);
	fs.readFile(diretorio+q.pathname, (erro, html)=>{
		if(erro){
			response.writeHeader(404, {'Content-Type':'text/html'});
			response.write("Pagina invalida!");
			response.end();
		}else{
			response.writeHeader(200, {'Content-Type':tipoArquivo});
			response.write(html);
			response.end();
		}
	});
});
server.listen(80);

// Recebem mensagem e processa para enviar ao cliente
const wsServer = new WebSocket.Server({server:server});
wsServer.on('connection', (ws)=>{
	ws.on('message', (messageRecive)=>{
		console.log('received: %s', messageRecive);
		var json = JSON.parse(messageRecive);	
			//Chama funcao de calculo de Investimento
			var result = funcao.CalculoInvestimento(json.quantAnoSet,json.rendimentoSet,
						json.invesTotalSet,json.invesMensalSet);
			ws.send(JSON.stringify({mensagem:'Investindo inicialmente R$'+json.invesTotalSet+'<br>'+
			'E depositando mensalmete o valor de R$'+json.invesMensalSet+'<br>'+
			'Com um juros rendendo '+json.rendimentoSet+'% ao mês <br>'+			
			'O valor total de seu investimento daqui a '+json.quantAnoSet+
			' anos vai ser de :- R$' + result +'<br>', 
			img:'show-img'}));		
	});
	ws.send(JSON.stringify({mensagem:'!!!Preencha os dados acima para obter o resultado!!!',img:''}));
});