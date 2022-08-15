const User = require("../models/user");


exports.getPendingAccounts = async (req, res) => {
  const data = await User.find({ isActivated: false });
  //   console.log(data);
  res.status(200).send(data);
};


exports.getActivatedNonStudent = async (req, res) => {
  try {
    const data = await User.find({
      $and: [
        { $or: [{ accountType: "Recruiter" }, { accountType: "Team" }] },
        { isActivated: true },
      ],
    });
    // console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData || userData.accountType === "Student")
      return res.status(200).send("Either Student Account OR No Account Found");
    await User.deleteMany({ email: req.body.email });
    return res.status(200).json({ Status: "S" });
  } catch (error) {
    console.log(error);
    return res.status(200).send("Error Occured");
  }
}
