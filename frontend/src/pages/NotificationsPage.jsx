import { useNotifications } from "../context/NotificationContext";
import NotificationItem from "../components/NotificationItem";

const NotificationsPage = () => {
  const {
    notifications,
    unreadCount,
    isLoading,
    markAllNotificationsRead,
  } = useNotifications();

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Notifications
            {notifications.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({notifications.length})
              </span>
            )}
          </h1>
          {unreadCount > 0 && (
            <p className="text-sm text-blue-600 mt-0.5">
              {unreadCount} unread
            </p>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            Mark All Read
          </button>
        )}
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-gray-400">
            <svg className="w-5 h-5 animate-spin text-blue-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <p className="text-sm">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
            <span className="text-5xl">🔔</span>
            <p className="text-sm font-medium">No notifications yet</p>
            <p className="text-xs text-gray-300">
              Notifications will appear here after file uploads
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((n) => (
              <NotificationItem key={n._id} notification={n} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
