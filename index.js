const express = require('express')
const app = express()
app.use(express.json())
const characters = [{
        id: 1,
        name: "Harry poter",
        spacies: "Human",
        house: "Gryffindor",
        actor: "Daniel Redcliffe"
    },
    {
        id: 2,
        name: "Hermione",
        spacies: "Human",
        house: "Gryffindor",
        actor: "Ema Watson"
    }
]

app.get('/', (req, res) => {
    res.send(characters.filter(Boolean));
})

app.post("/character", (req, res) => {
    const character = req.body

    character.id = characters.length + 1
    characters.push(character)

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