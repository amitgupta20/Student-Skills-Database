import React, { useEffect, useState } from "react";
import Education from "../UserDetails/Education";
import Experience from "../UserDetails/Experience";
import { Navbar } from "../../Navbar";
import { DashboardNavigation } from "../DashboardNavigation";
import "./editProfile.css";
import Project from "../UserDetails/Project";
import Links from "../UserDetails/Links";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const EditProfile = ({ status, email , pending ,username}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [saveBtnStatus, setSaveBtnStatus] = useState(true);
  const emailId = email || location.state;
  // console.log(location);
  const [info, setInfo] = useState({
    name: "",
    rollNumber: "",
    profilePhotoId: "cb39525a549b2cfc9229f27e688de644.jpg",
    email: emailId,
    mobileNumber: "",
    country: "",
    state: "",
    district: "",
    pincode: "",
    bio: "",
    address: "",
    codeforces: "",
    codechef: "",
    leetcode: "",
  });

  const [skills, setSkills] = useState([]);
  function handleKeyDown(e) {
    if (e.key === "Enter") e.preventDefault();
    if (e.key !== "Enter") return false;
    const value = e.target.value;
    if (!value.trim()) return false;
    setSkills([...skills, value]);
    e.target.value = "";
    return false;
  }
  function removeSkills(index) {
    setSkills(skills.filter((skills, idx) => idx !== index));
  }
  // Links
  const [linkCount, setLinkCount] = useState(0);
  const [linkList, setLinkList] = useState([
    {
      index: linkCount,
      linkName: "",
      link: "",
    },
  ]);

  const addNewLink = () => {
    const newLink = {
      index: linkCount + 1,
      linkName: "",
      link: "",
    };
    setLinkCount(linkCount + 1);
    setLinkList([...linkList, newLink]);
  };

  const handleLinkChange = (index, event) => {
    const linkTemporay = [...linkList];
    linkTemporay[index][event.target.name] = event.target.value;
    setLinkList(linkTemporay);
  };

  const deleteLink = (index) => {
    const newLinkList = linkList.filter((s) => index !== s.index);
    setLinkList(newLinkList);
  };

  // For Education List
  const [educationCount, setEducationCount] = useState(0);
  const [educationList, setEducationList] = useState([
    {
      index: educationCount,
      instituteName: "",
      degreeName: "",
      startDate: "2021-04",
      endDate: "2022-06",
      grade: "",
    },
  ]);

  const addNewEducation = () => {
    const newEducation = {
      index: educationCount + 1,
      instituteName: "",
      degreeName: "",
      startDate: "2021-04",
      endDate: "2022-06",
      grade: "",
    };
    setEducationCount(educationCount + 1);
    setEducationList([...educationList, newEducation]);
  };

  const handleEducationChange = (index, event) => {
    const educationTemporay = [...educationList];
    educationTemporay[index][event.target.name] = event.target.value;
    setEducationList(educationTemporay);
  };

  const deleteEducation = (index) => {
    const newEducationList = educationList.filter((s) => index !== s.index);
    setEducationList(newEducationList);
  };

  //For Experience List
  const [experienceCount, setExperienceCount] = useState(0);
  const [experienceList, setExperienceList] = useState([
    {
      index: experienceCount,
      organizationName: "",
      startDate: "2021-04",
      endDate: "2022-06",
      role: "",
      location: "",
      description: "",
    },
  ]);

  const addNewExperience = () => {
    const newExperience = {
      index: experienceCount + 1,
      organizationName: "",
      startDate: "2021-04",
      endDate: "2022-06",
      role: "",
      location: "",
      description: "",
    };
    setExperienceCount(experienceCount + 1);
    setExperienceList([...experienceList, newExperience]);
  };

  const handleExperienceChange = (index, event) => {
    const experienceTemporary = [...experienceList];
    experienceTemporary[index][event.target.name] = event.target.value;
    setExperienceList(experienceTemporary);
  };

  const deleteExperience = (index) => {
    const newExperienceList = experienceList.filter((s) => index !== s.index);
    setExperienceList(newExperienceList);
  };

  // For Project List

  const [projectCount, setProjectCount] = useState(0);
  const [projectList, setProjectList] = useState([
    {
      index: projectCount,
      projectName: "",
      startDate: "2021-04",
      endDate: "2022-06",
      link: "",
      description: "",
    },
  ]);

  const addNewProject = () => {
    const newProject = {
      index: projectCount + 1,
      projectName: "",
      startDate: "2021-04",
      endDate: "2022-06",
      link: "",
      description: "",
    };
    setProjectCount(projectCount + 1);
    setProjectList([...projectList, newProject]);
  };

  const handleProjectChange = (index, event) => {
    const ProjectTemporary = [...projectList];
    ProjectTemporary[index][event.target.name] = event.target.value;
    setProjectList(ProjectTemporary);
  };

  const deleteProject = (index) => {
    const newProjectList = projectList.filter((s) => index !== s.index);
    setProjectList(newProjectList);
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    let emails = email || location.state;
    axios
      .post("http://localhost:2000/student/getStudentData", {
        email: emails,
        pending : pending || false
      })
      .then(({ data }) => {
        // console.log("Inside DATA ", data);
        if (data) {
          let temporaryInfo = {
            name: data.name,
            profilePhotoId : data.profilePhotoId,
            rollNumber: data.rollNumber,
            email: emails,
            mobileNumber: data.mobileNumber,
            country: data.country,
            state: data.state,
            district: data.district,
            pincode: data.pincode,
            bio: data.bio,
            address: data.address,
            codeforces: data.codeforces,
            codechef: data.codechef,
            leetcode: data.leetcode,
          };
          setInfo(temporaryInfo);
          setEducationList(data.educationList);
          setEducationCount(data.educationList.length - 1);
          setExperienceList(data.experienceList);
          setExperienceCount(data.experienceList.length - 1);
          setProjectList(data.projectList);
          setProjectCount(data.projectList.length - 1);
          setLinkList(data.linkList);
          setLinkCount(data.linkList.length - 1);
          setSkills(data.skills);
        }
      });
  }, []);

  const saveDetails = async (e) => {
    e.preventDefault();
    // console.log("KEY", e.key);
    if (e.key === "Enter") return;
    try {
      // console.log("INFO", info);
      let education = educationList.filter((val) => val.instituteName.length > 0);
      let experience = experienceList.filter((val) => val.organizationName.length > 0);
      let project = projectList.filter((val) => val.projectName.length > 0);
      let links = linkList.filter((val) => val.linkName.length > 0);
      console.log(project);
      // await setEducationList(education);
      // await setExperienceList(experience);
      // await setProjectList(project);
      // await setLinkList(links);
      // console.log(educationList);
      let fullDetails = { ...info };
      fullDetails["skills"] = JSON.stringify(skills);
      fullDetails["linkList"] = JSON.stringify(links);
      fullDetails["educationList"] = JSON.stringify(education);
      fullDetails["experienceList"] = JSON.stringify(experience);
      fullDetails["projectList"] = JSON.stringify(project);
      console.log(fullDetails);
      const responce = await axios.post(
        "http://localhost:2000/student/editProfile",
        fullDetails
      );
      if (responce)
        navigate("/dashboard", {
          state: { email: emailId, fullName: info.name },
        });
      else alert("Error Occured!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="background-body-for-editProfile">
      <DashboardNavigation username={username || "My Account"} />
      <div
        className="edu-personal-info"
        style={status ? { "margin-top": "20px", "margin-bottom": "20px" } : {}}
      >
        <div className="details-container">
          <form onSubmit={saveDetails}>
            <div className="details-container-personal-info">
              <h3 className="text-center">Personal Information</h3>
              <hr className="line-practice-head"></hr>
              <div className="flex-div-left-right">
                <div className="flex-div-left">
                  <input
                    className="e-p-input"
                    placeholder="Full Name*"
                    name="name"
                    value={info?.name}
                    disabled={status}
                    onChange={handleChange}
                  />
                  <input
                    className="e-p-input"
                    placeholder="Email id*"
                    name="email"
                    disabled
                    value={info?.email}
                  />
                  <input
                    className="e-p-input"
                    placeholder="CodeForces Handle*"
                    name="codeforces"
                    disabled={status}
                    onChange={handleChange}
                    value={info?.codeforces}
                  />
                  <div className="small-left-right">
                    <input
                      className="e-p-input"
                      placeholder="Country*"
                      name="country"
                      disabled={status}
                      value={info?.country}
                      onChange={handleChange}
                    />
                    <input
                      className="e-p-input"
                      name="state"
                      disabled={status}
                      placeholder="State*"
                      value={info?.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex-div-right">
                  <input
                    className="e-p-input"
                    placeholder="Roll Number*"
                    name="rollNumber"
                    disabled={status}
                    value={info?.rollNumber}
                    onChange={handleChange}
                  />
                  <input
                    className="e-p-input"
                    placeholder="Mobile no.*"
                    type="tel"
                    disabled={status}
                    name="mobileNumber"
                    value={info?.mobileNumber}
                    onChange={handleChange}
                  />

                  <div className="small-left-right">
                    <input
                      className="e-p-input"
                      id="district"
                      disabled={status}
                      placeholder="Codechef Handle*"
                      name="codechef"
                      value={info?.codechef}
                      onChange={handleChange}
                    />

                    <input
                      className="e-p-input"
                      name="leetcode"
                      disabled={status}
                      placeholder="Leetcode Handle*"
                      value={info?.leetcode}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="small-left-right">
                    <input
                      className="e-p-input"
                      id="district"
                      disabled={status}
                      placeholder="City*"
                      name="district"
                      value={info?.district}
                      onChange={handleChange}
                    />

                    <input
                      className="e-p-input"
                      name="pincode"
                      disabled={status}
                      placeholder="Pincode*"
                      value={info?.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <input
                className="e-p-input"
                placeholder="Your Address"
                name="address"
                disabled={status}
                value={info?.address}
                onChange={handleChange}
              />

              <input
                className="e-p-input"
                name="bio"
                disabled={status}
                placeholder="Profession*"
                value={info?.bio}
                onChange={handleChange}
              />
              {/* <input
                className="e-p-input"
                placeholder="Your permanent address*"
                name="permanentAdd"
                value={info?.permanentAdd}
                onChange={handleChange}
              /> */}
            </div>
            <div className="skills-adder">
              <h3>Skills</h3>
              <div className="tags-input-container">
                {skills.map((skills, index) => (
                  <div className="tag-item" key={index} id={index}>
                    <span className="tags-text">{skills}</span>
                    {!status && (
                      <span
                        className="tags-close"
                        onClick={() => !status && removeSkills(index)}
                      >
                        &times;
                      </span>
                    )}
                  </div>
                ))}

                {!status && skills.length < 4 && (
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    disabled={status}
                    id="skills-add"
                    className="tags-input"
                    placeholder="Enter Skill"
                  />
                )}
              </div>
            </div>

            <div className="details-container-education">
              <div className="ed-container">
                <h3>Website Links</h3>
                {!status && linkList.length < 4 && (
                  <button
                    type="button"
                    disabled={status}
                    onClick={addNewLink}
                    className=" btn-success btn-adder"
                  >
                    <i className="fa fa-plus" />
                  </button>
                )}
              </div>
              <div className="ed-container">
                <div className="table">
                  <Links
                    status={!status}
                    update={handleLinkChange}
                    delete={deleteLink}
                    linkList={linkList}
                  />
                </div>
              </div>
            </div>

            <div className="details-container-education mt-4">
              <div className="ed-container">
                <h3>Education</h3>
                {!status && (
                  <button
                    type="button"
                    disabled={status}
                    onClick={addNewEducation}
                    className=" btn-success btn-adder"
                  >
                    <i className="fa fa-plus" />
                  </button>
                )}
              </div>
              <div className="ed-container">
                <div className="table">
                  <Education
                    status={!status}
                    update={handleEducationChange}
                    delete={deleteEducation}
                    educationList={educationList}
                  />
                </div>
              </div>
            </div>

            <div className="details-container-education mt-4">
              <div className="ed-container">
                <h3>Experience</h3>
                {!status && (
                  <button
                    type="button"
                    disabled={status}
                    onClick={addNewExperience}
                    className=" btn-success btn-adder"
                  >
                    <i className="fa fa-plus" />
                  </button>
                )}
              </div>
              <div className="ed-container">
                <div className="table">
                  <Experience
                    status={!status}
                    update={handleExperienceChange}
                    delete={deleteExperience}
                    experienceList={experienceList}
                  />
                </div>
              </div>
            </div>
            <div className="details-container-education mt-4">
              <div className="ed-container">
                <h3>Projects</h3>
                {!status && (
                  <button
                    disabled={status}
                    type="button"
                    onClick={addNewProject}
                    className=" btn-success btn-adder"
                  >
                    <i className="fa fa-plus" />
                  </button>
                )}
              </div>
              <div className="ed-container">
                <div className="table">
                  <Project
                    status={!status}
                    update={handleProjectChange}
                    delete={deleteProject}
                    projectList={projectList}
                  />
                </div>
              </div>
            </div>
            <div className="details-container-button">
              {!status && (
                <>
                  <div className="terms-check">
                    <input
                      className="terms-check-box"
                      id="terms-check-box"
                      name="terms-check-box"
                      type="checkbox"
                      onClick={() => setSaveBtnStatus(!saveBtnStatus)}
                    />
                    <p className="terms-text">
                      I hereby declare that information furnished above is true
                      and correct in every respect and in case any information
                      is found incorrect even partially the candidature shall be
                      liable to be rejected.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={saveBtnStatus}
                    className="btn ed-btn btn-primary"
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
