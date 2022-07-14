import { gql } from '@apollo/client';
// Works
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
// Works
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
// Works
export const UPDATE_PLAYER = gql`
mutation UpdatePlayer($name: String, $username: String, $email: String, $password: String) {
  updatePlayer(name: $name, username: $username, email: $email, password: $password) {
    _id
    name
    username
    email
  }
}
`;
// Works
export const ADD_GAME = gql`
    mutation AddGame($gameId: String!, $title: String!, $minPlayer: Int!, $maxPlayer: Int!, $averageTime: Int!, $description: String, $genre: String, $imageUrl: String) {
        addGame(gameId: $gameId, title: $title, minPlayer: $minPlayer, maxPlayer: $maxPlayer, averageTime: $averageTime, description: $description, genre: $genre, imageUrl: $imageUrl) {
            _id
            name
            username
            ownedGames {
                _id
                title
                description
                minPlayer
                imageUrl
                maxPlayer
                averageTime
            }
        }
    }
`;
// Works
export const REMOVE_GAME = gql`
    mutation RemoveGame($gameId: ID!) {
        removeGame(gameId: $gameId) {
            _id
            username
            ownedGames {
            _id
            title
            }
        }
    }
`;
// Works
export const CREATE_EVENT = gql`
    mutation CreateEvent($eventName: String!, $location: String!, $date: String!, $players: [ID]!) {
  createEvent(eventName: $eventName, location: $location, date: $date, players: $players) {
    _id
    owner {
      _id
      name
      username
      email
    }
    location
    date
    eventName
    players {
      _id
      name
      username
      email
    }
  }
}
`;
// Broken
export const UPDATE_EVENT_GAME = gql`
mutation UpdateEventGame($eventId: ID!, $eventGames: [ID]!) {
  updateEventGame(eventID: $eventId, eventGames: $eventGames) {
    _id
    eventName
    eventGames {
      _id
      title
      description
      imageUrl
      minPlayer
      maxPlayer
      averageTime
    }
  }
}
`;
// Works
export const DELETE_EVENT = gql `
mutation DeleteEvent($eventId: ID!) {
  deleteEvent(eventId: $eventId) {
    _id
    eventName
  }
}
`;
// Broken, fix later
export const ADD_EVENT_WINNER = gql`
mutation AddEventWinner($eventId: ID!, $winnerId: ID!) {
  addEventWinner(eventId: $eventId, winnerId: $winnerId) {
    _id
    eventName
    winner {
      _id
      name
      username
    }
  }
}
`;
// Works
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
// Works
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
// Ignore
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
// Ignore
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
// Ignore
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
// Ignore
export const DELETE_GROUP = gql`
    mutation DeleteGroup($id: ID!) {
        deleteGroup(_id: $id) {
            _id
            name
        }
    }
`;
// Ignore
export const UPDATE_GROUP = gql`
    mutation UpdateGroup($id: ID!, $name: String!) {
        updateGroup(_id: $id, name: $name) {
            _id
            name
        }
    }
`;
// Ignore
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