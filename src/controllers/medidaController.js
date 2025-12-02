// Define a variável (que faz comandos no MySQL) pra ser utilizada abaixo
var medidaModel = require("../models/medidaModel");

// função de buscarUltimasMedidas  
function buscarUltimasMedidas(req, res) {

    // Define o limite de linhas/registros do gráfico
    const limite_linhas = 6;

    // Define a variável idUsuario, requisitando o paramêtro
    const idUsuario = req.params.idUsuario;

    // Mostra o limite de dados no gráfico
    console.log(`Recuperando as ultimas ${limite_linhas} medidas da partida ${idUsuario}`);

    // Utiliza a função do MySQL e busca o idUsuario(do mySQL) e então faz a função resultado
    medidaModel.buscarUltimasMedidas(idUsuario, limite_linhas).then(function (resultado) { 
        // Se encontrar resultados, define como resposta o json exibido, se não, envia "Nenhum
        // resultado encontrado" como response
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
        // define a função de erro caso aconteça nas medidas
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// Função de buscar as medidas em tempo real abaixo
function buscarMedidasEmTempoReal(req, res) {

    // Define a variável idPartida que requer parametros idPartida do medidaModels.js
    var idUsuario = req.params.idUsuario;

    // Mostra no console que vai recuperar as medidas
    console.log(`Recuperando medidas em tempo real`);

    // Busca o idPartida dentro da função SQL medidaModel, onde então, realiza função resultado
    medidaModel.buscarMedidasEmTempoReal(idUsuario).then(function (resultado) {
        // Se encontrar um resultado de idUsuario, responde com resultado que pega em forma json
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else { // Se não, apenas responde que não encontrou nada
            res.status(204).send("Nenhum resultado encontrado!")
        }
        // Define função erro caso ocorra ao buscar as medidas
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// Exporta as funções do controller.
module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal

}