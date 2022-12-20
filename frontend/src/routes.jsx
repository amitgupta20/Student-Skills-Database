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
import { RequiredAuth } from "./authentication/RequiredAuth";
import { AdminAuth } from "./authentication/AdminAuth";
import { RecruiterAuth } from "./authentication/RecruiterAuth";
import AdminHomePage from "./components/admin/AdminHomePage.jsx";
import RecruiterHomePage from "./components/recruiter/RecruiterHomePage.jsx";
import { AuthProvider } from "./authentication/auth";
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
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Login />}></Route>
          <Route path="/dashboard" element={ <RequiredAuth> <Dashboard owner={true} /> </RequiredAuth>}></Route>
          <Route path="/editProfile" element={ <RequiredAuth> <EditProfile status={false} /> </RequiredAuth>} />
          <Route path="/DSAPractice" element={ <RequiredAuth><DSAPractice /></RequiredAuth>}></Route>
          <Route path="/DailyProblems" element={ <RequiredAuth><DailyProblems /></RequiredAuth>}></Route>
          <Route path="/ContestCalender" element={ <RequiredAuth><ContestCalender /></RequiredAuth>}></Route>
          <Route path="/admin" element={<AdminAuth> <AdminHomePage /> </AdminAuth>} />
          <Route path="/recruiter" element={ <RecruiterAuth><RecruiterHomePage /> </RecruiterAuth>} />
          <Route
            path="/CodingPlatformProfile"
            element={<CodingPlatformProfile />}
          />
          <Route path="/DoubtBlogs" element={<RequiredAuth> <DoubtBlogs /></RequiredAuth>} />
          <Route
            path="/viewProfile/:profileEmail"
            element={<Dashboard owner={false} />}
          ></Route>
          <Route path="/findLeaderBoard" element={<RequiredAuth><ProfileLeader /> </RequiredAuth>}></Route>
          {/* need to send userdata name , email in state and profileEmail as params */}
          {/* <AuthenticatedRoute
            path="/dashboard"
            isAuthenticated={this.props.username.trim().length > 0}
            element={Dashboard}
            redirectTo={"/"}>
        </AuthenticatedRoute> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}
