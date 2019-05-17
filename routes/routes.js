var express = require('express'); //REQUIRIENDO EXPRESS
var router = express.Router(); // DEFINIENDO LAS RUTAS DE EXPRESS
var HomeController = require('../controllers/HomeController');

// RUTA DE TESTEO PARA VER QUE TODO ESTA FUNCIONANDO BIEN
router.route('/Test').get(HomeController.prueba);
// RUTA PARA ENVIAR LOS TWEETS
router.route('/Tweets').post(HomeController.saveTweets);
module.exports = router; //EXPORTANDO EL OBJETO ROUTER PARA PODER ACCEDER A EL DESDE APP