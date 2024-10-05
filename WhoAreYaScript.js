document.addEventListener('DOMContentLoaded', () => {

    let guesses = 0;

    const paragraph = document.getElementById('guessesAmount')

    paragraph.textContent = `GUESS ${guesses} OF 8`
    
    const input = document.getElementById('text-input')

    let randomPlayer = {}
    const playerInfo = {}

    fetch('/api/players')
        .then(res => res.json())
        .then(data => {
            const datalist2 = document.getElementById('allPlayers');

            data.forEach(playerObject => {
                playerInfo[playerObject.playerName] = playerObject;
                const option = document.createElement('option');
                option.value = playerObject.playerName;
                datalist2.appendChild(option);
            });

            const random = data[Math.floor(Math.random() * data.length)]
            console.log(random);
            randomPlayer = random
        })
        .catch(error => {
            console.error('Error fetching players:', error);
        });

        input.addEventListener('input', () => {
            const selectedPlayer = input.value

            if(playerInfo[selectedPlayer]) {
                const playerData = playerInfo[selectedPlayer]

                const guessedPlayerName = document.getElementById('playerName');
                if (playerData.playerName != randomPlayer.playerName) {
                    guessedPlayerName.value = playerData.playerName
                    guessedPlayerName.style.color = "red"
                } else {
                    guessedPlayerName.value = playerData.playerName
                    guessedPlayerName.style.color = "green"
                }

                const guessedPlayerShirtNumber = document.getElementById('shirtNumber')
                if (playerData.shirtNumber > randomPlayer.shirtNumber) {
                    guessedPlayerShirtNumber.value = `${playerData.shirtNumber} ↓`;
                    guessedPlayerShirtNumber.style.color = "red"
                } else if (playerData.shirtNumber < randomPlayer.shirtNumber) {
                    guessedPlayerShirtNumber.value = `${playerData.shirtNumber} ↑`;
                    guessedPlayerShirtNumber.style.color = "red"
                } else {
                    guessedPlayerShirtNumber.value = `${playerData.shirtNumber}`;
                    guessedPlayerShirtNumber.style.color = "green"  
                }

                const guessedPlayerAge = document.getElementById('playerAge')
                if (playerData.playerAge > randomPlayer.playerAge) {
                    guessedPlayerAge.value = `${playerData.playerAge} ↓`;
                    guessedPlayerAge.style.color = "red"
                } else if (playerData.playerAge < randomPlayer.playerAge) {
                    guessedPlayerAge.value = `${playerData.playerAge} ↑`;
                    guessedPlayerAge.style.color = "red"
                } else {
                    guessedPlayerAge.value = `${playerData.playerAge}`;
                    guessedPlayerAge.style.color = "green"  
                }

                const guessedPlayerCountry = document.getElementById('playerCountry')
                if (playerData.playerCountry != randomPlayer.playerCountry) {
                    guessedPlayerCountry.value = playerData.playerCountry
                    guessedPlayerCountry.style.color = "red"
                } else {
                    guessedPlayerCountry.value = playerData.playerCountry
                    guessedPlayerCountry.style.color = "green"
                }
                
                const guessedPlayerClub = document.getElementById('club')
                if (playerData.club != randomPlayer.club) {
                    guessedPlayerClub.value = playerData.club
                    guessedPlayerClub.style.color = "red"
                } else {
                    guessedPlayerClub.value = playerData.club
                    guessedPlayerClub.style.color = "green"
                }

                const guessedPlayerPosition = document.getElementById('position')
                const playerPosition = playerData.position;
                console.log(playerPosition);
                if (((playerData.position == "Left-Back" || playerData.position == "Right-Back" || playerData.position == "Centre-Back") 
                    && (randomPlayer.position != "Left-Back" && randomPlayer.position != "Right-Back" && randomPlayer.position != "Centre-Back"))) {
                        
                    guessedPlayerPosition.value = "Defender";
                    guessedPlayerPosition.style.color = "red";
                
                } else if ((playerData.position == "Left-Back" || playerData.position == "Right-Back" || playerData.position == "Centre-Back") 
                    && (randomPlayer.position == "Left-Back" || randomPlayer.position == "Right-Back" || randomPlayer.position == "Centre-Back")) {
                        
                    guessedPlayerPosition.value = "Defender";
                    guessedPlayerPosition.style.color = "green";
                
                } else if ((playerData.position == "Defensive Midfield" || playerData.position == "Central Midfield" || playerData.position == "Attacking Midfield") 
                    && (randomPlayer.position != "Defensive Midfield" && randomPlayer.position != "Central Midfield" && randomPlayer.position != "Attacking Midfield")) {
                        
                    guessedPlayerPosition.value = "Midfielder";
                    guessedPlayerPosition.style.color = "red";
                
                } else if ((playerData.position == "Defensive Midfield" || playerData.position == "Central Midfield" || playerData.position == "Attacking Midfield") 
                    && (randomPlayer.position == "Defensive Midfield" || randomPlayer.position == "Central Midfield" || randomPlayer.position == "Attacking Midfield")) {
                        
                    guessedPlayerPosition.value = "Midfielder";
                    guessedPlayerPosition.style.color = "green";
                
                } else if ((playerData.position == "Left Winger" || playerData.position == "Right Winger" || playerData.position == "Centre-Forward") 
                    && (randomPlayer.position != "Left Winger" && randomPlayer.position != "Right Winger" && randomPlayer.position != "Centre-Forward")) {
                        
                    guessedPlayerPosition.value = "Attacker";
                    guessedPlayerPosition.style.color = "red";
                
                } else if ((playerData.position == "Left Winger" || playerData.position == "Right Winger" || playerData.position == "Centre-Forward") 
                    && (randomPlayer.position == "Left Winger" || randomPlayer.position == "Right Winger" || randomPlayer.position == "Centre-Forward")) {
                        
                    guessedPlayerPosition.value = "Attacker";
                    guessedPlayerPosition.style.color = "green";
                
                } else if ((playerData.position == "Goalkeeper") && (randomPlayer.position != "Goalkeeper")) {
                        
                    guessedPlayerPosition.value = "Goalkeeper";
                    guessedPlayerPosition.style.color = "red";
                
                } else if ((playerData.position == "Goalkeeper") && (randomPlayer.position == "Goalkeeper")) {
                        
                    guessedPlayerPosition.value = "Goalkeeper";
                    guessedPlayerPosition.style.color = "green";
                }
                
                guesses++;
                paragraph.textContent = `GUESS ${guesses} OF 8`
                console.log(randomPlayer.playerCountry);
            }

            
        })
});

