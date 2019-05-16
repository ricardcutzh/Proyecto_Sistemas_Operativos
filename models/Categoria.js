const mongoose = require('mongoose');

const CategoriaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: String,
    tweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    }]
});

module.exports = mongoose.model('Categoria', CategoriaSchema);