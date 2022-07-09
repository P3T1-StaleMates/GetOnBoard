// First check database for game using game query. Call this function otherwise
export function gameSearch(searchTerm) {
    // If game does not exist in current database, fetch with the Board Game Atlas API
    let apiCall = `https://api.boardgameatlas.com/api/search?name=${searchTerm}&limit=5&client_id=${process.env.REACT_APP_API_KEY}`;

    fetch(apiCall)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // Grab the data.games from API
            let newGameData = [];
            data.games.forEach((game) => {
                let averageTime = (game.min_playtime + game.max_playtime)/2
                
                let newGame = {
                    title: game.name,
                    description: game.description,
                    averageTime: averageTime,
                    minPlayers: game.min_players,
                    maxPlayers: game.max_players,
                    imageUrl: game.images.medium || game.images.original,
                };
                newGameData.push(newGame);
            });
            return newGameData;
        });
};