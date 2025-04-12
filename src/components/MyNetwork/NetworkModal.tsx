import React from 'react';

interface NetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const NetworkModal: React.FC<NetworkModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" data-testid="modal-overlay">
      <div className="modal-content">
        <button
          data-testid="close-modal-button"
          onClick={onClose}
          className="close-button"
        >
          Close
        </button>
        <h2 data-testid="modal-title">All Invitations</h2>
        {/* Other modal content */}
      </div>
    </div>
  );
};

export default NetworkModal;
