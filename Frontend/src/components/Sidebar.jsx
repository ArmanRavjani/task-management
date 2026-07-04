import React, { useContext } from "react";
import "../styles/sidebar.css";
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  ChartColumn,
  UsersRound,
  LogOut,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { authUser, setAuthUser, selectedImage } = useContext(AuthContext);
  const logout = async () => {
    try {
      const { data } = await axios.get(
        "https://task-management-backend-o7m3.onrender.com/api/auth/user/logout",
        { withCredentials: true },
      );
      setAuthUser(null);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="sidebar-close" onClick={() => setSidebarOpen(false)}>
        <X />
      </div>
      <div className="sidebar-1">
        <h2>Task Management</h2>
        <p>System</p>
      </div>
      <div className="sidebar-2">
        <div
          className="sidebar-2-content"
          onClick={() => setSidebarOpen(false)}
        >
          <NavLink
            to={"/taskboard"}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              color: "black",
              gap: "15px",
              color: "gray",
            }}
          >
            <LayoutDashboard />
            <h3>Dashboard</h3>
          </NavLink>
        </div>
        <div
          className="sidebar-2-content"
          onClick={() => setSidebarOpen(false)}
        >
          <NavLink
            to={"/mytasks"}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              color: "black",
              gap: "15px",
              color: "gray",
            }}
          >
            <ClipboardList />
            <h3>My Tasks</h3>
          </NavLink>
        </div>
        <div
          className="sidebar-2-content"
          onClick={() => setSidebarOpen(false)}
        >
          <NavLink
            to={"/calendar"}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              color: "black",
              gap: "15px",
              color: "gray",
            }}
          >
            <Calendar />
            <h3>Calendar</h3>
          </NavLink>
        </div>
        <div
          className="sidebar-2-content"
          onClick={() => setSidebarOpen(false)}
        >
          <NavLink
            to={"/analytics"}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              color: "black",
              gap: "15px",
              color: "gray",
            }}
          >
            <ChartColumn />
            <h3>Analytics</h3>
          </NavLink>
        </div>
        <div
          className="sidebar-2-content"
          onClick={() => setSidebarOpen(false)}
        >
          <NavLink
            to={"/user/update-profile"}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              color: "black",
              gap: "15px",
              color: "gray",
            }}
          >
            <UsersRound />
            <h3>Profile Setting</h3>
          </NavLink>
        </div>
        <div
          className="sidebar-2-content"
          onClick={logout}
          style={{ cursor: "pointer" }}
        >
          <LogOut />
          <h3>logout</h3>
        </div>
      </div>
      <div className="sidebar-3">
        <img src={authUser.profilePic || "/avatar_icon.png"} alt="" />
        <div className="sidebar-3-text">
          <h4>{authUser.userName}</h4>
          <p>{authUser.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
