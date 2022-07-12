const express = require("express");
const contestRouter = express.Router();
const {getUpcomingContest,getUserData} = require("../api/codeforces");

contestRouter.get('/CodeForces',getUpcomingContest);
contestRouter.post('/CodeForces/getUserData',getUserData);

module.exports = contestRouter;