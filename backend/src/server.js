import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/db.js";
import { setIO } from "./config/socket.js";

connectDB();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            process.env.CLIENT_URL,
        ].filter(Boolean),
        methods: ["GET", "POST"],
        credentials: true,
    }
});

setIO(io);

io.on("connection", (socket) => {
    console.log(`Client Connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`Client Disconnected: ${socket.id}`);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});