import express from "express";
import User from "../models/User.js";
import Task from "../models/Task.js";
import Note from "../models/Note.js";
import TaskList from "../models/TaskList.js";
import NoteList from "../models/NoteList.js";
import Category from "../models/Category.js";
import bcrypt from "bcrypt";

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

router.put("/:userId/notifications", async (req, res) => {
    try {
        const { userId } = req.params;
        const { isNotificationsEnabled } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.isNotificationsEnabled = isNotificationsEnabled;
        await user.save();

        res.json({ success: true, isNotificationsEnabled });
    } catch (err) {
        console.error("Error updating notifications:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/verify-password", async (req, res) => {
    const { userId, currentPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.json({ success: false });

    res.json({ success: true });
});

router.put("/change-password", async (req, res) => {
    const { userId, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
});

router.put("/change-username", async (req, res) => {
    const { userId, newUsername } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = newUsername;
    await user.save();

    res.json({ success: true, message: "Username updated successfully" });
});


export default router;
