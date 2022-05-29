const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
  {
    postTitle: {
      type: String,
      required: 'You need to leave a post title!'
    },
    postText: {
      type: String,
      required: 'You need to leave a post!'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    // likes: {
    //   type: Number
    // },
    // dislikes: {
    //   type: Number
    // },
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
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'comment'
      }
  ]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
);

postSchema.virtual('banMeter').get(function() {
  let dislikes = this.dislikes.length;
  let likes = this.likes.length;

  if(isNaN(dislikes / likes)) {
    return 0;
  } 
  if(dislikes + likes >= 5) {
    return dislikes / likes; 
  }
})
postSchema.virtual('likesLength').get(function() {
  return this.likes.length;
})
postSchema.virtual('dislikesLength').get(function() {
  return this.likes.length;
})

const Post = model('post', postSchema);

module.exports = Post;