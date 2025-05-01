import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { deletePost, reportPost, savePost } from "@services/api/postServices";
import store from "@store/store";
import { motion, AnimatePresence } from "framer-motion";
import {
  CircleOff,
  ClipboardPen,
  FlagTriangleRight,
  Pencil,
  Save,
  Trash,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ConfirmAction from "../utils/ConfirmAction";
import { useState } from "react";
import { Media } from "@interfaces/postInterfaces";
import { blockUser } from "@services/api/networkServices";

interface UtilityProps {
  postId: string;
  posterId: string;
  postText: string;
  postMedia: Media[];
}

export default function PostUtilityButton(props: UtilityProps) {
  const navigate = useNavigate();
  const loggedInUserId = store.getState().user.userId;
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const postDelete = useMutation({
    mutationFn: deletePost,
    onSuccess: () => navigate("/home"),
  });

  const postSave = useMutation({
    mutationFn: savePost,
  });

  const postReport = useMutation({
    mutationFn: reportPost,
  })

  const userBlock = useMutation({
    mutationFn: blockUser,
  })

  function handleDelete() {
    toast.promise(postDelete.mutateAsync(props.postId), {
      loading: "Deleting post...",
      success: "Post deleted successfully!",
      error: (error) => error.message,
    });
  }

  function handleSave() {
    toast.promise(postSave.mutateAsync(props.postId), {
      loading: "Saving post...",
      success: "Post saved successfully!",
      error: (error) => error.message,
    });
  }

  function handleCopy() {
    const postLink = `${window.location.origin}/post/${props.postId}`;
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
    toast.promise(postReport.mutateAsync(props.postId), {
      loading: "Reporting post...",
      success: "Report submitted for review, Thank you!",
      error: (error) => error.message,
    })
  }

  function handleBlock() {
    toast.promise(userBlock.mutateAsync(props.posterId), {
      loading: "Blocing user...",
      success: "Blocked",
      error: (error) => error.message,
    })
  }

  return (
    <>
      <Menu as="div" className="relative inline-block">
        {({ open }) => (
          <>
            <MenuButton className="material-icons-round cursor-pointer text-mutedSilver hover:bg-gray-200 h-fit">
              more_horiz
            </MenuButton>
            <AnimatePresence>
              {open && (
                <MenuItems
                  static
                  modal={false}
                  className="absolute left-0 w-30 origin-top-left bg-white border border-gray-200 font-medium rounded-lg focus:outline-none z-50"
                  as={motion.div}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {props.posterId === loggedInUserId ? (
                    <>
                      <MenuItem
                        as={motion.div}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          onClick={() => {
                            navigate(`/post/${props.postId}/edit`, {
                              state: {
                                postID: props.postId,
                                postText: props.postText,
                                postMedia: props.postMedia,
                              },
                            });
                          }}
                          className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 transition duration-200 ease-in-out"
                        >
                          <Pencil className="mr-2" />
                          <span>Edit</span>
                        </button>
                      </MenuItem>
                      <MenuItem
                        as={motion.div}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          data-testid={`Delete ${props.postId}`}
                          onClick={() => setIsConfirmOpen(true)}
                          className="w-full flex items-center justify-between px-4 py-2 text-sm text-crimsonRed hover:bg-red-100 rounded-b-md transition duration-200 ease-in-out"
                        >
                          <Trash className="mr-2" />
                          <span>Delete</span>
                        </button>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem
                        as={motion.div}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          onClick={handleCopy}
                          className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 transition duration-200 ease-in-out"
                        >
                          <ClipboardPen className="mr-2" />
                          <span>Copy</span>
                        </button>
                      </MenuItem>
                      <MenuItem
                        as={motion.div}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          onClick={handleSave}
                          className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 transition duration-200 ease-in-out"
                        >
                          <Save className="mr-2" />
                          <span>Save</span>
                        </button>
                      </MenuItem>
                      <MenuItem
                        as={motion.div}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          onClick={handleReport}
                          className="w-full flex items-center justify-between px-4 py-2 text-sm text-crimsonRed hover:bg-red-100 rounded-b-md transition duration-200 ease-in-out"
                        >
                          <FlagTriangleRight className="mr-2" />
                          <span>Report</span>
                        </button>
                      </MenuItem>
                      <MenuItem
                        as={motion.div}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          onClick={handleBlock}
                          className="w-full flex items-center justify-between px-4 py-2 text-sm text-crimsonRed hover:bg-red-100 rounded-b-md transition duration-200 ease-in-out"
                        >
                          <CircleOff className="mr-2" />
                          <span>Block</span>
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
      {isConfirmOpen && (
        <ConfirmAction
          action={handleDelete}
          onClose={() => setIsConfirmOpen(false)}
        />
      )}
    </>
  );
}
