const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  // A user can own many games
  ownedGames: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Game',
    },
  ],
  // A user can have many events
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
  // A user can belong to many groups
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Group',
    },
  ],
  // A user can have many friends
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Player',
    },
  ],
  // A user can have many posts
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  // theme: {
  //     type: String,
  //     default: "defaultTheme",
  // },
});

// Hash user password
playerSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 11;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Compare the incoming password with the hashed password
playerSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Player = model('Player', playerSchema);

module.exports = Player;
