import React from "react";
import "../dashboard/editProfile.css";
const ExperienceBox = (props) => {
    return props.experienceList.map((val, idx) => {
        let projectName = `inst-${idx}`,
          start = `st-${idx}`,
          end = `end-${idx}`,
          index = val.index;
        return (
          <div className="coloredBackground">
            <div className="name-dates">
              <input
                className="names form-control"
                placeholder="Organization Name"
                id={projectName}
                disabled
                value={val.organizationName}
                name="projectName"
              />
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
              <input
                className="form-control grades"
                type="text"
                placeholder="Location"
                disabled
                value={val.location}
                name="location"
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
}
 
export default ExperienceBox;