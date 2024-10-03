const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://martinkvilladsen:cqGafMc1BtZqHEIj@socceridle.vxc4x.mongodb.net/SoccerIdleDB');

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

const Team = mongoose.model('teams', teamSchema)

const url = "https://www.premierleague.com/tables";

const premTeams = [];

// Define path to the JSON file

let index = 0;
let getPlayersTeam = [
    'TeamPlayerJSON\\LiverpoolPlayers.json', 
    'TeamPlayerJSON\\ManchesterCityPlayers.json',
    'TeamPlayerJSON\\ArsenalPlayers.json', 
    'TeamPlayerJSON\\ChelseaPlayers.json',
    'TeamPlayerJSON\\AstonVillaPlayers.json',
    'TeamPlayerJSON\\FulhamPlayers.json', 
    'TeamPlayerJSON\\NewcastlePlayers.json',
    'TeamPlayerJSON\\TottenhamPlayers.json',
    'TeamPlayerJSON\\BrightonPlayers.json',
    'TeamPlayerJSON\\NottinghamForestPlayers.json',
    'TeamPlayerJSON\\BournemouthPlayers.json',
    'TeamPlayerJSON\\BrentfordPlayers.json',
    'TeamPlayerJSON\\ManchesterUnitedPlayers.json', 
    'TeamPlayerJSON\\WestHamPlayers.json',
    'TeamPlayerJSON\\IpswichPlayers.json',
    'TeamPlayerJSON\\EvertonPlayers.json', 
    'TeamPlayerJSON\\LeicesterPlayers.json',
    'TeamPlayerJSON\\CrystalPalacePlayers.json', 
    'TeamPlayerJSON\\SouthhamptonPlayers.json',
    'TeamPlayerJSON\\WolverhamptonPlayers.json'
]


// Function to read players from JSON
const getPlayers = () => {
    if (index >= getPlayersTeam.length) return []
    const playersData = JSON.parse(fs.readFileSync(getPlayersTeam[index], 'utf-8'));
    return playersData;
};

async function getHTML() {
    const { data: html} = await axios.get(url)
    return html;
}

getHTML().then(async (res) => {
    const $ = cheerio.load(res);

    $('tr').each((i, row) => {
        // Find team name
        const teamName = $(row).find('span.league-table__team-name.league-table__team-name--long.long').text().trim();
        console.log(teamName);
        if (teamName && !premTeams.some(team => team.teamName === teamName)) {
            // Filter players for the current team
            console.log(getPlayersTeam[index]);
            const players = getPlayers(); 
            index++;

            premTeams.push({
                teamName,
                players
            });
        }
    });

    fs.writeFile('premTeams.json', JSON.stringify(premTeams, null, 2), (err) => {
        if (err) throw err;
        console.log('File successfully saved');
    });

    // Save teams to MongoDB
    await Team.insertMany(premTeams);
    console.log('Teams successfully saved to MongoDB');
}).catch(err => {
    console.error('Error fetching the HTML:', err);
});


/** 

getHTML().then((res) => {
    const $ = cheerio.load(res)

    $('tr').each((i, row) => {
        // Find team name
        const teamName = $(row).find('td.hauptlink.no-border-links a').attr('title');

        // Cursed kode, havde problemer med dubletter i min JSON fil
        if (teamName && !premTeams.some(team => team.teamName === teamName)) {
            premTeams.push({
                teamName
            });
        }
    });

    fs.writeFile('PremTeams.json', JSON.stringify(premTeams, null, 2), (err) => {
        if (err) throw err;
        console.log('File successfully saved');
    });
});
*/