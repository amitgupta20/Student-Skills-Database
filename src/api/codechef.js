const axios = require("axios");
const { spawn } = require("child_process");
const CodingProfile = require("../models/codingProfile");
let platformScraping = async function (userName, platform) {
  let resultString = "";
  let resultData = "F";

  let platformChild = spawn("python", [
    `src/webScraping/codechef.py`,
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
exports.getUserDataCodechef = async function (req, res) {
  try {
    let data = await platformScraping(req.body.userHandle, "codechef");
    // console.log("SCRAP ", data);
    let result = [
      data.highest_rating,
      data.rating,
      req.body.userHandle,
      data.fully_solved,
    ];
    await CodingProfile.updateOne(
      { email: req.body.email },
      {
        $set: {
          codechefRating: result[1],
          codechefQuestion: result[3],
          codechefMaxRating: result[0],
        },
      }
    );
    res.send(result);
  } catch (error) {
    console.log("ERROR");
    return res.send("Failed");
  }
};
