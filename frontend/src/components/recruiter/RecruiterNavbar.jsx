import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export const RecruiterNavbar = (props) => {
  let navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogOut = (e) => {
    e.preventDefault();
    axios.get("http://localhost:2000/users/logout").then((response) => {
      // write here the page to load when logout
      //   console.log(props);
      navigate("/signUp");
    });
  };
  let name = props.fullName.slice(0,12);

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
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand page-scroll" href="/">
            Level Up
          </a>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#" className="page-scroll">
                {name}
              </a>
            </li>
            {/* <li>
              <a href="#DeactivateAccount" className="page-scroll">
                Deactivate Account
              </a>
            </li>
            <li>
              <a href="#AcceptVerification" className="page-scroll">
                Details Verfication
              </a>
            </li> */}
            <li>
              <Link to="/signup" onClick={handleLogOut} className="page-scroll">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
