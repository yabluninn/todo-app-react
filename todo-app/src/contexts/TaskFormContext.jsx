/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const TaskFormContext = createContext();

export const TaskFormProvider = ({ children }) => {
  const [isNewTaskFormVisible, setNewTaskFormVisibility] = useState(false);

  const toggleNewTaskForm = () => {
    setNewTaskFormVisibility((prev) => !prev);
  };

  return (
    <TaskFormContext.Provider
      value={{ isNewTaskFormVisible, toggleNewTaskForm }}
    >
      {children}
    </TaskFormContext.Provider>
  );
};

export const useTaskForm = () => useContext(TaskFormContext);
