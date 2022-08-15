import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
// import EditProfile from './components/dashboard/EditProfile';
import ProfileLeader from "./components/dashboard/ProfilesLeader";
import Dashboard from "./components/dashboard";
import EditProfile from "./components/dashboard/EditProfile";
import DSAPractice from "./components/dashboard/DSAPractice";
import DailyProblems from "./components/dashboard/DailyProblems";
import ContestCalender from "./components/dashboard/ContestCalender";
import Home from "./components/home";
import CodingPlatformProfile from "./components/dashboard/CodingPlatformProfile";
import DoubtBlogs from "./components/dashboard/DoubtBlogs";
import AdminHomePage from "./components/admin/AdminHomePage.jsx";
import RecruiterHomePage from "./components/recruiter/RecruiterHomePage.jsx";

export default function AppRouter() {
  // const [userData, setUserData] = useState({ accountType: "None" });
  // const [accountType, setAccountType] = useState("NA");
  // const loggingIn = async () => {
  //   let { data } = await axios.get(
  //     "http://localhost:2000/users/loginUsingCookie"
  //   );
  //   setUserData(data);
  //   setAccountType(data.accountType);
  //   // console.log(accountType);
  // };
  // useEffect(() => {
  //   loggingIn();
  // }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard owner={true} />}></Route>
        <Route path="/editProfile" element={<EditProfile status={false} />} />
        <Route path="/DSAPractice" element={<DSAPractice />}></Route>
        <Route path="/DailyProblems" element={<DailyProblems />}></Route>
        <Route path="/ContestCalender" element={<ContestCalender />}></Route>
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/recruiter" element={<RecruiterHomePage />} />
        <Route
          path="/CodingPlatformProfile"
          element={<CodingPlatformProfile />}
        />
        <Route path="/DoubtBlogs" element={<DoubtBlogs />} />
        <Route
          path="/viewProfile/:profileEmail"
          element={<Dashboard owner={false} />}
        ></Route>
        <Route path="/findLeaderBoard" element={<ProfileLeader />}></Route>
        {/* need to send userdata name , email in state and profileEmail as params */}
        {/* <AuthenticatedRoute
            path="/dashboard"
            isAuthenticated={this.props.username.trim().length > 0}
            element={Dashboard}
            redirectTo={"/"}>
        </AuthenticatedRoute> */}
      </Routes>
    </Router>
  );
}
