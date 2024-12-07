import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        content: { type: String, required: true },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        listId: { type: mongoose.Schema.Types.ObjectId, ref: "NoteList", required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Note", NoteSchema);