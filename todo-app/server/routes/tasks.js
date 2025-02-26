import express from "express";
import Task from "../models/Task.js";
import TaskList from "../models/TaskList.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { listId } = req.body;

        if (!listId) {
            return res.status(400).json({ message: "Missing listId" });
        }

        const task = new Task(req.body);
        await task.save();

        await TaskList.findByIdAndUpdate(listId, { $push: { tasks: task._id } });

        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: "Error creating task", error: err });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: "Task not found" });

        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Error updating task", error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        res.status(200).json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting task", error: err.message });
    }
});

router.get("/:listId", async (req, res) => {
    try {
        if (!req.params.listId) return res.status(400).json({ message: "List ID is required" });

        const tasks = await Task.find({ listId: req.params.listId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Error fetching tasks", error: err.message });
    }
});

export default router;
