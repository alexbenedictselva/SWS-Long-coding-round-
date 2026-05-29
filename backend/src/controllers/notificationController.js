import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find()
            .sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { read: false },
            { read: true }
        );

        res.status(200).json({
            message: "All notifications marked as read"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};