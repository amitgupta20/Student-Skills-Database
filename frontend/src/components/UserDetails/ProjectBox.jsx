import React from "react";
import { Button } from "react-bootstrap";
import "../dashboard/editProfile.css";
const ProjectBox = (props) => {
  return props.projectList.map((val, idx) => {
    let projectName = `inst-${idx}`,
      start = `st-${idx}`,
      end = `end-${idx}`,
      index = val.index;
    return (
      <div className="whiteBackground">
        <div className="name-dates">
          <input
            className="names form-control"
            placeholder="Project Name"
            id={projectName}
            disabled
            value={val.projectName}
            name="projectName"
          />
          <a href={val.link}><button className="link-btn btn btn-success">Go to Project</button> </a>
          <input
            className="startDate form-control"
            value={val.startDate}
            id={projectName}
            type="month"
            disabled
            name="startDate"
          />
          <input
            className="endDate form-control"
            value={val.endDate}
            id={projectName}
            type="month" 
            disabled
            name="endDate"
          />
        </div>

        <textarea
          className="card-description form-control"
          value={val.description}
          placeholder="Description"
          disabled
          name="description"
        />
        
        
         
      </div>
    );
  });
};

export default ProjectBox;
