const axios = require("axios");
const CodingProfile = require("../models/codingProfile");
const User = require("../models/user");
const Streak = require("../models/streak");
const jwt = require("jsonwebtoken");
exports.getUserDataCodeforces = async function (req, res) {
  try {
    const url = `https://codeforces.com/api/user.info?handles=${req.body.userHandle}`;
    const responce = await axios.get(url);
    const { maxRating, rating, handle } = responce.data.result[0];
    const url2 = ` https://codeforces.com/api/user.status?handle=${req.body.userHandle}`;
    const { data } = await axios.get(url2);
    // console.log(maxRating);
    const questions = data.result.filter(
      (contest) => contest.verdict === "OK"
    ).length;
    const detail = [questions, maxRating, rating, handle];

    await CodingProfile.updateOne(
      { email: req.body.email },
      {
        $set: {
          codeforcesRating: rating,
          codeforcesMaxRating: maxRating,
          codeforcesQuestion: questions,
        },
      }
    );
    res.send(detail);
  } catch (error) {
    // console.log("Failed");
    return res.send("Failed");
  }
};
exports.getUpcomingContest = async function (req, res) {
  const url = `https://codeforces.com/api/contest.list?gym=false`;
  const { data } = await axios.get(url);
  const result = data.result.filter((contest) => contest.phase === "BEFORE");

  result.reverse();
  res.send(result);
};

function getRandomInt(number) {
  return Math.floor(Math.random() * Math.floor(number));
}

exports.getRandomQuestions = async function () {
  const url = `https://codeforces.com/api/problemset.problems`;
  const responce = await axios.get(url);
  if (responce.data.status !== "OK") return "ERROR";

  let size = responce.data.result.problems.length;

  let randomNumber = getRandomInt(size);
  let date = new Date();
  let problemLink = `https://codeforces.com/contest/${responce.data.result.problems[randomNumber].contestId}/problem/${responce.data.result.problems[randomNumber].index}`;
  let result = {
    contestId: responce.data.result.problems[randomNumber].contestId,
    index: responce.data.result.problems[randomNumber].index,
    name: responce.data.result.problems[randomNumber].name,
    link: problemLink,
    time: date,
  };
  return result;
};

function getDateArray(date) {
  let dateIdx = date.indexOf("/");
  let tdate = date.slice(0, dateIdx);
  let monthIdx = date.indexOf("/", dateIdx + 1);
  let month = date.slice(dateIdx + 1, monthIdx);
  let year = date.slice(monthIdx + 1);
  return [tdate, month, year];
}
async function updateStreak(email) {
  let streak = await Streak.findOne({ email: email });
  if (streak) {
    if (compareDate(streak.lastSubmission)) {
      let currentStreak = streak.currentStreak + 1;
      let maximumDays = Math.max(streak.maximumDays, currentStreak);
      let today = new Date();
      today.setDate(today.getDate() + 1);
      await Streak.updateOne(
        { email: email },
        {
          $set: {
            currentStreak: currentStreak,
            maximumDays: maximumDays,
            lastSubmission: today,
          },
        }
      );
    } else {
      console.log("HERE");
      let currentStreak = 1;
      let maximumDays = Math.max(streak.maximumDays, currentStreak);
      let today = new Date();
      today.setDate(today.getDate() + 1);
      await Streak.updateOne(
        { email: email },
        {
          $set: {
            currentStreak: currentStreak,
            maximumDays: maximumDays,
            lastSubmission: today,
          },
        }
      );
    }
  } else {
    // console.log("OUT HERE");
    let today = new Date();
    today.setDate(today.getDate() + 1);
    let data = {
      email: email,
      maximumDays: 1,
      currentStreak: 1,
      lastSubmission: today,
    };
    const streakData = new Streak(data);
    await streakData.save();
  }
}
async function compareDate(date) {
  let today = new Date();
  date = new Date(date);
  let incoming = getDateArray(date.toLocaleDateString());
  let todayArr = getDateArray(today.toLocaleDateString());
  // console.log(incoming);
  if (
    incoming[0] !== todayArr[0] ||
    incoming[1] !== todayArr[1] ||
    incoming[2] !== todayArr[2]
  )
    return false;
  return true;
}
exports.checkProblemSubmissionStatus = async function (req, res) {
  const url = `https://codeforces.com/api/user.status?handle=${req.body.userName}&from=1&count=100`;

  const responce = await axios.get(url);
  if (responce.data.status !== "OK") return res.send("ERROR");

  let submissions = responce.data.result;
  let n = submissions.length;
  let submitStatus = false;
  for (let i = 0; i < n; i++) {
    if (
      submissions[i].problem.contestId == req.body.contestId &&
      submissions[i].problem.index == req.body.index &&
      submissions[i].verdict == "OK"
    ) {
      let submissionDate = new Date(submissions[i].creationTimeSeconds * 1000);
      let dateCompare = await compareDate(submissionDate);
      if (dateCompare) {
        submitStatus = true;
        break; 
      }
    }
  }
  if (submitStatus) {
    let token = req.cookies.jwt;
    const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
    let { email } = await User.findOne({ _id: verifyToken._id });
    await updateStreak(email);
  }
  res.send(submitStatus);
};
 