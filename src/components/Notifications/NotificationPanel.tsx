import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchNotifications().finally(() => setLoading(false));
      setTimeout(() => {
        document.querySelector(".notification-scroll")?.scrollTo(0, 0);
      }, 100);
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-200 shadow-xl z-50 transition-transform transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-red-600 transition font-semibold"
        >
          ✖
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto h-full px-4 pt-3 pb-6 bg-[#f8f6f2] notification-scroll">
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : notifications.length === 0 ? (
          <p className="text-center text-gray-500 mt-8 text-sm">
            You're all caught up!
          </p>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                {...notification}
                onClick={() => {
                  markAsRead(notification.id);
                  if (notification.type === "message") {
                    navigate("/messaging");
                  } else if (notification.type === "post") {
                    navigate(`/post/${notification.relatedId}`);
                  } else if (notification.type === "connection") {
                    navigate(`/profile/${notification.senderId}`);
                  }
                }}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-5">
          <button
            onClick={() => {
              onClose();
              setTimeout(() => navigate("/notifications"), 150);
            }}
            className="inline-block mt-1 bg-gray-800 hover:bg-black text-white text-sm font-semibold px-4 py-2 rounded-md transition"
          >
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
