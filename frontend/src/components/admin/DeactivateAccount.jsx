import { useEffect, useState } from "react";
import "./admin.css";
import axios from "axios";
const DeactivateAccount = (props) => {
  const [pendingAccounts, setPendingAccounts] = useState(null);
  async function deleteAccount(email) {
    await axios.post("https://levelup-lnm.herokuapp.com/users/deleteAccount", {
      email: email,
    });
    let newData = pendingAccounts.filter((val) => val.email != email);
    setPendingAccounts(newData);
  }
  async function deactivateAccount(email) {
    await axios.post(
      "https://levelup-lnm.herokuapp.com/users/deactivateAccount",
      {
        email: email,
      }
    );
    let newData = pendingAccounts.filter((val) => val.email != email);
    setPendingAccounts(newData);
  }
  useEffect(() => {
    axios
      .get("https://levelup-lnm.herokuapp.com/users/getActivatedNonStudent", {})
      .then(({ data }) => {
        let val = data.filter((val) => val.email != props.email);
        setPendingAccounts(val);
      });
  }, []);
  return (
    <div id="profileContainer">
      <div className="container">
        <div className="">
          <div className="section-title">
            <h2 className="admin-head-white">Deactivate Account</h2>
          </div>
          <div className="pending-account-table">
            <table className="table table-striped admin-side-table">
              <thead className="table-header">
                <tr className="">
                  <th>S No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Account Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {pendingAccounts !== null &&
                pendingAccounts.map((val, idx) => {
                  return (
                    <tr className="align-middle" id={idx}>
                      <td id={idx}>{idx + 1}</td>
                      <td id={idx}>{val.fullName}</td>
                      <td id={idx}>{val.email}</td>
                      <td id={idx}>{val.accountType}</td>
                      <td id={idx}>
                        <button
                          id={idx}
                          className="btn-warning"
                          onClick={() => deactivateAccount(val.email)}
                        >
                          Deactivate
                        </button>
                        <button
                          id={idx}
                          className="btn-danger"
                          onClick={() => deleteAccount(val.email)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </table>
            {pendingAccounts === null ? (
              <p className="no-account">Loading</p>
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

export default DeactivateAccount;
