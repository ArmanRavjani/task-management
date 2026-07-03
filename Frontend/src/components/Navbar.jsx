import React, { useContext } from "react";
import "../styles/navbar.css";
import { Menu } from "lucide-react";
import { Plus } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = ({ setShowAddTask, setSidebarOpen, sidebarOpen }) => {
  const { authUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <button
        className="menu-toggle"
        type="button"
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <Menu />
      </button>
      <div className="nav-1">
        <h2>Welcome back, {authUser.userName}!</h2>
        <p>Here's what's happening with your tasks today.</p>
      </div>
      <input
        type="text"
        name="Search-tasks"
        placeholder="Search tasks here.."
      />
      <button onClick={() => setShowAddTask(true)}>
        <Plus />
        New Task
      </button>
    </div>
  );
};

export default Navbar;
