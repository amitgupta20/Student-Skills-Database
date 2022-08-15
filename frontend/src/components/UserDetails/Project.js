import React from "react";
import "../dashboard/editProfile.css";

const Project = (props) => {
  return props.projectList.map((val, idx) => {
    let projectName = `inst-${idx}`
    // ,
    //   start = `st-${idx}`,
    //   end = `end-${idx}`,
    let  index = val.index;
    return (
      <div key={projectName + "1"}>
        <div key={projectName + "2"} className="flex-div-left-right-med-container">
          <div key={projectName + "3"} className="flex-div-left-med-container">
            
            <input
              className="e-p-input"
              placeholder="Project Name"
              key={projectName + "4"}
              disabled={!props.status}
              value={val.projectName}
              name="projectName"
              onChange={(event) => props.update(idx, event)}
            />
          </div>
          <div key={projectName + "5"} className="flex-div-right-med-container">
            <div key={projectName + "6"} className="flex-div-right-med-container-line">
              <input
                className="e-p-input endDate-input"
                value={val.startDate}
                key={projectName + "7"}
                type="month"
                disabled={!props.status}
                name="startDate"
                onChange={(event) => props.update(idx, event)}
              />

              <input
                className="e-p-input endDate-input"
                value={val.endDate}
                key={projectName + "8"}
                type="month"
                disabled={!props.status}
                name="endDate"
                onChange={(event) => props.update(idx, event)}
              />

              {props.status  && (
                <button
                  key={projectName + "9"}
                  className="btn-danger btn-minus"
                  type="button"
                  onClick={() => {
                    props.delete(index);
                  }}
                >
                  <i
                    key={projectName + "10"}
                    className="fa fa-minus"
                    aria-hidden="true"
                  ></i>
                </button>
              )}
            </div>
          </div>
        </div>
        <textarea
          key={projectName + "11"}
          className="e-p-input description"
          value={val.description}
          placeholder="Description"
          disabled={!props.status}
          name="description"
          onChange={(event) => props.update(idx, event)}
        />
        <input
          key={projectName + "12"}
          className="e-p-input link-input"
          type="text"
          value={val.link}
          placeholder="Link"
          disabled={!props.status}
          name="link"
          onChange={(event) => props.update(idx, event)}
        />
      </div>
    );
  });
};

export default Project;
