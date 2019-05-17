/**********************************************************************************************/
/** SECCION DE IMPORTACIONES **/
var express = require('express'); //REQUIRIENDO EXPRESS
var bodyparser = require('body-parser'); //UTILIZANO EL BODY PARSER
var routes = require('./routes/routes'); // REQUIRIENDO LAS RUTAS
const mongoose = require('mongoose'); //REQUIRIENDO EL PAQUETE DE MONGOOSE
var socket = require('socket.io'); //REQUIRIENDO LOS SOCKETS
/**********************************************************************************************/
/** SECCION DE DEFINICIONES **/
var app = express(); //CREANDO LA APLICACION
app.set('view engine', 'ejs'); //MOTOR DE VISTAS DE EXPRESS
app.use(bodyparser()); //SETEANDO BODY PARSER
app.use('/static', express.static('public')); //DEFINIENDO EL FOLDER DONDE ESTARAN LOS TEMAS
app.use('/', routes); //DEFINIENDO EL CONTROLADOR DE LAS RUTAS
mongoose.connect('mongodb://34.74.196.25:3000/proyecto', { useNewUrlParser: true });
/**********************************************************************************************/

// LA APLICACION ESCUCHANDO...
var server = app.listen(8000, function () {
    console.log("Escuchando en puerto 8000");
});

var principal = socket(server);
// MODELOS
const Usuario = require('../node/models/Usuario');
const Tweet = require('../node/models/Tweet');
const Categoria = require('../node/models/Categoria');

// db.usuarios.aggregate([{$project:{usuario:1,tweets:{$size:"$tweets"}}},{$sort:{tweets:-1}},{$limit:1}])

principal.of('/home').on('connection', function (socket) {
    console.log('coneccion pantalla principal');

    // FUNCION QUE MANDA A LLAMAR A LOS TWEETS
    setInterval(function () {
        Tweet.find()
            .populate('usuario', 'alias nombre')
            .populate('categoria', 'nombre')
            .limit(10)
            .sort({ _id: -1 })
            .exec()
            .then(tweets => {
                socket.emit('tweets', tweets);
            })
            .catch(err => {
                console.log(err);
            });
    }, 5000);

    //FUNCION QUE MANDA LOS DATOS DE TWEETS
    setInterval(function () {
        Tweet.countDocuments({})
            .exec()
            .then(res => {
                socket.emit('numeroTweets', { twts: res });
            })
            .catch(err => {
                console.log(err);
            });
    }, 5000);

    // FUNCION QUE MANDA LOS DATOS DE LOS USUARIOS
    setInterval(function () {
        Usuario.countDocuments({})
            .exec()
            .then(res => {
                socket.emit('numeroUsuarios', { users: res });
            })
            .catch(err => {
                console.log(err);
            });
    }, 5000);

    // FUNCION QUE CUENTA LAS CATEGORIAS
    setInterval(function () {
        Categoria.countDocuments({})
            .exec()
            .then(res => {
                socket.emit('numeroCategorias', { categos: res });
            })
            .catch(err => {
                console.log(err);
            });
    }, 5000);

    // FUNCION QUE RETORNA EL USUARIO CON MAYOR NUMERO DE TWEETS
    setInterval(function () {
        Usuario.aggregate([
            {
                $project:
                {
                    usuario: 1,
                    alias: 1,
                    nombre: 1,
                    tweets: {
                        $size: "$tweets"
                    }
                }
            }
            ,
            {
                $sort: { tweets: -1 }
            }
            ,
            {
                $limit: 1
            }
        ])
            .exec()
            .then(res => {
                socket.emit('topUsuario', res);
            })
            .catch(err => {
                console.log(err);
            })
            ;
    },5000);

    // FUNCION QUE RETORNE EL TOP DE CATEGORIA
    setInterval(function(){
        Categoria.aggregate([
            {
                $project:
                {
                    categoria:1,
                    nombre:1,
                    tweets:
                    {
                        $size: "$tweets"
                    }
                }
            }
            ,
            {
                $sort: { tweets: -1 }
            }
            ,
            {
                $limit: 1
            }
        ])
        .exec()
        .then(res => {
            socket.emit('topCategoria', res);
        })
        .catch(err => {
            console.log(err);
        });
    },5000);

    /*setInterval(function(){
        Categoria.find()
        .select("-tweets")
        .exec()
        .then(res => {
            socket.emit('lista_categorias', res);
        })
        .catch(err => {
            console.log(err);
        });
    }, 5000);

    setInterval(function(){
        Usuario.find()
        .select("-tweets")
        .exec()
        .then(res => {
            socket.emit('lista_usuarios', res);
        })
        .catch(err => {
            console.log(err);
        });
    }, 5000);*/
});

principal.of('/users').on('connection', function(socket){
    console.log('conectado desde pagina de usuario');
    socket.on('alias', function(data)
    {
        Usuario.find({alias:data})
        .populate({
            path:'tweets',
            options: {limit:3, sort: { _id: -1 }}
        })
        .exec()
        .then(res => {
            if(res.length > 0)
            {
                socket.emit('info_usuario', res); //ORDENO EL SUBDOCUMENT PARA VER EL MAS RECIENTE
                Tweet.countDocuments({usuario:res[0]._id})
                .exec()
                .then(c => {
                    socket.emit('cantidad_tweets', c);
                })
                .catch(err=>{
                    console.log(err);
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    });
});

principal.of('/categories').on('connection', function(socket){
    console.log('conectado desde pagina de categoria');
    socket.on('categoria', function(data){
        Categoria.find({nombre:data})
        .populate({
            path:'tweets',
            options: {limit:3, sort: { _id: -1 }}
        })
        .exec()
        .then(res => {
            if(res.length > 0)
            {
                socket.emit('info_catego', res); //ENVIO LOS DATOS DE LA CATEGORIA
                Tweet.countDocuments({categoria:res[0]._id})
                .exec()
                .then(c => {
                    socket.emit('cantidad_tweets', c);
                })
                .catch(err => {
                    console.log(err);
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    });
});