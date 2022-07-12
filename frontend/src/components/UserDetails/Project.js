import React from "react";
import "../dashboard/editProfile.css";

const Project = (props) => {
  return props.projectList.map((val, idx) => {
    let projectName = `inst-${idx}`,
      start = `st-${idx}`,
      end = `end-${idx}`,
      index = val.index;
    return (
      <div>
        <div id={projectName} className="flex-div-left-right-med-container">
          <div className="flex-div-left-med-container">
            
            <input
              className="e-p-input"
              placeholder="Project Name"
              id={projectName}
              disabled={!props.status}
              value={val.projectName}
              name="projectName"
              onChange={(event) => props.update(idx, event)}
            />
          </div>
          <div className="flex-div-right-med-container">
            <div className="flex-div-right-med-container-line">
              <input
                className="e-p-input endDate-input"
                value={val.startDate}
                id={projectName}
                type="month"
                disabled={!props.status}
                name="startDate"
                onChange={(event) => props.update(idx, event)}
              />

              <input
                className="e-p-input endDate-input"
                value={val.endDate}
                id={projectName}
                type="month"
                disabled={!props.status}
                name="endDate"
                onChange={(event) => props.update(idx, event)}
              />

              {props.status  && (
                <button
                  id={projectName}
                  className="btn-danger btn-minus"
                  type="button"
                  onClick={() => {
                    props.delete(index);
                  }}
                >
                  <i
                    id={projectName}
                    className="fa fa-minus"
                    aria-hidden="true"
                  ></i>
                </button>
              )}
            </div>
          </div>
        </div>
        <textarea
          className="e-p-input description"
          value={val.description}
          placeholder="Description"
          disabled={!props.status}
          name="description"
          onChange={(event) => props.update(idx, event)}
        />
        <input
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
