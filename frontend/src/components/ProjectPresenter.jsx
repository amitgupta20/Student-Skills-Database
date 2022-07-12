import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProjectBox from "./UserDetails/ProjectBox";
import "./dashboard/editProfile.css";
const ProjectPresenter = (props) => {
  let navigate = useNavigate();
  let location = useLocation();
  axios.defaults.withCredentials = true;
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    axios
      .post("https://levelup-lnm.herokuapp.com/student/getStudentData", {
        email: location.state.email,
      })
      .then((response) => {
        setProjectList(response.data.projectList);
      });
  }, [location.state.email]);
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2 className="projectHead">Project Works</h2>
          <div className="ed-container">
            <div className="table">
              <ProjectBox projectList={projectList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPresenter;
