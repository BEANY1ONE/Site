// Começaremos aqui o código de inserir
var inserirModel = require("../models/inserirModel");
var partidaModel = require("../models/partidaModel");

// Abaixo está a função registrar com requisições e respostas
function registrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var time = req.body.timeServer;
    var pontos = req.body.pontosServer;
    var mapa = req.body.mapaServer;
    var resultado = req.body.resultadoServer;
    var kills = req.body.killsServer;
    var deaths = req.body.deathsServer;
    var idUsuario = req.params.idUsuario;

    // Faça as validações dos valores
    if (time == undefined) {
        res.status(400).send("Seu time está indefinido!");
    } else if (pontos == undefined) {
        res.status(400).send("Seus pontos está indefinido!");
    } else if (mapa == undefined) {
        res.status(400).send("Seu mapa está indefinido!");
    }  else if (resultado == undefined) {
        res.status(400).send("Seu resultado está indefinido!");
    }  else if (kills == undefined) {
        res.status(400).send("Suas kills está indefinido!");
    }  else if (deaths == undefined) {
        res.status(400).send("Suas mortes está indefinido!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo inserirModel.js
        inserirModel.registrar(time, pontos, mapa, resultado, kills, deaths, idUsuario )
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a Inserção! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// Está exportando as funções registrar e autenticar (seria o exports) para
// os arquivos module. Exports serve para passar funções para que outros arquivos
// Utilizem sem a necessidade de escrever o código denovo
module.exports = {
    registrar
}