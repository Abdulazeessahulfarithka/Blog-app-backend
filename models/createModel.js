import mongoose from "mongoose";

const createSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }
}, { timestamps: true }); 

export default mongoose.model("Create", createSchema);
