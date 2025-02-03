import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import User from "../models/User.js";
import { registerValidation } from "../validations/auth.js";

const router = express.Router();

// Регистрация пользователя
router.post("/auth/register", registerValidation, async (req, res) => {
    try {
        // Проверка валидации данных
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, username, password } = req.body;

        // Проверка, существует ли пользователь с таким email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        // Хэширование пароля
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Создание нового пользователя
        const newUser = new User({
            username,
            email,
            password: passwordHash,
            taskLists: [],
            noteLists: [],
        });

        // Сохранение пользователя в базе данных
        const savedUser = await newUser.save();

        // Ответ клиенту
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
            },
        });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Вход пользователя
router.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Проверка существования пользователя
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Проверка пароля
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Создание токена
        const token = jwt.sign({ id: user._id }, "super-secret-key-123", { expiresIn: "7d" });

        // Отправка данных пользователя (без пароля)
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