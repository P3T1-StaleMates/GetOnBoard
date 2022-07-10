import { gql } from '@apollo/client';
// Works
export const QUERY_PLAYERS = gql`
query Players {
  players {
    _id
    name
    username
    email
    ownedGames {
      _id
      title
      description
      imageUrl
      minPlayer
      maxPlayer
      averageTime
    }
    friends {
      _id
      name
      username
      email
    }
  }
}
`;
// Works
export const QUERY_PLAYER = gql`
  query Player($username: String!) {
  player(username: $username) {
    _id
    name
    username
    email
    ownedGames {
      _id
      title
      description
      imageUrl
      minPlayer
      maxPlayer
      averageTime
    }
    friends {
      _id
      name
      username
      email
    }
  }
}
`;
// Works
export const QUERY_ME = gql`
  query Me {
  me {
    _id
    name
    ownedGames {
      _id
      title
      description
      genre
      imageUrl
      minPlayer
      maxPlayer
      averageTime
    }
    friends {
      _id
      name
      username
    }
  }
}
`;
// Ignore
export const QUERY_GROUPS = gql`
  query groups {
  groups {
    _id
    name
    admin {
      _id
      name
      username
    }
    members {
      _id
      name
      ownedGames {
        _id
        title
      }
    }
  }
}
`;
// Ignore
export const QUERY_GROUP = gql`
  query group($id: ID!) {
  group(_id: $id) {
    _id
    name
    admin {
      _id
      name
      username
    }
    members {
      _id
      name
      username
    }
    events {
      _id
      owner {
        _id
        name
      }
      name
      players {
        _id
        name
      }
      location
      date
    }
  }
}
`;
// Works
export const QUERY_GAMES = gql`
  query Games($title: String!) {
    games(title: $title) {
      title
      description
      genre
      imageUrl
      minPlayer
      maxPlayer
      averageTime
      _id
  }
}
`;
// Works
export const QUERY_EVENT = gql`
query Event($eventId: ID!) {
  event(eventId: $eventId) {
    _id
    owner {
      name
      username
      email
      _id
    }
    eventName
    location
    date
    players {
      name
      username
      email
      _id
      ownedGames {
        _id
        title
        description
        minPlayer
        maxPlayer
        imageUrl
        averageTime
      }
    }
    eventGames {
      _id
      title
      description
      imageUrl
      minPlayer
      maxPlayer
      averageTime
    }
    winner {
      _id
      name
      username
      email
    }
    groupGames {
      _id
      title
      minPlayer
      maxPlayer
      imageUrl
      averageTime
      description
    }
  }
}
`;
// Works
export const QUERY_MY_EVENTS = gql`
query MyEvents {
  myEvents {
    _id
    owner {
      _id
      name
      username
      email
    }
    eventName
    players {
      _id
      name
      username
      email
    }
    location
    date
    eventGames {
      _id
      title
      description
      imageUrl
      minPlayer
      maxPlayer
      averageTime
    }
    groupGames {
      _id
      title
      description
      imageUrl
      minPlayer
      maxPlayer
      averageTime
    }
    winner {
      _id
      name
      username
      email
    }
  }
}
`;

export const QUERY_OWNED_EVENTS = gql`
query OwnedEvents {
  ownedEvents {
    _id
    owner {
      _id
      name
      username
      email
    }
    eventName
    location
    date
    players {
      _id
      name
      username
      email
    }
    eventGames {
      _id
      title
      description
      imageUrl
      minPlayer
      maxPlayer
      averageTime
    }
    groupGames {
      _id
      title
      description
      imageUrl
      minPlayer
      maxPlayer
      averageTime
    }
    winner {
      _id
      name
      username
      email
    }
  }
}
`;