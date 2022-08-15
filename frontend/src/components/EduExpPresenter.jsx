import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProjectBox from "./UserDetails/ProjectBox";
import EducationBox from "./UserDetails/EducationBox";
import ExperienceBox from "./UserDetails/ExperienceBox";
import "./dashboard/editProfile.css";
const EduExpPresenter = ({ email }) => {
  axios.defaults.withCredentials = true;
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:2000/student/getStudentData", {
        email: email,
      })
      .then((response) => {
        setExperienceList(response.data.experienceList || []);
        setEducationList(response.data.educationList || []);
      });
  }, [email]);
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="section-title changes2">
          <h2>Education</h2>
        </div>
        <div className="ed-container">
          <div className="table">
            { educationList && educationList.length > 0 ? (
              <EducationBox educationList={educationList} />
            ) : (
              <p className="nothing-found">No Education History</p>
            )}
          </div>
        </div>
      </div>
      <div className="container  exp-head-margin">
        <div className="section-title changes2">
          <h2 className="">Experience</h2>
        </div>
        <div className="ed-container">
          <div className="table">
            { experienceList && experienceList.length > 0 ? (
              <ExperienceBox experienceList={experienceList} />
            ) : (
              <p className="nothing-found">No Experience Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduExpPresenter;
