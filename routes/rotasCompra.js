// routes/rotasCompra.js
var express = require('express');
var router = express.Router();
var controllerCompra = require('../controller/controllerCompra');

/* GET Realizar Compra (/comprar/:id) */
router.get('/comprar/:id', controllerCompra.realizarCompra);

module.exports = router;
