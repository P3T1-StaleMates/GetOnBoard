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
            ref: 'Event',
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

const Group = model('Group', groupSchema);

module.exports = Group;