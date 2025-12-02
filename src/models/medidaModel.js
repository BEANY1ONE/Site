    // Define qual será as configurações do Banco de Dados que irá utilizar pra fazer isso
    var database = require("../database/config");

    // Cria a função buscarUltimasMedidas, com os valores limitados e buscando por idUsuario
    function buscarUltimasMedidas(idUsuario, limite_linhas) { 

    var instrucaoSql = `
    SELECT kills AS kills, deaths AS deaths, dtPartida AS momento, mapa, CASE WHEN deaths = 0 THEN kills 
    ELSE kills * 1.0 / deaths END AS kd, idPartida, (SELECT CASE WHEN deaths = 0 THEN kills ELSE kills * 1.0 / deaths END AS kd FROM partidaUsuario WHERE fkUsuario = ${idUsuario} GROUP BY kd ORDER BY kd DESC LIMIT 1) 
    AS kdMaximo, (select MAX(kills) FROM partidaUsuario WHERE fkUsuario = ${idUsuario}) AS maiorKill FROM partidaUsuario WHERE fkUsuario = ${idUsuario} GROUP BY kd ORDER BY kd DESC LIMIT ${limite_linhas};`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    function buscarMedidasEmTempoReal(idUsuario) {

    var instrucaoSql = `
        SELECT 
            kills,
            deaths,
            dtPartida AS momento,
            CASE
                WHEN deaths = 0 THEN kills
                ELSE kills * 1.0 / deaths
            END AS kd,
            idPartida
        FROM partidaUsuario
        WHERE fkUsuario = ${idUsuario}
        ORDER BY idPartida DESC
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


    module.exports = {
        buscarUltimasMedidas,
        buscarMedidasEmTempoReal
    }
