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
  result.sort();
  //result.reverse();
  res.send(result);
};
