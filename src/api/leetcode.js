const axios = require("axios");
const CodingProfile = require("../models/codingProfile");
const { spawn } = require("child_process");
// const { platformScraping } = require("./codechef");

let platformScraping = async function (userName, platform) {
  let resultString = "";
  let resultData = "F";

  let platformChild = spawn("python", [
    `src/webScraping/leetcode.py`,
    `${userName}`,
    `${platform}`,
  ]); 

  platformChild.stdout.on("data", async (data) => {
    resultString += data.toString();
    resultData = JSON.parse(resultString);
    // console.log(resultData);
  });
  platformChild.stderr.on("data", (data) => {
    console.log("ERROR ", "" + data); 
  });
  await new Promise((resolve) => {
    platformChild.on("close", resolve);
  });
  return resultData;
};
exports.getUserDataLeetcode = async function (req, res) {
  try {
    let data = await platformScraping(req.body.userHandle, "leetcode");
    // console.log("SCRAP ", data);
    let result = [
      data.total_problems_solved,
      data.acceptance_rate,
      data.ranking[0] != "~" ? data.ranking : -1,
    ];

    await CodingProfile.updateOne(
      { email: req.body.email },
      {
        $set: {
          leetcodeQuestion: result[0],
          leetcodeRanking: result[2],
          leetcodePercentage: result[1],
        },
      }
    );
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.send("Failed");
  }
};
