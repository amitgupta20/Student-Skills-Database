//Imports
const User = require("../models/user");
const CodingProfile = require("../models/codingProfile");
const {
  getPendingAccounts,
  getActivatedNonStudent,
  deleteAccount,
} = require("../methods/users");
const Otp = require("../models/otpVerification");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const userRouter = express.Router();
const Review = require("../models/reviews");
const PersonalDetail = require("../models/personalDetail");
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

//Methods
async function sendMail(from_email, from_name, to_email, subject, html_code) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "leveluplnmiit@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `${from_name} <${from_email}>`,
      to: `${to_email}`,
      subject: `${subject}`,
      // text: 'Hello from gmail email using API',
      html: `${html_code}`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

//Login Users
userRouter.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData || !userData.isVerified || !userData.isActivated)
      return res.status(200).json({ Status: "F" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) return res.status(200).json({ Status: "F" });
    if (userData.accountType === "Student") {
      const cData = await CodingProfile.find({ email: req.body.email });
      if (cData === undefined || cData.length === 0) {
        const codingData = new CodingProfile({
          email: req.body.email,
          codechefRating: 0,
          codeforcesRating: 0,
          codechefMaxRating: 0,
          codeforcesMaxRating: 0,
          codechefQuestion: 0,
          codeforcesQuestion: 0,
          leetcodeQuestion: 0,
          leetcodeRanking: 0,
          leetcodePercentage: "00.00%",
        });
        await codingData.save();
      }
    }
    const token = await userData.generateAuthToken();
    return res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 3000000),
        httpOnly: true,
      })
      .status(200)
      .json({ Status: "S", user: userData });
  } catch (error) {
    console.log(error);
  }
});

// Google Less Secure Function Turned Off 30 - May - 2022

// GOOGLE AUTH

userRouter.post("/sendEnquiry", async (req, res) => {
  let html_code = `
          <div className="email"
            style="border: 1px solid black;
            font-family: sans-serif;
            text-align: center;
            font-size: 20px;
          ">
              <h2>Enquiry</h2>
              <p>${req.body.message}</p>
              <p>Regards, ${req.body.name}</p>
              <p>${req.body.email}</p>
          </div>`;
  let subject = "Contact Us";
  sendMail(
    req.body.email,
    req.body.name,
    "leveluplnmiit@gmail.com",
    subject,
    html_code
  )
    .then((result) => console.log("Email sent...  "))
    .catch((error) => console.log(error.message));
});

//send OTP
const sendOtp = async (email, name) => {
  const otp = `${Math.floor(Math.random() * 999990)}`;
  console.log(otp);
  let from_email = process.env.GEMAIL;
  let subject = "OTP for Account Verfication";
  let html_code = `
          <div className="email" 
          style="border: 1px solid black;
          padding: 20px;
          font-family: sans-serif;
          line-height: 1;
          font-size: 20px; 
          ">
          <p> Hello , ${name} </p>
          <p>HERE IS YOUR OTP for Verfication</p>
          <h2>OTP is : ${otp}</h2>
          <p> OTP will expire in 1 hour <p>
          <p>Best wishes,</p>
          <p>Team LevelUP</p>
          </div>`;
  sendMail(from_email, "TEAM LevelUP", email, subject, html_code)
    .then((result) => console.log("Email sent... "))
    .catch((error) => console.log(error.message));
  return otp;
};

//SignUp Users

userRouter.post("/signUp", async (req, res) => {
  try {
    const checkData = await User.findOne({ email: req.body.email });

    if (checkData && checkData.isVerified) {
      return res.json({ Status: "F" });
    }
    await User.deleteMany({ email: req.body.email });
    await Otp.deleteMany({ email: req.body.email });
    let activationStatus = req.body.accountType === "Student" ? true : false;
    const userData = new User({
      accountType: req.body.accountType,
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      isVerified: false,
      isActivated: activationStatus,
    });

    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    await userData.save();
    const otpNumber = await sendOtp(userData.email, userData.fullName);
    // console.log(otpNumber);
    const otpData = new Otp({
      email: req.body.email,
      otp: otpNumber,
      expireTime: Date.now() + 3600000,
    });
    const otpSalt = await bcrypt.genSalt(5);
    otpData.otp = await bcrypt.hash(otpData.otp, otpSalt);
    await otpData.save();
    return res.status(200).json({ Status: "S", user: userData });
  } catch (error) {
    console.log(error);
  }
});

// LogOUT
userRouter.get("/logout", (req, res) => {
  return res
    .clearCookie("jwt")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
});

// activate recruiters or team account
userRouter.post("/activateAccount", async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) return res.status(200).send("No Account Found");
    await User.updateOne(
      { email: req.body.email },
      {
        $set: {
          isActivated: true,
        },
      }
    );
    return res.status(200).json({ Status: "S" });
  } catch (error) {
    console.log(error);
    return res.status(200).send("Error Occured");
  }
});

// deactivate recruiter or team account
userRouter.post("/deactivateAccount", async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) return res.status(200).send("No Account Found");
    await User.updateOne(
      { email: req.body.email },
      {
        $set: {
          isActivated: false,
        },
      }
    );
    return res.status(200).json({ Status: "S" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ Status: "F" });
  }
});

// delete team or recruiters account
userRouter.post("/deleteAccount", deleteAccount);

// Get deactivated accounts
userRouter.get("/getPendingAccounts", getPendingAccounts);

// Get activated recruiter or team accounts
userRouter.get("/getActivatedNonStudent", getActivatedNonStudent);

