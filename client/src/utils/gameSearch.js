// First check database for game using game query. Call this function otherwise
const gameSearch = async (searchTerm, setGameData) => {
  // If game does not exist in current database, fetch with the Board Game Atlas API
  let apiCall = `https://api.boardgameatlas.com/api/search?name=${searchTerm}&limit=6&client_id=${process.env.REACT_APP_API_KEY}`;

  try {
    const response = await fetch(apiCall);
    const data = await response.json();
    console.log("Inside API: ", data);
    let newGameData = data.games.map((game) => {
      // Grab the data.games from API
      let averageTime = (game.min_playtime + game.max_playtime) / 2;

      let newGame = {
        gameId: game.id,
        title: game.name,
        description: game.description,
        averageTime: averageTime,
        minPlayer: game.min_players,
        maxPlayer: game.max_players,
        imageUrl: game.images.medium || game.images.original,
      };
      return newGame;
    });
    setGameData(newGameData);
  } catch (error) {
    console.log(error);
  }
};

export default gameSearch;
