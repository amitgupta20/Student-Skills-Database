import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { Navbar } from "../../Navbar";
import { DashboardNavigation } from "../DashboardNavigation";
import axios from "axios";
import "../styles/dsa.scss";
import { useLocation } from "react-router-dom";

const ContestCalender = ({ username }) => {
  const [codeforcesContest, setCodeforcesContest] = useState("Loading");

  useEffect(() => {
    axios.get("http://localhost:2000/contest/CodeForces").then((contest) => {
      //  console.log(contest.data);
      setCodeforcesContest(contest.data);
      // console.log(contest.data);
      // console.log("data ",location.state);
    });
  }, []);

  return (
    <div id="profileContainer" className="coding-div">
      <DashboardNavigation username={username || "My Account"} />
      <div className="container">
        <div className="emp-profile">
          <h1 className="head">Upcoming Contest</h1>
          <hr className="line-practice-head"></hr>
          {codeforcesContest === "Loading" ? (
            <p className="text-center">Loading...</p>
          ) : codeforcesContest.length !== 0 ? (
            codeforcesContest.map((problem, index) => (
              <Collapsible key={index + "1"} trigger={problem.name}>
                <a
                  key={index + "2"}
                  href={`https://codeforces.com/contests/${problem.id}`}
                >
                  <p key={index + "3"} className="questionsHead">
                    Date :
                  </p>
                  <button
                    key={index + "4"}
                    className="form-control btn-success "
                  >
                    Proceed to Contest
                  </button>
                </a>
              </Collapsible>
            ))
          ) : (
            <p>No contest available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestCalender;
