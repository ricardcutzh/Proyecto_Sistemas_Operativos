const mongoose = require('mongoose');

const TweetSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: String,
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }
})

module.exports = mongoose.model('Tweet', TweetSchema);