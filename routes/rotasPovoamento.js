var express = require('express');
var router = express.Router();
var controllerPovoamento = require('../controller/controllerPovoamento');

/* GET Povoamento */
router.get('/povoamento', controllerPovoamento.gerarDados);

module.exports = router;
