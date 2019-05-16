const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    alias: String,
    nombre: String,
    tweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    }]
});

module.exports = mongoose.model('Usuario', UsuarioSchema);