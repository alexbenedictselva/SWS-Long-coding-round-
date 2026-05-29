import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api`,
});

// Fetch all notifications
export const getNotifications = async () => {
  try {
    const response = await api.get("/notifications");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch notifications"
    );
  }
};

// Mark a specific notification as read by ID
export const markAsRead = async (id) => {
  try {
    const response = await api.patch(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to mark notification as read"
    );
  }
};

// Mark all notifications as read
export const markAllAsRead = async () => {
  try {
    const response = await api.patch("/notifications/read-all");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to mark all notifications as read"
    );
  }
};

export default api;
