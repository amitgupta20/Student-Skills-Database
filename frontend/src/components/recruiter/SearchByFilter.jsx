import React from "react";
// import "./styles.css";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchByFilter = (props) => {
  let navigate = useNavigate();
  const [country, setCountry] = useState("India");
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [profiles, setProfiles] = useState(null);
  const [fetchStatus, setFetchStatus] = useState("Enter Filter");

  // console.log(country);
  const [skills, setSkills] = useState([]);
  function handleKeyDown(e) {
    if (e.key === "Enter") e.preventDefault();
    if (e.key !== "Enter") return false;
    const value = e.target.value;
    if (!value.trim()) return false;
    setSkills([...skills, value]);
    e.target.value = "";
    return false;
  }
  function removeSkills(index) {
    setSkills(skills.filter((skills, idx) => idx !== index));
  }
  // console.log(skills);

  const SearchProfile = () => {
    setFetchStatus("loading");
    axios
      .post("http://localhost:2000/student/filterProfiles", {
        state: state,
        country: country,
        city: city,
        skills: skills,
      })
      .then(({ data }) => {
        let val = data.filter((val) => val.email != props.email);
        setProfiles(val);
        // console.log(data);
      });
  };

  return (
    <div className="image-container-admin">
      <div className="container">
        <div className="admincc">
          <div className="section-title">
            <div className="section-title">
              <h2 className="admin-head-black">Filter Profiles </h2>
            </div>
            <h3>Location</h3>
            <div className="tags-input-container">
              <CountryDropdown
                value={country}
                onChange={(val) => setCountry(val)}
              />

              <RegionDropdown
                country={country}
                value={state}
                onChange={(val) => setState(val)}
              />
            </div>
            <div className="skills-adder">
              <h3>Skills</h3>
              <div className="tags-input-container">
                {skills.map((skills, index) => (
                  <div className="tag-item" key={index} id={index}>
                    <span className="tags-text">{skills}</span>
                    {
                      <span
                        className="tags-close"
                        onClick={() => removeSkills(index)}
                      >
                        &times;
                      </span>
                    }
                  </div>
                ))}

                {skills.length < 4 && (
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    id="skills-add"
                    className="tags-input"
                    placeholder="Enter Skill"
                  />
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={SearchProfile}
              className="btn-success filter-btn-skills"
            >
              Filter
            </button>
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
                  {profiles &&
                    profiles.map((val, idx) => {
                      return (
                        <tr className="align-middle" key={idx + "1"}>
                          <td key={idx + "2"}>{idx + 1}</td>
                          <td key={idx + "3"}>{val.name}</td>
                          <td key={idx + "4"}>{val.email}</td>
                          {/* <td key={idx + "5"}> {val.accountType}</td> */}
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
              {profiles === null ? (
                <p className="no-account">{fetchStatus}</p>
              ) : (
                profiles.length === 0 && (
                  <p className="no-account">No Account Found</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchByFilter;
