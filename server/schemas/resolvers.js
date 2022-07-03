const { Player, Event, Game, Group } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // Get all Players
        players: async () => {
            return Player.find().populate("ownedGames").populate("groups");
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
            return Group.find().populate("members").populate("admin");
        },
        // Used to find a specific group (like a user's group)
        group: async (parent, { groupId }) => {
            return Group.findOne({ _id: groupId }).populate('groupGames');
        },
        // Used to find events I own
        ownedEvents: async (parent, args, context) => {
            if (context.player._id) {
                return await Event.find({ owner: context.player._id }).populate("game").populate("owner").populate("players");
            }
            throw new AuthenticationError('Not logged in')
        },
        // Used to find events I belong to
        myEvents: async (parent, args, context) => {
            if (context.player._id) {
                return await Event.find({ players: {_id: context.player._id} }).populate("game").populate("owner").populate("players");
            }
            throw new AuthenticationError('Not logged in')
        },
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

                return Player.findByIdAndUpdate(context.player._id, { $addToSet: { ownedGames: game } }, { new: true }).populate("ownedGames");
            }
            throw new AuthenticationError('Not logged in');
        },
        // Used to remove a board game from a Player's collection
        removeGame: async (parent, { gameId }, context) => {

            const updatedPlayer = await Player.findByIdAndUpdate(context.player._id, { $pull: { ownedGames: gameId } }, { new: true }).populate("ownedGames");

            return updatedPlayer;
        },
        // Used to create a new event if logged in. Args contain only event information
        // Should probably split args up in to name, game, location, date, and players
        createEvent: async (parent, args, context) => {
            if (context.player) {

                const newEvent = await Event.create({ ...args, owner: context.player._id }).populate("game").populate("owner");
                console.log(newEvent);
                // Add back in if events array returns to Player model.
                // const updatedPlayer = await Player.findByIdAndUpdate(context.player._id, { $addToSet: { events: newEvent } }, { new: true }).populate("events");

                // console.log(updatedPlayer)
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

        createGroup: async (parent, { name }, context) => {
            let admin = await Player.findById(context.player._id)
            let members = []
            members.push(admin)
            let newGroup = await Group.create({ name, admin, members });
            let updatedPlayer = await Player.findByIdAndUpdate(context.player._id, { $addToSet: { groups: newGroup._id } }, { new: true }).populate("groups");
            return { newGroup, updatedPlayer };
        },

        addGroupMember: async (parent, { playerId, groupId }) => {
            let addedPlayer = await Player.findById(playerId)
            console.log(addedPlayer)

            return Group.findByIdAndUpdate(groupId, { $addToSet: { members: addedPlayer } }, { new: true }).populate("members").populate("admin")
        },

        removeGroupMember: async (parent, { playerId, groupId }, context) => {
            let targetGroup = await Group.findById(groupId)
            if (targetGroup.admin._id == context.player._id) {

                return Group.findOneAndUpdate({ _id: groupId }, { $pull: { members: playerId } }, { new: true }).populate("members")

            }
            throw new AuthenticationError('You are not the admin of this group. Please refer to an admin for group deletion.');
        },

        deleteGroup: async (parent, { _id }, context) => {
            let targetGroup = await Group.findById(_id)
            if (targetGroup.admin._id == context.player._id) {
                return Group.findByIdAndDelete(_id)
            }
            throw new AuthenticationError('You are not the admin of this group. Please refer to an admin for player removal.');
        },

        updateGroup: async (parent, args, context) => {
            let targetGroup = await Group.findById(args._id)
            if (targetGroup.admin._id == context.player._id) {

                return Group.findOneAndUpdate(args._id, args, { new: true })
            }
            throw new AuthenticationError('You are not the admin of this group. Please refer to an admin for group deletion.');
        },

        updateGroupAdmin: async (parent, { groupId, playerId }, context) => {
            let targetGroup = await Group.findById(groupId)
            if (targetGroup.admin._id == context.player._id) {

                return Group.findOneAndUpdate(groupId, { admin: playerId }, { new: true }).populate("members").populate("admin")
            }
            throw new AuthenticationError('You are not the admin of this group. Please refer to an admin for group deletion.');
        },


    },
}
module.exports = resolvers;
