import { useNotifications } from "../context/NotificationContext";

const TYPE_CONFIG = {
  success: { label: "Success", icon: "✓", cls: "bg-green-100 text-green-700" },
  error:   { label: "Error",   icon: "⚠", cls: "bg-red-100 text-red-600"    },
  info:    { label: "Info",    icon: "ℹ", cls: "bg-blue-100 text-blue-600"  },
};

const formatTime = (iso) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const NotificationItem = ({ notification }) => {
  const { markNotificationRead } = useNotifications();
  const { _id, message, type, read, createdAt } = notification;
  const cfg = TYPE_CONFIG[type] ?? TYPE_CONFIG.info;

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-gray-50 ${
        !read ? "bg-blue-50/40" : "bg-white"
      }`}
    >
      {/* Unread dot */}
      <div className="mt-1.5 flex-shrink-0 w-2">
        {!read && (
          <span className="block w-2 h-2 rounded-full bg-blue-500" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 leading-snug">{message}</p>

        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.cls}`}>
            <span>{cfg.icon}</span>
            {cfg.label}
          </span>
          <span className="text-xs text-gray-400">{formatTime(createdAt)}</span>
        </div>
      </div>

      {/* Mark as read */}
      {!read && (
        <button
          onClick={() => markNotificationRead(_id)}
          className="flex-shrink-0 text-xs text-blue-500 hover:text-blue-700 font-medium mt-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
        >
          Mark as Read
        </button>
      )}
    </div>
  );
};

export default NotificationItem;
