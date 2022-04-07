require("dotenv").config()

const express = require('express')
const app = express()
const mongoose = require("mongoose")
const Character = require("./models/character")

const port = process.env.PORT || 3000;

try{
    mongoose.connect(
        process.env.DATABASE_URI,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    console.log("Banco de dados conectado");
}catch(err) {
    console.log(`Erro ao conectar no banco de dados ${err}`)
}

app.use(express.json())


app.get('/characters', async (req, res) => {
    const characters = await Character.find()

    if(characters.length === 0){
        return res.status(400).send({message: "não existe personagem cadrastrado"})
    }

    res.send(characters.filter(Boolean));
});

app.get("/character/:id", async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).send({message: "Id invalido"});
        return;
    }

    const character = await Character.findById(id);

    if(!character){
        return res.status(404).send({message: "personagem não encontrado"})
    }
    
    res.send(character)
})

app.post("/character", async (req, res) => {
    const {name, species, house, actor} = req.body

    if(!name || !species || !house || !actor){
        res.status(400).send({message: "Você não enviu todos os dados necessessario"})
        return;
    }

    const character = await new Character({
        name,
        species,
        house,
        actor,
    })

    await character.save()

    res.send({
        message: "Personagem criado com sucesso"
    })
})



app.put("/character/:id", async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).send({message: "Id invalido"});
        return;
    }

    const character = await Character.findById(id);

    if(!character){
        return res.status(404).send({message: "personagem não encontrado"})
    }

    const {name, species, house, actor} = req.body;

    if(!name || !species || !house || !actor){
        res.status(400).send({message: "Você não enviu todos os dados necessessario"})
        return;
    }

    character.name = name;
    character.house = house;
    character.house = house;
    character.actor = actor;

    await character.save()

    res.send({message: `Personagem salvo com sucesso ${character}`})
})

app.delete("/character/:id", async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).send({message: "Id invalido"});
        return;
    }

    const character = await Character.findById(id)

    await character.remove()

    if (!character){
        return res.status(404).send({ message: "Esse personagem não existe"})
    }

    res.send({
        message: "personagem apagado com sucesso"
    })
})

app.listen(port, () => {
    console.log(`Servidor Rodando http://localhost:3000 ${port}`)
})