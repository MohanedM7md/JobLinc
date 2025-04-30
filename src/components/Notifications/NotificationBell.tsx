import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useNotificationStore } from "../../store/Notification/notificationStore";

interface Props {
  onClick: () => void;
}

const NotificationBell: React.FC<Props> = ({ onClick }) => {
  const unseenCount = useNotificationStore((state) => state.unseenCount);
  const previousCount = useRef(unseenCount);
  const [jiggle, setJiggle] = useState(false);

  // ✅ Play jiggle animation when unseen count increases
  useEffect(() => {
    if (unseenCount > previousCount.current) {
      setJiggle(true);
      setTimeout(() => setJiggle(false), 600); // animation duration
    }
    previousCount.current = unseenCount;
  }, [unseenCount]);

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer text-gray-700 hover:text-blue-600 transition"
    >
      <Bell
        className={`w-6 h-6 transition-transform duration-300 ${
          jiggle ? "animate-bounce" : ""
        }`}
      />

      {unseenCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.5rem] text-center">
          {unseenCount > 99 ? "99+" : unseenCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
