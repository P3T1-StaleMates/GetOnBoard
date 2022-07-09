import { gql } from '@apollo/client';

export const ADD_PLAYER = gql`
    mutation addPlayer($name: String!, $username: String!, $email: String!, $password: String!) {
        addPlayer(name: $name, username: $username, email: $email, password: $password) {
            token
                player {
                _id
                name
                username
                email
                password
                }
        }
    }
`;

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            player {
                _id
                name
                username
                email
            }
        }
    }
`;

export const UPDATE_PLAYER = gql`
    mutation UpdatePlayer($updatePlayerId: ID!, $name: String, $username: String, $email: String, $password: String) {
        updatePlayer(id: $updatePlayerId, name: $name, username: $username, email: $email, password: $password) {
            _id
            name
            username
            email
            password
        }
    }
`;

export const ADD_GAME = gql`
    mutation AddGame($title: String!, $minPlayer: Int!, $maxPlayer: Int!, $averageTime: Int!, $description: String, $genre: String, $imageUrl: String) {
        addGame(title: $title, minPlayer: $minPlayer, maxPlayer: $maxPlayer, averageTime: $averageTime, description: $description, genre: $genre, imageUrl: $imageUrl) {
            _id
            name
            username
            ownedGames {
                _id
                title
                description
                genre
                minPlayer
                imageUrl
                maxPlayer
                averageTime
            }
        }
    }
`;

export const REMOVE_GAME = gql`
    mutation RemoveGame($gameId: ID!) {
        removeGame(gameId: $gameId) {
            _id
            name
            username
            ownedGames {
            _id
            title
            }
        }
    }
`;

export const CREATE_EVENT = gql`
    mutation CreateEvent($name: String!, $game: String!, $location: String!, $date: String!) {
        createEvent(name: $name, game: $game, location: $location, date: $date) {
            _id
            owner {
            _id
            name
            username
            }
            name
            players {
            _id
            name
            }
            location
            date
            game {
            _id
            title
            }
        }
    }
`;

export const DELETE_EVENT = gql `
    mutation DeleteEvent($eventId: ID!) {
        deleteEvent(eventId: $eventId) {
            _id
            owner {
            _id
            name
            }
            name
        }
    }
`;

export const CREATE_GROUP = gql`
    mutation CreateGroup($name: String!) {
        createGroup(name: $name) {
            _id
            name
            admin {
            _id
            name
            username
            }
        }
    }
`;

export const ADD_GROUP_MEMBER = gql`
    mutation AddGroupMember($playerId: ID!, $groupId: ID!) {
        addGroupMember(playerId: $playerId, groupId: $groupId) {
            _id
            name
            members {
            _id
            name
            username
            }
        }
    }
`;

export const REMOVE_GROUP_MEMBER = gql`
    mutation RemoveGroupMember($groupId: ID!, $playerId: ID!) {
        removeGroupMember(groupId: $groupId, playerId: $playerId) {
            _id
            name
            members {
            _id
            name
            username
            }
        }
    }
`;

export const DELETE_GROUP = gql`
    mutation DeleteGroup($id: ID!) {
        deleteGroup(_id: $id) {
            _id
            name
        }
    }
`;

export const UPDATE_GROUP = gql`
    mutation UpdateGroup($id: ID!, $name: String!) {
        updateGroup(_id: $id, name: $name) {
            _id
            name
        }
    }
`;

export const UPDATE_GROUP_ADMIN = gql`
    mutation UpdateGroup($groupId: ID!, $playerId: ID!) {
        updateGroupAdmin(groupId: $groupId, playerId: $playerId) {
            admin {
            _id
            name
            username
            }
            _id
            name
        }
    }
`;

export const ADD_FRIEND = gql`
mutation AddFriend($username: String!) {
  addFriend(username: $username) {
    _id
    name
    friends {
      _id
      name
    }
  }
}`;

export const REMOVE_FRIEND = gql`
mutation RemoveFriend($removeFriendId: ID!) {
  removeFriend(id: $removeFriendId) {
    _id
    name
    friends {
      _id
      name
    }
  }
}`;