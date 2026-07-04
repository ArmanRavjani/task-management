import React from "react";
import "../styles/addtask.css";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
const AddTaskModal = ({ setShowAddTask, setTasks }) => {
  const AddTask = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    try {
      const { data } = await axios.post(
        "https://task-management-backend-o7m3.onrender.com/api/tasks",
        { title, description },
        {
          withCredentials: true,
        },
      );
      setTasks((prevTasks) => [...prevTasks, data.task]);
      setShowAddTask(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="modal-overlay">
      <div className="add-task">
        <div className="add-task-1">
          <img src="/image3.png" alt="" />
          <div>
            <h3>Add a new task</h3>
            <p>Fill in the details to create</p>
            <p style={{ justifySelf: "center" }}>a new task.</p>
          </div>
        </div>
        <div className="add-task-2">
          <div className="add-task-2-top">
            <div className="add-task-2-top-1">
              <h3>Add New Task</h3>
              <p>Create a new task to stay organized and productive.</p>
            </div>
            <p
              className="x-icon"
              onClick={() => setShowAddTask(false)}
              style={{
                color: "#583DE7",
                height: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "15px 15px",
                border: "1px solid rgb(210, 207, 207)",
                borderRadius: "50%",
                marginTop: "30px",
                marginRight: "20px",
                cursor: "pointer",
              }}
            >
              <X size={30} />
            </p>
          </div>
          <form onSubmit={AddTask}>
            <div className="add-task-2-mid">
              <div className="form">
                <div className="form-fields">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Enter Task Title.."
                    name="title"
                  />
                </div>
                <div className="form-fields">
                  <label>Description</label>
                  <textarea
                    name="description"
                    id=""
                    placeholder="Enetr Task Description.."
                    maxLength={100}
                  />
                </div>
              </div>
            </div>
            <div className="add-task-2-bottom">
              <div
                onClick={() => setShowAddTask(false)}
                style={{
                  border: "1px solid rgb(210, 207, 207)",
                  padding: "20px",
                  color: "#583DE7",
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                X cancel
              </div>
              <button
                type="submit"
                style={{
                  color: "white",
                  backgroundColor: "#583DE7",
                  padding: "20px",
                  marginRight: "30px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                + Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
