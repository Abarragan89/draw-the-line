const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    // Queries
    Query: {
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
        users: async () => {
          return User.find()
            .select('-__v -password')
            .populate('posts')
            .populate('friends');
        },
        user: async (parent, { username }) => {
          return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('posts');
        },
        posts: async (parent, { username }) => {
          const params = username ? { username } : {};
          return Post.find(params).sort({ createdAt: -1 });
        },
        post: async (parent, { _id }) => {
          return Post.findOne({ _id });
        }
      },
    //   Mutations
      Mutation: {
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
    
          return { token, user };
        },
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
        addPost: async (parent, args, context) => {
          if (context.user) {
            const post = await Post.create({ ...args, username: context.user.username });
    
            await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { posts: post._id } },
              { new: true }
            );
    
            return post;
          }
    
          throw new AuthenticationError('You need to be logged in!');
        },
        // addComment: async (parent, { postId, commentBody }, context) => {
        //   if (context.user) {
        //     const updatedPost = await Post.findOneAndUpdate(
        //       { _id: postId },
        //       { $push: { comments: { commentBody, username: context.user.username } } },
        //       { new: true, runValidators: true }
        //     );
    
        //     return updatedPost;
        //   }
    
        //   throw new AuthenticationError('You need to be logged in!');
        // },
        addComment: async (parent, args, context) => {
          if (context.user) {
              const comment = await Comment.create({...args, username: context.user.username});
            
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { posts: comment._id } },
                { new: true }
              );

            return comment;
          }
    
          throw new AuthenticationError('You need to be logged in!');
        },
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
        }
    }
}

module.exports = resolvers;