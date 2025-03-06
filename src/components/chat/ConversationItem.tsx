import { Img } from "react-image";
import { Checkbox } from "./CheckBox";

type ConversationItemType = {
  imageUrl: string;
  userName: string;
  lastMessage: string;
  sentDate: string;
  size?: string;
};

export const ConversationItem = ({
  imageUrl,
  userName,
  lastMessage,
  sentDate,
  size = "w-12 ",
}: ConversationItemType) => {
  return (
    <div className={`${size}`}>
      <div className="flex">
        <Img className="w-full h-full rounded-full " src={imageUrl} />
        <Checkbox className="relative hidden peer top-2 -left-10 " />
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
