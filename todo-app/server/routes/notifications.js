import express from "express";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const user = await User.findById(userId).populate("notifications");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.notifications);
    } catch (err) {
        console.error("Error fetching notifications:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/", async (req, res) => {
    try {
        console.log("🔹 Request body received:", req.body);

        const { userId, taskId, name, type } = req.body;

        if (!userId || !name || !type) {
            return res.status(400).json({ message: "Missing required fields (userId, name, type)" });
        }

        const newNotification = new Notification({
            userId,
            taskId: taskId || null, // Разрешаем null, если taskId отсутствует
            name,
            type,
            timestamp: new Date()
        });

        await newNotification.save();
        await User.findByIdAndUpdate(userId, { $push: { notifications: newNotification._id } });

        res.status(201).json(newNotification);
    } catch (err) {
        console.error("❌ Error creating notification:", err);
        res.status(500).json({ message: "Server error" });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findById(id);
        if (!notification) return res.status(404).json({ message: "Notification not found" });

        await Notification.findByIdAndDelete(id);
        await User.findByIdAndUpdate(notification.userId, { $pull: { notifications: id } });

        res.json({ message: "Notification deleted" });
    } catch (err) {
        console.error("Error deleting notification:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/", async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        await Notification.deleteMany({ userId });
        await User.findByIdAndUpdate(userId, { notifications: [] });

        res.json({ message: "All notifications deleted" });
    } catch (err) {
        console.error("Error deleting all notifications:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;