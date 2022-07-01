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
    	user: Player
  	}

type Query {
	players: [Player]
	player(playerId: ID!): Player
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
	#Player Mutations
	addPlayer(name: String!, username: String!, email: String!, password: String!): Player
	#updatePlayer(): Player
	addGame(name: String!, description: String, genre: String, image: String, minPlayer: Int, maxPlayer: Int, averageTime: Int): Player
	#removeGame(): Player
	
	#Event Mutations
	createEvent(name: String!, game: String!, location: String!, date: String!): Event
	#deleteEvent(eventId: ID!): Event
	#updateEventWinner(): Event
	
	#Group mutations
	createGroup(name: String!, admin: String!, members: [String]!, events: [String]): Group
	#addGroupMember(): Group
	#deleteGroup(): Group
	#updateGroup(): Group
	#removeGroupMember(): Group
	#updateGroupAdmin(): Group


	
}
`;

module.exports = typeDefs;
