import express from "express";
import Category from "../models/Category.js";
import User from "../models/User.js";
import Note from "../models/Note.js";

const router = express.Router();

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

// router.delete("/:id", async (req, res) => {
//     try {
//         const { userId } = req.query;
//
//         const category = await Category.findById(req.params.id);
//         if (!category) {
//             return res.status(404).json({ message: "Category not found" });
//         }
//
//         if (category.name === "Uncategorized"){
//             return;
//         }
//
//         await Category.findByIdAndDelete(req.params.id);
//         await User.findByIdAndUpdate(userId, { $pull: { categories: req.params.id } });
//
//         res.json({ message: "Category deleted" });
//     } catch (err) {
//         console.error("Error deleting category:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// });

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.query;

        if (!id) return res.status(400).json({ message: "Category ID is required" });

        const category = await Category.findById(id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        // Удаляем категорию у всех заметок
        await Note.updateMany(
            { categories: id },
            { $pull: { categories: id } }
        );

        // Обновляем заметки, у которых теперь нет категорий (назначаем "Uncategorized")
        const uncategorizedCategory = await Category.findOne({ name: "Uncategorized", user: userId });

        if (!uncategorizedCategory) {
            console.warn("⚠️ 'Uncategorized' category not found, creating...");
            const newCategory = new Category({ name: "Uncategorized", color: "#cccccc" });
            await newCategory.save();

            // Обновляем заметки, у которых осталась пустая категория
            await Note.updateMany(
                { categories: { $size: 0 } }, // Заметки без категорий
                { $push: { categories: newCategory._id } } // Назначаем "Uncategorized"
            );
        } else {
            await Note.updateMany(
                { categories: { $size: 0 } },
                { $push: { categories: uncategorizedCategory._id } }
            );
        }

        // Удаляем саму категорию
        await Category.findByIdAndDelete(id);

        // Удаляем категорию у пользователя
        await User.findByIdAndUpdate(userId, { $pull: { categories: id } });

        res.json({ message: "Category deleted and notes updated" });
    } catch (err) {
        console.error("❌ Error deleting category:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// router.delete("/all/:userId", async (req, res) => {
//     try {
//         const { userId } = req.params;
//
//         // Удаляем все категории пользователя
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//
//         await Category.deleteMany({ _id: { $in: user.categories } });
//         await User.findByIdAndUpdate(userId, { $set: { categories: [] } });
//
//         res.json({ message: "All categories deleted" });
//     } catch (err) {
//         console.error("Error deleting all categories:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// });


export default router;
