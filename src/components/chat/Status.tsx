import { useUser } from "./mockUse";
import { RecievedMessage } from "@chatComponent/interfaces/Message.interfaces";
import React from "react";

function Status({
  lastMessage,

  className,
}: {
  lastMessage: RecievedMessage;

  className?: string;
}) {
  const statusString = (() => {
    switch (lastMessage.status) {
      case 0:
        return "Sent";
      case 1:
        return "Delivered";
      case 2:
        return "Read";
      default:
        return "Unknown";
    }
  })();

  return <div className={className}>{statusString}</div>;
}

export default Status;
