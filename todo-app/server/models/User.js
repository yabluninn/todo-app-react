import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
            username: { type: String, required: true },
            password: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            taskLists: [{ type: mongoose.Schema.Types.ObjectId, ref: "TaskList" }],
            noteLists: [{ type: mongoose.Schema.Types.ObjectId, ref: "NoteList" }],
            categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
            notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notification" }],
            isNotificationsEnabled: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
