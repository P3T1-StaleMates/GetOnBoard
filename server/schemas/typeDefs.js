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
		groups: [Group]
		friends: [Player]
		posts: [Post]
	}

	type Event {
		_id: ID!
		owner: Player
		name: String
		players: [Player]
		location: String
		date: String
		game: Game
		winner: [Player]
	}

	type Game {
		_id: ID!
		name: String
		description: String
		genre: String
		image: String
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
	me(_id: ID!): Player
	groups: [Group]
	group(_id: ID!): Group
	posts: [Post]
	post(postId: ID!): Post
	ownedEvents: [Event]
	myEvents: [Event]
}

type Mutation {
	#Player Mutations
	addPlayer(name: String!, username: String!, email: String!, password: String!): Auth
	login(email: String!, password: String!): Auth
	updatePlayer(id: ID! name: String, username: String, email: String, password: String): Player
	# Stuck on this one.
	addGame(name: String!, description: String, genre: String, image: String, minPlayer: Int!, maxPlayer: Int!, averageTime: Int!): Player
	removeGame(gameId: ID!): Player

	#Event Mutations
	createEvent(name: String!, game: String!, location: String!, date: String!): Event
	deleteEvent(eventId: ID!): Event
	#addEventWinner(): Event

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