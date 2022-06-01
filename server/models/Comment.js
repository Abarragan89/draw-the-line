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
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
);

commentSchema.virtual('banMeter').get(function() {
  if(isNaN(this.dislikes.length / this.likes.length)) {
    return 0;
  } else if (this.dislikes.length + this.likes.length >= 2) {
    return this.dislikes.length / this.likes.length; 
  } else {
    return 0;
  }
})

commentSchema.virtual('likesLength').get(function() {
  return this.likes.length;
})
commentSchema.virtual('dislikesLength').get(function() {
  return this.dislikes.length;
});


const comment = model('comment', commentSchema)


module.exports = comment;

