// routes/rotasDashboard.js
var express = require('express');
var router = express.Router();
var controllerDashboard = require('../controller/controllerDashboard');

/* GET Dashboard Administrativo */
router.get('/dashboard', controllerDashboard.exibirDashboard);

module.exports = router;
