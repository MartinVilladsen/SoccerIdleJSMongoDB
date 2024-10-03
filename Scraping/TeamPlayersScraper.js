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
    
    // Loop through each row in the table
    $('tr').each((i, row) => {
        // Find the shirt number
        const shirtNumberStr = $(row).find('div.rn_nummer').text().trim();
        const shirtNumber = parseInt(shirtNumberStr); // Convert

        // Find the player name
        const playerName = $(row).find('td.hauptlink a').text().trim().split('€')[0].trim();

        // Find the age
        const ageText = $(row).find('td.zentriert').eq(1).text().trim(); // Assuming age is in the first 'zentriert' cell
        const playerAgeStr = ageText.split(',')[0].trim();
        const playerAge = parseInt(playerAgeStr); // Convert


        // Find the country
        const playerCountry = $(row).find('td.zentriert img').attr('title');

        // Traverse to the next td that contains the position
        const positionCell = $(row).find('td').eq(1);
        let position = positionCell.text().trim();

        // GPT: Clean the position text (removing player name and extra whitespace)
        position = position.replace(/\s+/g, ' ').replace(playerName, '').trim();

        // Add to array if values are true
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

    // Save the data to a JSON file
    fs.writeFile(teamPlayerData, JSON.stringify(playersData, null, 2), (err) => {
        if (err) throw err;
        console.log('File successfully saved');
    });
});
