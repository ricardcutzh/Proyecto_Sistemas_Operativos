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
                //user.save();
            }
            else
            {
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
                    }
                    else
                    {
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
                    user.tweets.push(tweet._id);
                    catego.tweets.push(tweet._id);
                    user.save();
                    catego.save();
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
// db.usuarios.aggregate([{$project:{usuario:1,tweets:{$size:"$tweets"}}},{$sort:{tweets:-1}},{$limit:1}])