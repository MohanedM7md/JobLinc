import { useEffect, useRef, useState } from "react";
import { useNotificationStore } from "../../store/Notification/notificationStore";

interface Props {
  onClick: () => void;
}

const NotificationBell: React.FC<Props> = ({ onClick }) => {
  const unseenCount = useNotificationStore((state) => state.unseenCount);
  const previousCount = useRef(unseenCount);
  const [jiggle, setJiggle] = useState(false);

  useEffect(() => {
    if (unseenCount > previousCount.current) {
      setJiggle(true);
      setTimeout(() => setJiggle(false), 600);
    }
    previousCount.current = unseenCount;
  }, [unseenCount]);

  return (
    <div
      onClick={onClick}
      className="group flex flex-col items-center justify-center w-[calc(100%/7)] sm:w-1/2 cursor-pointer relative"
    >
      <div className="relative">
        <i
          className={`fa-solid fa-bell text-[20px] text-[#2d2d2d] group-hover:text-black transition-transform duration-300 ${
            jiggle ? "animate-bounce" : ""
          }`}
        />
        {unseenCount > 0 && (
          <span className="absolute -top-1.5 -right-2 bg-[#e60023] text-white text-[12px] font-bold rounded-full px-[7px] py-[2px] leading-none min-w-[20px] text-center shadow-lg border-2 border-white">
            {unseenCount > 99 ? "99+" : unseenCount}
          </span>
        )}
      </div>
      <span className="text-xs text-[#2d2d2d] group-hover:text-black mt-[2px] hidden sm:flex">
        Notifications
      </span>
    </div>
  );
};

export default NotificationBell;
