import React from "react";
import "../dashboard/editProfile.css";
const EducationBox = (props) => {
    return props.educationList.map((val, idx) => {
        let projectName = `inst-${idx}`,
          start = `st-${idx}`,
          end = `end-${idx}`,
          index = val.index;
        return (
          <div className="coloredBackground">
            <div className="name-dates">
              <input
                className="names form-control"
                placeholder="Institute Name"
                id={projectName}
                disabled
                value={val.instituteName}
                name="instituteName"
              />
              <input
                className="degrees form-control"
                id={projectName}
                placeholder="Degree"
                value={val.degreeName}
                disabled
                name="degreeName"
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
                placeholder="Grade"
                disabled
                id={projectName}
                value={val.grade}
                name="grade"
              />
            </div>
          </div>
        );
      });
}
 
export default EducationBox;