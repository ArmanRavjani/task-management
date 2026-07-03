import React from "react";
import "../styles/task.css";
const TaskCard = ({ task, deleteTask }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task._id);
  };
  return (
    <div className="task-card" draggable="true" onDragStart={handleDragStart}>
      <div>{task.title}</div>
      <p>{task.desc}</p>
      <button onClick={() => deleteTask(task._id)}>Delete</button>
    </div>
  );
};

export default TaskCard;
