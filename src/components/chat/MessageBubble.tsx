import React from "react";
import { Img } from "react-image";
import { Link } from "react-router-dom";
interface MessageInterface {
  sender: ;
  time: Date;
  content: {
    text: "سنة 2025—ة فاتحة منح عظيمة...";
    image: "post_image.jpg";
  };
}
function MessageBubble({ message }) {
  return (
    <div className="flex flex-col">
      <Link to={"./"}>
        <Img></Img>
      </Link>
      <div></div>
    </div>
  );
}
