var database = require("../database/config");

function buscarPartidas(usernameId) {

  var instrucaoSql = `SELECT * FROM partidaUsuario p WHERE fkUsuario = ${usernameId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(usernameId, descricao) {
  
  var instrucaoSql = `INSERT INTO (descricao, fk_empresa) aquario VALUES (${descricao}, ${usernameId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarPartidas,
  cadastrar
}
