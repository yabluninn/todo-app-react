import express from "express";
import Category from "../models/Category.js";
import User from "../models/User.js";

const router = express.Router();

// Получение категорий пользователя
router.get("/", async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(userId).populate("categories");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user.categories);
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Добавление категории
router.post("/", async (req, res) => {
    try {
        const { userId, name, color } = req.body;
        if (!userId || !name) {
            return res.status(400).json({ message: "User ID and category name are required" });
        }

        const newCategory = new Category({ name, color });
        await newCategory.save();

        await User.findByIdAndUpdate(userId, { $push: { categories: newCategory._id } });

        res.status(201).json(newCategory);
    } catch (err) {
        console.error("Error creating category:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Обновление категории
router.put("/:id", async (req, res) => {
    try {
        const { name, color } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, color },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(updatedCategory);
    } catch (err) {
        console.error("Error updating category:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Удаление категории
router.delete("/:id", async (req, res) => {
    try {
        const { userId } = req.query;

        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await Category.findByIdAndDelete(req.params.id);
        await User.findByIdAndUpdate(userId, { $pull: { categories: req.params.id } });

        res.json({ message: "Category deleted" });
    } catch (err) {
        console.error("Error deleting category:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Удаление всех категорий пользователя
router.delete("/all/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // Удаляем все категории пользователя
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await Category.deleteMany({ _id: { $in: user.categories } });
        await User.findByIdAndUpdate(userId, { $set: { categories: [] } });

        res.json({ message: "All categories deleted" });
    } catch (err) {
        console.error("Error deleting all categories:", err);
        res.status(500).json({ message: "Server error" });
    }
});


export default router;
