import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import UserUpdate from "../pages/auth/UserUpdate";
import Dashboard from "../components/Dashboard.jsx";
import toast, { Toaster } from "react-hot-toast";
import TaskBoard from "../components/TaskBoard";
import MyTasks from "../components/MyTasks.jsx";
import Calendar from "../components/Calendar.jsx";
import Analytics from "../components/Analytics.jsx";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";

const AppRoutes = () => {
  const { authUser, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <h2
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </h2>
    );
  }
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route
            path="/user/register"
            element={
              !authUser ? <UserRegister /> : <Navigate to={"/dashboard"} />
            }
          />
          <Route
            path="/user/login"
            element={!authUser ? <UserLogin /> : <Navigate to={"/dashboard"} />}
          />
          <Route
            path="/"
            element={authUser ? <Dashboard /> : <Navigate to={"/user/login"} />}
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<TaskBoard />} />
            <Route path="mytasks" element={<MyTasks />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="user/update-profile" element={<UserUpdate />} />
          </Route>
          <Route
            path="*"
            element={
              <Navigate to={authUser ? "/dashboard" : "/user/login"} replace />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
