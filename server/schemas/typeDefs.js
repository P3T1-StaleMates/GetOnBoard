const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID!
		name: String
		username: String
		email: String
		password: String
		ownedGames: [Game]
		events: [Event]
		groups: [Group]
		friends: [User]
		posts: [Post]
	}

	type Event {
		_id: ID!
		name: String
		date: Int
		game: Game
		winner: User
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
		members: [User] #check models
		events: [Event]
	}

	type Post {
		_id: ID!
		postText: String!
		postAuther: User
		createdAt: String
	}

type Query {
	users: [User]
	user(userId: ID!): User
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
	addUser(name: String!, username: String!, email: String!, password: String!): User
}
`;

module.exports = typeDefs;
