import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProjectBox from "./UserDetails/ProjectBox";
import EducationBox from "./UserDetails/EducationBox";
import ExperienceBox from "./UserDetails/ExperienceBox";
import "./dashboard/editProfile.css";
const EduExpPresenter = () => {
  let navigate = useNavigate();
  let location = useLocation();
  axios.defaults.withCredentials = true;
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  useEffect(() => {
    axios
      .post("https://levelup-lnm.herokuapp.com/student/getStudentData", {
        email: location.state.email,
      })
      .then((response) => {
        setExperienceList(response.data.experienceList);

        setEducationList(response.data.educationList);
        // console.log(educationList);
      });
  }, [location.state.email]);
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="section-title changes2">
          <h2>Education</h2>
        </div>
        {/* <div className="name-dates">
            <div className="names">
              <p> Institute Name</p>
            </div>
            <div className="degree">
              <p>Degree</p>
            </div>
            <div className="startDate">
              <p>Start Date </p>
            </div>
            <div className="endDate">
              <p>End Date</p>
            </div>
            <div className="grades">
              <p>Grades</p>
            </div>
          </div> */}
        <div className="ed-container">
          <div className="table">
            {educationList.length > 0 ? (
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
            {experienceList.length > 0 ? (
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
