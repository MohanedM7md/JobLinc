// modals/DeleteChatModal.tsx
import { IoTrash } from "react-icons/io5";
import { RefObject } from "react";

interface DeleteChatModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  modalRef: RefObject<HTMLDivElement | null>;
}

export default function DeleteChatModal({
  onCancel,
  onConfirm,
  modalRef,
}: DeleteChatModalProps) {
  return (
    <div
      ref={modalRef}
      className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden"
    >
      <div className="p-4 bg-[var(--color-crimsonRed)] text-white">
        <h2 className="text-xl font-semibold">Delete Group Chat</h2>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-center mb-4 text-[var(--color-crimsonRed)]">
          <IoTrash className="h-16 w-16" />
        </div>
        <p className="text-center text-gray-700 mb-2">
          Are you sure you want to delete this group chat?
        </p>
      </div>
    </div>
  );
}
