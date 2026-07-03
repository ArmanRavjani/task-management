import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import "../styles/dashboard.css";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import AddTaskModal from "./AddTaskModal.jsx";
import axios from "axios";
import toast from "react-hot-toast";
const Dashboard = () => {
  const { showAddTask, setShowAddTask } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const updateTaskStatus = async (taskId, newStatus) => {
    const previousTasks = tasks;

    setTasks((prev) =>
      prev.map((task) =>
        task._id == taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    );

    try {
      const data = await axios.patch(
        `http://localhost:3001/api/tasks/update-task/${taskId}`,
        { status: newStatus },
        { withCredentials: true },
      );
    } catch (error) {
      setTasks(previousTasks);
      toast.error(error.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/api/tasks/delete-task/${taskId}`,
        {
          withCredentials: true,
        },
      );
      setTasks((prevTask) => prevTask.filter((task) => task._id != taskId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getAllTasks = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/tasks", {
        withCredentials: true,
      });
      setTasks(data.tasks);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="dashboard-content">
        <Navbar
          setShowAddTask={setShowAddTask}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
        <div className="pages">
          <Outlet context={{ tasks, setTasks, updateTaskStatus, deleteTask }} />
        </div>
      </div>
      {showAddTask && (
        <AddTaskModal setShowAddTask={setShowAddTask} setTasks={setTasks} />
      )}
    </div>
  );
};

export default Dashboard;
