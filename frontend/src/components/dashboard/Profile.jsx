import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import "./profilePhoto.scss";
import { useState, useEffect } from "react";
import axios from "axios";
const Profile = (props) => {
  axios.defaults.withCredentials = true;
  let navigate = useNavigate();
  const owner = props.owner;
  const [navBtnClicked, setNavBtnClicked] = useState(false);
  const [invalidSize, setInvalidSize] = useState(false);
  const [profileId, setProfileId] = useState(
    "cb39525a549b2cfc9229f27e688de644.jpg"
  );
  const emailId = props.email;
  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [skills, setSkills] = useState();
  const [worklink, setWorklink] = useState();
  const [rollno, setRollno] = useState();
  const [mobno, setMobno] = useState();
  const [totalProjects, settotalProjects] = useState(0);
  const [totalExpereince, settotalExpereince] = useState(0);
  const [doubtsSolved, setDoubtsSolved] = useState(0);

  useEffect(() => {
    axios
      .post("http://localhost:2000/student/getStudentData", {
        email: emailId,
      })
      .then((response) => {
        // console.log(response.data.profilePhotoId);
        setName(response.data.name || "");
        setBio(response.data.bio || "");
        setSkills(response.data.skills || []);
        setWorklink(response.data.linkList || []);
        settotalProjects(response.data.projectList.length || 0);
        settotalExpereince(response.data.experienceList.length || 0);
        setRollno(response.data.rollNumber || "");
        setMobno(response.data.mobileNumber || "");
        setDoubtsSolved(response.data.doubtSolved || 0);
        setProfileId(response.data.profilePhotoId);
      });
  }, [emailId]);

  const setProfileImage = async () => {
    let data = await axios.get(
      `http://localhost:2000/users/image/${profileId}` , { responseType: 'blob' }
    );
    const imgFile = new File([data.data], {
      type: data.headers["content-type"],
    });
    const fileURL = URL.createObjectURL(imgFile);
    let image = document.getElementById("output");
    image.src = fileURL;
  };

  useEffect(() => {
    setProfileImage();
  }, [profileId]);

  var loadFile = async function (event) {
    let photo = event.target.files[0];
    if (photo.size > 161400) {
      setInvalidSize(true);
    } else {
      let image = document.getElementById("output");
      let formData = new FormData();
      formData.append("file", photo);
      formData.append("email", emailId);
      // await axios.delete("http://localhost:2000/users/files/" + profileId);
      let { data } = await axios.post(
        "http://localhost:2000/users/uploadProfilePhoto",
        formData
      );
      if (data === "Uploaded") image.src = URL.createObjectURL(photo);
    }
  };
  return (
    <div id="profileContainer">
      <div className="container">
        <div className="emp-profile">
          <form method="post">
            <div className="row">
              <div className="col-md-3">
                {/* <div className="profile-img"> */}
                {/* <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                    alt=""
                  /> */}
                <div className="profile-pic">
                  <label className="-label" htmlFor="file">
                    {owner && (
                      <>
                        <i className="fa fa-camera" />
                        <span>Change Profile</span>
                      </>
                    )}
                  </label>
                  {owner && (
                    <input
                      id="file"
                      accept="image/png, image/jpeg"
                      type="file"
                      onChange={loadFile}
                    />
                  )}
                  <img src="" id="output" alt="no-image" height="200" />
                  {invalidSize && <p>Invalid Size</p>}
                </div>
                {/* </div> */}
              </div>
              <div className="col-md-7">
                <div className="profile-head">
                  <h5>{name}</h5>
                  <h6>{bio}</h6>
                  {/* <p className="proile-rating">
                    RANKINGS : <span>8/10</span>
                  </p> */}
                  <ul className="nav nav-pills" id="myTab" role="tablist">
                    <li key={"xyz"} id={"xyz"} className="nav-item">
                      <a
                        key={"004"}
                        className={
                          navBtnClicked
                            ? "nav-link default-active-nav"
                            : "nav-link active-default-pill default-active-nav"
                        }
                        id="home-tab"
                        data-toggle="tab"
                        onClick={() => setNavBtnClicked(true)}
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        About
                      </a>
                    </li>
                    <li key={"xyyxxx"} id={"xyzz"} className="nav-item">
                      <a
                        key={"cgvgh"}
                        onClick={() => setNavBtnClicked(true)}
                        className="nav-link "
                        id="profile-tab"
                        data-toggle="tab"
                        href="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Timeline
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                {owner && (
                  <input
                    onClick={() => {
                      navigate("/editProfile", { state: emailId });
                    }}
                    type="submit"
                    className="profile-edit-btn"
                    name="btnAddMore"
                    value="EditProfile"
                  />
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="profile-work">
                  <p>WORK LINK</p>
                  {worklink ? (
                    worklink.map((worklink, index) => (
                      <>
                        <a target="_blank" href={worklink.link} key={index + "1"}>
                          {worklink.linkName}
                        </a>
                        <br key={index + "2"} />
                      </>
                    ))
                  ) : (
                    <>Not Mentioned</>
                  )}
                  <p>SKILLS</p>
                  {/* <a href="">Web Designer</a>
                  <br />
                  <a href="">Web Developer</a>
                  <br />
                  <a href="">WordPress</a>
                  <br />
                  <a href="">WooCommerce</a>
                  <br />
                  <a href="">PHP, .Net</a> */}
                  {skills ? (
                    skills.map((skill, index) => (
                      <>
                        <a key={index + "1"}>{skill}</a>
                        <br key={index + "2"} />
                      </>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="col-md-9">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>Roll Number</label>
                      </div>
                      <div className="col-md-6">
                        <p>{rollno}</p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>{emailId}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6">
                        <p>{mobno}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Profession</label>
                      </div>
                      <div className="col-md-6">
                        <p>{bio}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>Codeforces Rating</label>
                      </div>
                      <div className="col-md-6">
                        <p>NA</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>CodeChef Rating</label>
                      </div>
                      <div className="col-md-6">
                        <p>NA</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Questions Solved</label>
                      </div>
                      <div className="col-md-6">
                        <p>230</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Doubts Solved</label>
                      </div>
                      <div className="col-md-6">
                        <p>{doubtsSolved}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Total Projects</label>
                      </div>
                      <div className="col-md-6">
                        <p>{totalProjects}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Total Experience</label>
                      </div>
                      <div className="col-md-6">
                        <p>{totalExpereince}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
