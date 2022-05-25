import { gql } from '@apollo/client'

// Query or homepage(user info)
export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
    }
  }
`;

// query for 
export const QUERY_ME = gql`
query {
    me {
      _id
      username
      friendCount
      posts {
        _id
        postText
        createdAt
        likes
        dislikes
      }
      friends {
        friends {
          friends {
            _id
          }
        }
      }
    }
  }
`;

// query for the homepage 
export const QUERY_POSTS = gql`
query {
    posts {
      _id
      postText
      likes
      dislike
    }
  }
`