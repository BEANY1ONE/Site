var partidaModel = require("../models/partidaModel");

function buscarPartidas(req, res) {
  var idUsuario = req.params.idUsuario;

  partidaModel.buscarPartidas(idUsuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    } 
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as partidas: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function cadastrar(req, res) {
  var senha = req.body.senha;
  var idUsuario = req.body.idUsuario;

  if (senha == undefined) {
    res.status(400).send("senha está undefined!");
  } else if (idUsuario == undefined) {
    res.status(400).send("idUsuario está undefined!");
  } else {


    partidaModel.cadastrar(senha, idUsuario)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  buscarPartidas,
  cadastrar
}