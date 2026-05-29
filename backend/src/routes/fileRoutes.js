import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadFiles } from "../controllers/fileController.js";

const router = express.Router();

router.post(
    "/upload",
    upload.array("files"),
    uploadFiles
);

export default router;  