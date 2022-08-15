import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
export const DashboardNavigation = (props) => {
  let navigate = useNavigate();
  let location = useLocation();
  axios.defaults.withCredentials = true;
  const handleLogOut = (e) => {
    e.preventDefault();
    axios.get("http://localhost:2000/users/logout").then((response) => {
      // write here the page to load when logout
      // console.log(props);
      navigate("/signUp");
    });
  };

  //const[home,setHome]=u
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="/">
            Level Up
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          {!props.loginpg ? (
            <ul className="nav navbar-nav navbar-right">
              {/* <li>
              <a href='#features' className='page-scroll'>
                Features
              </a>
            </li>*/}

              {/* <li>
                <a href="#about" className="page-scroll">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="page-scroll">
                  Project
                </a>
              </li> */}
              {/* <li>
              <a href='#portfolio' className='page-scroll'>
                Gallery
              </a>
            </li>
            <li>
              <a href='#testimonials' className='page-scroll'>
                Testimonials
              </a>
            </li> */}
              {/* <li>
                <a href="#team" className="page-scroll">
                  Coding Profiles
                </a>
              </li> */}
              {/* <li>
                <a href="#contact" className="page-scroll">
                  Contact
                </a>
              </li> */}
              <li>
                {props.username ? (
                  <div className="dropdown navdropdown">
                    <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                    >
                      {props.username + " "}
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        {" "}
                        <Link to="/DSAPractice" className="dropdown-item">
                          DSA practice
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link to="/DailyProblems" className="dropdown-item">
                          Daily problems
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link to="/ContestCalender" className="dropdown-item">
                          Calender
                        </Link>
                      </li>

                      {location.state && (
                        <li>
                          {" "}
                          <button
                            className="dropdown-item dropbtn"
                            onClick={() => {
                              navigate("/DoubtBlogs", {
                                state: location.state,
                              });
                            }}
                          >
                            Doubt Blogs
                          </button>
                        </li>
                      )}
                      <li>
                        {" "}
                        <button
                          className="dropdown-item dropbtn"
                          onClick={() => {
                            navigate("/findLeaderBoard", {
                              state: location.state,
                            });
                          }}
                        >
                          LeaderBoard
                        </button>
                      </li>

                      <li>
                        <Link
                          to="/signup"
                          onClick={handleLogOut}
                          className="page-scroll"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link to="/signup" className="page-scroll">
                    LogIN
                  </Link>
                )}
              </li>
            </ul>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </nav>
  );
};
