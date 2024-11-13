/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const TaskListContext = createContext();

export const TaskListProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const updateTaskList = (newTaskList) => {
    setTasks(newTaskList);
  };

  return (
    <TaskListContext.Provider value={{ tasks, updateTaskList }}>
      {children}
    </TaskListContext.Provider>
  );
};

export const useTaskList = () => useContext(TaskListContext);
export default TaskListContext;
