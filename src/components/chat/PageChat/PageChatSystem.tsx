import { useCallback, useEffect, useState } from "react";
import ChatCardsList from "../ChatCardsList";
import PageMessageWindow from "./PageChatWindow";
import useChatId from "@context/ChatIdProvider";
import connectToChat, {
  disconnectChatSocket,
  onConnect,
} from "@services/api/ChatSocket";
import { AnimatePresence, motion } from "framer-motion";
import { EllipsisVertical, Menu, X } from "lucide-react";
import SearchBar from "@chatComponent/UI/SearchBar";
import NetWorksChatList from "@chatComponent/NetWorksChatList";
import useNetworkUserId from "@context/NetworkUserIdProvider";
import ConnectionsSidebar from "@chatComponent/PageChat/ConnectionsSidebar";
import { Users2, ShieldAlert } from "lucide-react";
import DropdownMenu from "@chatComponent/UI/DropdownMenu";
import ConfirmationModal from "@chatComponent/UI/ConfirmationModal";
import { BlockMessaging } from "@services/api/chatServices";

function PageChatSystem() {
  const { setChatId } = useChatId();
  const { setUsersId } = useNetworkUserId();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [opnedChatName, setOpnedChatName] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBlockConfirmation, setShowBlockConfirmation] = useState(false);

  const handleBlockUser = async () => {
    try {
      BlockMessaging("");
      setShowBlockConfirmation(false);
    } catch (error) {
      console.error("Failed to block user:", error);
    }
  };

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);

      if (window.innerWidth < 768) {
        setIsChatSidebarOpen(false);
      } else {
        setIsChatSidebarOpen(true);
      }
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const onFocusedToggler = () => {
    setTimeout(() => {
      setIsFocused(!isFocused);
    }, 100);
  };

  const handleSearchChange = useCallback(
    (value: string) => setSearchTerm(value),
    [],
  );

  const handleConversationClick = useCallback(
    (chatId: string, chatName: string) => {
      setUsersId([]);
      setChatId(chatId);
      setOpnedChatName(chatName);

      if (isMobileView) {
        setIsChatSidebarOpen(false);
      }
    },
    [isMobileView],
  );

  const handleNetWorkUserClick = useCallback(
    (userId: string, chatName: string) => {
      setUsersId([userId]);
      setOpnedChatName(chatName);
      setChatId("");

      if (isMobileView) {
        setIsChatSidebarOpen(false);
      }
    },
    [isMobileView],
  );

  useEffect(() => {
    const initializeChat = async () => {
      connectToChat();
      onConnect(setIsConnected);
    };

    initializeChat();
    return () => disconnectChatSocket();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          {isMobileView && (
            <button
              onClick={() => setIsChatSidebarOpen(!isChatSidebarOpen)}
              className="p-2 rounded-full hover:bg-gray-200 transition"
              aria-label="Toggle chat sidebar"
            >
              {isChatSidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          )}
          <h2 className="hidden md:block font-semibold text-lg text-gray-800">
            Messaging
          </h2>
          {isMobileView && !isChatSidebarOpen && (
            <h2 className="font-semibold text-base text-gray-800 truncate">
              {opnedChatName || "Messaging"}
            </h2>
          )}
        </div>

        <div className="flex items-center gap-3 w-full justify-end">
          <SearchBar
            FocusToggler={onFocusedToggler}
            onChange={handleSearchChange}
            className="sm:w-lg md:w-xl"
          />
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <Users2 />
          </button>
          {isSidebarOpen && (
            <ConnectionsSidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          )}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Chat options"
            >
              <EllipsisVertical className="w-5 h-5 text-gray-600" />
            </button>

            <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowBlockConfirmation(true);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 text-left text-sm hover:bg-red-50 text-red-600 transition-colors duration-150"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Block messaging</span>
              </button>
            </DropdownMenu>
          </div>

          <ConfirmationModal
            isOpen={showBlockConfirmation}
            onClose={() => setShowBlockConfirmation(false)}
            onConfirm={handleBlockUser}
            title="Block messaging"
            confirmText="Confirm"
            isDangerous={true}
          >
            <p className="text-gray-600">
              Are you sure you want to block messageing users will no longer be
              able to message you .
            </p>
          </ConfirmationModal>
        </div>
      </header>

      {isConnected && (
        <div className="flex flex-1 overflow-hidden">
          {/* Chat Sidebar */}
          <AnimatePresence mode="wait" initial={false}>
            {isChatSidebarOpen && (
              <motion.div
                initial={
                  isMobileView ? { x: -300, opacity: 0 } : { opacity: 1 }
                }
                animate={{ x: 0, opacity: 1 }}
                exit={isMobileView ? { x: -300, opacity: 0 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`
                  ${isMobileView ? "absolute z-10 h-[calc(100%-70px)] bg-white" : "relative"} 
                  w-full md:w-1/3 border-r bg-charcoalWhite border-gray-300 p-4
                `}
              >
                {isFocused ? (
                  <NetWorksChatList
                    onCardClick={handleNetWorkUserClick}
                    filter={searchTerm}
                  />
                ) : (
                  <ChatCardsList onCardClick={handleConversationClick} />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <PageMessageWindow chatName={opnedChatName} />
        </div>
      )}
    </div>
  );
}

export default PageChatSystem;
