// routes/rotasPedidos.js
var express = require('express');
var router = express.Router();
var controllerPedidos = require('../controller/controllerPedidos');

/* GET Listar Pedidos */
router.get('/pedidos', controllerPedidos.listarPedidos);

module.exports = router;
