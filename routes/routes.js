var express = require('express'); //REQUIRIENDO EXPRESS
var router = express.Router(); // DEFINIENDO LAS RUTAS DE EXPRESS

// RUTA DE TESTEO PARA VER QUE TODO ESTA FUNCIONANDO BIEN
router.route('/Test').get(function (req, res) {
    res.json({
        status:'Aplicacion de Red Social Corriendo con Exito',
        author:'Ricardo Cutz Hernandez'
    });
});

module.exports = router; //EXPORTANDO EL OBJETO ROUTER PARA PODER ACCEDER A EL DESDE APP