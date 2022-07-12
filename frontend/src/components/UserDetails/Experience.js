import React from "react";
import "../dashboard/editProfile.css";

const Experience = (props) => {
  return props.experienceList.map((val, idx) => {
    let experienceName = `inst-${idx}`,
      start = `st-${idx}`,
      end = `end-${idx}`,
      index = val.index;
    return (
      <div>
        <div id={experienceName} className="flex-div-left-right-med-container">
          <div id={experienceName} className="flex-div-left-med-container">
            <div className="flex-div-right-med-container-line">
              <input
                className="e-p-input"
                placeholder="Organization Name"
                id={experienceName}
                disabled={!props.status}
                value={val.organizationName}
                name="organizationName"
                onChange={(event) => props.update(idx, event)}
              />
              <input
                className="e-p-input degree-input"
                placeholder="Role"
                id={experienceName}
                disabled={!props.status}
                value={val.role}
                name="role"
                onChange={(event) => props.update(idx, event)}
              />
            </div>
          </div>
          <div className="flex-div-right-med-container">
            <div className="flex-div-right-med-container-line">
              <input
                className="e-p-input endDate-input"
                value={val.startDate}
                id={experienceName}
                type="month"
                disabled={!props.status}
                name="startDate"
                onChange={(event) => props.update(idx, event)}
              />

              <input
                className="e-p-input endDate-input"
                value={val.endDate}
                id={experienceName}
                type="month"
                disabled={!props.status}
                name="endDate"
                onChange={(event) => props.update(idx, event)}
              />

              <input
                className="e-p-input grade-input"
                type="text"
                placeholder="Location"
                disabled={!props.status}
                value={val.location}
                name="location"
                onChange={(event) => props.update(idx, event)}
              />
              {props.status  && (
                <button
                  id={experienceName}
                  className="btn-danger btn-minus"
                  type="button"
                  onClick={() => {
                    props.delete(index);
                  }}
                >
                  <i
                    id={experienceName}
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
          placeholder="Description"
          disabled={!props.status}
          value={val.description}
          name="description"
          onChange={(event) => props.update(idx, event)}
        />
      </div>
    );
  });
};

export default Experience;
