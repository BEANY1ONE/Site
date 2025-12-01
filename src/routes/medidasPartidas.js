// Define as bibliotecas que iremos utilizar (express pro servidor web e a rotas)
var express = require("express");
var router = express.Router();

// Variável media controller (encontrado na pasta Controllers)
var medidaController = require("../controllers/medidaController");

// get/pega a função buscarUltimas de medidaController, requisitando e respondendo
router.get("/ultimas/:idPartida", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

// get/pega a função buscarMedidasTemporeal, requisitando e respondendo
router.get("/tempo-real/:idPartida", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

// Exporta a função de tipo rota
module.exports = router;