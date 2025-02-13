/* eslint-disable react/prop-types */
import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

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

  const addNoteList = (list) => {
    setNoteLists((prevLists) => [...prevLists, list]);
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

    useEffect(() => {
        fetchTaskLists();
    }, []);

    const fetchTaskLists = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            const response = await axios.get(`http://localhost:5000/api/taskLists?userId=${user.id}`);
            setTaskLists(response.data);
        } catch (err) {
            console.error("Error fetching task lists:", err);
        }
    };

    const addTaskList = async (list) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await axios.post("http://localhost:5000/api/taskLists", {
                userId: user.id,
                name: list.name,
                color: list.color,
            });

            setTaskLists((prevLists) => [...prevLists, response.data]);
        } catch (err) {
            console.error("Error adding task list:", err);
        }
    };

    const updateTaskList = async (id, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/taskLists/${id}`, updatedData);

            setTaskLists((prevLists) =>
                prevLists.map((list) =>
                    list._id === id ? response.data : list
                )
            );
        } catch (err) {
            console.error("Error updating task list:", err);
        }
    };

    const removeTaskList = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                console.error("User not found in localStorage");
                return;
            }

            if (!id) {
                console.error("Error: Task List ID is undefined");
                return;
            }

            await axios.delete(`http://localhost:5000/api/taskLists/${id}?userId=${user.id}`);

            setTaskLists((prevLists) =>
                prevLists.filter((list) => list._id !== id) 
            );
        } catch (err) {
            console.error("Error deleting task list:", err);
        }
    };

    const removeAllTaskLists = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            await axios.delete(`http://localhost:5000/api/taskLists?userId=${user.id}`);

            setTaskLists([]);
        } catch (err) {
            console.error("Error deleting all task lists:", err);
        }
    };

    const getTaskListsLength = () => taskLists.length;

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
