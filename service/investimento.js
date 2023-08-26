// Modulo de calculo para invetimento
exports.CalculoInvestimento = ( quantidadeDeAnos, rendimentoMensal, valorInvestido, invetimentoMensal )=>{
// Converte as variavies
var qut = parseFloat(quantidadeDeAnos);
var rend = parseFloat(rendimentoMensal);
var inv = parseFloat(invetimentoMensal);
var result = parseFloat(valorInvestido);
// Loop do calculo do rendimento na quantidade de anos
for (let index = 0; index < qut; index++) {
    // Loop do calculo do rendimento na quantidade de meses
    for (let index = 1; index < 13; index++) {
        //Soma valor mensal depositado
        result = result + inv;
        //Calcula rendimento e soma no total
        result = result + (result*(rend/100));  
    }  
}
     return  result.toFixed(4);
}
