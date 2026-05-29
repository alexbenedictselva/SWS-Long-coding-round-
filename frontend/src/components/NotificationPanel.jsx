import { useEffect, useRef, useState } from "react";
import { useNotifications } from "../context/NotificationContext";
import NotificationItem from "./NotificationItem";

const NotificationPanel = ({ onClose }) => {
  const { notifications, markAllNotificationsRead, isLoading } =
    useNotifications();
  const panelRef = useRef(null);
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  const handleMarkAllRead = async () => {
    setIsMarkingAll(true);
    await markAllNotificationsRead();
    setIsMarkingAll(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12 gap-2 text-gray-400">
          <svg className="w-5 h-5 animate-spin text-blue-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <p className="text-sm">Loading notifications...</p>
        </div>
      );
    }

    if (!notifications.length) {
      return (
        <div className="flex flex-col items-center justify-center py-12 gap-2 text-gray-400">
          <span className="text-4xl">🔔</span>
          <p className="text-sm font-medium">No notifications yet</p>
        </div>
      );
    }

    return notifications.map((n) => (
      <NotificationItem key={n._id} notification={n} />
    ));
  };

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 flex flex-col overflow-hidden"
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <h3 className="font-semibold text-gray-800 text-sm">
          Notifications
          {notifications.length > 0 && (
            <span className="ml-1.5 text-gray-400 font-normal">
              ({notifications.length})
            </span>
          )}
        </h3>
        {notifications.some((n) => !n.read) && (
          <button
            onClick={handleMarkAllRead}
            disabled={isMarkingAll}
            className="text-xs text-blue-600 hover:text-blue-800 disabled:text-blue-300 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded transition-colors"
          >
            {isMarkingAll ? "Marking..." : "Mark All Read"}
          </button>
        )}
      </div>

      {/* Scrollable List */}
      <div className="overflow-y-auto max-h-[400px] divide-y divide-gray-100">
        {renderContent()}
      </div>
    </div>
  );
};

export default NotificationPanel;
