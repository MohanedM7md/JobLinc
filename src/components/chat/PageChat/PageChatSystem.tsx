import { useCallback, useEffect, useState } from "react";
import ChatCardsList from "../ChatCardsList";
import PageMessageWindow from "./PageChatWindow";
import useChatId from "@context/ChatIdProvider";
import connectToChat, {
  disconnectChatSocket,
  onConnect,
} from "@services/api/ChatSocket";
import store from "@store/store";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Users2 } from "lucide-react";
import SearchBar from "@chatComponent/UI/SearchBar";
import NetWorksChatList from "@chatComponent/NetWorksChatList";
import useNetworkUserId from "@context/NetworkUserIdProvider";
import ConnectionsSidebar from "@chatComponent/PageChat/ConnectionsSidebar";
import ConfirmationModal from "@chatComponent/UI/ConfirmationModal";
import { BlockMessaging } from "@services/api/chatServices";
import ToggleSwitch from "../UI/ToggleSwitch";
// Mock API function to fetch messaging status (replace with actual implementation)
const getMessagingStatus = async (): Promise<boolean> => {
  try {
    return false; // Default mock value
  } catch (error) {
    console.error("Failed to fetch messaging status:", error);
    return false; // Default to unblocked on error
  }
};

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

  const [showBlockConfirmation, setShowBlockConfirmation] = useState(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(
    !store.getState().user.allowMessages!,
  );
  const [pendingBlockState, setPendingBlockState] = useState<boolean | null>(
    null,
  );

  const toggleBlockMessaging = () => {
    setPendingBlockState(isBlocked);
    setShowBlockConfirmation(true);
  };
  const handleBlockUser = async () => {
    if (pendingBlockState === null) return;
    try {
      console.log(
        "send to the back end the wanted status: ",
        pendingBlockState,
      );
      await BlockMessaging(pendingBlockState);
      setIsBlocked(!pendingBlockState);
      setShowBlockConfirmation(false);
      setPendingBlockState(null);
    } catch (error) {
      console.error(
        pendingBlockState
          ? "Failed to block messaging:"
          : "Failed to unblock messaging:",
        error,
      );
      setShowBlockConfirmation(false);
    }
  };

  const handleCancelToggle = () => {
    setShowBlockConfirmation(false);
    setPendingBlockState(null);
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
      <header className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          {isMobileView && (
            <button
              onClick={() => setIsChatSidebarOpen(!isChatSidebarOpen)}
              className="p-1 sm:p-2 rounded-full hover:bg-gray-200 transition"
              aria-label="Toggle chat sidebar"
            >
              {isChatSidebarOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          )}
          <h2 className="hidden md:block font-semibold text-lg text-gray-800">
            Messaging
          </h2>
          {isMobileView && !isChatSidebarOpen && (
            <h2 className="font-semibold text-base text-gray-800 truncate max-w-[100px] sm:max-w-[150px]">
              {opnedChatName || "Messaging"}
            </h2>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-2 w-full justify-end">
          <SearchBar
            FocusToggler={onFocusedToggler}
            onChange={handleSearchChange}
            className="w-32 sm:w-48 md:w-64"
          />
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-1 sm:p-2 rounded-full hover:bg-gray-200 transition"
          >
            <Users2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          {isSidebarOpen && (
            <ConnectionsSidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          )}
          <div className="relative">
            <ToggleSwitch
              checked={isBlocked}
              onChange={toggleBlockMessaging}
              label="Block Messaging"
              ariaLabel="Toggle block messaging"
              className=""
            />
          </div>

          <ConfirmationModal
            isOpen={showBlockConfirmation}
            onClose={handleCancelToggle}
            onConfirm={handleBlockUser}
            title={pendingBlockState ? "Unblock Messaging" : "Block Messaging"}
            confirmText="Confirm"
            isDangerous={pendingBlockState || false}
          >
            <p className="text-gray-600 font-bold text-2xl">
              {pendingBlockState
                ? "Finally you decided to stop being karzma😀"
                : "NOOOOOO please. No one will talk to you again 😭"}
            </p>
          </ConfirmationModal>
        </div>
      </header>

      {isConnected && (
        <div className="flex flex-1 overflow-hidden">
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
                  ${
                    isMobileView
                      ? "absolute z-10 h-[calc(100%-70px)] bg-white"
                      : "relative"
                  } 
                  w-full md:w-1/3 border-r bg-charcoalWhite border-gray-300 p-4 overflow-y-scroll
                `}
              >
                {isFocused ? (
                  <NetWorksChatList
                    onCardClick={handleNetWorkUserClick}
                    filter={searchTerm}
                  />
                ) : (
                  <ChatCardsList
                    onCardClick={handleConversationClick}
                    className="overflow-y-scrolls"
                  />
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
