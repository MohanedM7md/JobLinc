import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const NetworkModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
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
      <div
        className="relative bg-white p-4 rounded-lg shadow-lg z-50"
        style={{
          maxWidth: "500px",
          maxHeight: "400px",
          overflowY: "auto",
          width: "100%",
        }}
      >
        <button
          data-testid="close-button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:cursor-pointer hover:bg-gray-200 px-1 rounded text-lg"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default NetworkModal;