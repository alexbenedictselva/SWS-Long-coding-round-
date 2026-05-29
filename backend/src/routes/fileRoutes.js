import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadFiles,getAllFiles } from "../controllers/fileController.js";

const router = express.Router();

router.post(
    "/upload",
    upload.array("files"),
    uploadFiles
);
router.get("/", getAllFiles);

export default router;  