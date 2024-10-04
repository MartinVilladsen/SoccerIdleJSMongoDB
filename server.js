const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('dotenv').config(); // Load from password.env

mongoose.connect(process.env.MONGO_URI);

const playerSchema = new mongoose.Schema({
    shirtNumber: Number,
    playerName: String,
    playerAge: Number,
    playerCountry: String,
    position: String
});

const teamSchema = new mongoose.Schema({
    teamName: String,
    players: [playerSchema]
});

const Teams = mongoose.model('teams', teamSchema);

app.use(express.static(path.join(__dirname)));

app.get('/api/teams/:teamName', async (req, res) => {
    const {teamName} = req.params
    console.log(teamName);
    try {
        const teams = await Teams.find({teamName: `${teamName}`});
        res.json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/:teamName', async (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'TeamPlayers.html'));
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'homepage.html'))
});

app.get('/LiverpoolPlayers', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'TeamPlayers.html'));
});


app.listen(3001, () => {
    console.log(`Serveren kører på http://localhost:3001`);
});
