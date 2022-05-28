const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    // Queries
    Query: {
        // Get Logged In User Information
        me: async (parent, args, context) => {
          if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
              .select('-__v -password')
              .populate('posts')
              .populate('friends');
    
            return userData;
          }
    
          throw new AuthenticationError('Not logged in');
        },
        // Get all users
        users: async () => {
          return User.find()
            .select('-__v -password')
            .populate('posts')
            .populate('friends');
        },
        // Get single User by ID
        user: async (parent, { _id }) => {
          return User.findOne({ _id })
            .select('-__v -password')
            .populate('friends')
            .populate('posts');
        },
        // Get single User by Username
        userByName: async (parent, { username }) => {
          return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('posts');
        },
        // Get all  Posts
        posts: async (parent, { username }) => {
          const params = username ? { username } : {};
          return Post.find(params).sort({ createdAt: -1 }).populate('comments');
        },
        // Get a single post
        post: async (parent, { _id }) => {
          return Post.findOne({ _id });
        }
      },
    //   Mutations
      Mutation: {
        // Add a new user
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
    
          return { token, user };
        },
        // Login User
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const token = signToken(user);
          return { token, user };
        },
        // Add a post
        addPost: async (parent, args, context) => {
          if (context.user) {
            const post = await Post.create({ ...args, username: context.user.username });

            console.log("Post ID", post._id);
    
            await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { posts: post._id } },
              { new: true }
            );
    
            return post;
          }
    
          throw new AuthenticationError('You need to be logged in!');
        },
        // Add a comment
        addComment: async (parent, args, context) => {
          if (context.user) {
              const comment = await Comment.create({...args, username: context.user.username});
              console.log(comment)
              console.log(args);

              const post = await Post.findByIdAndUpdate(
                { _id: args.postId },
                { $push: { comments: comment._id } },
                { new: true }
              ).populate('comments');;

            console.log(post)
            return post;
          }
    
          throw new AuthenticationError('You need to be logged in!');
        },
        // Add friend to user profile
        addFriend: async (parent, { friendId }, context) => {
          if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { friends: friendId } },
              { new: true }
            ).populate('friends');
    
            return updatedUser;
          }
    
          throw new AuthenticationError('You need to be logged in!');
        },
        // Add like to a Post
        addPostLike: async (parent, { postId }, context) => {
          if(context.user) {
            const updatePost = await Post.findOneAndUpdate(
              { _id: postId },
              { $inc: {'likes': 1}},
              { new: true }
            );
              return updatePost;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        // Add dislike to a post
        addPostDislike: async (parent, { postId }, context) => {
          if(context.user) {
            const updatePost = await Post.findOneAndUpdate(
              { _id: postId },
              { $inc: {'dislikes': 1}},
              { new: true }
            );
              return updatePost;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        // Add a like to a comment
        addCommentLike: async (parent, { commentId }, context) => {
          if(context.user) {
            console.log(commentId)
            const updateComment = await Comment.findOneAndUpdate(
              { _id: commentId },
              { $inc: {'likes': 1}},
              { new: true }
            );
            console.log(updateComment)
            return updateComment;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        // Add a dislike to a comment
        addCommentDislike: async (parent, { commentId }, context) => {
          if(context.user) {
            const updateComment = await Comment.findOneAndUpdate(
              { _id: commentId },
              { $inc: {'dislikes': 1}},
              { new: true }
            );
            console.log(updateComment)
            return updateComment;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        // Delete a Post
        deletePost: async(parent, { postId }, context) => {
          if(context.user) {
            const deletedPost = await Post.findOneAndDelete(
              { _id: postId }
            );
            return deletedPost
          }
          throw new AuthenticationError('You need to be logged in!')
        }
    }
}

module.exports = resolvers;