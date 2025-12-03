// Aqui começa o código de modelagem de inserir
// define que database irá ser inserido através do .env e config no database
var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function registrar(time, pontos, mapa, resultado, kills, deaths, idUsuario) {
    console.log("ACESSEI O INSERIR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrar():", time, pontos, mapa, resultado, kills, deaths, idUsuario);
    
    // Insira exatamente a query do banco aqui, lembrando da usernamenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO partidaUsuario (fkUsuario, fkEquipe, dtPartida, mapa, resultado, kills, deaths, pontos) VALUES 
        (${idUsuario}, ${time}, DEFAULT, '${mapa}', '${resultado}', ${kills}, ${deaths}, ${pontos});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    registrar
};