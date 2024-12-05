/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const ListsContext = createContext();

export const ListsProvider = ({ children }) => {
  const [taskLists, setTaskLists] = useState([]);
  const [noteLists, setNoteLists] = useState([]);

  const addTaskList = (list) => {
    setTaskLists((prevLists) => [...prevLists, { ...list, tasks: [] }]);
  };

  const addNoteList = (list) => {
    setNoteLists((prevLists) => [...prevLists, list]);
  };

  const removeTaskList = (listId) => {
    setTaskLists((prevLists) => prevLists.filter((list) => list.id !== listId));
  };

  const removeNoteList = (listId) => {
    setNoteLists((prevLists) => prevLists.filter((list) => list.id !== listId));
  };

  const getTaskListById = (listId) => {
    return taskLists.find((list) => list.id === listId);
  };

  const addTaskToList = (task, listId) => {
    setTaskLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, tasks: [...(list.tasks || []), task] }
          : list
      )
    );
  };

  const addNoteToList = (note, listId) => {
    setNoteLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, notes: [...(list.notes || []), note] }
          : list
      )
    );
  };

  const completeTask = (taskId, listId) => {
    setTaskLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : list
      )
    );
  };

  const removeTask = (taskId, listId) => {
    setTaskLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
          : list
      )
    );
  };

  const getTasksByDate = (date) => {
    return taskLists.flatMap((list) =>
      list.tasks.filter((task) => task.date === date)
    );
  };

  const getTodayTasks = () => {
    const today = new Date().toISOString().split("T")[0];
    return getTasksByDate(today);
  };

  const getTaskListsLength = () => taskLists.length;

  const getNoteListsLength = () => noteLists.length;

  return (
    <ListsContext.Provider
      value={{
        taskLists,
        noteLists,
        addTaskList,
        addNoteList,
        removeTaskList,
        removeNoteList,
        getTaskListsLength,
        getNoteListsLength,
        addTaskToList,
        addNoteToList,
        getTasksByDate,
        getTodayTasks,
        getTaskListById,
        completeTask,
        removeTask,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export const useListsContext = () => useContext(ListsContext);
export default ListsContext;
