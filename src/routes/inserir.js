var express = require("express");
var router = express.Router();

var inserirController = require("../controllers/inserirController");

//Recebendo os dados do html e direcionando para a função cadastrar de inserirController.js
router.post("/registrar/:idUsuario", function (req, res) {
    inserirController.registrar(req, res);
});
 
module.exports = router;
