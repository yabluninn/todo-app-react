/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const TaskListContext = createContext();

export const TaskListProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const removeTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
  };

  const completeTask = (taskId, isCompleted) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: isCompleted } : task
    );
    updateTaskList(updatedTasks);
  };

  const updateTaskList = (newTaskList) => {
    setTasks([...newTaskList]);
  };

  const getTasksLength = () => {
    return tasks.length;
  };

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        addTask,
        updateTaskList,
        getTasksLength,
        removeTask,
        completeTask,
      }}
    >
      {children}
    </TaskListContext.Provider>
  );
};

export const useTaskList = () => useContext(TaskListContext);
export default TaskListContext;
