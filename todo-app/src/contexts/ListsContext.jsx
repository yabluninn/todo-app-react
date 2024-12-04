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

  const addTaskToList = (task, listId) => {
    setTaskLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, tasks: [...(list.tasks || []), task] }
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
        getTasksByDate,
        getTodayTasks,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export const useListsContext = () => useContext(ListsContext);
export default ListsContext;
