import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
export const Navbar = (props) => {
  let navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogOut = (e) => {
    e.preventDefault();
    axios.get("http://localhost:2000/users/logout").then((response) => {
      // write here the page to load when logout
      console.log(props);
      navigate('/signUp');
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
          <a className="navbar-brand page-scroll" href="/dashboard">
            Level Up
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          
        </div>
      </div>
    </nav>
  );
};
