/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const TaskListContext = createContext();

export const TaskListProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTaskList = (newTaskList) => {
    setTasks(newTaskList);
  };

  const getTasksLength = () => {
    return tasks.length;
  };

  return (
    <TaskListContext.Provider
      value={{ tasks, addTask, updateTaskList, getTasksLength }}
    >
      {children}
    </TaskListContext.Provider>
  );
};

export const useTaskList = () => useContext(TaskListContext);
export default TaskListContext;
