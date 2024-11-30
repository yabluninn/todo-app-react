/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const ListsContext = createContext();

export const ListsProvider = ({ children }) => {
  const [taskLists, setTasksList] = useState([]);
  const [noteLists, setNotesList] = useState([]);

  const addTaskList = (list) => {
    setTasksList((prevList) => [...prevList, list]);
  };
  const addNoteList = (list) => {
    setNotesList((prevList) => [...prevList, list]);
  };

  const removeTaskList = (listId) => {
    const newList = taskLists.filter((list) => list.id != listId);
    setTasksList(newList);
  };
  const removeNoteList = (listId) => {
    const newList = noteLists.filter((list) => list.id != listId);
    setNotesList(newList);
  };

  const getTaskListsLength = () => {
    return taskLists.length;
  };
  const getNoteListsLength = () => {
    return taskLists.length;
  };

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
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export const useListsContext = () => useContext(ListsContext);
export default ListsContext;
