import React from "react";

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
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose} // Close modal when clicking outside
      />

      {/* Modal content */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg z-50 max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:cursor-pointer hover:bg-black hover:opacity-50 px-0.5 rounded-sm text-lg"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
