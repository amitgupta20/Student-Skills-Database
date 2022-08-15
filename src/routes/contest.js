const express = require("express");
const contestRouter = express.Router();
const {
  getUpcomingContest,
  getUserDataCodeforces, 
} = require("../api/codeforces");
const { getUserDataCodechef } = require("../api/codechef");
const { getUserDataLeetcode } = require("../api/leetcode");
const CodingProfile = require("../models/codingProfile");

contestRouter.get("/CodeForces", getUpcomingContest);
contestRouter.post("/CodeForces/getUserData", getUserDataCodeforces);
contestRouter.post("/Codechef/getUserData", getUserDataCodechef);
contestRouter.post("/Leetcode/getUserData", getUserDataLeetcode);

contestRouter.post("/getCodingProfile", async (req, res) => {
  
});
module.exports = contestRouter;
