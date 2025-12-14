// routes/rotasCompra.js
var express = require('express');
var router = express.Router();
var controllerCompra = require('../controller/controllerCompra');

/* GET Tela de Quantidade  */
router.get('/comprar/:id', controllerCompra.exibirCheckout);

/* POST Finalizar Compra  */
router.post('/finalizar-compra/:id', controllerCompra.realizarCompra);

module.exports = router;
