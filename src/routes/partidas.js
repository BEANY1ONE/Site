var express = require("express");
var router = express.Router();

var partidaController = require("../controllers/partidaController");

router.get("/:usuario", function (req, res) {
  partidaController.buscarPartidasPorUsuario(req, res);
});

router.post("/cadastrar", function (req, res) {
  partidaController.cadastrar(req, res);
})

module.exports = router;