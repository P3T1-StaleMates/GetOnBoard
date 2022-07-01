const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Player {
		_id: ID!
		name: String
		username: String
		email: String
		password: String
		ownedGames: [Game]
		events: [Event]
		groups: [Group]
		friends: [Player]
		posts: [Post]
	}

	type Event {
		_id: ID!
		name: String
		date: String
		game: Game
		winner: Player
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
		members: [Player] #check models
		events: [Event]
	}

	type Post {
		_id: ID!
		postText: String!
		postAuther: Player
		createdAt: String
	}

type Query {
	users: [Player]
	user(userId: ID!): Player
	events: [Event]
	event(eventId: ID!): Event
	groups: [Group]
	group(groupId: ID!): Group
	games: [Game]
	game(gameId: ID!): Game
	posts: [Post]
	post(postId: ID!): Post
}

type Mutation {
	addUser(name: String!, username: String!, email: String!, password: String!): Player
	addEvent(name: String!, game: String!): Event
	addGame(name: String!, description: String, genre: String, image: String, minPlayer: Int, maxPlayer: Int, averageTime: Int): Player
	removeEvent(eventId: ID!): Event
}
`;

module.exports = typeDefs;
