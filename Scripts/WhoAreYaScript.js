document.addEventListener('DOMContentLoaded', () => {

    let guesses = 0;

    const paragraph = document.getElementById('guessesAmount')

    paragraph.textContent = `GUESS ${guesses} OF 8`
    
    const input = document.getElementById('text-input')

    // GuessedPlayerInfo mm
    const guessedPlayerName = document.getElementById('playerName');
    const guessedPlayerShirtNumber = document.getElementById('shirtNumber')
    const guessedPlayerAge = document.getElementById('playerAge')
    const guessedPlayerCountry = document.getElementById('playerCountry')
    const guessedPlayerClub = document.getElementById('club')
    const guessedPlayerPosition = document.getElementById('position')


    let randomPlayer = {}
    const playerInfo = {}

    async function fetchPlayers() {
        try {
            const res = await fetch('/api/players');
            const data = await res.json();
    
            const datalist2 = document.getElementById('allPlayers');
    
            data.forEach(playerObject => {
                playerInfo[playerObject.playerName] = playerObject;
                const option = document.createElement('option');
                option.value = playerObject.playerName;
                datalist2.appendChild(option);
            });
    
            const random = data[Math.floor(Math.random() * data.length)];
            console.log(random);
            randomPlayer = random;
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    }

    fetchPlayers();

        input.addEventListener('input', () => {
            const selectedPlayer = input.value

            if(playerInfo[selectedPlayer]) {
                const playerData = playerInfo[selectedPlayer]

                // Tjek navn
                if (playerData.playerName != randomPlayer.playerName) {
                    guessedPlayerName.value = playerData.playerName
                    guessedPlayerName.style.color = "red"
                } else {
                    guessedPlayerName.value = playerData.playerName
                    guessedPlayerName.style.color = "green"
                    gameWon()
                    return
                }

                // Tjek trøjenummer
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

                // Tjek alder
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

                // Tjek land
                if (playerData.playerCountry != randomPlayer.playerCountry) {
                    guessedPlayerCountry.value = playerData.playerCountry
                    guessedPlayerCountry.style.color = "red"
                } else {
                    guessedPlayerCountry.value = playerData.playerCountry
                    guessedPlayerCountry.style.color = "green"
                }
                
                // Tjek klub
                if (playerData.club != randomPlayer.club) {
                    guessedPlayerClub.value = playerData.club
                    guessedPlayerClub.style.color = "red"
                } else {
                    guessedPlayerClub.value = playerData.club
                    guessedPlayerClub.style.color = "green"
                }

                // Tjek position
                // TODO Clean up i den kode her.
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
                input.value = ""
                input.placeholder = ""
                gameLost()

            }

        });
        function gameLost() {
            if (guesses >= 8) {
                const userResponse = confirm(`Unlucky! The random player was: ${randomPlayer.playerName} from ${randomPlayer.club}! Do you want to play again? [OK] or go to homepage? [CAncel]`)
                if (userResponse) {
                    location.reload(); 
                    guessedPlayerAge.value = "";
                    guessedPlayerClub.value = "";
                    guessedPlayerCountry.value = "";
                    guessedPlayerName.value = "";
                    guessedPlayerPosition.value = "";
                    guessedPlayerShirtNumber.value = "";
                    input.value = "";
                } else {
                    window.location.href = '/'; 
                    guessedPlayerAge.value = "";
                    guessedPlayerClub.value = "";
                    guessedPlayerCountry.value = "";
                    guessedPlayerName.value = "";
                    guessedPlayerPosition.value = "";
                    guessedPlayerShirtNumber.value = "";
                    input.value = "";
                }
            }
        }

        function gameWon() {
            const userResponse = confirm("Congratulations, you won the game! Would you like to play again [OK] or go to homepage [Cancel]?");
            if (userResponse) {
                location.reload(); 
                guessedPlayerAge.value = "";
                guessedPlayerClub.value = "";
                guessedPlayerCountry.value = "";
                guessedPlayerName.value = "";
                guessedPlayerPosition.value = "";
                guessedPlayerShirtNumber.value = "";
                input.value = "";
            } else {
                window.location.href = '/'; 
                guessedPlayerAge.value = "";
                guessedPlayerClub.value = "";
                guessedPlayerCountry.value = "";
                guessedPlayerName.value = "";
                guessedPlayerPosition.value = "";
                guessedPlayerShirtNumber.value = "";
                input.value = "";
            }
        }
});

