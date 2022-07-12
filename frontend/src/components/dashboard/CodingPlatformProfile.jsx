// import { Navbar } from "../../Navbar";
//import Card from "react-bootstrap/Card";
import "./codingplatform.css";
import RatingMeter from "../animations/RatingMeter";
import React from "react";
import axios from "axios";
// import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const CodingPlatformProfile = (props) => {
  const [codeforces, setCodeforces] = useState([]);
  const [atcoder, setAtcoder] = useState([]);
  const [codeforcesHandle, setCodeforcesHandle] = useState("loading");
  useEffect(() => {
    axios
      .post("https://levelup-lnm.herokuapp.com/student/getStudentData", {
        email: props.email,
      })
      .then(({ data }) => {
        // console.log(data);
        setCodeforcesHandle(data.codeforces);
      });
  }, []);
  useEffect(() => {
    if (codeforcesHandle !== "loading") {
      axios
        .post(
          "https://levelup-lnm.herokuapp.com/contest/CodeForces/getUserData",
          {
            userHandle: codeforcesHandle,
          }
        )
        .then((details) => {
          // console.log(details);
          setCodeforces(details.data);
        });
    }
  }, [codeforcesHandle]);
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Coding Profiles</h2>
        </div>
        <div className="row">
          <div className="col-sm-4 box">
            <div className="card">
              <div className="card-inner">
                <div className="header">
                  <img
                    src={require("../../assets/images/codeforces.jpg")}
                    alt="codeforces"
                  />

                  <div className="content">
                    {codeforcesHandle === "loading" ? (
                      <p>Loading</p>
                    ) : codeforces.length !== 0 ? (
                      <>
                        <div className="content2">
                          <span>
                            username - <b>{codeforces[3]}</b>
                            <br></br>
                          </span>
                          <span>
                            Max Rating-<b>{codeforces[1]}</b> <br></br>
                          </span>
                          <span>
                            Question Solved -<b>{codeforces[0]}</b>
                          </span>
                        </div>
                        <div className="ratingmeter">
                          <RatingMeter />
                          <span className="details">
                            Rating-<b>{codeforces[2]}</b>
                          </span>
                        </div>
                      </>
                    ) : (
                      <span> codeforces handle not available</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 box">
            <div className="card">
              {/* <div className="image">
                <img src="http://loremflickr.com/320/150" />
              </div> */}
              <div className="card-inner">
                <div className="header">
                  <img
                    src={require("../../assets/images/codeforces.jpg")}
                    alt="codeforces"
                  />
                  {/* <h2>Codeforces</h2>   */}

                  <div className="content">
                    <div className="content2">
                      <span>
                        username - <b>naresh_2000</b>
                        <br></br>
                      </span>
                      <span>
                        Max Rating-<b>1200</b> <br></br>
                      </span>
                      <span>
                        Question Solved -<b>200</b>{" "}
                      </span>
                    </div>{" "}
                    <div className="ratingmeter">
                      <RatingMeter />
                      <span className="details">
                        Rating-<b>1200</b>
                      </span>
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingPlatformProfile;
