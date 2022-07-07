import { gql } from '@apollo/client';

export const QUERY_PLAYERS = gql`
  query players {
  players {
    _id
    name
    username
    ownedGames {
      _id
      name
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
      name
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
  query me($id: ID!) {
  me(_id: $id) {
    _id
    name
    username
    email
    password
    ownedGames {
      _id
      name
      description
      genre
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
        name
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
  query Games($name: String!) {
    games(name: $name) {
      name
      description
      genre
      image
      minPlayer
      maxPlayer
      averageTime
      _id
  }
}
`;
