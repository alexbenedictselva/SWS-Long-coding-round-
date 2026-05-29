import express from "express";
import cors from "cors";

import fileRoutes from "./routes/fileRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
const app = express();
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            process.env.CLIENT_URL,
        ].filter(Boolean),
        credentials: true,
    })
);
app.use(express.json());
app.use(
    "/uploads",
    express.static("src/uploads")
);
app.use(
    "/api/notifications",
    notificationRoutes
);
app.use("/api/files", fileRoutes);

app.get("/", (req, res) => {
    res.send("API Running");
});

export default app;