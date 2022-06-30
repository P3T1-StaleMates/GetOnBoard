const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
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
            ref: 'User',
        },
    ],
});

const Event = model('Event', eventSchema);

module.exports = Event;