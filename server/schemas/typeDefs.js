const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Player {
		_id: ID
		name: String
		username: String
		email: String
		password: String
		ownedGames: [Game]
		# Might not need this reference if this information is all self contained in Event
		#events: [Event]
		#groups: [Group]
		friends: [Player]
		posts: [Post]
	}

	type Event {
		_id: ID!
		owner: Player
		eventName: String
		players: [Player]
		location: String
		date: String
		eventGames: [Game]
		winner: [Player]
		groupGames: [Game]
	}

	type Game {
		_id: ID!
		title: String
		description: String
		genre: String
		imageUrl: String
		minPlayer: Int
		maxPlayer: Int
		averageTime: Int
	}

	type Group {
		_id: ID!
		name: String
		admin: Player
		members: [Player]
		events: [Event]
	}

	type Post {
		_id: ID!
		postText: String!
		postAuthor: String!
		createdAt: String
		comments: [Comment]!
	}

	type Comment {
    	_id: ID
    	commentText: String
    	commentAuthor: String
    	createdAt: String
  	}

	type Auth {
    	token: ID!
    	player: Player
  	}

type Query {
	players: [Player]
	player(username: String!): Player
	me: Player
	groups: [Group]
	group(_id: ID!): Group
	myGroups: [Group]
	posts: [Post]
	post(postId: ID!): Post
	ownedEvents: [Event]
	myEvents: [Event]
	event(eventId: ID!): Event
	games(title: String!): [Game]
}

type Mutation {
	#Player Mutations
	addPlayer(name: String!, username: String!, email: String!, password: String!): Auth
	login(email: String!, password: String!): Auth
	updatePlayer(name: String, username: String, email: String, password: String): Player
	addFriend(username: String!): Player
	removeFriend(id: ID!): Player
	# Game Mutations
	addGame(title: String!, description: String, genre: String, imageUrl: String, minPlayer: Int!, maxPlayer: Int!, averageTime: Int!): Player
	removeGame(gameId: ID!): Player

	#Event Mutations
	createEvent(
		eventName: String!, 
		location: String!,
		date: String!,
		players: [ID]!
		): Event
	updateEventGame(eventId: ID!, eventGames: [ID]!): Event
	deleteEvent(eventId: ID!, groupId: ID): Event
	addEventWinner(eventId: ID!, winnerId: ID!): Event

	#Group mutations
	createGroup(name: String!): Group
	addGroupMember(playerId: ID!, groupId: ID!): Group
	removeGroupMember(groupId: ID!, playerId: ID!): Group
	deleteGroup(_id: ID!): Group
	updateGroup(_id: ID!, name: String!): Group
	updateGroupAdmin(groupId: ID!, playerId: ID!): Group

}
`;

module.exports = typeDefs;