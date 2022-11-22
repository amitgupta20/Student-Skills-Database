const mongoose = require("mongoose");

const dailyQuestions = new mongoose.Schema({
    contestId: {
        type: String
    },
    index:{
        type: String
    },
    name:{
        type: String
    },
    link:{
        type:String
    },
    time:{
        type: String
    }

})
const DailyQuestions = new mongoose.model("dailyQuestions",dailyQuestions);
module.exports = DailyQuestions;