const axios = require("axios");
const CodingProfile = require("../models/codingProfile");
exports.getUserDataCodechef = async function (req, res) {
  try {
    const url = `https://competitive-coding-api.herokuapp.com/api/codechef/${req.body.userHandle}`;
    const responce = await axios.get(url);
    if (!responce) return res.send({ data: "Failed" });
    const { highest_rating, rating, global_rank } = responce.data;
    const { username } = responce.data.user_details;
    const { count } = responce.data.fully_solved;
    
    const detail = [highest_rating, rating, username, count];
    if (detail.length === 4)
      await CodingProfile.updateOne(
        { email: req.body.email },
        {
          $set: {
            codechefRating: rating,
            codechefMaxRating: highest_rating,
            codechefQuestion: count,
          },
        }
      );
    // console.log(detail);

    res.send(detail);
  } catch (error) {
    console.log("ERROR");
    return res.send("Failed");
  }
};
