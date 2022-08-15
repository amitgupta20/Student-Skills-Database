import React from "react";
import "../dashboard/editProfile.css";

const Links = (props) => {
  return props.linkList.map((val, idx) => {
    let projectName = `inst-${idx}`
    let index = val.index;
    return (
      // <div key={projectName} className="flex-div-left-right-med-container">
      //   <div className="flex-div-left-med-container">
        <div key={projectName + "1"} className="flex-div-right-med-container-line link-div">
          <input
            className="e-p-input websiteName"
            placeholder="Link Name"
            key={projectName + "2"}
            disabled={!props.status}
            value={val.linkName}
            name="linkName"
            onChange={(event) => props.update(idx, event)}
          />
          <input
              className="e-p-input websiteLink"
              placeholder="Link"
              key={projectName + "3"}
              disabled={!props.status}
              value={val.link}
              name="link"
              onChange={(event) => props.update(idx, event)}
            />
          {props.status && (
              <button
                key={projectName + "4"}
                className="btn-danger btn-delete"
                type="button"
                onClick={() => {
                  props.delete(index);
                }}
              >
                <i
                  key={projectName + "5"}
                  className="fa fa-minus"
                  aria-hidden="true"
                ></i>
              </button>
            )}
          </div>
    );
  });
};

export default Links;
