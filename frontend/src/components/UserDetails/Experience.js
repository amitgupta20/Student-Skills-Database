import React from "react";
import "../dashboard/editProfile.css";

const Experience = (props) => {
  return props.experienceList.map((val, idx) => {
    let experienceName = `inst-${idx}`
    // ,
    //   start = `st-${idx}`,
    //   end = `end-${idx}`,
    let index = val.index;
    return (
      <div key={experienceName + "14"}>
        <div key={experienceName + "1"} className="flex-div-left-right-med-container">
          <div key={experienceName + "2"} className="flex-div-left-med-container">
            <div key={experienceName + "3"} className="flex-div-right-med-container-line">
              <input
                className="e-p-input"
                placeholder="Organization Name"
                key={experienceName + "4"}
                disabled={!props.status}
                value={val.organizationName}
                name="organizationName"
                onChange={(event) => props.update(idx, event)}
              />
              <input
                className="e-p-input degree-input"
                placeholder="Role"
                key={experienceName + "5"}
                disabled={!props.status}
                value={val.role}
                name="role"
                onChange={(event) => props.update(idx, event)}
              />
            </div>
          </div>
          <div key={experienceName + "6"} className="flex-div-right-med-container">
            <div key={experienceName + "7"} className="flex-div-right-med-container-line">
              <input
                className="e-p-input endDate-input"
                value={val.startDate}
                key={experienceName + "8"}
                type="month"
                disabled={!props.status}
                name="startDate"
                onChange={(event) => props.update(idx, event)}
              />

              <input
                className="e-p-input endDate-input"
                value={val.endDate}
                key={experienceName + "9"}
                type="month"
                disabled={!props.status}
                name="endDate"
                onChange={(event) => props.update(idx, event)}
              />

              <input
                key={experienceName + "10"}
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
                  key={experienceName + "11"}
                  className="btn-danger btn-minus"
                  type="button"
                  onClick={() => {
                    props.delete(index);
                  }}
                >
                  <i
                    key={experienceName + "12"}
                    className="fa fa-minus"
                    aria-hidden="true"
                  ></i>
                </button>
              )}
            </div>
          </div>
        </div>
        <textarea
          key={experienceName + "13"}
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
