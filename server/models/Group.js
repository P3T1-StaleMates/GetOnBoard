const { Schema, model } = require('mongoose');

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    // A group can have many members
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
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
});

// Virtual property of games owned by the group

const Group = model('Group', groupSchema);

module.exports = Group;