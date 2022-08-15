import React from "react";
import "../dashboard/editProfile.css";

const Education = (props) => {
  return props.educationList.map((val, idx) => {
    let instituteName = `inst-${idx}`;
    // ,
    //   start = `st-${idx}`,
    //   end = `end-${idx}`,
    let index = val.index;
    return (
      <div key={instituteName + "8"}>
        <div key={instituteName + "9"} className="flex-div-left-right-med-container">
          <div key={instituteName + "10"} className="flex-div-left-med-container">
            <div key={instituteName + "11"} className="flex-div-right-med-container-line">
              <input
                className="e-p-input"
                placeholder="Institute Name"
                key={instituteName + "1"}
                value={val.instituteName}
                disabled={!props.status}
                name="instituteName"
                onChange={(event) => props.update(idx, event)}
              />
              <input
                className="e-p-input degree-input"
                placeholder="Degree"
                key={instituteName + "2"}
                value={val.degreeName}
                disabled={!props.status}
                name="degreeName"
                onChange={(event) => props.update(idx, event)}
              />
            </div>
          </div>
          <div className="flex-div-right-med-container">
            <div className="flex-div-right-med-container-line">
              <input
                className="e-p-input endDate-input"
                value={val.startDate}
                key={instituteName + "3"}
                type="month"
                disabled={!props.status}
                name="startDate"
                onChange={(event) => props.update(idx, event)}
              />

              <input
                className="e-p-input endDate-input"
                value={val.endDate}
                key={instituteName + "4"}
                type="month"
                disabled={!props.status}
                name="endDate"
                onChange={(event) => props.update(idx, event)}
              />
              <input
                className="e-p-input grade-input"
                placeholder="Grade"
                key={instituteName + "5"}
                value={val.grade}
                disabled={!props.status}
                name="grade"
                onChange={(event) => props.update(idx, event)}
              />
              {props.status && (
                <button
                  className="btn-danger btn-minus"
                  type="button"
                  key={instituteName + "6"}
                  onClick={() => {
                    props.delete(index);
                  }}
                >
                  <i
                    key={instituteName + "7"}
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
