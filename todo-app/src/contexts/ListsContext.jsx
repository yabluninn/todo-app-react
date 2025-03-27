/* eslint-disable react/prop-types */
import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const ListsContext = createContext();

export const ListsProvider = ({ children }) => {
  const [taskLists, setTaskLists] = useState([]);
  const [noteLists, setNoteLists] = useState([]);

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

        try {
            const response = await axios.post(`http://localhost:5000/api/tasks`, {
                listId,
                ...task,
            });


            setTaskLists((prevLists) =>
                prevLists.map((list) =>
                    list._id === listId ? { ...list, tasks: [...list.tasks, response.data] } : list
                )
            );
        } catch (err) {
            console.error("Error adding task:", err.response?.data || err);
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
            console.error("Error adding note:", err);
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
            console.error("Task updating error: ", err.response?.data || err.message);
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
            console.error("Error updating note:", err);
        }
    };

    const completeTask = async (taskId, listId) => {
        try {
            const list = taskLists.find((l) => l._id === listId);

            if (!list) {
                return;
            }

            const task = list.tasks.find((t) => t._id === taskId);

            if (!task) {
                return;
            }

            const updatedCompleted = !task.completed;

            const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
                completed: updatedCompleted
            });

            setTaskLists((prevLists) =>
                prevLists.map((list) =>
                    list._id === listId
                        ? {
                            ...list,
                            tasks: list.tasks.map((t) =>
                                t._id === taskId ? response.data : t
                            ),
                        }
                        : list
                )
            );

        } catch (err) {
            console.error("Error:", err);
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
            console.error("Error deleting note:", err);
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

    // TASK LISTS
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
            console.error("Error loading tasks:", err.response?.data || err);
        }
    };


    const addTaskList = async (list) => {
        try {
            const alreadyExists = taskLists.some(
                (list) => list.name.toLowerCase().trim() === list.name.toLowerCase().trim()
            );

            if (alreadyExists) {
                alert("Task list with same name already exists!");
                return;
            }

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

            const allList = taskLists.find((list) => list.name === "All");

            if (!allList) {
                return;
            }

            console.log("All list id: ", allList._id);

            const listToRemove = taskLists.find((list) => list._id === id);
            if (!listToRemove) {
                return;
            }

            if (listToRemove.name === "All"){
                alert("You can't remove default Task list!")
                return;
            }

            const tasksToMove = listToRemove.tasks || [];
            console.log(`Moving ${tasksToMove.length} tasks to All`);

            await axios.put(`http://localhost:5000/api/taskLists/moveTasksToAll/${id}`, {
                newListId: allList._id
            });

            await axios.delete(`http://localhost:5000/api/taskLists/${id}`);

            console.log("Successful deleting task list");

            await fetchTaskLists();
        } catch (err) {
            console.error("Deleting task list error:", err);
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
            const alreadyExists = noteLists.some(
                (list) => list.name.toLowerCase().trim() === list.name.toLowerCase().trim()
            );

            if (alreadyExists) {
                alert("Note list with same name already exists!");
                return;
            }

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
            if (!user) {
                console.error("User not found in localStorage");
                return;
            }

            if (!id) {
                console.error("Error: Note List ID is undefined");
                return;
            }

            const noteList = noteLists.find((list) => list.name === "Notes");

            if (!noteList) {
                return;
            }

            console.log("Note list id: ", noteList._id);

            const noteListToRemove = noteLists.find((list) => list._id === id);
            if (!noteListToRemove) {
                return;
            }

            if (noteListToRemove.name === "Notes"){
                alert("You can't remove default Note list!")
                return;
            }

            const notesToMove = noteListToRemove.notes || [];
            console.log(`Moving ${notesToMove.length} notes to Notes`);

            await axios.put(`http://localhost:5000/api/noteLists/moveNotesToNotes/${id}`, {
                newListId: noteList._id
            });

            await axios.delete(`http://localhost:5000/api/noteLists/${id}`);

            console.log("Successful deleting note list:", noteList._id);

            await fetchTaskLists();
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const getNoteListsLength = () => noteLists.length;

    const getNoteById = (noteId) => {
        for (const list of noteLists) {
            const note = list.notes.find((n) => n._id === noteId);
            if (note) return note;
        }
        return null;
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
        removeAllNotesFromList,
        getTasksByPeriod,
        fetchNoteLists,
        updateTaskList,
        updateNoteList,
        getNoteById
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export const useListsContext = () => useContext(ListsContext);
export default ListsContext;
