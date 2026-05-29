import { useEffect, useRef } from "react";
import { useNotifications } from "../context/NotificationContext";
import NotificationItem from "./NotificationItem";

const NotificationPanel = ({ onClose }) => {
  const { notifications, markAllNotificationsRead } = useNotifications();
  const panelRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 flex flex-col max-h-[480px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Notifications</h3>
        <button
          onClick={markAllNotificationsRead}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          Mark all read
        </button>
      </div>

      {/* List */}
      <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <span className="text-3xl mb-2">🔔</span>
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          notifications.map((n) => (
            <NotificationItem key={n._id} notification={n} />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
