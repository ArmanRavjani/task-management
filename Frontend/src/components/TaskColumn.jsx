import { useState } from "react";
import TaskCard from "./TaskCard.jsx";
import "../styles/task.css";
const TaskColumn = ({
  title,
  tasks,
  status,
  className,
  updateTaskStatus,
  deleteTask,
}) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    updateTaskStatus(taskId, status);
    setIsDraggingOver(false);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };
  return (
    <div
      className={`task-column ${className} ${isDraggingOver ? "drag-over" : ""}`}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      <div className="heading">
        <div className="left">{title}</div>
        <div className="right">{tasks.length}</div>
      </div>
      {tasks.map((task) => {
        return <TaskCard key={task._id} task={task} deleteTask={deleteTask} />;
      })}
    </div>
  );
};

export default TaskColumn;
