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
    // likes: {
    //   type: Number
    // },
    // dislikes: {
    //   type: Number
    // }
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
      getters: true
    }
  }
);

commentSchema.virtual('banMeter').get(function() {
  let dislikes = this.dislikes.length;
  let likes = this.likes.length;

  if(isNaN(dislikes / likes)) {
    return 0;
  } 
  if(dislikes + likes >= 10) {
    return dislikes / likes; 
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

