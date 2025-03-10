import express from "express";
import TaskList from "../models/TaskList.js";
import User from "../models/User.js";
import Task from "../models/Task.js";

const router = express.Router();

// router.get("/", async (req, res) => {
//     try {
//         const { userId } = req.query;
//         if (!userId) return res.status(400).json({ message: "User ID is required" });
//
//         // Загружаем taskLists вместе с их задачами
//         const user = await User.findById(userId).populate({
//             path: "taskLists",
//             populate: {
//                 path: "tasks", // Загружаем вложенные задачи
//             },
//         });
//
//         if (!user) return res.status(404).json({ message: "User not found" });
//
//         res.json(user.taskLists);
//     } catch (err) {
//         console.error("Error fetching task lists:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// });
router.get("/", async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const user = await User.findById(userId).populate({
            path: "taskLists",
        });

        const updatedTaskLists = await Promise.all(user.taskLists.map(async (list) => {
            const tasks = await Task.find({ listId: list._id });
            return { ...list.toObject(), tasks };
        }));

        res.json(updatedTaskLists);
    } catch (err) {
        console.error("Error fetching task lists:", err);
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/", async (req, res) => {
    try {
        const { userId, name, color } = req.body;
        if (!userId || !name) return res.status(400).json({ message: "User ID and name are required" });

        const newTaskList = new TaskList({ name, color });
        await newTaskList.save();

        await User.findByIdAndUpdate(userId, { $push: { taskLists: newTaskList._id } });

        res.status(201).json(newTaskList);
    } catch (err) {
        console.error("Error creating task list:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { name, color } = req.body;
        const updatedTaskList = await TaskList.findByIdAndUpdate(
            req.params.id,
            { name, color },
            { new: true }
        );

        if (!updatedTaskList) return res.status(404).json({ message: "Task list not found" });

        res.json(updatedTaskList);
    } catch (err) {
        console.error("Error updating task list:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { userId } = req.query;

        const taskList = await TaskList.findById(req.params.id);
        if (!taskList) return res.status(404).json({ message: "Task list not found" });

        await TaskList.findByIdAndDelete(req.params.id);
        await User.findByIdAndUpdate(userId, { $pull: { taskLists: req.params.id } });

        res.json({ message: "Task list deleted" });
    } catch (err) {
        console.error("Error deleting task list:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.query;

        if (!id || id === "undefined") {
            return res.status(400).json({ message: "Invalid Task List ID" });
        }

        const taskList = await TaskList.findById(id);
        if (!taskList) {
            return res.status(404).json({ message: "Task list not found" });
        }

        await TaskList.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, { $pull: { taskLists: id } });

        res.json({ message: "Task list deleted" });
    } catch (err) {
        console.error("Error deleting task list:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/moveTasksToAll/:oldListId", async (req, res) => {
    try {
        const { newListId } = req.body; // ID нового списка ("All")

        if (!newListId) {
            return res.status(400).json({ message: "New list ID is required" });
        }

        // 🔄 Обновляем listId у всех задач из удаленного списка
        const updatedTasks = await Task.updateMany(
            { listId: req.params.oldListId }, // Найти задачи с этим listId
            { $set: { listId: newListId } }  // Установить новый listId
        );

        console.log(`✅ ${updatedTasks.modifiedCount} moved to All`);

        res.json({ message: "Tasks successfully moved to All" });
    } catch (err) {
        console.error("❌ Error moving:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
