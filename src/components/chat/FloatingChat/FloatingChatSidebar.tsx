import { useCallback, useState, useEffect } from "react";
import ChatCardsList from "../ChatCardsList";
import NetWorksChatList from "@chatComponent/NetWorksChatList";
import SearchBar from "@chatComponent/UI/SearchBar";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@store/hooks";
import useChats from "@hooks/useChats";
import ConnectionsDropdown from "@chatComponent/FloatingChat/ConnectionsDropdown";
import {
  MessageSquare,
  Search,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function FloatingChatSidebar() {
  const userProfilePic = useAppSelector((state) => state.user.profilePicture);
  const [isActive, setActive] = useState<boolean>(() => {
    return localStorage.getItem("chatSidebarActive") === "true" || false;
  });
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { setOpnedChats } = useChats();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchVisible, setSearchVisible] = useState<boolean>(false);

  // Animation variants
  const sidebarVariants = {
    collapsed: { height: "56px", borderRadius: "12px 12px 0 0" },
    expanded: { height: "calc(60vh)", borderRadius: "12px 12px 8px 8px" },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, delay: 0.1 } },
  };

  const handleSearchChange = useCallback(
    (value: string) => setSearchTerm(value),
    [],
  );

  const handleConversationClick = (
    chatId: string,
    chatName: string,
    chatImage: string[],
  ) => {
    setOpnedChats((prevChats) => {
      if (prevChats.some((chat) => chat.chatId === chatId)) return prevChats;
      return [...prevChats, { chatId, usersId: [], chatName, chatImage }];
    });
  };

  const handleNetWorkUserClick = (
    userId: string,
    chatName: string,
    chatImage: string,
  ) => {
    setOpnedChats((prevChats) => {
      if (prevChats.some((chat) => chat.usersId[0] === userId))
        return prevChats;
      return [
        ...prevChats,
        { chatId: "", usersId: [userId], chatName, chatImage: [chatImage] },
      ];
    });
  };

  const toggleActiveState = () => {
    setActive((prev) => {
      const newState = !prev;
      localStorage.setItem("chatSidebarActive", newState.toString());
      return newState;
    });
  };

  const toggleSearch = () => {
    if (!isActive) {
      setActive(true);
      setTimeout(() => {
        setSearchVisible(true);
        setIsFocused(true); // Always switch to people when search is clicked
      }, 300);
    } else {
      setSearchVisible(!searchVisible);
      if (!searchVisible) {
        setIsFocused(true); // Switch to people when enabling search
      }
    }
  };

  // Auto-hide search when sidebar collapses
  useEffect(() => {
    if (!isActive) {
      setSearchVisible(false);
    }
  }, [isActive]);

  return (
    <motion.div
      initial={isActive ? "expanded" : "collapsed"}
      animate={isActive ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-80 shadow-lg md:block hidden mr-8  bg-charcoalWhite dark:bg-warmBlack overflow-hidden z-50 border border-lightGray dark:border-darkGray"
    >
      <div className="flex w-full h-14 items-center px-4 gap-2 bg-charcoalWhite dark:bg-darkGray border-b border-lightGray dark:border-darkGray">
        <div className="relative">
          <img
            src={userProfilePic || "/default-avatar.png"}
            alt="User"
            className="rounded-full w-8 h-8 object-cover ring-2 ring-softRosewood"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-crimsonRed rounded-full border-2 border-charcoalWhite dark:border-darkGray"></span>
        </div>

        <h2 className="font-medium text-charcoalBlack dark:text-charcoalWhite flex-1">
          Messaging
        </h2>

        <div className="flex gap-1">
          <button
            onClick={toggleSearch}
            className="p-2 rounded-full hover:bg-lightGray dark:hover:bg-warmBlack text-mutedSilver dark:text-charcoalWhite transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          <button
            onClick={toggleActiveState}
            className="p-2 rounded-full hover:bg-lightGray dark:hover:bg-warmBlack text-mutedSilver dark:text-charcoalWhite transition-colors ml-1"
            aria-label={isActive ? "Collapse" : "Expand"}
          >
            {isActive ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
            className="flex flex-col"
          >
            {/* Search bar (conditionally shown) */}
            <AnimatePresence>
              {searchVisible && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 bg-lightGray dark:bg-darkGray">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <SearchBar
                          FocusToggler={() => {
                            // Keep in people view when using search
                            if (!isFocused) setIsFocused(true);
                          }}
                          onChange={handleSearchChange}
                          className="!bg-charcoalWhite dark:!bg-warmBlack !shadow-sm !w-full"
                        />
                      </div>
                      <ConnectionsDropdown className="w-auto" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Tabs */}
            <div className="flex border-b border-lightGray dark:border-darkGray relative">
              <button
                onClick={() => {
                  setIsFocused(false);
                  setSearchVisible(false); // Close search when switching to chats
                }}
                className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                  !isFocused
                    ? "text-crimsonRed dark:text-crimsonRed"
                    : "text-charcoalBlack dark:text-charcoalWhite hover:text-softRosewood dark:hover:text-softRosewood"
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <MessageSquare size={16} />
                  <span>Chats</span>
                </div>
              </button>
              <button
                onClick={() => setIsFocused(true)}
                className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                  isFocused
                    ? "text-crimsonRed dark:text-crimsonRed"
                    : "text-charcoalBlack dark:text-charcoalWhite hover:text-softRosewood dark:hover:text-softRosewood"
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <User size={16} />
                  <span>People</span>
                </div>
              </button>

              {/* Active tab indicator - properly animated */}
              <motion.div
                className="absolute bottom-0 h-0.5 bg-crimsonRed"
                initial={false}
                animate={{
                  left: isFocused ? "50%" : "0%",
                  right: isFocused ? "0%" : "50%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>

            {/* Chat Lists */}
            <div className="overflow-y-auto">
              <AnimatePresence mode="wait" initial={false}>
                {!isFocused ? (
                  <motion.div
                    key="chats"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col flex-1"
                  >
                    <ChatCardsList
                      onCardClick={handleConversationClick}
                      className="max-h-[calc(60vh-110px)]"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="people"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col flex-1"
                  >
                    <NetWorksChatList
                      onCardClick={handleNetWorkUserClick}
                      className="max-h-[calc(60vh-110px)]"
                      filter={searchTerm}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default FloatingChatSidebar;
