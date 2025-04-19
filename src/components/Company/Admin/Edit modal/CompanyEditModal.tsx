import { X } from "lucide-react";
import ModalSidebar from "./ModalSidebar";
import PageInfo from "./PageInfo";
import Details from "./Details";
import Locations from "./Locations";
import { useMemo, useState } from "react";
interface CompanyEditModalProps {
  onClose: () => void;
}

export function CompanyEditModal({ onClose }: CompanyEditModalProps) {
  const mainMenuItems = useMemo(
    () => [
      {
        icon: X,
        title: "Page info",
        content: <PageInfo />,
      },
      {
        icon: X,
        title: "Details",
        content: <Details />,
      },
      {
        icon: X,
        title: "Locations",
        content: <Locations />,
      },
    ],
    [],
  );
  const [activeContetn, setActiveContent] = useState(mainMenuItems[0]);
  const handleActiveContent = (title: string) => {
    console.log("title = ", title);
    setActiveContent(
      (prev) => mainMenuItems.find((item) => item.title == title) || prev,
    );
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="bg-white dark:bg-warmBlack w-[800px] max-h-[90vh] overflow-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
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

        <div className="flex">
          <ModalSidebar setActiveContent={handleActiveContent} />
          {activeContetn.content}
        </div>
      </div>
    </div>
  );
}
