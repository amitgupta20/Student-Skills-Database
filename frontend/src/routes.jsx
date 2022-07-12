import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
// import EditProfile from './components/dashboard/EditProfile';
import Dashboard from "./components/dashboard";
import EditProfile from "./components/dashboard/EditProfile";
import DSAPractice from "./components/dashboard/DSAPractice";
import DailyProblems from "./components/dashboard/DailyProblems";
import ContestCalender from "./components/dashboard/ContestCalender";
import Home from "./components/home";
import CodingPlatformProfile from "./components/dashboard/CodingPlatformProfile";
import DoubtBlogs from "./components/dashboard/DoubtBlogs";
import AdminHomePage from "./components/admin/AdminHomePage.jsx";
export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/editProfile" element={<EditProfile status={false}/>} />
        {/* <Route path="/EditProfile"  element={<EditProfile/>}></Route> */}
        <Route path="/DSAPractice" element={<DSAPractice />}></Route>
        <Route path="/DailyProblems" element={<DailyProblems />}></Route>
        <Route path="/ContestCalender" element={<ContestCalender />}></Route>
        <Route path="/admin" element={<AdminHomePage/>}/>
        <Route
          path="/CodingPlatformProfile"
          element={<CodingPlatformProfile />}
        ></Route>
        <Route
          path="/DoubtBlogs"
          element={<DoubtBlogs />}
        ></Route>


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
