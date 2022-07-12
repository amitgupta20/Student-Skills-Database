const User = require("../models/user");
const Comment = require("../models/comments");
const mongoose = require("mongoose");
const express = require("express");
const studentRouter = express.Router();
const PersonalDetail = require("../models/personalDetail");
const Post = require("../models/post");
const PendingDetail = require("../models/pendingDetails");
const { v4: uuidv4 } = require("uuid");

studentRouter.post("/createPost", async (req, res) => {
  try {
    // console.log(req.body.post);
    //await PersonalDetail.deleteMany({ email: req.body.email });
    const post = new Post({
      email: req.body.post.email,
      content: req.body.post.content,
      pId: uuidv4(),
    });
    await post.save();
    res.send(post);
    //  console.log("post created");
  } catch (e) {
    console.log(e);
    res.send(false);
  }
});

studentRouter.post("/createComment", async (req, res) => {
  try {
    // console.log(req.body.comment);
    //await PersonalDetail.deleteMany({ email: req.body.email });
    const comment = new Comment({
      email: req.body.comment.email,
      content: req.body.comment.content,
      cId: uuidv4(),
      pId: req.body.comment.pId,
    });
    await comment.save();
    res.send(comment);
    // console.log("comment created");
  } catch (e) {
    console.log(e);
    res.send(false);
  }
});

studentRouter.post(`/getCommentById`, async (req, res) => {
  // console.log(req.body.pId);
  try {
    await Comment.find({ pId: req.body.pId }, function (err, details) {
      if (err) throw err;
      details.sort(function (x, y) {
        return x.upVotes > y.upVotes;
      });

      res.json(details);
    }).clone();
  } catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
});
studentRouter.post(`/upVote`, async (req, res) => {
  //console.log(req.body.cId);
  try {
    await Comment.update({ cId: req.body.cId }, { $inc: { upVotes: 1 } });
    // await Comment.find({email : req.body.email}, function (err, details) {
    //   if (err) throw err;
    res.json("S");
    // }).clone();
    // // console.log("s");
  } catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
});

// studentRouter.post(`/getMyComments`, async (req, res) => {
//   // console.log(req.body.pId);
//   try {
//     await Comment.find({email : req.body.email}, function (err, details) {
//       if (err) throw err;
//       details.sort(function (x, y) {
//         return x.upVotes > y.upVotes;
//       });
//       res.json(details);
//     }).clone();
//   } catch (e) {
//     console.log(e);
//     res.json({ message: e.message });
//   }
// });

studentRouter.post(`/getMyPosts`, async (req, res) => {
  // console.log(req.body.pId);
  try {
    await Post.find({ email: req.body.email }, function (err, details) {
      if (err) throw err;
      res.json(details);
    }).clone();
  } catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
});

studentRouter.post("/getallPost", async (req, res) => {
  try {
    await Post.find({}, function (err, details) {
      if (err) throw err;
      res.json(details);
    }).clone();
  } catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
});

studentRouter.post("/editProfile", async (req, res) => {
  try {
    // console.log(req.body);
    await PendingDetail.deleteMany({ email: req.body.email });
    const personalData = new PendingDetail({
      email: req.body.email,
      name: req.body.name,
      rollNumber: req.body.rollNumber,
      mobileNumber: req.body.mobileNumber,
      codeforces: req.body.codeforces,
      Atcoder: req.body.Atcoder,
      country: req.body.country,
      state: req.body.state,
      district: req.body.district,
      pincode: req.body.pincode,
      address: req.body.address,
      bio: req.body.bio,
      educationList: JSON.parse(req.body.educationList),
      experienceList: JSON.parse(req.body.experienceList),
      projectList: JSON.parse(req.body.projectList),
      linkList: JSON.parse(req.body.linkList),
      skills: JSON.parse(req.body.skills),
    });
    // await User.updateOne(
    //   { email: req.body.email },
    //   { $set: { fullName: req.body.name } }
    // );
    await personalData.save();
    res.send(true);
  } catch (e) {
    console.log(e);
    res.send(false);
  }
});

studentRouter.post("/confirmedEditProfile", async (req, res) => {
  try {
    // console.log(req.body);
    await PersonalDetail.deleteMany({ email: req.body.email });
    let userData = await PendingDetail.findOne({ email: req.body.email });
    if (!userData) {
      console.log("User Doesn't exists");
      return res.status(200).send("User Doesn't Exists");
    }
    // userData = userData.data;
    console.log(userData);
    const personalData = new PersonalDetail({
      email: userData.email,
      name: userData.name,
      rollNumber: userData.rollNumber,
      mobileNumber: userData.mobileNumber,
      codeforces: userData.codeforces,
      Atcoder: userData.Atcoder,
      country: userData.country,
      state: userData.state,
      district: userData.district,
      pincode: userData.pincode,
      address: userData.address,
      bio: userData.bio,
      educationList: userData.educationList,
      experienceList: userData.experienceList,
      projectList: userData.projectList,
      linkList: userData.linkList,
      skills: userData.skills,
    });
    await User.updateOne(
      { email: userData.email },
      { $set: { fullName: userData.name } }
    );
    await personalData.save();
    await PendingDetail.deleteMany({ email: req.body.email });
    res.send(true);
  } catch (e) {
    console.log(e);
    res.send(false);
  }
});

studentRouter.get("/getPendingDetails", async (req, res) => {
  const data = await PendingDetail.find();
  return res.send(data);
});

studentRouter.post("/deletePendingDetails", async (req, res) => {
  await PendingDetail.deleteMany({ email: req.body.email });
  return res.status(200).send("Deleted");
});

studentRouter.post("/getStudentData", async (req, res) => {
  try {
    let data = await PersonalDetail.findOne({ email: req.body.email });
    // console.log("Sending DATA ",data);
    res.send(data);
  } catch (e) {
    console.log(e); 
    res.json({ message: e.message });
  }  
});

module.exports = studentRouter;
