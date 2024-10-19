const mongoose = require('mongoose')

const Usuario = mongoose.model('Usuario',{
    nome: String,
    idade: Number,
    dataNascimento: Date,
    cpf: Number,
    valorAssinatura: Number,
    dataAssinatura: Date,
    email: String,
    senha: String,
  })

module.exports = Usuario;