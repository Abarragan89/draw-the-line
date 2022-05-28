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
      _id
      username
      friendCount
      posts {
        _id
        postTitle
        postText
        createdAt
        likes
        dislikes
      }
      friends {
        _id
        username
        friendCount
      }
    }
  }
`;

// Query a user by Username
export const QUERY_USER_BY_NAME = gql`
query Query($username: String!) {
  userByName(username: $username) {
    username
    _id
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