import File from "../models/File.js";
import createNotification
from "../utils/createNotification.js";
export const uploadFiles = async (req, res) => {
    try {
        const uploadedFiles = [];

        for (const file of req.files) {
            const newFile = await File.create({
                fileName: file.originalname,
                fileSize: file.size,
                fileType: file.mimetype,
                fileUrl: file.path,
                uploadStatus: "complete"
            });

            uploadedFiles.push(newFile);
        }
        // CREATE NOTIFICATION HERE
        await createNotification(
            `${uploadedFiles.length} file(s) uploaded successfully`,
            "success"
        );

        res.status(201).json({
            success: true,
            count: uploadedFiles.length,
            files: uploadedFiles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const getAllFiles = async (req, res) => {
    try {
        const files = await File.find().sort({
            createdAt: -1
        });

        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};