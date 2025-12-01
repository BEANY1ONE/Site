// Define qual será as configurações do Banco de Dados que irá utilizar pra fazer isso
var database = require("../database/config");

// Cria a função buscarUltimasMedidas, com os valores limitados e buscando por idUsuario
function buscarUltimasMedidas(idUsuario, limite_linhas) { 

    var instrucaoSql = `SELECT 
        kills as kills,
        deaths as deaths,
        dtPartida as momento,
                idPartida
                    FROM partidaUsuario
                    WHERE fkUsuario = ${idUsuario}
                    ORDER BY idPartida DESC LIMIT ${limite_linhas}`; 

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idUsuario) { 

    var instrucaoSql = `SELECT 
        kills as kills, 
        deaths as deaths,
        dtPartida as momento,
                        idPartida 
                        FROM partidaUsuario 
                        WHERE fkUsuario = ${idUsuario}
                    ORDER BY idPartida DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
