//imports
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/users");
const studentRouter = require("./routes/students");
const contestRouter = require("./routes/contest");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 2000;
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

const corsOptions = {
  credentials: true,
  origin: true,
};

app.use(cors(corsOptions));

//datebase connection
require("./db/connection");

//routes
app.use("/users", userRouter);
app.use("/student", studentRouter);
app.use("/contest", contestRouter);

//Heroku
if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));

  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

//Server Status
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
