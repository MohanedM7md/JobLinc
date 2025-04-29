import React from "react";
import "material-icons/iconfont/material-icons.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render if closed

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div
        data-testid="modal-overlay"
        className="absolute inset-0 bg-black opacity-50"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      />

      {/* Modal content */}
      <div className="relative bg-lightGray p-6 rounded-lg shadow-lg z-50 max-w-md w-full flex flex-col">
        <div className="">
          <button
            data-testid="close-button"
            aria-label="Close modal" // Improves accessibility
            onClick={onClose}
            className="material-icons absolute top-2 right-2 text-gray-600 hover:cursor-pointer hover:bg-gray-200 px-1 py-1 rounded-full text-2xl transition duration-400 ease-in-out"
          >
            close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
