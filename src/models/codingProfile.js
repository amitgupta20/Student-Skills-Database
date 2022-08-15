const mongoose = require("mongoose");
const codingProfile = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  codechefRating: {
    type: Number,
    default: 0,
  },
  codeforcesRating: {
    type: Number,
    default: 0,
  },
  codechefMaxRating: {
    type: Number,
    default: 0,
  },
  codeforcesMaxRating: {
    type: Number,
    default: 0,
  },
  codechefQuestion: {
    type: Number,
    default: 0,
  },
  codeforcesQuestion: {
    type: Number,
    default: 0,
  },
  leetcodeQuestion: {
    type: Number,
    default: 0,
  },
  leetcodeRanking: {
    type: Number,
    default: 0,
  },
  leetcodePercentage: {
    type: String,
    default: "00.00%",
  },
});
const CodingProfile = new mongoose.model("CodingProfile", codingProfile);
module.exports = CodingProfile;
