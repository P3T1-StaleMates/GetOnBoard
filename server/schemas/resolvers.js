const { Player, Event, Game, Group } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // Get all Players
        players: async () => {
            return Player.find();
        },
        // Get a single player's information (to look up friends by username)
        player: async (parent, { username }) => {
            return Player.findOne({ username });
        },
        // Get my information(if logged in)
        me: async (parent, args, context) => {
            if (context.player._id) {
                return Player.findById(context.player._id).populate("ownedGames").populate("friends").populate("groups");
            }
            throw new AuthenticationError('Not logged in')
        },
        // Used to see all groups on site
        groups: async () => {
            return Group.find();
        },
        // Used to find a specific group (like a user's group)
        group: async (parent, { groupId }) => {
            return Group.findOne({ _id: groupId }).populate('groupGames');
        }
    },

    Mutation: {
        // Used to login
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
        // Used to create a Player user
        addPlayer: async (parent, { name, username, email, password }) => {
            const player = await Player.create({ name, username, email, password });
            const token = signToken(player);
            return { token, player };
        },
        // Used to update a Player's information
        updatePlayer: async (parent, args, context) => {

            if (context.player.username) {
                return await Player.findByIdAndUpdate(context.player._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },
        // Used to add a new game to a Player's collection of games
        addGame: async (parent, { name, description, genre, image, minPlayer, maxPlayer, averageTime }, context) => {
            if (context.player) {

                const game = await Game.create({ name, description, genre, image, minPlayer, maxPlayer, averageTime });
                console.log(game);

                const updatedPlayer = await Player.findByIdAndUpdate(context.player._id, { $addToSet: { ownedGames: game } }, { new: true }).populate("ownedGames");

                console.log(updatedPlayer)
                // returns updated player but all game info is null, console log of game shows all game information being displayed.
                // Just needed to populate the ownedGames array
                return updatedPlayer;
            }
            throw new AuthenticationError('Not logged in');
        },
        // Used to remove a board game from a Player's collection
        removeGame: async (parent, { gameId }, context) => {
            console.log(gameId)

            const updatedPlayer = await Player.findByIdAndUpdate(context.player._id, { $pull: { ownedGames: gameId } }, { new: true }).populate("ownedGames");

            console.log(updatedPlayer)
            return updatedPlayer;
        },
        // Used to create a new event if logged in. Args contain only event information
        createEvent: async (parent, args, context) => {
            if (context.player) {

                const newEvent = await (await (await Event.create({ ...args, owner: context.player._id })).populate("game")).populate("owner");
                console.log(newEvent);

                const updatedPlayer = await Player.findByIdAndUpdate(context.player._id, { $addToSet: { events: newEvent } }, { new: true }).populate("events");

                console.log(updatedPlayer)
                // returns updated player but all game info is null, console log of game shows all game information being displayed.
                // Just needed to populate the ownedGames array
                return newEvent;
            }
            throw new AuthenticationError('Not logged in');
        },
        // Used to delete a player's events. Only allow this to happen on the front end for events where playher is the owner.
        deleteEvent: async (parent, { eventId }, context) => {
            if (context.player) {

                return await Event.findByIdAndDelete(eventId);
            }
            throw new AuthenticationError('Not logged in');
        },
    },
}
module.exports = resolvers;
