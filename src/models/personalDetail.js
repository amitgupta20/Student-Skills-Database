const mongoose = require("mongoose");

const personalDetail = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  profilePhotoId: {
    type: String,
    default: "cb39525a549b2cfc9229f27e688de644.jpg",
  },
  name: {
    type: String,
  },
  rollNumber: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
  },
  district: {
    type: String,
  },
  address: {
    type: String,
  },
  codeforces: {
    type: String, 
  },
  codechef: {
    type: String,
  },
  leetcode: {
    type: String,
  },
  bio: {
    type: String,
  },
  doubtSolved: {
    type: Number,
    default: 0,
  },
  educationList: [
    {
      index: {
        type: Number,
      },
      instituteName: {
        type: String,
      },
      degreeName: {
        type: String,
      },
      startDate: {
        type: String,
      },
      endDate: {
        type: String,
      },
      grade: {
        type: String,
      },
    },
  ],
  experienceList: [
    {
      index: {
        type: Number,
      },
      organizationName: {
        type: String,
      },
      startDate: {
        type: String,
      },
      endDate: {
        type: String,
      },
      role: {
        type: String,
      },
      location: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  projectList: [
    {
      index: {
        type: Number,
      },
      projectName: {
        type: String,
      },
      startDate: {
        type: String,
      },
      endDate: {
        type: String,
      },
      link: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  linkList: [
    {
      index: {
        type: Number,
      },
      linkName: {
        type: String,
      },
      link: {
        type: String,
      },
    },
  ],
  skills: [],
});
const PersonalDetail = new mongoose.model("PersonalDetail", personalDetail);
module.exports = PersonalDetail;
