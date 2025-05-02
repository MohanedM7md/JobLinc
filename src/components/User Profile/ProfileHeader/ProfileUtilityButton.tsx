import { MenuButton, MenuItems, MenuItem, Menu } from "@headlessui/react";
import { ConnectionStatus } from "../../../interfaces/userInterfaces";
import { AnimatePresence, motion } from "framer-motion";
import {
  Link,
  Bookmark,
  Activity,
  UserPlus,
  UserMinus,
  Flag,
  ShieldX,
  ShieldCheck,
  UserX,
} from "lucide-react";
import { blockUser, reportUser, unblockUser } from "@services/api/networkServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface UtilityProps {
  isUser: boolean;
  userId: string;
  connectionStatus: ConnectionStatus;
  isFollowing: boolean;
}

export default function ProfileUtilityButton(props: UtilityProps) {
  const navigate = useNavigate();
  const reportUserMutation = useMutation({
    mutationFn: reportUser,
  });

  const blockUserMutation = useMutation({
    mutationFn: blockUser,
    onSuccess: () => {
    },
  });

  const unblockUserMutation = useMutation({
    mutationFn: unblockUser,
    onSuccess: () => {
    },
  });

  function handleCopy() {
    const postLink = `${window.location.origin}/profile/${props.userId}`;
    navigator.clipboard
      .writeText(postLink)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link.");
      });
  }

  function handleReport() {
    toast.promise(reportUserMutation.mutateAsync(props.userId), {
      loading: "Reporting user...",
      success: "Report submitted for review, Thank you!",
      error: (error) => error.message,
    });
  }

  function handleBlock() {
    if (props.connectionStatus !== ConnectionStatus.Blocked) {
      toast.promise(blockUserMutation.mutateAsync(props.userId), {
        loading: "Blocking user...",
        success: "Blocked",
        error: (error) => error.message,
      });
    } else {
      toast.promise(unblockUserMutation.mutateAsync(props.userId), {
        loading: "Unblocking user...",
        success: "Unblocked",
        error: (error) => error.message,
      });
    }
  }

  return (
    <Menu as="div" className="relative inline-block">
      {({ open }) => (
        <>
          <MenuButton className="mt-2 px-4 py-1.5 border-1 rounded-3xl font-medium transition duration-300 ease-in-out border-gray-400 hover:bg-gray-200 text-gray-400">
            {props.isUser ? "Resources" : "More"}
          </MenuButton>
          <AnimatePresence>
            {open && (
              <MenuItems
                static
                modal={false}
                className="absolute left-0 w-56 origin-top-left bg-white border border-gray-200 font-medium rounded-lg focus:outline-none z-50 shadow-lg mt-2"
                as={motion.div}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {props.isUser ? (
                  <>
                    <MenuItem as="div">
                      <button
                        onClick={handleCopy}
                        className="w-full flex items-center px-4 py-3 text-sm transition duration-200 ease-in-out border-b border-gray-100 hover:bg-gray-50"
                      >
                        <Link className="w-5 h-5 mr-3 text-gray-600" />
                        <span className="font-medium text-warmBlack">
                          Copy link to Clipboard
                        </span>
                      </button>
                    </MenuItem>
                    <MenuItem as="div">
                      <button
                        onClick={() =>
                          navigate(
                            `/profile/${props.userId}/details/saved-items`,
                          )
                        }
                        className="w-full flex items-center px-4 py-3 text-sm transition duration-200 ease-in-out border-b border-gray-100 hover:bg-gray-50"
                      >
                        <Bookmark className="w-5 h-5 mr-3 text-gray-600" />
                        <span className="font-medium text-warmBlack">
                          Saved Items
                        </span>
                      </button>
                    </MenuItem>
                    <MenuItem as="div">
                      <button
                        onClick={() =>
                          navigate(
                            `/profile/${props.userId}/details/activity`,
                          )
                        }
                        className="w-full flex items-center px-4 py-3 text-sm transition duration-200 ease-in-out hover:bg-gray-50"
                      >
                        <Activity className="w-5 h-5 mr-3 text-gray-600" />
                        <span className="font-medium text-warmBlack">
                          Activity
                        </span>
                      </button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem as="div">
                      <button
                        onClick={handleCopy}
                        className="w-full flex items-center px-4 py-3 text-sm transition duration-200 ease-in-out border-b border-gray-100 hover:bg-gray-50"
                      >
                        <Link className="w-5 h-5 mr-3 text-gray-600" />
                        <span className="font-medium text-warmBlack">
                          Copy link to Clipboard
                        </span>
                      </button>
                    </MenuItem>
                    <MenuItem as="div">
                      <button className="w-full flex items-center px-4 py-3 text-sm transition duration-200 ease-in-out border-b border-gray-100 hover:bg-gray-50">
                        {props.isFollowing ? (
                          <UserMinus className="w-5 h-5 mr-3 text-gray-600" />
                        ) : (
                          <UserPlus className="w-5 h-5 mr-3 text-gray-600" />
                        )}
                        <span className="font-medium text-warmBlack">
                          {props.isFollowing ? "Unfollow" : "Follow"}
                        </span>
                      </button>
                    </MenuItem>
                    {props.connectionStatus === ConnectionStatus.Accepted && (
                      <MenuItem as="div">
                        <button className="w-full flex items-center px-4 py-3 text-sm transition duration-200 ease-in-out border-b border-gray-100 hover:bg-gray-50">
                          <UserX className="w-5 h-5 mr-3 text-gray-600" />
                          <span className="font-medium text-warmBlack">
                            Remove Connection
                          </span>
                        </button>
                      </MenuItem>
                    )}
                    <MenuItem as="div">
                      <button
                        onClick={handleReport}
                        className="w-full flex items-center px-4 py-3 text-sm transition duration-200 ease-in-out border-b border-gray-100 hover:bg-red-50"
                      >
                        <Flag className="w-5 h-5 mr-3 text-crimsonRed" />
                        <span className="font-medium text-crimsonRed">
                          Report
                        </span>
                      </button>
                    </MenuItem>
                    <MenuItem as="div">
                      <button
                        onClick={handleBlock}
                        className={`w-full flex items-center px-4 py-3 text-sm transition duration-200 ease-in-out ${
                          props.connectionStatus !== ConnectionStatus.Blocked
                            ? "text-crimsonRed hover:bg-red-50"
                            : "hover: bg-gray-50"
                        }`}
                      >
                        {props.connectionStatus === ConnectionStatus.Blocked ? (
                          <ShieldCheck className="w-5 h-5 mr-3" />
                        ) : (
                          <ShieldX className="w-5 h-5 mr-3 text-crimsonRed" />
                        )}
                        <span className="font-medium">
                          {props.connectionStatus === ConnectionStatus.Blocked
                            ? "Unblock"
                            : "Block"}
                        </span>
                      </button>
                    </MenuItem>
                  </>
                )}
              </MenuItems>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  );
}
