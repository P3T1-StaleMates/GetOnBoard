const { Player, Event, Game, Group } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // Get all Players
        players: async () => {
            return Player.find().populate("ownedGames").populate("friends");
        },
        // Get a single player's information (to look up friends by username)
        player: async (parent, { username }) => {
            return Player.findOne({ username }).populate("friends").populate("ownedGames");
        },
        // Get my information(if logged in)
        me: async (parent, args, context) => {
            if (context.player._id) {
                return Player.findById(context.player._id).populate("ownedGames").populate("friends");
            }
            throw new AuthenticationError('Not logged in')
        },
        // Used to see all groups on site
        groups: async () => {
            return Group.find().populate("members").populate("admin");
        },
        // Used to find a specific group (like a user's group)
        group: async (parent, { groupId }) => {
            return Group.findOne({ _id: groupId }).populate('groupGames').populate("events");
        },
        // Pulls my group information in an array
        myGroups: async (parent, args, context) => {
            if (context.player._id) {
                return Group.find({ members: { _id: context.player._id } }).populate("members").populate("events");
            }
            throw new AuthenticationError('Not logged in')
        },
        // Used to find events I own
        ownedEvents: async (parent, args, context) => {
            if (context.player._id) {
                return await Event.find({ owner: context.player._id }).populate("eventGames").populate("owner").populate("groupGames").populate("winner").populate(
                    {
                        path: "players",
                        populate: {
                            path: "ownedGames",
                            model: "Game"
                        }
                    }
                );
            }
            throw new AuthenticationError('Not logged in')
        },
        // Used to find events I belong to
        myEvents: async (parent, args, context) => {
            console.log(context.player)
            if (context.player._id) {
                return await Event.find({ players: { _id: context.player._id } }).populate("eventGames").populate("owner").populate("groupGames").populate("winner").populate(
                    {
                        path: "players",
                        populate: {
                            path: "ownedGames",
                            model: "Game"
                        }
                    }
                );
            }
            throw new AuthenticationError('Not logged in')
        },
        // Used to grab a single event's information to display (for updateEventGame)
        event: async (parent, { eventId }, context) => {
            if (context.player) {
                return await Event.findById(eventId).populate("eventGames").populate("owner").populate("groupGames").populate("winner").populate(
                    {
                        path: "players",
                        populate: {
                            path: "ownedGames",
                            model: "Game"
                        }
                    }
                );
            }
            throw new AuthenticationError('Not logged in')
        },
        // Used to find Games in the database by name
        games: async (parent, { title }) => {
            return await Game.find({ title });
        }
    },

    Mutation: {
        // Used to login
        login: async (parent, { email, password }) => {
            const player = await Player.findOne({ email });

            if (!player) {
                throw new AuthenticationError('No player found with this email address');
            }

            const correctPw = await player.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(player);

            return { token, player };
        },
        // Used to create a Player user
        addPlayer: async (parent, { name, username, email, password }) => {

            if (!username || !name || !email || !password) {
                throw new AuthenticationError('Please fill out all fields.');
            }

            if (password.length < 8) {
                throw new AuthenticationError('Please use a password that is greater than 8 characters long.');
            }

            if (username != '^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$') {
                throw new AuthenticationError(`Usernames \n` +
                    `1. May only contains alphanumeric characters or an underscore.
                2. May not start or end with an underscore, and may not be concurrent.
                3. Between 2 and 18 characters long.`)
            }
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
        // Used to add a friend to a player, and recipirocating the friend on the recipient end.
        addFriend: async (parent, { username }, context) => {

            if (context.player) {


                let addedFriend = await Player.findOne({ username });
                let reciprocatedFriend = await Player.findById(context.player._id)
                let updatedFriend = await Player.findByIdAndUpdate(addedFriend._id, { $addToSet: { friends: reciprocatedFriend } })
                return Player.findByIdAndUpdate(context.player._id, { $addToSet: { friends: addedFriend } }, { new: true }).populate("friends");
            }
            throw new AuthenticationError('Not logged in');
        },

        // Used to remove a friend from a user and susbequent removal from the recipient end.
        removeFriend: async (parent, { id }, context) => {

            if (context.player) {

                let removedFriend = await Player.findByIdAndUpdate(id, { $pull: { friends: context.player._id } }, { new: true });

                return Player.findByIdAndUpdate(context.player._id, { $pull: { friends: id } }, { new: true }).populate("friends");
            }
            throw new AuthenticationError('Not logged in');
        },

        // Used to add a new game to a Player's collection of games
        addGame: async (parent, { title, description, genre, imageUrl, minPlayer, maxPlayer, averageTime }, context) => {

            if (context.player) {
                let game = await Game.findOne({ title });
                if (!game) {
                    game = await Game.create({ title, description, genre, imageUrl, minPlayer, maxPlayer, averageTime });
                }
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
        createEvent: async (parent, { eventName, location, date, players }, context) => {
            if (context.player) {
                // const game = await Game.findById(gameId);
                const owner = await Player.findById(context.player._id);
                // const group = await Group.findById(groupId).populate("members");
                // let players = group.members;
                // let players = [];
                // for (let i = 0; i < invitedPlayers.length; i++) {
                //     players.push(await Player.findById(invitedPlayers[i]));
                // };

                players.push(context.player._id);

                const newEvent = await Event.create({ eventName, location, date, owner, players });
                // console.log(newEvent);

                // const updatedGroup = await Group.findByIdAndUpdate(groupId, { $addToSet: { events: newEvent } }, { new: true });
                // console.log(updatedGroup);
                return newEvent;
            }
            throw new AuthenticationError('Not logged in');
        },
        // Used to add a list of games to an existing event
        updateEventGame: async (parent, { eventId, eventGames }, context) => {
            if (context.player) {
                // Used to grab all the Game documents by array of IDs sent in.
                // https://betterprogramming.pub/how-to-use-async-await-with-map-in-js-5059043564e0
                const games = await Promise.all(eventGames.map(async (gameId) => {
                    return await Game.findById(gameId)
                }));
                // Proof it works and maps an array of game documents
                // console.log(games);
                // Adding to the event by eventId returns null, for some reason.
                return await Event.findByIdAndUpdate(eventId, { $addToSet: { eventGames: games } }, { new: true }).populate("eventGames");
            }
            throw new AuthenticationError('Not logged in');
        },
        // Used to delete a player's events. Only allow this to happen on the front end for events where playher is the owner.
        deleteEvent: async (parent, { eventId, groupId }, context) => {
            if (context.player) {

                // await Group.findByIdAndUpdate(groupId, { $pull: { events: eventId } }, { new: true });

                return await Event.findByIdAndDelete(eventId, { new: true });
            }
            throw new AuthenticationError('Not logged in');
        },
        // Fix this later
        addEventWinner: async (parent, { eventId, winnerId }, context) => {
            if (context.player) {

                const winner = await Player.findById(winnerId)

                return await Event.findByIdAndUpdate(eventId, { $addToSet: { winner } }, { new: true }).populate("winner");
            }
            throw new AuthenticationError('Not logged in');
        },

        createGroup: async (parent, { name }, context) => {
            let admin = await Player.findById(context.player._id)
            let members = []
            members.push(admin)
            let newGroup = await Group.create({ name, admin, members })
            // let updatedPlayer = await Player.findByIdAndUpdate(context.player._id, { $addToSet: { groups: newGroup } }, { new: true }).populate("groups");
            return newGroup;
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
