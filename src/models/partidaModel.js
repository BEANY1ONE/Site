var database = require("../database/config");

function buscarPartidas(idUsuario) {

  var instrucaoSql = `SELECT * FROM partidaUsuario p WHERE fkUsuario = ${idUsuario}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
} 
 
function cadastrar(idUsuario, descricao) {
  
  var instrucaoSql = `INSERT INTO partidaUsuario (descricao, fk_empresa) VALUES (${descricao}, ${idUsuario})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
} 


module.exports = {
  buscarPartidas,
  cadastrar
}
