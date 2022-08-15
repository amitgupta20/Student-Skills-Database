import { useEffect, useState } from "react";
import "./recruiter.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const SearchByEmail = (props) => {
  const [pendingAccounts, setPendingAccounts] = useState(null);
  const [emailId, setEmailId] = useState("");
  const [fetchStatus, setFetchStatus] = useState("Enter Filter");
  let navigate = useNavigate();
  //   let location = useLocation();
  //   console.log(location.state);
  //   useEffect(() => {

  //   }, []);
  const getData = () => {
    // console.log(emailId);
    setFetchStatus("loading");
    axios
      .post("http://localhost:2000/student/filterProfiles", { email: emailId })
      .then(({ data }) => {
        setPendingAccounts(data);
      });
  };

  return (
    <div id="profileContainer" className="deactivate-container">
      <div className="container">
        <div className="">
          <div className="section-title">
            <h2 className="admin-head-white">Search Profile through Email</h2>
          </div>
          <div className="find-using-email">
            <p>Enter Email : </p>
            <input
              type="String"
              name="emailId"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            ></input>
            <button placeholder="Enter Email " onClick={getData} className="btn-warning">
              Find Account
            </button>
          </div>

          <div className="pending-account-table">
            <table className="table table-striped admin-side-table">
              <thead className="table-header">
                <tr className="">
                  <th>S No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingAccounts !== null &&
                  pendingAccounts.map((val, idx) => {
                    return (
                      <tr className="align-middle" key={idx + "1"}>
                        <td key={idx + "2"}>{idx + 1}</td>
                        <td key={idx + "3"}>{val.fullName}</td>
                        <td key={idx + "4"}>{val.email}</td>
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
            {pendingAccounts === null ? (
              <p className="no-account">{fetchStatus}</p>
            ) : (
              pendingAccounts.length === 0 && (
                <p className="no-account">No Account Found</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchByEmail;
