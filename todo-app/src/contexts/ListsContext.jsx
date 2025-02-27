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

    const removeAllNotesFromList = (listId) => {
        setNoteLists((prevLists) =>
            prevLists.map((list) =>
                list.id === listId ? { ...list, notes: [] } : list
            )
        );
    };

  const getTaskListById = (listId) => {
    return taskLists.find((list) => list._id === listId);
  };

  const getNoteListById = (listId) => {
      return noteLists.find((list) => list._id === listId);
  }

    const addTask = async (task, listId) => {
        console.log("📤 Отправка задачи в API:", { listId, ...task });

        try {
            const response = await axios.post(`http://localhost:5000/api/tasks`, {
                listId,
                ...task,
            });

            console.log("✅ Ответ сервера:", response.data);

            setTaskLists((prevLists) =>
                prevLists.map((list) =>
                    list._id === listId ? { ...list, tasks: [...list.tasks, response.data] } : list
                )
            );
        } catch (err) {
            console.error("❌ Ошибка при добавлении задачи:", err.response?.data || err);
        }
    };


    const addNoteToList = async (note, listId) => {
        try {
            const response = await axios.post("http://localhost:5000/api/notes", {
                ...note,
                listId,
                creationDate: new Date(),
            });

            setNoteLists((prevLists) =>
                prevLists.map((list) =>
                    list._id === listId ? { ...list, notes: [...list.notes, response.data] } : list
                )
            );
        } catch (err) {
            console.error("Ошибка при добавлении заметки:", err);
        }
    };

    const updateTask = async (taskId, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedData);

            setTaskLists((prevLists) =>
                prevLists.map((list) => ({
                    ...list,
                    tasks: list.tasks.map((task) =>
                        task._id === taskId ? response.data : task
                    ),
                }))
            );
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    const updateNote = async (noteId, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/notes/${noteId}`, updatedData);

            setNoteLists((prevLists) =>
                prevLists.map((list) => ({
                    ...list,
                    notes: list.notes.map((note) =>
                        note._id === noteId ? response.data : note
                    ),
                }))
            );
        } catch (err) {
            console.error("Ошибка при обновлении заметки:", err);
        }
    };

  const completeTask = async (taskId, listId) => {
      try {
          const list = taskLists.find((l) => l._id === listId);
          const task = list?.tasks.find((t) => t._id === taskId);
          if (!task) return;

          const updatedTask = { ...task, completed: !task.completed };
          await updateTask(taskId, updatedTask);
      } catch (err) {
          console.error("Error toggling task completion:", err);
      }
  };

  const removeTask = async (taskId, listId) => {
      try {
          await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
          setTaskLists((prevLists) =>
              prevLists.map((list) =>
                  list._id === listId
                      ? { ...list, tasks: list.tasks.filter((task) => task._id !== taskId) }
                      : list
              )
          );
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    const removeNote = async (noteId, listId) => {
        try {
            await axios.delete(`http://localhost:5000/api/notes/${noteId}`);

            setNoteLists((prevLists) =>
                prevLists.map((list) =>
                    list._id === listId
                        ? { ...list, notes: list.notes.filter((note) => note._id !== noteId) }
                        : list
                )
            );
        } catch (err) {
            console.error("Ошибка при удалении заметки:", err);
        }
    };

    const getTasksByDate = (date) => {
        return taskLists.flatMap((list) =>
            list.tasks.filter((task) =>
                new Date(task.date).toISOString().split("T")[0] === date
            )
        );
    };

    const getTodayTasks = () => {
        const today = new Date().toISOString().split("T")[0];
        return getTasksByDate(today);
    };

    const getRecentNotes = () => {
        const allNotes = noteLists.flatMap((list) => list.notes);
        return allNotes.sort(
          (a, b) => new Date(b.creationDate).toISOString().split("T")[0] - new Date(a.creationDate).toISOString().split("T")[0]
        );
    };

    const getTasksByPeriod = (period) => {
        const allTasks = taskLists.flatMap(list => list.tasks || []);

        if (period === "Today") {
            const today = new Date().toISOString().split("T")[0];

            const filteredTasks = allTasks.filter(task => {
                const taskDate = new Date(task.date).toISOString().split("T")[0];
                return taskDate === today;
            });

            return filteredTasks;
        }

        if (period === "3 days") {
            const today = new Date();
            const threeDaysLater = new Date();
            threeDaysLater.setDate(today.getDate() + 2);

            const filteredTasks = allTasks.filter(task => {
                const taskDate = new Date(task.date);
                return taskDate >= today && taskDate <= threeDaysLater;
            });

            return filteredTasks;
        }

        if (period === "Week") {
            const today = new Date();
            const weekLater = new Date();
            weekLater.setDate(today.getDate() + 6);

            const filteredTasks = allTasks.filter(task => {
                const taskDate = new Date(task.date);
                return taskDate >= today && taskDate <= weekLater;
            });

            return filteredTasks;
        }

        if (period === "Month") {
            const today = new Date();
            const currentMonth = today.getMonth();

            const filteredTasks = allTasks.filter(task => {
                const taskDate = new Date(task.date);
                return taskDate.getMonth() === currentMonth;
            });

            return filteredTasks;
        }

        return [];
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

    // TASK LISTS
    useEffect(() => {
        fetchTaskLists();
    }, []);

    const fetchTaskLists = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            console.log("📡 Загружаем списки задач...");
            const response = await axios.get(`http://localhost:5000/api/taskLists?userId=${user.id}`);

            console.log("📥 Получены списки задач:", response.data);
            setTaskLists(response.data);
        } catch (err) {
            console.error("❌ Ошибка загрузки списков задач:", err.response?.data || err);
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

    // NOTE LISTS
    useEffect(() => {
        fetchNoteLists();
    }, []);

    const fetchNoteLists = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            const response = await axios.get(`http://localhost:5000/api/noteLists?userId=${user.id}`, {
                timeout: 10000
            });

            setNoteLists(response.data);
        } catch (err) {
            console.error("Error fetching note lists:", err);
        }
    };

    const addNoteList = async (list) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await axios.post("http://localhost:5000/api/noteLists", {
                userId: user.id,
                name: list.name,
                color: list.color,
            });

            setNoteLists((prevLists) => [...prevLists, response.data]);
        } catch (err) {
            console.error("Error adding note list:", err);
        }
    };

    const updateNoteList = async (id, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/noteLists/${id}`, updatedData);

            setNoteLists((prevLists) =>
                prevLists.map((list) =>
                    list._id === id ? response.data : list
                )
            );
        } catch (err) {
            console.error("Error updating note list:", err);
        }
    };

    const removeNoteList = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            await axios.delete(`http://localhost:5000/api/noteLists/${id}?userId=${user.id}`);

            setNoteLists((prevLists) =>
                prevLists.filter((list) => list._id !== id)
            );
        } catch (err) {
            console.error("Error deleting note list:", err);
        }
    };

    const removeAllNoteLists = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            await axios.delete(`http://localhost:5000/api/noteLists?userId=${user.id}`);

            setNoteLists([]);
        } catch (err) {
            console.error("Error deleting all note lists:", err);
        }
    };

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
        addTask,
        addNoteToList,
        getTasksByDate,
        getTodayTasks,
        getTaskListById,
        getNoteListById,
        completeTask,
        updateTask,
        updateNote,
        removeTask,
        removeNote,
        getRecentNotes,
        removeAllTaskLists,
        removeAllNoteLists,
        shownNotifications,
        removeNotification,
        removeAllNotesFromList,
        getTasksByPeriod
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export const useListsContext = () => useContext(ListsContext);
export default ListsContext;
