// First check database for game using game query. Call this function otherwise
export function gameSearch(game) {
    // If game does not exist in current database, fetch with the Board Game Atlas API
    apiCall = `https://api.boardgameatlas.com/api/search?name=${game}&limit=5&client_id=${process.env.REACT_APP_API_KEY}`;

    fetch(apiCall)
        .then(res => res.jsonO())
        .then(data => {
            console.log(data);
            return data;
        });
};