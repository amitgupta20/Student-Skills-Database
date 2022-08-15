import React from "react";
import "../dashboard/editProfile.css";
const EducationBox = (props) => {
    return props.educationList.map((val, idx) => {
        let projectName = `inst-${idx}`
        // ,
        //   start = `st-${idx}`,
        //   end = `end-${idx}`,
        //   index = val.index;
        return (
          <div id={projectName + "6"} key={projectName + "6"} className="coloredBackground">
            <div id={projectName + "7"} key={projectName + "7"}  className="name-dates">
              <input
                className="names form-control"
                placeholder="Institute Name"
                id= {projectName + "1"}
                key={projectName + "1"} 
                disabled
                value={val.instituteName}
                name="instituteName"
              />
              <input
                className="degrees form-control"
                id={projectName + "2"}
                key={projectName + "2"} 
                placeholder="Degree"
                value={val.degreeName}
                disabled
                name="degreeName"
              />
              <input
                className="startDate form-control"
                value={val.startDate}
                id={projectName + "3"}
                key={projectName + "3"} 
                type="month"
                disabled
                name="startDate"
              />
              <input
                className="endDate form-control"
                value={val.endDate}
                id={projectName + "4"}
                key={projectName + "4"} 
                type="month"
                disabled
                name="endDate"
              />
              <input
                className="form-control grades"
                placeholder="Grade"
                disabled
                id={projectName + "5"}
                key={projectName + "5"} 
                value={val.grade}
                name="grade"
              />
            </div>
          </div>
        );
      });
}
 
export default EducationBox;