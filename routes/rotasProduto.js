var express = require('express');
var router = express.Router();
var controllerProduto = require('../controller/controllerProduto');

/* GET Detalhes do Produto */
router.get('/produto/:id', controllerProduto.verDetalhes);

module.exports = router;