// Verify Otp
userRouter.post("/verifyOTP", async (req, res) => {
  try {
    const otpData = await Otp.findOne({ email: req.body.email });
    // console.log(otpData);
    if (!otpData) {
      return res.status(200).json({ Status: "F", message: "Invalid details" });
    }

    if (otpData.expireTime < Date.now()) {
      await Otp.deleteMany({ email: req.body.email });
      return res.status(200).json({ Status: "F", message: "Expired" });
    }
    const validOtp = await bcrypt.compare(req.body.otp, otpData.otp);
    if (!validOtp) return res.status(200).json({ Status: "F" });
    await Otp.deleteMany({ email: req.body.email });
    await User.updateOne(
      { email: req.body.email },
      {
        $set: {
          isVerified: true,
        },
      }
    );
    // console.log(req.body);
    if (req.body.accountType === "Student") {
      const personalData = new PersonalDetail({
        email: req.body.email,
        profilePhotoId: "cb39525a549b2cfc9229f27e688de644.jpg",
        name: req.body.fullName,
        rollNumber: "",
        mobileNumber: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        district: "",
        address: "",
        codeforces: "",
        codechef: "",
        leetcode: "",
        bio: "",
        doubtSolved: 0,
        educationList: [],
        experienceList: [],
        projectList: [],
        linkList: [],
        skills: [],
      });
      const codingData = new CodingProfile({
        email: req.body.email,
        codechefRating: 0,
        codeforcesRating: 0,
        codechefMaxRating: 0,
        codeforcesMaxRating: 0,
        codechefQuestion: 0,
        codeforcesQuestion: 0,
        leetcodeQuestion: 0,
        leetcodeRanking: 0,
        leetcodePercentage: "00.00%",
      });
      await codingData.save();
      await personalData.save();
    }
    return res.status(200).json({ Status: "S" });
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/addReview", async (req, res) => {
  try {
    const reviewData = new Review({
      creatorEmail: req.body.creatorEmail,
      reviewerEmail: req.body.reviewerEmail,
      projectId: req.body.projectId,
      content: req.body.content,
    });
    await reviewData.save();
    return res.send("Saved");
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/sendOTP", async (req, res) => {
  try {
    let data = await User.findOne({ email: req.body.email });
    if (!data) return res.send("F");

    let otpNumber = await sendOtp(req.body.email, data.fullName);
    console.log(otpNumber);
    const otpData = new Otp({
      email: req.body.email,
      otp: otpNumber,
      expireTime: Date.now() + 3600000,
    });
    const otpSalt = await bcrypt.genSalt(5);
    otpData.otp = await bcrypt.hash(otpData.otp, otpSalt);
    await otpData.save();
    return res.send("S");
  } catch (error) {
    console.log(error);
    return res.send("F");
  }
});

userRouter.post("/setPassword", async (req, res) => {
  // console.log(req.body);
  try {
    const otpData = await Otp.findOne({ email: req.body.email });
    if (!otpData) return res.status(200).send("F");

    if (otpData.expireTime < Date.now()) {
      await Otp.deleteMany({ email: req.body.email });
      return res.status(200).send("F");
    }
    const validOtp = await bcrypt.compare(req.body.otp, otpData.otp);
    if (!validOtp) return res.status(200).send("F");

    await Otp.deleteMany({ email: req.body.email });
    const salt = await bcrypt.genSalt(10);
    let pwd = await bcrypt.hash(req.body.password, salt);
    await User.updateOne(
      { email: req.body.email },
      {
        $set: {
          password: pwd,
        },
      }
    );
    return res.status(200).send("S");
  } catch (error) {
    console.log(error);
    return res.send("F");
  }
});

// Mongo URI
const mongoURI = `mongodb://LevelUP:${process.env.MONGO_PWD}@cluster0-shard-00-00.qb4uy.mongodb.net:27017,cluster0-shard-00-01.qb4uy.mongodb.net:27017,cluster0-shard-00-02.qb4uy.mongodb.net:27017/studentSkillDatabase?ssl=true&replicaSet=atlas-f4na1v-shard-0&authSource=admin&retryWrites=true&w=majority`;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;
let gridfsBucket;

conn.once("open", () => {
  // Init stream
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    // console.log(file);
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

userRouter.post(
  "/uploadProfilePhoto",
  upload.single("file"),
  async (req, res) => {
    try {
      // console.log(req.file);
      await PersonalDetail.updateOne(
        { email: req.body.email },
        {
          $set: {
            profilePhotoId: req.file.filename,
          },
        }
      );
      return res.send("Uploaded");
    } catch (error) {
      return res.send("Error");
    }
  }
);

userRouter.get("/image/:id", async (req, res) => {
  try {
    let file = await gfs.files.findOne({ filename: req.params.id });
    if (!file) return res.send("ERROR");
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      const readStream = gridfsBucket.openDownloadStream(file._id);
      res.set("Content-Type", file.contentType);
      readStream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  } catch (error) {
    console.log("EROOR ", error);
    return res.send("ERROR");
  }
});

userRouter.delete("/files/:id", (req, res) => {
  gfs.files.removeMany(
    { _id: req.params.id, root: "uploads" },
    (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      return res.send("DELETED");
    }
  );
});

userRouter.get("/loginUsingCookie", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (token === undefined) return res.send("NA");
    const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
    // console.log(verifyToken);
    let data = await User.findOne({ _id: verifyToken._id });

    return res.send({
      accountType: data.accountType,
      fullName: data.fullName,
      email: data.email,
      isActivated: data.isActivated,
    });
  } catch (error) {
    return res.send("NA");
  }
});

userRouter.get("/getCodingProfile", async (req, res) => {
  try {
    const data = await CodingProfile.find();
    return res.send(data);
  } catch (error) {
    return res.send([]);
  }
});
module.exports = userRouter;
