import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            required: true
        },

        fileSize: {
            type: Number,
            required: true
        },

        fileType: {
            type: String,
            required: true
        },

        fileUrl: {
            type: String,
            required: true
        },

        uploadStatus: {
            type: String,
            enum: ["pending", "uploading", "complete", "failed"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("File", fileSchema);