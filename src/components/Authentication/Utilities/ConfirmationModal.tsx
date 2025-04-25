import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ConfirmationModalProps {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  redirectToOnCancel?: string;
}

function ConfirmationModal({
  title = "Are you sure?",
  message,
  confirmText = "Yes, proceed",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  redirectToOnCancel,
}: ConfirmationModalProps) {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (onCancel) onCancel();
    if (redirectToOnCancel) navigate(redirectToOnCancel);
  };

  return (
    <div className="z-50 bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 max-w-[90%] sm:max-w-xl mx-auto mt-10 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
        <AlertTriangle className="text-red-600 w-12 h-12" />
        <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left text-charcoalBlack">
          {title}
        </h2>
      </div>

      {/* Message */}
      <p className="text-base sm:text-lg text-center sm:text-left text-gray-700">
        {message}
      </p>

      {/* Buttons */}
      <div className="flex justify-center sm:justify-end gap-4">
        <button
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          onClick={handleCancel}
        >
          {cancelText}
        </button>
        <button
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          onClick={onConfirm}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
