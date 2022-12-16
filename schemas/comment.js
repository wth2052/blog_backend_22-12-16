const mongoose = require('mongoose');

// const PostsDb = require('../schemas/post.js');
const commentSchema = new mongoose.Schema({
  // commentId: {    unique: true,type: mongoose.Schema.Types.ObjectId }, => 얘는 자동생성이니 지워주자.
  //postId를 같이 심어줘야 하는데

  // postId: { type: String, require: true, ref: 'Post' },

  // postId: PostsDb._id,
  postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },

  // postId: [
  //   { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
  // ],
  //어레이 지우기

  user: { type: String },
  content: { type: String, require: true },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema, 'comments');
