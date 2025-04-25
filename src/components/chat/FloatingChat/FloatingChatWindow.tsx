import React, { useCallback, useState, useEffect, memo, useRef } from "react";
import FloatingChatHeader from "./FloatingChatHeader";
import ChatContent from "../ChatContent";
import useChats from "@hooks/useChats";
import useChatid from "@context/ChatIdProvider";
import useNetworkUserId from "@context/NetworkUserIdProvider";
import { FloatingChatWindowProps } from "@chatComponent/interfaces/Chat.interfaces";
import { motion } from "framer-motion";
function FloatingChatWindow({
  className,
  chatName,
  chatPicture,
}: FloatingChatWindowProps) {
  const { chatId } = useChatid();
  const { usersId } = useNetworkUserId();
  const { setOpnedChats, opnedChats } = useChats();
  const [isActive, setActive] = useState<boolean>(true);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const maxChats = Math.floor(
    (windowWidth > 720 ? windowWidth - 288 : windowWidth + 100) / 400,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (opnedChats.length > maxChats) {
      setOpnedChats((prevChats) => prevChats.slice(1));
    }
  }, [maxChats]);

  const activeToggler = useCallback(() => {
    setActive((prevIsActive) => !prevIsActive);
  }, []);

  const CloseChat = useCallback((chatId?: string, usersId?: string[]) => {
    console.log("Closing chat:", chatId);
    setOpnedChats((prevChats) => {
      return usersId?.length
        ? prevChats.filter((chat) => chat.usersId !== usersId!)
        : prevChats.filter((chat) => chat.chatId !== chatId);
    });
  }, []);

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 10 }}
      exit={{ x: -50 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`shadow-xl border border-gray-200 rounded-t-lg 
      
        sm:w-[400px] w-[80vw] mr-10
        relative bottom-0  ${className} ${!isActive ? "translate-y-[calc(100%-60px)] h-0" : ""}`}
      data-testid="test-floatingWindow"
    >
      <FloatingChatHeader
        onClick={activeToggler}
        title={chatName}
        chatPicture={chatPicture}
        onClose={() => CloseChat(chatId, usersId)}
      />
      <ChatContent className="h-[60vh]" />
    </motion.div>
  );
}

export default memo(FloatingChatWindow);
