import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { deleteComment, reportPost } from "@services/api/postServices";
import store from "@store/store";
import { motion, AnimatePresence } from "framer-motion";
import { FlagTriangleRight, Pencil, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ConfirmAction from "../../utils/ConfirmAction";
import { useState } from "react";
import Modal from "../../utils/Modal";
import CommentEdit from "./CommentEdit";

interface UtilityProps {
  commentId: string;
  posterId: string;
  commentText: string;
  updateText: (newText: string) => void;
  delete: () => void;
}

export default function CommentUtilityButton(props: UtilityProps) {
  const loggedInUserId = store.getState().user.userId;
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const commentDelete = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => props.delete(),
  });

  const commentReport = useMutation({
    mutationFn: reportPost,
  });

  function handleDelete() {
    toast.promise(commentDelete.mutateAsync(props.commentId), {
      loading: "Deleting comment...",
      success: "Deleted",
      error: (error) => error.message,
    });
  }

  function handleReport() {
    toast.promise(commentReport.mutateAsync(props.commentId), {
      loading: "Reporting comment...",
      success: "Report submitted for review, Thank you!",
      error: (error) => error.message,
    });
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
                          onClick={() => setIsEditOpen(true)}
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
                          data-testid={`Delete ${props.commentId}`}
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
                          onClick={handleReport}
                          className="w-full flex items-center justify-between px-4 py-2 text-sm text-crimsonRed hover:bg-red-100 rounded-b-md transition duration-200 ease-in-out"
                        >
                          <FlagTriangleRight className="mr-2" />
                          <span>Report</span>
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
      {isEditOpen && (
        <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
            <CommentEdit commentId={props.commentId} text={props.commentText} onUpdate={props.updateText} onClose={()=> setIsEditOpen(false)}/>
        </Modal>
      )}
    </>
  );
}
