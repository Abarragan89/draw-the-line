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

export const CREATE_POST = gql`
  mutation CreatePost($postText: String!, $postTitle: String!, $username: String!) {
    addPost(postText: $postText, postTitle: $postTitle, username: $username) {
      postText
      postTitle
      username
    }
  }
`;