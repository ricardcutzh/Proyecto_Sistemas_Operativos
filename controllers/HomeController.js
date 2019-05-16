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
    
    console.log(alias);
    res.json({
        respuesta:1
    });
}

module.exports = {
    prueba,
    Home,
    saveTweets
}