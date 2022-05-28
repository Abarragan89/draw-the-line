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
    likes: {
      type: Number
    },
    dislikes: {
      type: Number
    },
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

postSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

postSchema.virtual('banMeter').get(function() {
  if(isNaN(this.dislikes / this.likes)) {
    return 0;
  } 
  if(this.dislikes + this.likes >= 10) {
    return this.dislikes / this.likes; 
  }
})

const Post = model('post', postSchema);

module.exports = Post;