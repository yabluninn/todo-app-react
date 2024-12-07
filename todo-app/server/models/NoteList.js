import mongoose from "mongoose";

const NoteListSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        color: { type: String, default: "#FFFFFF" },
        notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
    },
    { timestamps: true }
);

export default mongoose.model("NoteList", NoteListSchema);