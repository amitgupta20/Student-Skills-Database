const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  cId: {
    type: String,
     required: true,
  },
  pId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
     required: true,
  },
  time: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  upVotes: {
    type: Number,
    required: true,
    default: 0,
  },
});
const Comment = new mongoose.model("Comment", commentSchema);
module.exports = Comment;
