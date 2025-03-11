import express from "express";
import User from "../models/User.js";
import Task from "../models/Task.js";
import Note from "../models/Note.js";
import TaskList from "../models/TaskList.js";
import NoteList from "../models/NoteList.js";
import Category from "../models/Category.js";

const router = express.Router();

// Получение данных профиля пользователя
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Удаляем все связанные с пользователем данные
        await Task.deleteMany({ listId: { $in: user.taskLists } });
        await Note.deleteMany({ listId: { $in: user.noteLists } });
        await TaskList.deleteMany({ _id: { $in: user.taskLists } });
        await NoteList.deleteMany({ _id: { $in: user.noteLists } });
        await Category.deleteMany({ _id: { $in: user.categories } });

        // Удаляем самого пользователя
        await User.findByIdAndDelete(userId);

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
