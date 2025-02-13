/* eslint-disable react/prop-types */
import {createContext, useContext, useEffect, useState} from "react";

import { useNotifications } from "../hooks/useNotifications";

const ListsContext = createContext();

export const ListsProvider = ({ children }) => {
  const [taskLists, setTaskLists] = useState([]);
  const [noteLists, setNoteLists] = useState([]);

  const { showNotification } = useNotifications();
  const [shownNotifications, setShownNotifications] = useState([]);

  const removeNotification = (id) => {
      setShownNotifications((prevState) => prevState.filter(notification => notification.id !== id));
  }

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

    const removeAllNotesFromList = (listId) => {
        setNoteLists((prevLists) =>
            prevLists.map((list) =>
                list.id === listId ? { ...list, notes: [] } : list
            )
        );
    };


    const removeAllTaskLists = () => {
      setTaskLists([]);
  }

  const removeAllNoteLists = () => {
      setNoteLists([]);
  }

  const getTaskListById = (listId) => {
    return taskLists.find((list) => list.id === listId);
  };

  const getNoteListById = (listId) => {
      return noteLists.find((list) => list.id === listId);
  }

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

  const removeNote = (noteId, listId) => {
      setNoteLists((prevLists) =>
          prevLists.map((list) =>
              list.id === listId
                  ? { ...list, notes: list.notes.filter((note) => note.id !== noteId) }
                  : list
          )
      );
  }

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

  const getRecentNotes = () => {
    const allNotes = noteLists.flatMap((list) => list.notes);
    return allNotes.sort(
      (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
    );
  };

    useEffect(() => {
        if (taskLists.length === 0) return;

        const tasks = taskLists.flatMap(list => list.tasks || []);

        tasks.forEach((task) => {
            if (!task.startTime || shownNotifications.some(n => n.id === task.id && n.type === "start")) return;

            const now = new Date();
            let taskStartTime = new Date(task.startTime);

            if (task.startTime.includes(":") && !task.startTime.includes("T")) {
                const today = now.toISOString().split("T")[0];
                taskStartTime = new Date(`${today}T${task.startTime}:00`);
            }

            const delayStart = taskStartTime - now;

            // First Notification Type
            if (delayStart > 0) {
                setTimeout(() => {
                    if (!shownNotifications.some(n => n.id === task.id && n.type === "start")) {
                        showNotification(`It's time to complete the task: ${task.name}`, {
                            body: `Start time: ${taskStartTime.toLocaleTimeString()} \nEnd time: ${task.endTime || "No time limit"}`,
                        });

                        setShownNotifications((prev) => [
                            ...prev,
                            { id: task.id, timestamp: new Date().toISOString(), type: "start" }
                        ]);
                    }
                }, delayStart);
            }

            // Second Notification type
            if (task.endTime) {
                let taskEndTime = new Date(task.endTime);

                if (task.endTime.includes(":") && !task.endTime.includes("T")) {
                    const today = now.toISOString().split("T")[0];
                    taskEndTime = new Date(`${today}T${task.endTime}:00`);
                }

                const delayReminder = taskEndTime - now - 5 * 60 * 1000; // 5 minutes

                if (delayReminder > 0) {
                    setTimeout(() => {
                        if (!shownNotifications.some(n => n.id === task.id && n.type === "reminder")) {
                            showNotification(`You have 5 minutes left to complete: ${task.name}`, {
                                body: `End time: ${taskEndTime.toLocaleTimeString()}. Hurry up to finish!`,
                            });

                            setShownNotifications((prev) => [
                                ...prev,
                                { id: task.id, timestamp: new Date().toISOString(), type: "reminder" }
                            ]);
                        }
                    }, delayReminder);
                }
            }
        });
    }, [taskLists]);

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
        getNoteListById,
        completeTask,
        removeTask,
        removeNote,
        getRecentNotes,
        removeAllTaskLists,
        removeAllNoteLists,
        shownNotifications,
        removeNotification,
        removeAllNotesFromList
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export const useListsContext = () => useContext(ListsContext);
export default ListsContext;
