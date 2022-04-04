const express = require('express')
const app = express()
const mongoose = require("mongoose")
const Character = require("./models/character")


try{
    mongoose.connect(
        "mongodb+srv://root:admin123@cluster0.8tnr9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    console.log("Banco de dados conectado");
}catch(err) {
    console.log(`Erro ao conectar no banco de dados ${err}`)
}

app.use(express.json())


app.get('/', (req, res) => {
    res.send(characters.filter(Boolean));
});

app.post("/character", async (req, res) => {
    const {name, species, house, actor} = req.body

    if(!nome || !species || !house || !actor){
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

app.get("/character/:id", (req, res) => {
    const id = +req.params.id;
    const character = characters.find((c) => c.id === id);

    if (!character) {
        res.status(404).send({
            message: "Personagem não existe"
        })
        return;
    }
    res.send(character)
})

app.put("/character/:id", (req, res) => {
    const id = +req.params.id;
    const character = characters.find((c) => c.id === id);

    if (!character) {
        res.status(404).send({
            message: "Personagem não existe"
        })
        return;
    }

    const {
        name,
        actor
    } = req.body

    character.name = name
    character.actor = actor

    res.send(character)
})

app.delete("/character/:id", (req, res) => {
    const id = +req.params.id;
    const character = characters.find((c) => c.id === id);

    if (!character) {
        res.status(404).send({
            message: "Personagem não existe"
        })
        return;
    }

    const indexCharacter = characters.indexOf(character);
    delete characters[indexCharacter];

    res.send({
        message: "personagem apagado com sucesso"
    })
})

app.listen(3000, () => {
    console.log("Servidor Rodando http://localhost:3000")
})