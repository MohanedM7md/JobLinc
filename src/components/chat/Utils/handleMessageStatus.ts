const handleMessageStatus = () => {
  setTimeout(() => {
    if (!messageDelivered.current) {
      messageDelivered.current = true;
      setMessages((prevMsgs) =>
        prevMsgs.map((msg) =>
          msg.messageId === messageId ? { ...msg, status: "failed" } : msg,
        ),
      );
    }
  }, 1000);
};
