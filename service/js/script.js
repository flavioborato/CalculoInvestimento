
// Cria comunicação com o servidor
window.Websocket = window.Websocket || window.MozWebSocket;
var locate = $(location).attr('href');
var connection = new WebSocket('ws://'+locate.split("/")[2]+':80');
connection.onerror = function (error){
	console.log(error);
};
connection.onopen = function(){
	conectado = true;
};

// Função do botão no html
function verificar(){
	// Captura as variaveis do html ao pressionar o botão
    var quantAno = document.getElementById('quantAno')
	var invesTotal = document.getElementById('invesTotal')
	var invesMensal = document.getElementById('invesMensal')
	var rendimento = document.getElementById('rendimento')

	// Verifica todos dados validos e envia para servidor
	if ( quantAno.value == 0 || invesTotal.value == 0 || rendimento.value == 0 ){
		window.alert('[ERRO] Verificar e inserir os dados novamente, itens obrigatorios : '+
					'Quantidade de anos / Valor Investimento / Porcentagem Rendimento') 
	}else{
		connection.send(JSON.stringify({quantAnoSet:quantAno.value,invesTotalSet:invesTotal.value,
			invesMensalSet:invesMensal.value,rendimentoSet:rendimento.value}));
}}

// Carrega uma imagem
var img = document.createElement('img');
img.setAttribute('id','foto');
img.setAttribute('src', "/imagens/img2.png");

// Recebe mensagem do Servidor e mostra na tela
connection.onmessage = function (messageRecive){
	var res = window.document.getElementById('res')
	var dados = JSON.parse(messageRecive.data);
	res.style.textAlign = 'center';
	res.innerHTML = dados.mensagem;
	//Mostra imagem junto ao resultado
	if(dados.img == 'show-img'){res.appendChild(img)};
	//Zera variaveis para visualização
	quantAno.value = ""
	quantAno.focus()
	invesTotal.value = ""
	invesTotal.focus()
	invesMensal.value = ""
	invesMensal.focus()
	rendimento.value = ""
	rendimento.focus()
};