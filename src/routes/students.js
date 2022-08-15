const User = require("../models/user");
const Comment = require("../models/comments");
const mongoose = require("mongoose");
const express = require("express");
const studentRouter = express.Router();
const PersonalDetail = require("../models/personalDetail");
const Post = require("../models/post");
const Review = require("../models/reviews");
const PendingDetail = require("../models/pendingDetails");
const { v4: uuidv4 } = require("uuid");

studentRouter.post("/createPost", async (req, res) => {
  try {
    // console.log(req.body.post);
    //await PersonalDetail.deleteMany({ email: req.body.email });
    const post = new Post({
      email: req.body.post.email,
      content: req.body.post.content,
      time: Date.now(),
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
      time: Date.now(),
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
    await Comment.updateOne({ cId: req.body.cId }, { $inc: { upVotes: 1 } });
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
      profilePhotoId: req.body.profilePhotoId,
      name: req.body.name,
      rollNumber: req.body.rollNumber,
      mobileNumber: req.body.mobileNumber,
      codeforces: req.body.codeforces,
      codechef: req.body.codechef,
      leetcode: req.body.leetcode,
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
    // console.log(userData);
    const personalData = new PersonalDetail({
      email: userData.email,
      name: userData.name,
      rollNumber: userData.rollNumber,
      mobileNumber: userData.mobileNumber,
      codeforces: userData.codeforces,
      codechef: userData.codechef,
      leetcode: userData.leetcode,
      profilePhotoId: userData.profilePhotoId,
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
    if (req.body.pending === true)
      data = await PendingDetail.findOne({ email: req.body.email });
    // console.log("Sending DATA ",data);
    res.send(data);
  } catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
});
studentRouter.post("/filterProfiles", async (req, res) => {
  // console.log(req.body);
  try {
    let data;
    let skill = req.body.skills || [];
    // console.log(skill);
    // let
    // console.log(Boolean(req.body.country));
    if(req.body.email){
      data = await User.find({email : req.body.email , accountType : "Student"});
      return res.send(data);
    }
    if (req.body.country && req.body.state && req.body.city)
      data = await PersonalDetail.find({
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
      });
    else if (req.body.country && req.body.state && !req.body.city)
      data = await PersonalDetail.find({
        state: req.body.state,
        country: req.body.country,
      });
    else if (req.body.country && !req.body.state && !req.body.city)
      data = await PersonalDetail.find({ country: req.body.country });
    else data = [];

    // console.log(data);
    if (data.length > 0) {
      if (skill.length > 0) {
        // console.log("before");
        const filterskill = new Set(skill);
        data = data.filter((student) =>
          student.skills.some((item) => filterskill.has(item))
        );
        // console.log(data);
      }
    } else if (!req.body.country && !req.body.state && !req.body.city && skill.length > 0) {
      data = await PersonalDetail.find({});
      const filterskill = new Set(skill);
      data = data.filter((student) =>
        student.skills.some((item) => filterskill.has(item))
      );
    }

    //  console.log("Sending DATA ",data);
    res.send(data);
  } catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
});

studentRouter.post("/getProjectReviews", async (req, res) => {
  try {
    let data = await Review.find({
      projectId: req.body.projectId,
      // $and: [
      //   { creatorEmail: req.body.creatorEmail, projectId: req.body.projectId },
      // ],
    });
    return res.send(data);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

studentRouter.post("/deleteProjectReview", async (req, res) => {
  try {
    await Review.deleteMany({
      _id: req.body.reviewId,
    });
    return res.send("DELETED");
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});
studentRouter.post("/solvedDoubt", async (req, res) => {
  try {
    await PersonalDetail.updateOne(
      { email: req.body.email },
      { $inc: { doubtSolved: 1 } }
    );
    await Post.updateOne(
      { _id: req.body.postId },
      { $set: { isSolved: true } }
    );
    return res.send("Updated");
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

module.exports = studentRouter;
