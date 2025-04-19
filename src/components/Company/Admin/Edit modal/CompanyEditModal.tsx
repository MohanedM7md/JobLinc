import { Eye, X, Edit } from "lucide-react";
import ModalSidebar from "./ModalSidebar";
import PageInfo from "./PageInfo";

interface CompanyEditModalProps {
  onClose: () => void;
}

export function CompanyEditModal({ onClose }: CompanyEditModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="bg-white dark:bg-warmBlack w-[800px] max-h-[90vh] overflow-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-charcoalBlack dark:text-charcoalWhite">
            Edit
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-mutedSilver hover:text-charcoalBlack dark:hover:text-charcoalWhite"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex">
          {/* Sidebar Navigation */}
          <ModalSidebar />
          {/* Content */}
          <>
            <PageInfo />
          </>
        </div>
      </div>
    </div>
  );
}
