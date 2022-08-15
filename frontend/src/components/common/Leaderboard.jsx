import React, { useEffect, useState } from "react";
import "../recruiter/recruiter.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Leaderboard = (props) => {
  let navigate = useNavigate();
  const [codingData, setCodingData] = useState([]);
  const [searchCount, setsearchCount] = useState(1);
  const [searchCriteria, setSearchCriteria] = useState("Overall");
  //   const [fetchStatus, setFetchStatus] = useState("Enter Filter");
  useEffect(() => {
    axios
      .get("http://localhost:2000/users/getCodingProfile")
      .then(({ data }) => {
        console.log(data);
        let data1 = data;
        data1.sort(function (x, y) {
          return (
            0.4 * y.codechefRating +
            0.3 * y.codeforcesRating +
            0.2 * y.leetcodeQuestion -
            (0.4 * x.codechefRating +
              0.3 * x.codeforcesRating +
              0.2 * x.leetcodeQuestion)
          );
        });
        setCodingData(data1);
      });
  }, []);
  // const changeArray = () => {
  //   if (searchCriteria === "Overall") {
  //     let data = codingData;
  //     data.sort(function (x, y) {
  //       return (
  //         0.4 * y.codechefRating +
  //         0.3 * y.codeforcesRating +
  //         0.2 * y.leetcodeQuestion -
  //         (0.4 * x.codechefRating +
  //           0.3 * x.codeforcesRating +
  //           0.2 * x.leetcodeQuestion)
  //       );
  //     });

  //     setCodingData(data);
  //   } else if (searchCriteria === "LeetCode") {
  //     let data = codingData;
  //     data.sort(function (x, y) {
  //       return y.leetcodeQuestion - x.leetcodeQuestion;
  //     });
  //     console.log(data);
  //     setCodingData(data);
  //   } else if (searchCriteria === "CodeChef") {
  //     let data = codingData;
  //     data.sort(function (x, y) {
  //       return y.codechefRating - x.codechefRating;
  //     });

  //     setCodingData(data);
  //   } else if (searchCriteria === "CodeForces") {
  //     let data = codingData;
  //     data.sort(function (x, y) {
  //       return y.codeforcesRating - x.codeforcesRating;
  //     });

  //     setCodingData(data);
  //   }
  //   setsearchCount(searchCount + 1);
  // };
  useEffect(() => {
    if (searchCriteria === "Overall") {
      let data = codingData;
      data.sort(function (x, y) {
        return (
          0.4 * y.codechefRating +
          0.3 * y.codeforcesRating +
          0.2 * y.leetcodeQuestion -
          (0.4 * x.codechefRating +
            0.3 * x.codeforcesRating +
            0.2 * x.leetcodeQuestion)
        );
      });

      setCodingData(data);
    } else if (searchCriteria === "LeetCode") {
      let data = codingData;
      data.sort(function (x, y) {
        return y.leetcodeQuestion - x.leetcodeQuestion;
      });
      // console.log(data);
      setCodingData(data);
    } else if (searchCriteria === "CodeChef") {
      let data = codingData;
      data.sort(function (x, y) {
        return y.codechefRating - x.codechefRating;
      });

      setCodingData(data);
    } else if (searchCriteria === "CodeForces") {
      let data = codingData;
      data.sort(function (x, y) {
        return y.codeforcesRating - x.codeforcesRating;
      });

      setCodingData(data);
    }
    setsearchCount(searchCount + 1);
  }, [searchCriteria]);
  return (
    <div className="admin-accept-details">
      <div className="container">
        <div className="">
          <div className="section-title">
            <h2 className="admin-head-black leaderboard">LeaderBoard</h2>
          </div>
          <div className="find-using-email">
            <label>Select Criteria : </label>
            <select
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
              className="form-control"
              id="cars"
            >
              <option value="Overall">Overall</option>
              <option value="CodeChef">CodeChef</option>
              <option value="LeetCode">LeetCode</option>
              <option value="CodeForces">CodeForces</option>
            </select>
            {/* <button
              placeholder=""
              onClick={changeArray}
              className="btn-warning"
            >
              Find
            </button> */}
          </div>

          <div className="pending-account-table">
            <table className="table table-striped admin-side-table">
              <thead className="table-header">
                <tr className="">
                  <th>S No.</th>
                  {/* <th>Name</th> */}
                  <th>Email</th>
                  {(searchCriteria === "Overall" ||
                    searchCriteria === "CodeChef") && <th>CodeChef Rating</th>}
                  {(searchCriteria === "Overall" ||
                    searchCriteria === "LeetCode") && (
                    <th>LeetCode Questions</th>
                  )}
                  {(searchCriteria === "Overall" ||
                    searchCriteria === "CodeForces") && (
                    <th>CodeForces Rating</th>
                  )}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchCount > 0 &&
                  codingData !== null &&
                  codingData.map((val, idx) => {
                    return (
                      <tr className="align-middle" key={idx + "1"}>
                        <td key={idx + "2"}>{idx + 1}</td>
                        {/* <td key={idx + "3"}>{val.fullName}</td> */}
                        <td key={idx + "4"}>{val.email}</td>
                        {(searchCriteria === "Overall" ||
                          searchCriteria === "CodeChef") && (
                          <td key={idx + "a"}>{val.codechefRating}</td>
                        )}
                        {(searchCriteria === "Overall" ||
                          searchCriteria === "LeetCode") && (
                          <td key={idx + "b"}>{val.leetcodeQuestion}</td>
                        )}
                        {(searchCriteria === "Overall" ||
                          searchCriteria === "CodeForces") && (
                          <td key={idx + "c"}>{val.codeforcesRating}</td>
                        )}
                        <td key={idx + "6"}>
                          <button
                            key={idx + "7"}
                            className="btn-success"
                            onClick={() => {
                              navigate(`/viewProfile/${val.email}`, {
                                state: props.data,
                              });
                            }}
                          >
                            View Profile
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {codingData === null ? (
              <p className="no-account">loading..</p>
            ) : (
              codingData.length === 0 && (
                <p className="no-account">No Account Found</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
