import { useNotifications } from "../context/NotificationContext";

const TYPE_STYLES = {
  success: "bg-green-100 text-green-700",
  error: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
};

const NotificationItem = ({ notification }) => {
  const { markNotificationRead } = useNotifications();
  const { _id, message, type, read, createdAt } = notification;

  const time = new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
        !read ? "bg-blue-50/40" : ""
      }`}
    >
      {/* Unread dot */}
      <div className="mt-1.5 flex-shrink-0">
        {!read ? (
          <span className="block w-2 h-2 rounded-full bg-blue-500" />
        ) : (
          <span className="block w-2 h-2" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 leading-snug">{message}</p>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              TYPE_STYLES[type] || TYPE_STYLES.info
            }`}
          >
            {type}
          </span>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
      </div>

      {!read && (
        <button
          onClick={() => markNotificationRead(_id)}
          className="text-xs text-blue-500 hover:text-blue-700 flex-shrink-0 mt-0.5"
        >
          Mark read
        </button>
      )}
    </div>
  );
};

export default NotificationItem;
