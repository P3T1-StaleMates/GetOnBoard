import { gql } from '@apollo/client';

export const QUERY_PLAYERS = gql`
  query players {
  players {
    _id
    name
    username
    ownedGames {
      _id
      title
    }
    groups {
      _id
      name
    }
    friends {
      _id
      name
    }
  }
}
`;

export const QUERY_PLAYER = gql`
  query player($username: String!) {
  player(username: $username) {
    _id
    name
    username
    email
    password
    ownedGames {
      _id
      title
      description
      genre
    }
    groups {
      _id
      name
      admin {
        _id
        name
      }
    }
  }
}
`;

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