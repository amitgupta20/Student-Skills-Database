// import { Navbar } from "../../Navbar";
//import Card from "react-bootstrap/Card";
import "./codingplatform.css";
import RatingMeter from "../animations/RatingMeter";
import React from "react";
import axios from "axios";
// import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
const CodingPlatformProfile = (props) => {
  const [codeforces, setCodeforces] = useState([]);
  const [codechef, setCodechef] = useState([]);
  const [leetcode, setLeetcode] = useState([]);
  const [codeforcesHandle, setCodeforcesHandle] = useState("loading");
  const [codechefHandle, setCodechefHandle] = useState("loading");
  const [leetcodeHandle, setLeetcodeHandle] = useState("loading");

  useEffect(() => {
    axios
      .post("http://localhost:2000/student/getStudentData", {
        email: props.email,
      })
      .then(({ data }) => {
        // console.log(data);
        if (data) {
          setCodeforcesHandle(data.codeforces);
          setLeetcodeHandle(data.leetcode);
          setCodechefHandle(data.codechef);
        } else {
          setCodeforcesHandle("");
          setLeetcodeHandle("");
          setCodechefHandle("");
        }
      });
    // axios
    //   .post("http://localhost:2000/student/getStudentData", {
    //     email: props.email,
    //   })
    //   .then(({ data }) => {
    //     //  console.log(data.leetcode);
    //     setLeetcodeHandle(data.leetcode);
    //   });
    // axios
    //   .post("http://localhost:2000/student/getStudentData", {
    //     email: props.email,
    //   })
    //   .then(({ data }) => {
    //     // console.log(data);
    //     setCodechefHandle(data.codechef);
    //   });
  }, [props.email]);
  useEffect(() => {
    if (codeforcesHandle !== "loading" && codeforcesHandle !== "") {
      axios
        .post("http://localhost:2000/contest/CodeForces/getUserData", {
          userHandle: codeforcesHandle,
          email: props.email,
        })
        .then((details) => {
          if (details.data === "Failed") setCodeforces([]);
          else setCodeforces(details.data);
        });
    }
    if (codechefHandle !== "loading" && codechefHandle !== "") {
      axios
        .post("http://localhost:2000/contest/Codechef/getUserData", {
          userHandle: codechefHandle,
          email: props.email,
        })
        .then((details) => {
          if (details.data === "Failed") setCodechef([]);
          else setCodechef(details.data);
        });
    }
    if (leetcodeHandle !== "loading" && leetcodeHandle !== "") {
      axios
        .post("http://localhost:2000/contest/Leetcode/getUserData", {
          userHandle: leetcodeHandle,
          email: props.email,
        })
        .then((details) => {
          console.log(details.data)
          if (details.data === "Failed") setLeetcode([]);
          else setLeetcode(details.data);
        });
    }
  }, [codeforcesHandle, codechefHandle, leetcodeHandle]);
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
                    className="codeforces-logo-png"
                    src={require("../../assets/images/codeforces.png")}
                    alt="codeforces"
                  />

                  <div className="content">
                    {codeforcesHandle === "loading" ? (
                      <p>Loading</p>
                    ) : codeforces.length !== 0 ? (
                      <div className="codeforces-container">
                        <div className="content2">
                          <div className="coding-profile-data">
                            <p className="coding-profile-data-label">
                              Username :{" "}
                            </p>
                            <p className="coding-profile-data-head">
                              {codeforces[3].slice(0,11)}
                            </p>
                          </div>
                          <div className="coding-profile-data">
                            <p className="coding-profile-data-label">
                              Max Rating :{" "}
                            </p>
                            <p className="coding-profile-data-head">
                              {codeforces[1]}
                            </p>
                          </div>
                          <div className="coding-profile-data">
                            <p className="coding-profile-data-label">
                              Question Solved :{" "}
                            </p>
                            <p className="coding-profile-data-head">
                              {codeforces[0]}
                            </p>
                          </div>
                        </div>
                        <div className="ratingmeter">
                          <RatingMeter
                            rating={(codeforces[2] || 0) / 2500}
                            levels={5}
                            colors={["grey", "lime", "green", "orchid", "red"]}
                          />
                          <p className="rating-meter-head">{codeforces[2]}</p>
                          <p className="rating-meter-label">( Rating )</p>
                        </div>
                      </div>
                    ) : (
                      <div className="not-available">
                        <p>CodeForces handle not available</p>
                      </div>
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
                    className="Img"
                    src={require("../../assets/images/Codechef.png")}
                    alt="codeforces"
                  />
                  {/* <h2>Codeforces</h2>   */}

                  <div className="content">
                    {codechefHandle === "loading" ? (
                      <p>Loading</p>
                    ) : codechef.length !== 0 ? (
                      <div className="codeforces-container">
                        <div className="content2">
                          <div className="coding-profile-data">
                            <p className="coding-profile-data-label">
                              Username :{" "}
                            </p>
                            <p className="coding-profile-data-head">
                              {codechef[2].slice(0,11)}
                            </p>
                          </div>
                          <div className="coding-profile-data">
                            <p className="coding-profile-data-label">
                              Max Rating :{" "}
                            </p>
                            <p className="coding-profile-data-head">
                              {codechef[0]}
                            </p>
                          </div>
                          <div className="coding-profile-data">
                            <p className="coding-profile-data-label">
                              Question Solved :{" "}
                            </p>
                            <p className="coding-profile-data-head">
                              {codechef[3]}
                            </p>
                          </div>
                        </div>
                        <div className="ratingmeter">
                          <RatingMeter
                            rating={(codechef[1] || 0) / 3500}
                            levels={7}
                            colors={[
                              "grey",
                              "green",
                              "blue",
                              "orchid",
                              "yellow",
                              "orange",
                              "red",
                            ]}
                          />
                          <p className="rating-meter-head">{codechef[1]}</p>
                          <p className="rating-meter-label">( Rating )</p>
                        </div>
                      </div>
                    ) : (
                      <div className="not-available">
                        <p>Codechef handle not available</p>
                      </div>
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
                    className="leet-img"
                    src={require("../../assets/images/leetcode.png")}
                    alt="codeforces"
                  />
                  {/* <h2>Codeforces</h2>   */}

                  <div className="content">
                    {leetcodeHandle === "loading" ? (
                      <p>Loading</p>
                    ) : leetcode.length !== 0 ? (
                      <div className="codeforces-container">
                        <div className="content2">
                          <div className="coding-profile-data">
                            <p className="coding-profile-data-label">
                              Username :{" "}
                            </p>
                            <p className="coding-profile-data-head">
                              {leetcodeHandle.slice(0,11)}
                            </p>
                          </div>
                          <div className="coding-profile-data">
                            <p className="coding-profile-data-label">
                              Ranking :{" "}
                            </p>
                            <p className="coding-profile-data-head">
                              {leetcode[2]}
                            </p>
                          </div>
                          <div className="coding-profile-data">
                            <p className="coding-profile-data-label">
                              Question Solved :{" "}
                            </p>
                            <p className="coding-profile-data-head">
                              {leetcode[0]}
                            </p>
                          </div>
                        </div>
                        <div className="ratingmeter">
                          <RatingMeter
                            rating={
                              leetcode && leetcode[1]
                                ? leetcode[1].slice(0, 2) / 100
                                : 0
                              // 67 / 100
                            }
                            levels={4}
                            colors={["grey", "lime", "green", "red"]}
                          />
                          <p className="rating-meter-head">{leetcode[1]}</p>
                          <p className="rating-meter-label">( Acceptance )</p>
                        </div>
                      </div>
                    ) : (
                      <div className="not-available">
                        <p>LeetCode handle not available</p>
                      </div>
                    )}
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
