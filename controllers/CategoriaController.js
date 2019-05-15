
function getCategoriaPage(req, res)
{
    console.log('GET: /categorias');
    res.render('categorias');
}

module.exports = {
    getCategoriaPage
}