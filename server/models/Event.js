const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    // Array of Players
    players: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Player',
        },
    ],
    location: {
        type: String,
        required: true,
    },
    // Need to convert to 
    date: {
        type: Date,
        required: true,
    },
    // An event requires a game to be played
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
    },
    // A game played has a winner or an array of winners (for ties)
    winner: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Player',
        },
    ],
});

const Event = model('Event', eventSchema);

module.exports = Event;