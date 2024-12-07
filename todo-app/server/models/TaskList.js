import mongoose from "mongoose";

const TaskListSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        color: { type: String, default: "#FFFFFF" },
        tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    },
    { timestamps: true }
);

export default mongoose.model("TaskList", TaskListSchema);
