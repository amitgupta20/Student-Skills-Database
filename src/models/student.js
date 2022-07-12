const mongoose = require("mongoose");

const student = new mongoose.Schema({
    email: {
        type:String,
        unique:true,
        required:true     
    },
    profession: {
        type: String,
    },
    skills: {
        type: Array,
    },
    codingProfiles: {
        type: Array,
    },
    reputationScore: {
        type: Number,
    },
    streak: {
        type: Number
    }

})
const Student = new mongoose.model("Student",student);
module.exports = Student;