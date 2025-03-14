import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: false },
        name: { type: String, required: true },
        type: { type: String, enum: ["start", "reminder"], required: true },
        timestamp: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
