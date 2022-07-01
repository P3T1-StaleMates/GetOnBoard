const { Schema, model } = require('mongoose');

const groupSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        admin: {
            type: Schema.Types.ObjectId,
            ref: 'Player',
        },
        // A group can have many members
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Player',
            },
        ],
        // A group can have many events
        events: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Event',
            },
        ],
        // theme: {
        //     type: String,
        //     default: "defaultTheme",
        // },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// Virtual property of games owned by the group
groupSchema.virtual('groupGames').get(function () {
    let groupGames = [];
    this.members.forEach(ownedGames => {
        for (let i = 0; i < ownedGames.length; i++) {
            groupGames.push(ownedGames[i])
        }
    });
    return groupGames
})

const Group = model('Group', groupSchema);

module.exports = Group;