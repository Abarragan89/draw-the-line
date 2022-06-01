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

export const ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
      username
      friendCount
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
  mutation AddPostDislikes($postId: ID!) {
    addPostDislike(postId: $postId) {
      _id
      postText
      dislikesLength
      username
      banMeter
    }
}
`;

// Dislike a post
export const LIKE_POST = gql`
  mutation addPostLike($postId: ID!) {
    addPostLike(postId: $postId) {
      _id
      postText
      likesLength
      username
      banMeter
    }
}

`;

// Delete a Post
export const DELETE_POST = gql`
mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      postText
    }
  }
  `;

  // Add a Post
export const ADD_POST = gql`
  mutation AddPost($postText: String!, $postTitle: String!, $username: String!) {
    addPost(postText: $postText, postTitle: $postTitle, username: $username) {
      postText
      postTitle
      username
    }
  }
`;

// Add a comment Like
export const ADD_COMMENT_LIKE  = gql `
  mutation AddCommentLike($commentId: ID!) {
    addCommentLike(commentId: $commentId) {
      _id
      postText
      likesLength
      username
      banMeter
    }
  }
`;

// Add a comment dislike
export const ADD_COMMENT_DISLIKE  = gql `
  mutation AddCommentDislike($commentId: ID!) {
    addCommentDislike(commentId: $commentId) {
      _id
      postText
      likesLength
      username
      banMeter
    }
  }
`;

export const ADD_COMMENT = gql `
  mutation Mutation($postId: ID!, $commentBody: String!) {
    addComment(postId: $postId, commentBody: $commentBody) {
      comments {
        commentBody
        username
        createdAt
        likes
        dislikes
        likesLength
        dislikesLength
      }
    }
}
`;