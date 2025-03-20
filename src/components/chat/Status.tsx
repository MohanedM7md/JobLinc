import { useUser } from "./mockUse";
import { RecievedMessage } from "@chatComponent/interfaces/Message.interfaces";
import React from "react";

function Status({
  lastMessage,
  ref,
  className,
}: {
  lastMessage: RecievedMessage;
  ref: React.RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  const { user } = useUser();

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

  return (
    <div className={className} ref={ref}>
      {statusString}
    </div>
  );
}

export default Status;
