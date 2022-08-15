import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProjectBox from "./UserDetails/ProjectBox";
import "./dashboard/editProfile.css";
const ProjectPresenter = ({ email, owner, reviewer }) => {
  axios.defaults.withCredentials = true;
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:2000/student/getStudentData", {
        email: email,
      })
      .then((response) => {
        setProjectList(response.data.projectList || []);
      });
  }, [email]);
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2 className="projectHead">Project Works</h2>
          <div className="ed-container">
            <div className="table">
              { projectList && projectList.length > 0 ? <ProjectBox
                projectList={projectList}
                owner={owner}
                reviewer={reviewer}
                creator={email}
              /> : <p> No Project Found </p>
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPresenter;
