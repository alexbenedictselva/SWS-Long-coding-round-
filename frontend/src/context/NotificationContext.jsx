import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../api/notificationApi";

const SOCKET_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading]         = useState(true);
  const [isConnected, setIsConnected]     = useState(false);
  const socketRef                         = useRef(null);

  // Derived — recalculates only when notifications changes
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getNotifications();
      setNotifications(
        [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (error) {
      toast.error(error.message || "Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Duplicate-safe insert — checks _id before prepending
  const addNotification = useCallback((notification) => {
    setNotifications((prev) => {
      if (prev.some((n) => n._id === notification._id)) return prev;
      return [notification, ...prev];
    });
  }, []);

  const markNotificationRead = useCallback(async (id) => {
    // Optimistic update
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
    try {
      await markAsRead(id);
      toast.success("Notification marked as read");
    } catch (error) {
      // Rollback on failure
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: false } : n))
      );
      toast.error(error.message || "Failed to mark notification as read");
    }
  }, []);

  const markAllNotificationsRead = useCallback(async () => {
    // Optimistic update
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await markAllAsRead();
      toast.success("All notifications marked as read");
    } catch (error) {
      // Rollback on failure
      setNotifications((prev) => prev.map((n) => ({ ...n, read: false })));
      toast.error(error.message || "Failed to mark all notifications as read");
    }
  }, []);

  const refreshNotifications = fetchNotifications;

  // Fetch on mount + global socket setup
  useEffect(() => {
    fetchNotifications();

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connect",       () => setIsConnected(true));
    socket.on("disconnect",    () => setIsConnected(false));
    socket.on("connect_error", () => setIsConnected(false));

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
      socket.off("notification");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [fetchNotifications, addNotification]);

  const value = useMemo(
    () => ({
      notifications,
      setNotifications,
      unreadCount,
      isLoading,
      isConnected,
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
      isConnected,
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
