const express = require("express");
const contestRouter = express.Router();
const {
  getUpcomingContest,
  getUserDataCodeforces,
  getRandomQuestions,
  checkProblemSubmissionStatus,
  get,
} = require("../api/codeforces");
const { getUserDataCodechef } = require("../api/codechef");
const { getUserDataLeetcode } = require("../api/leetcode");
const CodingProfile = require("../models/codingProfile");
const DailyQuestions = require("../models/dailyQuestions");

contestRouter.get("/CodeForces", getUpcomingContest);
contestRouter.post("/CodeForces/getUserData", getUserDataCodeforces);
contestRouter.post("/Codechef/getUserData", getUserDataCodechef);
contestRouter.post("/Leetcode/getUserData", getUserDataLeetcode);

function getDateArray(date) {
  let dateIdx = date.indexOf("/");
  let tdate = date.slice(0, dateIdx);
  let monthIdx = date.indexOf("/", dateIdx + 1);
  let month = date.slice(dateIdx + 1, monthIdx);
  let year = date.slice(monthIdx + 1);
  return [tdate, month, year];
}

function compareDate(date) {
  let today = new Date();
  date = new Date(date);
  let incoming = getDateArray(date.toLocaleDateString());
  let todayArr = getDateArray(today.toLocaleDateString());

  if (
    incoming[0] !== todayArr[0] ||
    incoming[1] !== todayArr[1] ||
    incoming[2] !== todayArr[2]
  )
    return false;
  return true;
}

contestRouter.get("/getDailyQuestions", async (req, res) => {
  let question = await DailyQuestions.find().sort({ time: -1 }).limit(1);

  if (question.length === 0) {
    let random = await getRandomQuestions();
    // console.log(random);
    let dailyQuestion = new DailyQuestions(random);
    await dailyQuestion.save();
    return res.send(random);
  } else {
    let date = question[0].time;
    let resp = compareDate(date);
    if (!resp) {
      let random = await getRandomQuestions();
      let dailyQuestion = new DailyQuestions(random);
      await dailyQuestion.save();
      return res.send(random);
    }
  }
  return res.send(question[0]);
});

contestRouter.post(
  "/checkProblemSubmissionStatus",
  checkProblemSubmissionStatus
);

module.exports = contestRouter;
