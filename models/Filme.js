const mongoose = require('mongoose')

const Filme = mongoose.model('Filme',{
    nomeFilme: String,
    anoLancamento: Date,
    pais: String,
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Usuario"
    },
    genero:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Genero" 
    }
    
})

module.exports = Filme;