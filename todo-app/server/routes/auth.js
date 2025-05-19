import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import User from "../models/User.js";
import { registerValidation } from "../validations/auth.js";
import Category from "../models/Category.js";
import TaskList from "../models/TaskList.js";
import NoteList from "../models/NoteList.js";

const router = express.Router();

router.post("/register", registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, username, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            taskLists: [],
            noteLists: [],
        });

        const uncategorizedCategory = await Category.create({
            name: "Uncategorized",
            color: "#bbbbbb",
        });

        // Создаем список задач "All"
        const allTasksList = await TaskList.create({
            name: "All",
            color: "#009688",
            tasks: [],
        });

        // Создаем список заметок "Notes"
        const notesList = await NoteList.create({
            name: "Notes",
            color: "#ffcc00",
            notes: [],
        });

        // Добавляем созданные объекты в пользователя
        newUser.categories.push(uncategorizedCategory._id);
        newUser.taskLists.push(allTasksList._id);
        newUser.noteLists.push(notesList._id);

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, "super-secret-key-123", { expiresIn: "7d" });

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;