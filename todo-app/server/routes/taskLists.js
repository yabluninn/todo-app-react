import express from "express";
import TaskList from "../models/TaskList.js";
import User from "../models/User.js";

const router = express.Router();

// 📥 Получение всех списков задач пользователя
router.get("/", async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const user = await User.findById(userId).populate("taskLists");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.taskLists);
    } catch (err) {
        console.error("Error fetching task lists:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// ➕ Добавление нового списка задач
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

// ✏️ Обновление списка задач
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

// ❌ Удаление списка задач
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

// 🚀 Удаление всех списков задач пользователя
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

export default router;
