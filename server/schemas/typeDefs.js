const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID 
        username: String
        friendCount: Int
        posts: [Post]
        friends: [User]
    }

    type Post {
        _id: ID
        postText: String
        postTitle: String
        createdAt: String
        username: String
        comments: [Comment]
        likes: [ID]
        dislikes: [ID]
        banMeter: Float
        likesLength: Int
        dislikesLength: Int
    }

    type Comment {
        _id: ID
        commentBody: String
        username: String
        createdAt: String
        likes: [ID]
        dislikes: [ID]
        likesLength: Int
        dislikesLength: Int
        banMeter: Float
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(_id: ID!): User
        userByName(username: String!): User
        posts(username: String): [Post]
        post(_id: ID!): Post
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addPost(postText: String!, postTitle: String!, username: String!): Post
        addComment(postId: ID!, commentBody: String!): Post 
        addFriend(friendId: ID!): User

        addPostLike(postId: ID!): Post
        addPostDislike(postId: ID!): Post

        addCommentLike(commentId: ID!): Comment
        addCommentDislike(commentId: ID!): Comment

        deletePost(postId: ID!): Post
        deleteComment(commentId: ID!): Comment

    }
`

module.exports = typeDefs;