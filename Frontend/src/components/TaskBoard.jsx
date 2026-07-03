import React from "react";
import TaskColumn from "./TaskColumn";
import "../styles/task.css";
import { useOutletContext } from "react-router-dom";
const TaskBoard = () => {
  const { tasks, setTasks, updateTaskStatus, deleteTask } = useOutletContext();
  return (
    <div className="taskboard">
      <TaskColumn
        className="to-do"
        title="To Do"
        status="todo"
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
        tasks={tasks.filter((task) => task.status == "todo")}
      />
      <TaskColumn
        className="pending"
        title="Pending"
        status="pending"
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
        tasks={tasks.filter((task) => task.status == "pending")}
      />
      <TaskColumn
        className="completed"
        title="Completed"
        status="completed"
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
        tasks={tasks.filter((task) => task.status == "completed")}
      />
    </div>
  );
};

export default TaskBoard;
