import { Img } from "react-image";
import { Checkbox } from "./CheckBox";

type ConversationItemType = {
  imageUrl: string;
  userName: string;
  lastMessage: string;
  sentDate: string;
  size?: string;
};

const ConversationItem = ({
  imageUrl,
  userName,
  lastMessage,
  sentDate,
  size = "w-32 h-20",
}: ConversationItemType) => {
  return (
    <div className={`${size}`}>
      <div>
        <Checkbox />
        <Img src={imageUrl} />
      </div>
      <div>
        <div>
          <div>{userName}</div>
          <div>{lastMessage}</div>
        </div>
        <div>{sentDate}</div>
      </div>
    </div>
  );
};
