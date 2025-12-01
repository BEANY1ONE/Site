var express = require("express");
var router = express.Router();

var aquarioController = require("../controllers/partidaController");

router.get("/:usuario", function (req, res) {
  aquarioController.buscarPartidasPorUsuario(req, res);
});

router.post("/cadastrar", function (req, res) {
  aquarioController.cadastrar(req, res);
})

module.exports = router;