import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        content: { type: String, required: true },
        categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
        listId: { type: mongoose.Schema.Types.ObjectId, ref: "NoteList", required: true },
        creationDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model("Note", NoteSchema);
