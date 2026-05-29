import express from "express";
import cors from "cors";

import fileRoutes from "./routes/fileRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
    "/uploads",
    express.static("src/uploads")
);
app.use("/api/files", fileRoutes);

app.get("/", (req, res) => {
    res.send("API Running");
});

export default app;