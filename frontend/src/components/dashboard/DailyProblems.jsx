import React, { useEffect, useState } from "react";
import axios from "axios";
import { DashboardNavigation } from "../DashboardNavigation";
import "../styles/dsa.scss";

const DailyProblems = (props) => {
  const [dailyQuestion, setDailyQuestion] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(null);
  const [todays, setTodays] = useState(null);
  let updateSubmission = async () => {
    setLoading(true)
    if (dailyQuestion) {
      let { data } = await axios.post(
        "http://localhost:2000/contest/checkProblemSubmissionStatus",
        {
          userName: userName,
          contestId: dailyQuestion.contestId,
          index: dailyQuestion.index,
        }
      );
      // console.log(data);
      setSubmissionStatus(data);
    }
    setLoading(false)
  };
  useEffect(() => {
    axios
      .get("http://localhost:2000/student/getCodingProfiles")
      .then(({ data }) => {
        // console.log("USERNAME ", data);
        if (data !== "NA") setUserName(data.codeforces);
      });
    axios
      .get("http://localhost:2000/contest/getDailyQuestions")
      .then(({ data }) => {
        let dd = new Date();
        setTodays("" + dd);
        setDailyQuestion(data);
        // console.log("effect");
      });
  }, []);
  useEffect(() => {
    if (userName) updateSubmission();
  }, [dailyQuestion, userName]);

  return (
    <div id="profileContainer" className="coding-div">
      <DashboardNavigation username={props.username || "My Account"} />
      <div className="container">
        <div className="emp-profile">
          <h1 className="head">Daily Problem</h1>
          <hr className="line-practice-head"></hr>
          {userName ? (
            <p className="text-center tdate">
              Welcome,<b> {userName} </b>
            </p>
          ) : (
            <p className="text-center tdate">
              Add Codeforces Username for streak!
            </p>
          )}
          <p className="text-center tdate">{todays ? todays : ""}</p>
          {dailyQuestion && (
            <div className="problem-div">
              <p>{dailyQuestion.name}</p>
              <a target="_blank" href={dailyQuestion.link}>
                <button className="gtproblem">Go to Problem</button>
              </a>
              {submissionStatus ? (
                <button disabled className="btn-success">
                  Solved
                </button>
              ) : (
                userName && (
                  <>
                    <button
                      className="btn-warning"
                      onClick={() => updateSubmission()}
                    >
                     { loading ? "Loading.." : "Check Submission"}
                    </button>
                    {!loading && <button disabled className="btn-danger">
                      Unsolved
                    </button>}
                  </>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyProblems;
