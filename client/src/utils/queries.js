import { gql } from '@apollo/client'

// Get all users posts 
export const GET_USER_POSTS = gql`
  query Query {
    posts {
      _id
      postText
      postTitle
      createdAt
      username
      likes
      dislikes
      likesLength
      dislikesLength
      banMeter
    }
  }
`;

// Query or homepage(user info)
export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
    }
  }
`;

// query for Create Post and Profile page
export const QUERY_ME = gql`
query {
    me {
      _id
      username
      friendCount
      posts {
        _id
        postText
        postTitle
        banMeter
        createdAt
        likes
        dislikes
        likesLength
        dislikesLength
      }
    }
  }
`;

// query for the homepage 
export const QUERY_POSTS = gql`
query {
    post (userId: $userId) {
        _id
        postTitle
        postText
        likes
        likesLength
        dislikesLength
        username
        banMeter
        comments {
          username
          likes
          _id
          commentBody
        }
      }
  }
`;

export const QUERY_SINGLE_POST = gql`
query Query($id: ID!) {
  post(_id: $id) {
    _id
    postText
    postTitle
    createdAt
    username
    likesLength
    dislikesLength
    comments {
      _id
      commentBody
      username
      createdAt
      likes
      dislikes
      likesLength
      dislikesLength
      banMeter
    }
    likes
    dislikes
    banMeter
  }
}
`;

// Query for friend Profile page
export const QUERY_USER = gql `
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
        banMeter
        likesLength
        dislikesLength
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
      _id
      username
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
`;