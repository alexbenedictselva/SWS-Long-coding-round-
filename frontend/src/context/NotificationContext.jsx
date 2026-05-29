import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../api/notificationApi";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      toast.error("Failed to load notifications");
    }
  };

  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const markNotificationRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };

  const markAllNotificationsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      toast.error("Failed to mark all as read");
    }
  };

  useEffect(() => {
    fetchNotifications();

    const socket = io("http://localhost:5000");

    socket.on("notification", (notification) => {
      addNotification(notification);
      if (notification.type === "error") {
        toast.error(notification.message);
      } else {
        toast.success(notification.message);
      }
    });

    return () => socket.disconnect();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        unreadCount,
        fetchNotifications,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  return context;
};
