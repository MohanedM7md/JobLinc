import { useState } from "react";
import NotificationBell from "../components/Notifications/NotificationBell";
import NotificationPanel from "../components/Notifications/NotificationPanel";

const NotificationTestPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8 h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">🔔 Notification Test Page</h1>

      <button
        className="p-3 bg-blue-600 text-white rounded"
        onClick={() => setIsOpen(true)}
      >
        Click Me to Show Panel
      </button>

      {/* Hard render bell */}
      <NotificationBell onClick={() => setIsOpen(true)} />

      <NotificationPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default NotificationTestPage;
