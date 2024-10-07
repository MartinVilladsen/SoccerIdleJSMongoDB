const positions = ["ST", "RW", "LW", "CM", "CM", "CM", "RB", "CB", "CB", "LB", "GK"];

document.addEventListener('DOMContentLoaded', () => {
    const datalist = document.getElementById('allPlayers');
    const tableBody = document.getElementById('table-body-Eleven');

    for (const position of positions) {
        const row = document.createElement('tr');

        const playerPosition = document.createElement('td');
        playerPosition.textContent = position;
        row.appendChild(playerPosition);
        
        // Todo Fiks datalink
        const playerSearch = document.createElement('td');
        const searchInput = document.createElement('input');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('list', 'allPlayers');
        playerSearch.appendChild(searchInput);
        row.appendChild(playerSearch);
    
        const playerName = document.createElement('td');
        searchInput.addEventListener('change', () => {
            playerName.textContent = searchInput.value;
        });
        row.appendChild(playerName);
    
        const removeButton = document.createElement('td');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener('click', () => {
            row.remove();
        });
        removeButton.appendChild(removeBtn);
        row.appendChild(removeButton);
    
        tableBody.appendChild(row);  
    }

    async function fetchTeams() {
        try {
            const res = await fetch('/api/teams');
    
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
    
            const teams = await res.json();
            const datalist = document.getElementById('datalist');
    
            datalist.innerHTML = '';
    
            teams.forEach(team => {
                team.players.forEach(player => {
                    const option = document.createElement('option');
                    option.value = player.playerName;
                    datalist.appendChild(option);
                });
            });
    
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    }
    
    fetchTeams();
    
});
