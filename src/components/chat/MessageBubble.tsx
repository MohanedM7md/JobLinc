import React from "react";
import { Img } from "react-image";
import UserProfile from "../UserProfile";

interface MessageInterface {
  sender: {
    id: string;
    name: string;
    profilePicture: string;
  };
  time: Date;
  content: {
    text?: string;
    image?: string;
    video?: string;
    document?: string;
  };
}
function MessageBubble({ message }: { message: MessageInterface }) {
  return (
    <div className="flex flex-col">
      <UserProfile userId="" clasName="">
        <UserProfile.Image
          userName={message.sender.name}
          photoUrl={message.sender.profilePicture}
          className="w-10 absolute"
        />
        <UserProfile.Name name={message.sender.name} className=" ml-13" />
      </UserProfile>
      <div className="ml-13">
        {message.content.text && <p>{message.content.text}</p>}
        {message.content.image && <Img src={message.content.image} />}
        {message.content.video && <video src={message.content.video}>{}</video>}
      </div>
    </div>
  );
}

export default MessageBubble;
