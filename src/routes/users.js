//Imports
const User = require("../models/user");
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
const cors = require("cors");
const userRouter = express.Router();

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
      return res.status(400).send("Invalid Credentials");

    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) return res.status(400).json({ Status: "F" });

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
    .then((result) => console.log("Email sent..."))
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
    .then((result) => console.log("Email sent..."))
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
    const otpData = new Otp({
      email: req.body.email,
      otp: otpNumber,
      expireTime: Date.now() + 3600000,
    });
    const otpSalt = await bcrypt.genSalt(5);
    otpData.otp = await bcrypt.hash(otpData.otp, otpSalt);
    otpData.save();
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
    return res.status(400).send("Error Occured");
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
    return res.status(400).send("Error Occured");
  }
});

// delete team or recruiters account
userRouter.post("/deleteAccount",deleteAccount);

// Get deactivated accounts
userRouter.get("/getPendingAccounts", getPendingAccounts);

// Get activated recruiter or team accounts
userRouter.get("/getActivatedNonStudent", getActivatedNonStudent);

// Verify Otp
userRouter.post("/verifyOTP", async (req, res) => {
  try {
    const otpData = await Otp.findOne({ email: req.body.email });
    if (!otpData) {
      return res.status(400).json({ Status: "F", message: "Invalid details" });
    }

    if (otpData.expireTime < Date.now()) {
      await Otp.deleteMany({ email: req.body.email });
      return res.status(400).json({ Status: "F", message: "Expired" });
    }
    const validOtp = await bcrypt.compare(req.body.otp, otpData.otp);
    if (!validOtp) return res.status(400).json({ Status: "F" });
    await Otp.deleteMany({ email: req.body.email });
    await User.updateOne(
      { email: req.body.email },
      {
        $set: {
          isVerified: true,
        },
      }
    );
    return res.status(200).json({ Status: "S" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = userRouter;
