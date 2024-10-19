const express = require('express');
const app = express();
const { default: mongoose } = require('mongoose');
const Usuario = require("./models/Usuario");
const Genero = require("./models/Genero");
const Filme = require("./models/Filme");

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//Primeira nota
app.get('/', (reg, res) => {
    res.json({ message: 'Bem-vindo ao meu servidor' })
})


//Create usuario
app.post('/usuario', async (req, res) => {
    const { nome, idade, dataNascimento, cpf, valorAssinatura, dataAssinatura, email, senha } = req.body

    const usuario = {
        nome,
        idade,
        dataNascimento,
        cpf,
        valorAssinatura,
        dataAssinatura,
        email,
        senha,
    }

    try {
        await Usuario.create(usuario)
        res.status(200).json({ message: "Pessoa inserida no sistema" })
    } catch (error) {
        res.status(500).json({ erro: error })
    }

})

//Create Filme
app.post('/filme', async (req, res) => {
    const { nomeFilme, anoLancamento, pais, usuario ,genero } = req.body

    const filme = {
        nomeFilme,
        anoLancamento,
        pais,
        usuario,
        genero,
    }

    try {
        await Filme.create(filme)
        res.status(200).json({ message: "Pessoa inserida no sistema" })
    } catch (error) {
        res.status(500).json({ erro: error })
    }

})


//Create genero
app.post('/genero', async (req, res) => {
    const { descricao, nomeGenero } = req.body

    const genero = {
        descricao,
        nomeGenero,
    }

    try {
        await Genero.create( genero)
        res.status(200).json({ message: "Pessoa inserida no sistema" })
    } catch (error) {
        res.status(500).json({ erro: error })
    }

})

//Read usuario
app.get("/usuario", async (req, res) => {
    try {
        const assinante = await Usuario.find()
        res.status(200).json({ assinante })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})


//Read filme
app.get("/fime",async(req,resp)=>{
    try {
        const flme = await Filme.find().populate('usuario','genero');

        const resultado = filme.map(filme => ({
            _id: filme._id,
            nomeFilme: filme.nomeFilme,
            anoLancamento: filme.anoLancamento,
            pais: filme.pais,
            usuario: filme.usuario.nome,
            genero: filme.genero.nomeGenero
            }));
            res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao ler Filmes.'});
    }
})

//Read genero
app.get("/genero", async (req, res) => {
    try {
        const generoFilme = await Genero.find()
        res.status(200).json({generoFilme})
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})


//Read by id usuario
app.get("/usuario/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const assinante = await Usuario.findOne({ _id: id })

        if (!assinante) {
            res.status(422).json({ message: "Usuário não encontrado!" })
            return
        }

        res.status(200).json(assinante)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//Read by id filme
app.get("/filme/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const buscaFilme = await Filme.findOne({ _id: id })

        if (!buscaFilme) {
            res.status(422).json({ message: "Filme não encontrado!" })
            return
        }

        res.status(200).json(buscaFilme)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//Read by id genero
app.get("/genero/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const buscaGenero = await Filme.findOne({ _id: id })

        if (!buscaGenero) {
            res.status(422).json({ message: "Genero não encontrado!" })
            return
        }

        res.status(200).json(buscaGenero)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//Update
app.patch("/usuario/:id", async (req, res) => {
    const id = req.params.id

    const { nome, idade, dataNascimento, cpf, valorAssinatura, dataAssinatura, email, senha  } = req.body

    const usuario = {
        nome,
        idade,
        dataNascimento,
        cpf,
        valorAssinatura,
        dataAssinatura,
        email,
        senha
    }

    try {
        const updateUsuario = await Usuario.updateOne({ _id: id }, usuario)

        if (updateUsuario.matchedCount === 0) {
            res.status(422).json({ message: "Usuário não encontrado!" })
            return
        }
        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//update filme
app.patch("/filme/:id", async (req, res) => {
    const id = req.params.id

    const { nomeFilme, anoLancamento, pais, usuario ,genero } = req.body
 
        const filme = {
            nomeFilme,
            anoLancamento,
            pais,
            usuario,
            genero,
        }
    
    try {
        const updateFilme = await Filme.updateOne({ _id: id }, filme)

        if (updateFilme.matchedCount === 0) {
            res.status(422).json({ message: "Filme não encontrado!" })
            return
        }
        res.status(200).json(filme)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})


//update genero
app.patch("/filme/:id", async (req, res) => {
    const id = req.params.id

    const { descricao, nomeGenero } = req.body
 
    const genero = {
        descricao,
        nomeGenero,
    }
    
    try {
        const updateGenero = await Genero.updateOne({ _id: id }, genero)

        if (updateGenero.matchedCount === 0) {
            res.status(422).json({ message: "Genero não encontrado!" })
            return
        }
        res.status(200).json(genero)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})



//Delete usuario
app.delete("/usuario/:id", async (req, res) => {
    const id = req.params.id

    const assinante = await Usuario.findOne({ _id: id })

    if (!assinante) {
        res.status(422).json({ message: "Usuário não encontrado!" })
        return
    }

    try {
        await Usuario.deleteOne({ _id: id })
        res.status(200).json({ message: "Usuário Removido com sucesso !" })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})


//Delete filme
app.delete("/filme/:id", async (req, res) => {
    const id = req.params.id

    const apagaFilme = await Filme.findOne({ _id: id })

    if (!apagaFilme) {
        res.status(422).json({ message: "Filme não encontrado!" })
        return
    }

    try {
        await Filme.deleteOne({ _id: id })
        res.status(200).json({ message: "Filme Removido com sucesso !" })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//Delete genero
app.delete("/genero/:id", async (req, res) => {
    const id = req.params.id

    const apagaGenero = await Genero.findOne({ _id: id })

    if (!apagaGenero) {
        res.status(422).json({ message: "Genero não encontrado!" })
        return
    }

    try {
        await Genero.deleteOne({ _id: id })
        res.status(200).json({ message: "Genero Removido com sucesso !" })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})



mongoose.connect('mongodb://localhost:27017').then(() => {
    console.log('uhuul, conctamos')
    app.listen(3000)
}).catch((err) => {
    console.log('Erro ao conectar ao banco de dados: ' + err)
})