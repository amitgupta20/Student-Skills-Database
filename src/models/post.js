const mongoose = require("mongoose");

const post = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  pId: {
    type: String,
  },
  content: {
    type: String,
  },
  time: {
    type: Date,
    required: true,
    default: Date.now(),
  }
});
const Post = new mongoose.model("Post", post);
module.exports = Post;
