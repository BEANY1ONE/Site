var usuarioModel = require("../models/usuarioModel");
var partidaModel = require("../models/partidaModel");

// Define a função com objetos de req(requisição) do usuário
// e res(reposta) pro usuário
function autenticar(req, res) {
    // Pega lá do cadastro.html o valor das variáveis no input
    var username = req.body.usernameServer;
    var senha = req.body.senhaServer;

    // Faz mais uma validação e verifica se os campos já estão autenticados, caso não, manda esse aviso
    if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (username == undefined) {
        res.status(400).send("Seu nome de usuário está indefinido!");
    } else {

        // Define uma função lá pro usuarioModel(função autenticar), onde pega os valores e
        // faz um select pra verificar tudo
        usuarioModel.autenticar(username, senha)
            .then(
                function (resultadoAutenticar) {
                    // Exibe o tamanho da lista encontrada
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    // Transforma JSON(vulgo a lista de valores que receber) em String/tratamento
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    // Se existir um usuário (no caso length == 1)
                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        
                        partidaModel.buscarPartidas(resultadoAutenticar[0].idUsuario)
                            .then((resultadoPartidas) => {
                                if (resultadoPartidas.length > 0) {
                                    res.json({
                                        idUsuario: resultadoAutenticar[0].idUsuario,
                                        email: resultadoAutenticar[0].email,
                                        username: resultadoAutenticar[0].username,
                                        senha: resultadoAutenticar[0].senha,
                                        partidas: resultadoPartidas
                                    });
                                } else {
                                    res.status(204).json({ partidas: [] });
                                }
                            })
                    // Se não existir usuário, informa que algo está errado:
                        } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Username e/ou senha inválido(s)");
                    } 
                    // E se tiver mais que um usuário com os inputs acima, informe:
                    else {
                        res.status(403).send("Mais de um usuário com o mesmo username e senha!");
                    }
                }
            ).catch( // Catch captura o erro e exibe erros caso não seja possível logar
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// Abaixo está a função cadastrar com requisições e respostas
function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var username = req.body.usernameServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (username == undefined) {
        res.status(400).send("Seu nome de usuário está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinido!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(username, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// Está exportando as funções cadastrar e autenticar (seria o exports) para
// os arquivos module. Exports serve para passar funções para que outros arquivos
// Utilizem sem a necessidade de escrever o código denovo
module.exports = {
    autenticar,
    cadastrar
}