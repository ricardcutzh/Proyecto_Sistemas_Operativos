const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    alias: String,
    nombre: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);