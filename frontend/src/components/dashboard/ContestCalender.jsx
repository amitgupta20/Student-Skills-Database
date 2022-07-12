import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { Navbar } from "../../Navbar";
import axios from "axios";
import "../styles/dsa.scss";

const ContestCalender = () => {
  const [codeforcesContest, setCodeforcesContest] = useState("Loading");

  useEffect(() => {
    axios
      .get("https://levelup-lnm.herokuapp.com/contest/CodeForces")
      .then((contest) => {
        //  console.log(contest.data);
        setCodeforcesContest(contest.data);
        console.log(contest.data);
      });
  }, []);

  return (
    <div id="profileContainer">
      <Navbar />
      <div className="container">
        <div className="emp-profile">
          <h1 className="head">Upcoming Contest</h1>
          <hr className="line-practice-head"></hr>
          {codeforcesContest === "Loading" ? (
            <p className="text-center">Loading...</p>
          ) : codeforcesContest.length !== 0 ? (
            codeforcesContest.map((problem, index) => (
              <Collapsible key={index} trigger={problem.name}>
                <a
                  key={index}
                  href={`https://codeforces.com/contests/${problem.id}`}
                >
                  <p key={index} className="questionsHead">
                    Date :
                  </p>
                  <button className="form-control btn-success ">
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
