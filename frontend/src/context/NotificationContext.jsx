import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  // Derived — recalculates only when notifications changes
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getNotifications();
      // Sort newest first
      setNotifications(
        [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (error) {
      toast.error(error.message || "Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [notification, ...prev]);
  }, []);

  const markNotificationRead = useCallback(async (id) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      toast.error(error.message || "Failed to mark notification as read");
    }
  }, []);

  const markAllNotificationsRead = useCallback(async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      toast.error(error.message || "Failed to mark all notifications as read");
    }
  }, []);

  // Alias for external refresh calls
  const refreshNotifications = fetchNotifications;

  // Fetch on mount + socket setup
  useEffect(() => {
    fetchNotifications();

    const socket = io("http://localhost:5000", { transports: ["websocket"] });

    socket.on("notification", (notification) => {
      addNotification(notification);
      if (notification.type === "error") {
        toast.error(notification.message);
      } else if (notification.type === "info") {
        toast(notification.message);
      } else {
        toast.success(notification.message);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [fetchNotifications, addNotification]);

  const value = useMemo(
    () => ({
      notifications,
      setNotifications,
      unreadCount,
      isLoading,
      fetchNotifications,
      addNotification,
      markNotificationRead,
      markAllNotificationsRead,
      refreshNotifications,
    }),
    [
      notifications,
      unreadCount,
      isLoading,
      fetchNotifications,
      addNotification,
      markNotificationRead,
      markAllNotificationsRead,
      refreshNotifications,
    ]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
