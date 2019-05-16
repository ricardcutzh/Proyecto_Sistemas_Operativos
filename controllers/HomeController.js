/** IMPORTANDO MODELO **/
const Usuario = require('../models/Usuario');
const Categoria = require('../models/Categoria');
const Tweet = require('../models/Tweet');
const mongoose = require('mongoose');
/** FUNCION QUE ME RETORNA LA VISTA PRUEBAS **/
function prueba(req, res)
{
    console.log('Retornando vista de prueba');
    res.render('usuarios');
}

/** FUNCION QUE ME RETORNA LA VISTA PRINCIPAL **/
function Home(req, res)
{
    console.log('GET: /');
    res.render('home');
}

function saveTweets(req, res)
{
    console.log('POST: /Tweets');
    var alias = req.body.alias;
    var nombre = req.body.nombre;
    var txt = req.body.txt;
    var categoria = req.body.categoria;
    // VERIFICANDO USUARIO
    Usuario.find({alias:alias})
        .exec()
        .then(docs => {
            var user;
            if(docs.length == 0)
            {
                user = new Usuario({
                    _id: mongoose.Types.ObjectId(),
                    alias: alias,
                    nombre: nombre,
                    tweets: []
                });
                //console.log('usuario nuevo...');
                console.log(user._id);
                user.save();
            }
            else
            {
                //console.log('usuarios existentes');
                console.log(docs[0]);
                user = docs[0];
            }
            //ENCONTRANDO LA CATEGORIA
            Categoria.find({nombre:categoria})
                .exec()
                .then(cates =>{
                    var catego;
                    if(cates.length == 0)
                    {
                        catego = new Categoria({
                            _id: mongoose.Types.ObjectId(),
                            nombre: categoria,
                            tweets: []
                        });
                        //console.log("categoria nueva...");
                        console.log(catego._id);
                        catego.save();
                    }
                    else
                    {
                        //console.log("categoria existente...");
                        console.log(cates[0]);
                        catego = cates[0];
                    }
                    var tweet = new Tweet({
                        _id: mongoose.Types.ObjectId(),
                        text: txt,
                        usuario: user._id,
                        categoria: catego._id
                    });
                    tweet.save();
                    res.status(200).json({
                        respuesta:1
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        respuesta:0
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                respuesta:0
            });
        });
}

module.exports = {
    prueba,
    Home,
    saveTweets
}