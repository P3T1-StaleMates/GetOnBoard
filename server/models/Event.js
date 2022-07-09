const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Player',
        },
        eventName: {
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
        eventGames: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Game',
            }
        ],
        // A game played has a winner or an array of winners (for ties)
        winner: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Player',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

eventSchema.virtual('groupGames').get(function () {
    let groupGames = [];
    this.players.forEach(ownedGames => {
        for (let i = 0; i < ownedGames.length; i++) {
            groupGames.push(ownedGames[i])
        }
    });
    return groupGames
})

const Event = model('Event', eventSchema);

module.exports = Event;