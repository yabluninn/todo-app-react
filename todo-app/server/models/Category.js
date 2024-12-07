import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        color: { type: String, default: "#FFFFFF" },
    },
    { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);