import React, { useState } from "react";
import { useNotificationStore } from "@store/Notification/notificationStore";
import NotificationCard from "@components/Notifications/NotificationCard ";
import { Menu } from "lucide-react";

const NotificationPage = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filters = [
    { key: "all", label: "All" },
    { key: "mentions", label: "Mentions" },
    { key: "follows", label: "Follows" },
    { key: "reactions", label: "Reactions" },
    { key: "messages", label: "Messages" },
  ];

  const filteredNotifications = notifications.filter((n) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "mentions") return n.type === "mention";
    if (selectedFilter === "follows") return n.type === "connection";
    if (selectedFilter === "reactions")
      return ["like", "repost"].includes(n.type);
    if (selectedFilter === "messages") return n.type === "message";
    return true;
  });

  return (
    <div className="h-screen flex flex-col bg-[#fdf8f1]">
      {/* Header bar like Messaging page */}
      <div className="bg-[#f5f5f5] border-b px-6 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Notifications</h1>
        {/* Optional search or controls here */}
      </div>

      {/* Content area with sidebar + list */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`transition-all duration-300 ${
            sidebarOpen ? "w-[260px]" : "w-14"
          } bg-white border-r shadow-sm relative`}
        >
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
            title="Toggle Filters"
          >
            <Menu size={18} />
          </button>

          {sidebarOpen && (
            <div className="pt-6 px-4">
              <h2 className="text-sm font-medium text-gray-600 mb-4">
                Filter By
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                {filters.map((filter) => (
                  <li
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key)}
                    className={`px-3 py-2 rounded cursor-pointer transition ${
                      selectedFilter === filter.key
                        ? "bg-gray-100 text-red-600 font-semibold"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {filter.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 py-5 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="text-center text-gray-500 mt-20 text-sm">
              You're all caught up! 🎉
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default NotificationPage;
