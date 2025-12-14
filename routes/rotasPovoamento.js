// routes/rotasPovoamento.js
var express = require('express');
var router = express.Router();
var controllerPovoamento = require('../controller/controllerPovoamento');

/* GET Povoar Banco (/povoamento) */
router.get('/povoamento', controllerPovoamento.gerarDados);

/* GET Limpar Banco  */
router.get('/reset', controllerPovoamento.limparBanco);

module.exports = router;
