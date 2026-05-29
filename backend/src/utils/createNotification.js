import Notification from "../models/Notification.js";

const createNotification = async (
    message,
    type = "info"
) => {
    const notification =
        await Notification.create({
            message,
            type
        });

    return notification;
};

export default createNotification;