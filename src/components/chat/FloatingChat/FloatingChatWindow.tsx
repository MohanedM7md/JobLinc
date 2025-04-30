import React, { useCallback, useState, useEffect, memo } from "react";
import FloatingChatHeader from "./FloatingChatHeader";
import ChatContent from "../ChatContent";
import useChats from "@hooks/useChats";
import useChatid from "@context/ChatIdProvider";
import useNetworkUserId from "@context/NetworkUserIdProvider";
import { FloatingChatWindowProps } from "@chatComponent/interfaces/Chat.interfaces";
import { motion, AnimatePresence } from "framer-motion";

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
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 10, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`shadow-xl border border-gray-200 rounded-t-lg 
        sm:w-[400px] w-[80vw] mr-10
        relative bottom-0 ${className} overflow-hidden`}
      style={{
        height: isActive ? "calc(60vh + 60px)" : "60px",
        transition: "height 300ms cubic-bezier(0.2, 0, 0, 1)",
      }}
      data-testid="test-floatingWindow"
    >
      <FloatingChatHeader
        onClick={activeToggler}
        title={chatName}
        chatPicture={chatPicture}
        onClose={() => CloseChat(chatId, usersId)}
      />

      <div
        className="overflow-hidden"
        style={{
          height: isActive ? "60vh" : "0px",
          transition: "height 300ms cubic-bezier(0.2, 0, 0, 1)",
        }}
      >
        <ChatContent className="h-full" />
      </div>
    </motion.div>
  );
}

export default memo(FloatingChatWindow);
