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
        comments {
          username
          likes
          _id
          commentBody
        }
      }
  }
`;

// Query for friend Profile page
export const QUERY_FRIEND = gql `
  query user($id: ID!) {
    user(_id: $id){
      username
      friendCount
      posts {
        postTitle
        postText
        createdAt
        likes
        dislikes
      }
      friends {
        username
        friendCount
      }
    }
  }
`;

// Delete a post (Works on GraphQL, has not been tested here.)
export const DELETE_POST = gql `
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      postText
      username
    }
  }
`