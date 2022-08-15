import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
export const Navigation = (props) => {
  let navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogOut = (e) => {
    e.preventDefault();
    axios.get("http://localhost:2000/users/logout").then((response) => {
      // write here the page to load when logout
      // console.log(props);
      navigate('/signUp');
    });
  };

  //const[home,setHome]=u
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          {/* <button
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
          </button> */}
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

              <li>
                <a href="#about" className="page-scroll">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="page-scroll">
                  Services
                </a>
              </li>
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
              <li>
                <a href="#team" className="page-scroll">
                  Team
                </a>
              </li>
              <li>
                <a href="#contact" className="page-scroll">
                  Contact
                </a>
              </li>
              <li>
                {props.username ? (
                  <Link
                    to="/signup"
                    onClick={handleLogOut}
                    className="page-scroll"
                  >
                    Logout
                  </Link>
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
