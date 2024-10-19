const mongoose = require('mongoose')

const Genero = mongoose.model('Genero',{
    descricao: String,
    nomeGenero: String,
})

module.exports = Genero;