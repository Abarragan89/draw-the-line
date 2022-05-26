const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema(
  {
    commentBody: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    likes: {
      type: Number
    },
    dislikes: {
      type: Number
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const comment = model('comment', commentSchema)


module.exports = comment;

