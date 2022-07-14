const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
  gameId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    // trim: true,
  },
  description: {
    type: String,
  },
  genre: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  minPlayer: {
    type: Number,
    required: true,
    min: 1,
  },
  maxPlayer: {
    type: Number,
    required: true,
    min: 1,
  },
  // If only one time given. Use max time if a range is pulled from API
  averageTime: {
    type: Number,
    required: true
  },
});

const Game = model('Game', gameSchema);

module.exports = Game;