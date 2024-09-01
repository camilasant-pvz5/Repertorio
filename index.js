const express = require("express"); 
const app = express(); 
const fs = require("fs");
const port = 3000;

app.listen(port, () => console.log("Servidor escuchado en puerto 3000"));

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/canciones", (req, res) => {
    const newCancion = JSON.parse(fs.readFileSync("repertorio.json"));
    res.json(newCancion);
});

app.post("/canciones", (req, res) => {
    const cancion = req.body;
    const newCancion = JSON.parse(fs.readFileSync("repertorio.json"));
    newCancion.push(cancion);
    fs.writeFileSync("repertorio.json", JSON.stringify(newCancion));
    res.send("Nueva canción agregada");
    });

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params
    const repertorio = JSON.parse(fs.readFileSync("repertorio.json"))
    const index = repertorio.findIndex(p => p.id == id)
    repertorio.splice(index, 1)
    fs.writeFileSync("repertorio.json", JSON.stringify(repertorio))
    res.send("Canción eliminada con éxito")
    })
    
    app.put("/canciones/:id", (req, res) => {
        const { id } = req.params
        const cancion = req.body
        const repertorio = JSON.parse(fs.readFileSync("repertorio.json"))
        const index = repertorio.findIndex(p => p.id == id)
        repertorio [index] = cancion
        fs.writeFileSync("repertorio.json", JSON.stringify(repertorio))
        res.send("Canción modificada con éxito")
        }); 