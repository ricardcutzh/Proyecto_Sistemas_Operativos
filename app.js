/**********************************************************************************************/
/** SECCION DE IMPORTACIONES **/
var express = require('express'); //REQUIRIENDO EXPRESS
var bodyparser = require('body-parser'); //UTILIZANO EL BODY PARSER
var routes = require('./routes/routes'); // REQUIRIENDO LAS RUTAS
const mongoose = require('mongoose'); //REQUIRIENDO EL PAQUETE DE MONGOOSE
/**********************************************************************************************/
/** SECCION DE DEFINICIONES **/
var app = express(); //CREANDO LA APLICACION
app.set('view engine', 'ejs'); //MOTOR DE VISTAS DE EXPRESS
app.use(bodyparser()); //SETEANDO BODY PARSER
app.use('/static', express.static('public')); //DEFINIENDO EL FOLDER DONDE ESTARAN LOS TEMAS
app.use('/', routes); //DEFINIENDO EL CONTROLADOR DE LAS RUTAS
mongoose.connect('mongodb://34.74.196.25:3000/proyecto',{useNewUrlParser:true});
/**********************************************************************************************/

// LA APLICACION ESCUCHANDO...
app.listen(8000, function(){
    console.log("Escuchando en puerto 8000");
});