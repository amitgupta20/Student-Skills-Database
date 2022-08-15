import React from "react";
import { useState } from "react";
import axios from "axios";
import "../dashboard/editProfile.css";
const ProjectBox = (props) => {
  const [reviewsList, setreviewsList] = useState(null);
  const [getReviewBtnStatus, setGetReviewBtnStatus] = useState(false);
  const [clickedProjectIdx, setClickedProjectIdx] = useState(-1);
  const [reviewContent, setreviewContent] = useState("");

  const owner = props.owner;
  async function deleteRequest(reviewId) {
    try {
      await axios.post("http://localhost:2000/student/deleteProjectReview", {
        reviewId: reviewId,
      });
      let data = reviewsList.filter((val) => val._id !== reviewId);
      setreviewsList(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function postReview(projectId) {
    try {
      await axios.post("http://localhost:2000/users/addReview", {
        projectId: projectId,
        content: reviewContent,
        creatorEmail: props.creator,
        reviewerEmail: props.reviewer,
      });
      setreviewContent("");
      setGetReviewBtnStatus(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function getReview(projectId) {
    try {
      const { data } = await axios.post(
        "http://localhost:2000/student/getProjectReviews", {
          projectId: projectId,
        }
      );
      setreviewsList(data);
    } catch (error) {
      console.log(error);
    }
  }

  return props.projectList.map((val, idx) => {
    let projectName = `inst-${idx}`;
      // start = `st-${idx}`,
      // end = `end-${idx}`,
      // index = val.index;
    return (
      <div key={projectName + "1"} className="whiteBackground">
        <div key={projectName + "2"} className="name-dates">
          <input
            className="names form-control"
            placeholder="Project Name"
            key={projectName + "3"}
            disabled
            value={val.projectName}
            name="projectName"
          />
          <a key={projectName + "4"} target="_blank" href={val.link}>
            <button key={projectName + "5"} className="link-btn btn btn-success">Go to Project</button>{" "}
          </a>
          <input
            className="startDate form-control"
            value={val.startDate}
            key={projectName + "6"}
            type="month"
            disabled
            name="startDate"
          />
          <input
            className="endDate form-control"
            value={val.endDate}
            key={projectName + "7"}
            type="month"
            disabled
            name="endDate"
          />
          <button
            type="button"
            className="show-review-btn"
            key={projectName + "8"}
            onClick={() => {
              if (!getReviewBtnStatus) getReview(val._id);
              else setreviewsList(null);
              setGetReviewBtnStatus(!getReviewBtnStatus);
              setClickedProjectIdx(val._id);
            }}
          >
            {!owner
              ? "Give Review"
              : getReviewBtnStatus && clickedProjectIdx === val._id
              ? "Hide Reviews"
              : "Get Reviews"}
          </button>
        </div>

        <textarea
          className=" form-control card-description"
          value={val.description}
          key={projectName + "9"}
          placeholder="Description"
          disabled
          name="description"
        />
        {getReviewBtnStatus && clickedProjectIdx === val._id && (
          <div key={projectName + "10"} className="">
            <h3 key={projectName + "11"} className="text-center" style={{ color: "black" }}>
              {owner ? "Reviews" : "Give Reviews"}
            </h3>
            {owner ? (
              <div key={projectName + "12"} className="pending-account-table">
                <table key={projectName + "13"} className="table table-striped admin-side-table">
                  <thead key={projectName + "14"} className="table-header">
                    <tr key={projectName + "15"} className="">
                      <th key={projectName + "16"}>S No.</th>
                      <th key={projectName + "17"}>Reviewer</th>
                      <th key={projectName + "18"}>Review</th>
                      <th key={projectName + "19"}>Actions</th>
                    </tr>
                  </thead>
                  {reviewsList !== null &&
                    reviewsList.map((val, idx) => {
                      return (
                        <tr className="align-middle" key={idx + "20"}>
                          <td key={idx + "21"}>{idx + 1}</td>
                          <td key={idx + "22"}>{val.reviewerEmail}</td>
                          <td key={idx + "23"}>{val.content}</td>
                          <td key={idx + "24"}>
                            <button
                              key={idx + "25"}
                              className="btn-danger"
                              onClick={() => deleteRequest(val._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </table>
                {reviewsList === null ? (
                  <p key={projectName + "26"} className="no-account">Loading</p>
                ) : (
                  reviewsList.length === 0 && (
                    <p key={projectName + "27"} className="no-account">No Reviews</p>
                  )
                )}
              </div>
            ) : (
              <div key={projectName + "28"} className="give-review-cont">
                <textarea
                  key={projectName + "29"}
                  className="form-control review-box"
                  val={reviewContent}
                  onChange={(e) => setreviewContent(e.target.value)}
                />
                <button
                  key={projectName + "30"}
                  className="btn-success review-submit"
                  onClick={() => postReview(val._id)}
                >
                  Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  });
};

export default ProjectBox;
