import express from "express";
import Note from "../models/Note.js";
import NoteList from "../models/NoteList.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, content, listId, categories } = req.body;

        if (!name || !content || !listId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newNote = new Note({
            name,
            content,
            listId,
            categories: categories || [],
            creationDate: new Date(), // Добавляем дату
        });

        await newNote.save();

        // Добавляем заметку в список
        await NoteList.findByIdAndUpdate(listId, { $push: { notes: newNote._id } });

        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ message: "Error creating note", error: err.message });
    }
});

router.get("/:listId", async (req, res) => {
    try {
        if (!req.params.listId) return res.status(400).json({ message: "List ID is required" });

        const notes = await Note.find({ listId: req.params.listId })
            .populate({
                path: "categories",
                select: "name color" // Выбираем только нужные поля
            });

        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching notes", error: err.message });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const { categories } = req.body;

        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { ...req.body, categories: categories || [] },
            { new: true }
        );

        if (!note) return res.status(404).json({ message: "Note not found" });

        res.json(note);
    } catch (err) {
        res.status(500).json({ message: "Error updating note", error: err.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        await NoteList.findByIdAndUpdate(note.listId, { $pull: { notes: note._id } });

        res.status(200).json({ message: "Note deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting note", error: err.message });
    }
});

export default router;
