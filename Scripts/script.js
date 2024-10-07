document.addEventListener('DOMContentLoaded', async () => {
    const url = window.location.pathname;

    try {
        const res = await fetch(`/api/teams${url}`);

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const teams = await res.json();
        const tableBody = document.getElementById('teams-body');

        tableBody.innerHTML = '';

        teams.forEach(team => {
            team.players.forEach(player => {
                const row = document.createElement('tr');

                const teamCell = document.createElement('td');
                teamCell.textContent = team.teamName;
                row.appendChild(teamCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = player.playerName;
                row.appendChild(nameCell);

                const shirtCell = document.createElement('td');
                shirtCell.textContent = player.shirtNumber;
                row.appendChild(shirtCell);

                const positionCell = document.createElement('td');
                positionCell.textContent = player.position;
                row.appendChild(positionCell);

                const ageCell = document.createElement('td');
                ageCell.textContent = player.playerAge;
                row.appendChild(ageCell);

                const countryCell = document.createElement('td');
                countryCell.textContent = player.playerCountry;
                row.appendChild(countryCell);

                tableBody.appendChild(row);
            });
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
