
function getUsuarioPage(req, res)
{
    console.log('GET: /usuarios');
    res.render('usuarios');
}

module.exports = {
    getUsuarioPage
}