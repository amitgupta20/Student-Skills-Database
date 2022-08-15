import React from "react";
import "../dashboard/editProfile.css";
const ExperienceBox = (props) => {
    return props.experienceList.map((val, idx) => {
        let projectName = `inst-${idx}`
        // ,
        //   start = `st-${idx}`,
        //   end = `end-${idx}`,
        //   index = val.index;
        return (
          <div key={projectName + "1"} className="coloredBackground">
            <div key={projectName + "2"} className="name-dates">
              <input
                className="names form-control"
                placeholder="Organization Name"
                key={projectName + "3"}
                disabled
                value={val.organizationName}
                name="projectName"
              />
              <input
                className="startDate form-control"
                value={val.role}
                key={projectName + "4"}
                disabled
                name="startDate"
              />
              <input
                className="startDate form-control"
                value={val.startDate}
                key={projectName + "5"}
                type="month"
                disabled
                name="startDate"
              />
              <input
                className="endDate form-control"
                value={val.endDate}
                key={projectName + "6"}
                type="month"
                disabled
                name="endDate"
              />
              <input
                key={projectName + "7"}
                className="form-control grades"
                type="text"
                placeholder="Location"
                disabled
                value={val.location}
                name="location"
              />
            </div>
    
            <textarea
              key={projectName + "8"}
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