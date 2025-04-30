import React, { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import { useNotificationStore } from "../../store/Notification/notificationStore";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const { notifications, fetchNotifications, markAsRead } =
    useNotificationStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchNotifications().finally(() => setLoading(false));
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transition-transform transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <button
          onClick={onClose}
          className="text-sm px-2 py-1 rounded hover:bg-gray-100 transition text-blue-600 font-medium"
        >
          ✖ Close
        </button>
      </div>

      {/* Notification List */}
      <div className="overflow-y-auto h-full px-4 py-2">
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">
            No new notifications.
          </p>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              {...notification}
              onClick={() => {
                markAsRead(notification.id);
                if (notification.type === "message") {
                  console.log("📩 Redirect to messaging page...");
                }
              }}
            />
          ))
        )}

        {/* View All */}
        <div className="text-center mt-3">
          <button className="text-sm text-blue-500 hover:underline">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
