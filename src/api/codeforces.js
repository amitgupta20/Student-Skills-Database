const axios = require("axios");
exports.getUserContest = async function (userHandle) {
  // console.log("entered");
  const url = `https://codeforces.com/api/user.rating?handle=${userHandle}`;
  const responce = await axios.get(url);
};
exports.getUserData = async function (req, res) {
  const url = `https://codeforces.com/api/user.info?handles=${req.body.userHandle}`;
  const responce = await axios.get(url);
  const { maxRating, rating, handle } = responce.data.result[0];
  const url2 = ` https://codeforces.com/api/user.status?handle=${req.body.userHandle}`;
  const { data } = await axios.get(url2);
  const questions = data.result.filter(
    (contest) => contest.verdict === "OK"
  ).length;
  const detail = [questions, maxRating, rating, handle];

  res.send(detail);
};
exports.getUpcomingContest = async function (req, res) {
  const url = `https://codeforces.com/api/contest.list?gym=false`;
  const { data } = await axios.get(url);
  const result = data.result.filter((contest) => contest.phase === "BEFORE");
  result.sort();
  //result.reverse();
  res.send(result);
};
