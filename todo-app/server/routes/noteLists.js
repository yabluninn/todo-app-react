import express from "express";
import NoteList from "../models/NoteList.js";
import User from "../models/User.js";

const router = express.Router();

// 📥 Получение всех списков заметок пользователя
router.get("/", async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const user = await User.findById(userId).populate("noteLists");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.noteLists);
    } catch (err) {
        console.error("Error fetching note lists:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// ➕ Добавление нового списка заметок
router.post("/", async (req, res) => {
    try {
        const { userId, name, color } = req.body;
        if (!userId || !name) return res.status(400).json({ message: "User ID and name are required" });

        const newNoteList = new NoteList({ name, color });
        await newNoteList.save();

        await User.findByIdAndUpdate(userId, { $push: { noteLists: newNoteList._id } });

        res.status(201).json(newNoteList);
    } catch (err) {
        console.error("Error creating note list:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// ✏️ Обновление списка заметок
router.put("/:id", async (req, res) => {
    try {
        const { name, color } = req.body;
        const updatedNoteList = await NoteList.findByIdAndUpdate(
            req.params.id,
            { name, color },
            { new: true }
        );

        if (!updatedNoteList) return res.status(404).json({ message: "Note list not found" });

        res.json(updatedNoteList);
    } catch (err) {
        console.error("Error updating note list:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// ❌ Удаление списка заметок
router.delete("/:id", async (req, res) => {
    try {
        const { userId } = req.query;

        if (!req.params.id || req.params.id === "undefined") {
            return res.status(400).json({ message: "Invalid Note List ID" });
        }

        const noteList = await NoteList.findById(req.params.id);
        if (!noteList) return res.status(404).json({ message: "Note list not found" });

        await NoteList.findByIdAndDelete(req.params.id);
        await User.findByIdAndUpdate(userId, { $pull: { noteLists: req.params.id } });

        res.json({ message: "Note list deleted" });
    } catch (err) {
        console.error("Error deleting note list:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// 🚀 Удаление всех списков заметок пользователя
router.delete("/", async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        await NoteList.deleteMany({ _id: { $in: user.noteLists } });
        user.noteLists = [];
        await user.save();

        res.json({ message: "All note lists deleted" });
    } catch (err) {
        console.error("Error deleting all note lists:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
