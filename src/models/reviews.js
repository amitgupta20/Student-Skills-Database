const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  creatorEmail: {
    type: String,
    required: true,
  },
  reviewerEmail: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
});
const Review = new mongoose.model("Review", reviewSchema);
module.exports = Review;
