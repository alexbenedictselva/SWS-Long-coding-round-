import Notification from "../models/Notification.js";
import { getIO } from "../config/socket.js";

const createNotification = async (
    message,
    type = "info"
) => {

    const notification =
        await Notification.create({
            message,
            type
        });

    const io = getIO();

    io.emit("notification", notification);

    return notification;
};

export default createNotification;