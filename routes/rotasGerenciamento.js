// routes/rotasGerenciamento.js
var express = require('express');
var router = express.Router();
var controllerGerenciamento = require('../controller/controllerGerenciamento');

/* GET Tela de Gerenciamento */
router.get('/gerenciamento', controllerGerenciamento.listarTodosPedidos);

/* POST Atualizar Status (Ação dos Botões) */
router.post('/gerenciamento/status/:id', controllerGerenciamento.atualizarStatus);

module.exports = router;
