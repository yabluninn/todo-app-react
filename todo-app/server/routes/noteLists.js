import express from "express";
import NoteList from "../models/NoteList.js";
import User from "../models/User.js";
import Note from "../models/Note.js";
import Task from "../models/Task.js";

const router = express.Router();

// Получение всех списков заметок пользователя + заметки внутри них
router.get("/", async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ message: "User ID is required" });

        // Загружаем пользователя с его списками заметок
        const user = await User.findById(userId).populate("noteLists");

        if (!user) return res.status(404).json({ message: "User not found" });

        // Проверяем наличие дефолтного списка "Notes"
        let notesList = user.noteLists.find((list) => list.name === "Notes");

        if (!notesList) {
            console.warn("⚠️ Default list 'Notes' not found, creating new one...");

            notesList = new NoteList({ name: "Notes", color: "#FFFFFF" });
            await notesList.save();

            // Добавляем "Notes" в список пользователя
            await User.findByIdAndUpdate(userId, { $push: { noteLists: notesList._id } });

            // Обновляем пользователя
            user.noteLists.push(notesList);
        }

        // Загружаем заметки для каждого списка заметок
        const updatedNoteLists = await Promise.all(user.noteLists.map(async (list) => {
            const notes = await Note.find({ listId: list._id }).populate("categories"); // Загружаем категории
            return { ...list.toObject(), notes };
        }));

        res.json(updatedNoteLists);
    } catch (err) {
        console.error("❌ Ошибка при загрузке списков заметок:", err);
        res.status(500).json({ message: "Server error" });
    }
});



// Создание списка заметок
router.post("/", async (req, res) => {
    try {
        const { userId, name, color } = req.body;
        if (!userId || !name) return res.status(400).json({ message: "User ID and name are required" });

        const newNoteList = new NoteList({ name, color, notes: [] }); // Инициализируем пустой массив заметок
        await newNoteList.save();

        await User.findByIdAndUpdate(userId, { $push: { noteLists: newNoteList._id } });

        res.status(201).json(newNoteList);
    } catch (err) {
        console.error("Error creating note list:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Обновление списка заметок
router.put("/:id", async (req, res) => {
    try {
        const { name, color } = req.body;
        const updatedNoteList = await NoteList.findByIdAndUpdate(
            req.params.id,
            { name, color },
            { new: true }
        ).populate("notes"); // Загружаем заметки после обновления

        if (!updatedNoteList) return res.status(404).json({ message: "Note list not found" });

        res.json(updatedNoteList);
    } catch (err) {
        console.error("Error updating note list:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Удаление списка заметок
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

// Удаление всех списков заметок пользователя
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


router.put("/moveNotesToNotes/:oldListId", async (req, res) => {
    try {
        const { newListId } = req.body; // ID нового списка ("All")

        if (!newListId) {
            return res.status(400).json({ message: "New list ID is required" });
        }

        // 🔄 Обновляем listId у всех задач из удаленного списка
        const updatedNotes = await Note.updateMany(
            { listId: req.params.oldListId }, // Найти задачи с этим listId
            { $set: { listId: newListId } }  // Установить новый listId
        );

        console.log(`✅ ${updatedNotes.modifiedCount} notes moved to Notes`);

        res.json({ message: "Notes successfully moved to All" });
    } catch (err) {
        console.error("❌ Error moving:", err);
        res.status(500).json({ message: "Server error" });
    }
});


export default router;
