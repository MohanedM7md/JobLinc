import { useNavigate } from "react-router-dom";
import { MessageSquare, ThumbsUp, UserPlus, Repeat } from "lucide-react";

interface Props {
  notification: {
    id: string;
    senderName: string;
    senderAvatar: string;
    message?: string;
    type: "message" | "like" | "connection" | "repost";
    timestamp: string;
    postId?: string;
    senderId?: string;
    read?: boolean;
  };
}

const NotificationCard: React.FC<Props> = ({ notification }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    switch (notification.type) {
      case "message":
        navigate("/messaging");
        break;
      case "like":
      case "repost":
        if (notification.postId) navigate(`/post/${notification.postId}`);
        break;
      case "connection":
        if (notification.senderId)
          navigate(`/profile/${notification.senderId}`);
        break;
      default:
        break;
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case "message":
        return <MessageSquare className="text-blue-500 w-5 h-5" />;
      case "like":
        return <ThumbsUp className="text-green-500 w-5 h-5" />;
      case "repost":
        return <Repeat className="text-purple-500 w-5 h-5" />;
      case "connection":
        return <UserPlus className="text-pink-500 w-5 h-5" />;
      default:
        return null;
    }
  };

  const containerStyle = `bg-white rounded-xl border shadow-sm hover:shadow-md transition-all cursor-pointer px-4 py-3 flex gap-3 items-start relative ${
    !notification.read ? "bg-[#fef7f3] border-red-200" : ""
  }`;

  return (
    <div onClick={handleClick} className={containerStyle}>
      <img
        src={notification.senderAvatar}
        alt={notification.senderName}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="text-sm text-gray-800 font-medium mb-1">
          {notification.senderName}{" "}
          <span className="text-gray-600 font-normal">
            {notification.message || getDefaultMessage(notification.type)}
          </span>
        </div>
        <div className="text-xs text-gray-500">{notification.timestamp}</div>
      </div>
      <div className="pt-1">{getIcon()}</div>
    </div>
  );
};

function getDefaultMessage(type: string) {
  switch (type) {
    case "message":
      return "sent you a message.";
    case "like":
      return "liked your post.";
    case "repost":
      return "reposted your content.";
    case "connection":
      return "connected with you.";
    default:
      return "";
  }
}

export default NotificationCard;
