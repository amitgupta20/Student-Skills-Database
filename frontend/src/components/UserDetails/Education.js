import React from "react";
import "../dashboard/editProfile.css";

const Education = (props) => {
  return props.educationList.map((val, idx) => {
    let instituteName = `inst-${idx}`,
      start = `st-${idx}`,
      end = `end-${idx}`,
      index = val.index;
    return (
      <div>
        <div id={instituteName} className="flex-div-left-right-med-container">
          <div id={instituteName} className="flex-div-left-med-container">
            <div
              id={instituteName}
              className="flex-div-right-med-container-line"
            >
              <input
                className="e-p-input"
                placeholder="Institute Name"
                id={instituteName}
                value={val.instituteName}
                disabled={!props.status}
                name="instituteName"
                onChange={(event) => props.update(idx, event)}
              />
              <input
                className="e-p-input degree-input"
                placeholder="Degree"
                id={instituteName}
                value={val.degreeName}
                disabled={!props.status}
                name="degreeName"
                onChange={(event) => props.update(idx, event)}
              />
            </div>
          </div>
          <div id={instituteName} className="flex-div-right-med-container">
            <div
              id={instituteName}
              className="flex-div-right-med-container-line"
            >
              <input
                className="e-p-input endDate-input"
                value={val.startDate}
                id={instituteName}
                type="month"
                disabled={!props.status}
                name="startDate"
                onChange={(event) => props.update(idx, event)}
              />

              <input
                className="e-p-input endDate-input"
                value={val.endDate}
                id={instituteName}
                type="month"
                disabled={!props.status}
                name="endDate"
                onChange={(event) => props.update(idx, event)}
              />
              <input
                className="e-p-input grade-input"
                placeholder="Grade"
                id={instituteName}
                value={val.grade}
                disabled={!props.status}
                name="grade"
                onChange={(event) => props.update(idx, event)}
              />
              {props.status  && (
                <button
                  className="btn-danger btn-minus"
                  type="button"
                  id={instituteName}
                  onClick={() => {
                    props.delete(index);
                  }}
                >
                  <i
                    id={instituteName}
                    className="fa fa-minus"
                    aria-hidden="true"
                  ></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default Education;
