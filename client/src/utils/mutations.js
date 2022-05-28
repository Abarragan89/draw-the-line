import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Dislike a post
export const DISLIKE_POST = gql`
  mutation AddPostDislike($postId: ID!) {
    addPostDislike(postId: $postId) {
      _id
      dislikes
    }
  }
`;

// Dislike a post
export const LIKE_POST = gql`
  mutation addPostLike($postId: ID!) {
    addPostLike(postId: $postId) {
      _id
      likes
    }
  }
`;