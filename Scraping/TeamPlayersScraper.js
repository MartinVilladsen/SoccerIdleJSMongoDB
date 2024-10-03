const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


// Indsæt transfermarkt URL for dit hold. Ex:
// https://www.transfermarkt.com/fc-liverpool/startseite/verein/31
const url = "https://www.transfermarkt.com/ipswich-town/startseite/verein/677/saison_id/2024";

// Ændre navnet på teamPlayerData: F.eks: liverpoolPlayerData.json
const teamPlayerData = 'IpswichPlayers.json'


const playersData = [];

async function getHTML() {
    const { data: html } = await axios.get(url);
    return html;
}

getHTML().then((res) => {
    const $ = cheerio.load(res);
    
    // Loop igennem hver row i table
    $('tr').each((i, row) => {
        // Find trøjenummer
        const shirtNumberStr = $(row).find('div.rn_nummer').text().trim();
        const shirtNumber = parseInt(shirtNumberStr); 

        // Find spillerens navn
        const playerName = $(row).find('td.hauptlink a').text().trim().split('€')[0].trim();

        // Find alderen - Virker kun nogle gange, skal fikses
        const ageText = $(row).find('td.zentriert').eq(1).text().trim();
        const playerAgeStr = ageText.split(',')[0].trim();
        const playerAge = parseInt(playerAgeStr); 


        // Find spillerens hjemland
        const playerCountry = $(row).find('td.zentriert img').attr('title');

        // Find spillerens position
        const positionCell = $(row).find('td').eq(1);
        let position = positionCell.text().trim();

        // Noget regex kode af GPT til at få det til at se pænt ud
        position = position.replace(/\s+/g, ' ').replace(playerName, '').trim();

        // Tilføj spilleren til playersData arrayet hvis værdierne eksisterer
        if (shirtNumber && playerName && position) {
            playersData.push({
                shirtNumber,
                playerName,
                playerAge,
                playerCountry,
                position
            });
        }
    });

    // Gem data til JSON fil
    fs.writeFile(teamPlayerData, JSON.stringify(playersData, null, 2), (err) => {
        if (err) throw err;
        console.log('File successfully saved');
    });
});
