const axios = require("axios");
const CodingProfile = require("../models/codingProfile");

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
  console.log(result[2]);

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
    time: date.toLocaleDateString(),
  };
  return result;
};
function compareDate(date) {
  let current = new Date();
  current = new Date(current.toLocaleDateString());
  if (
    current.getDate != date.getDate ||
    current.getMonth != date.getMonth ||
    current.getFullYear != date.getFullYear
  )
    return false;
  return true;
}
exports.checkProblemSubmissionStatus = async function (req, res) {
  const url = `https://codeforces.com/api/user.status?handle=${req.body.userName}&from=1&count=100`;

  const responce = await axios.get(url);

  if (responce.data.status !== "OK") return res.send("ERROR");

  let submissions = responce.data.result;
  console.log(submissions[0]);
  let n = submissions.length;
  for (let i = 0; i < n; i++) {
    if (
      submissions[i].problem.contestId == req.body.contestId &&
      submissions[i].problem.index === req.body.index &&
      submissions[i].verdict === "OK"
    ) {
      let submissionDate = new Date(submissions[i].creationTimeSeconds * 1000);

      if (compareDate(submissionDate)) return res.send(true);
    }
  }
  res.send(false);
};
