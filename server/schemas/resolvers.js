const { Player, Event, Game, Group } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // Get all Players
        players: async () => {
            return Player.find();
        },
        // Get a single player's information (to look up friends)
        player: async (parent, { username }) => {
            return Player.findOne({ username });
        },
        // Get my information(if logged in)
        me: async (parent, args, context) => {
            console.log(context);
            if (context.player._id) {
                return Player.findById(context.player._id);
            }
            throw new AuthenticationError('Not logged in')
        },
        groups: async () => {
            return Group.find();
        },
        group: async (parent, { groupId }) => {
            return Group.findOne({ _id: groupId }).populate('groupGames');
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const player = await Player.findOne({ email });

            if (!player) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await player.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(player);

            return { token, player };
        },

        addPlayer: async (parent, { name, username, email, password }) => {
            const player = await Player.create({ name, username, email, password });
            const token = signToken(player);
            return { token, player };
        },

        updatePlayer: async (parent, args, context) => {

            if (context.player.username) {
                return await Player.findByIdAndUpdate(context.player._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },

        addGame: async (parent, {name, description, genre, image, minPlayer, maxPlayer, averageTime}, context) => {

            const game = await Game.create({name, description, genre, image, minPlayer, maxPlayer, averageTime});
            console.log(game);

            const updatedPlayer = await Player.findByIdAndUpdate(context.player._id, { $addToSet: { ownedGames: game } });

            console.log(updatedPlayer)
            // returns updated player but all game info is null, console log of game shows all game information being displayed.
            return updatedPlayer;
        },

        removeGame: async (parent, { gameId }, context) => {
            console.log(gameId)

            const updatedPlayer = await Player.findByIdAndUpdate(context.player._id, { $pull: { ownedGames: gameId } });

            console.log(updatedPlayer)
            return updatedPlayer;
          },

    },
}
module.exports = resolvers;
