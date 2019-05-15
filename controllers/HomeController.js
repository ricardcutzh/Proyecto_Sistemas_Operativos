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

module.exports = {
    prueba,
    Home
}