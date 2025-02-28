import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
            name: { type: String, required: true },
            description: { type: String, required: true },
            date: { type: Date, required: true },
            startTime: { type: String },
            endTime: { type: String },
            priority: { type: String, enum: ["none", "low", "medium", "high"], default: "none" },
            listId: { type: mongoose.Schema.Types.ObjectId, ref: "TaskList", required: true },
            relatedNoteId: { type: mongoose.Schema.Types.ObjectId, ref: "Note", default: null },
            completed: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
