const mongoose = require("mongoose");
const streakSchema = new mongoose.Schema({
    email: {
        type:String,
        unique:true,
        required:true     
    },
    maximumDays: {
        type:Number,
        required:true,
        default: 0
    },
    currentStreak: {
        type:Number,
        required:true,
        default: 0,
    },
    lastSubmission: {
        type : Date,
    }
})
const Streak = new mongoose.model("Streak",streakSchema);
module.exports = Streak;