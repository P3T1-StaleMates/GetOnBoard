const db = require('../config/connection');
const { Player, Event, Game } = require('../models');
const playerSeeds = require('./playerSeeds.json');
const gameSeeds = require('./gameSeeds.json');

db.once('open', async () => {
  try {

    let playerIds = []

    for (let i = 0; i < playerSeeds.length; i++) {
      const { _id } = await Player.create(playerSeeds[i]);
      playerIds.push(_id);

    }

    console.log(playerIds);
    console.log("Players successfully seeded.")

    for (let i = 0; i < playerIds.length; i++) {
      const updatedPlayer = await Player.findOneAndUpdate(
        { _id: playerIds[i] },
        {
          $addToSet: {
            friends: playerIds,
          },
        }
      )
    }

    console.log("Everyone are friends!")

    let gameIds =[]

    for (let i = 0; i < gameSeeds.length; i++) {
      const { _id } = await Game.create(gameSeeds[i]);
      gameIds.push(_id);
    }

    console.log("Games added to db.")

    for (let i = 0; i < playerIds.length; i++) {
      const updatedPlayer = await Player.findOneAndUpdate(
        { _id: playerIds[i] },
        {
          $addToSet: {
            ownedGames: gameIds,
          },
        }
      )
    }

    console.log("All games added to everyone.")


  } catch (err) {
    throw err;
  }
  console.log('all done!');
  process.exit(0);
});
