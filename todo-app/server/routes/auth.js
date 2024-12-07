import express from "express";
import bcrypt from "bcrypt";
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

export default router;