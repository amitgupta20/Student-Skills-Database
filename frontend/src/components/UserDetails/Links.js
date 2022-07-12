import React from "react";
import "../dashboard/editProfile.css";

const Links = (props) => {
  return props.linkList.map((val, idx) => {
    // console.log(val);
    let projectName = `inst-${idx}`,
      start = `st-${idx}`,
      end = `end-${idx}`,
      index = val.index;
    return (
      // <div id={projectName} className="flex-div-left-right-med-container">
      //   <div className="flex-div-left-med-container">
        <div className="flex-div-right-med-container-line link-div">
          <input
            className="e-p-input websiteName"
            placeholder="Link Name"
            id={projectName}
            disabled={!props.status}
            value={val.linkName}
            name="linkName"
            onChange={(event) => props.update(idx, event)}
          />
          <input
              className="e-p-input websiteLink"
              placeholder="Link"
              id={projectName}
              disabled={!props.status}
              value={val.link}
              name="link"
              onChange={(event) => props.update(idx, event)}
            />
          {props.status && (
              <button
                id={projectName}
                className="btn-danger btn-delete"
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
    );
  });
};

export default Links;
