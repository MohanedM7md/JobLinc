import { X } from "lucide-react";
import ModalSidebar from "./ModalSidebar";
import PageInfo from "./PageInfo";
import Details from "./Details";
import Locations from "./Locations";
import { useMemo, useRef, useState, useEffect } from "react";

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

  const [activeContent, setActiveContent] = useState(mainMenuItems[0]);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleActiveContent = (title: string) => {
    const found = mainMenuItems.find((item) => item.title === title);
    if (found) setActiveContent(found);
  };

  // Adjust the wrapper height when content changes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
      setHeight(contentRef.current.scrollHeight); // Initial height
    }

    return () => resizeObserver.disconnect();
  }, [activeContent]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white dark:bg-warmBlack w-[800px] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-charcoalBlack dark:text-charcoalWhite">
            Edit
          </h2>
          <button
            onClick={onClose}
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-mutedSilver hover:text-charcoalBlack dark:hover:text-charcoalWhite"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex">
          {/* Sidebar */}
          <ModalSidebar setActiveContent={handleActiveContent} />

          <div
            className="transition-all duration-500 ease-in-out overflow-hidden flex-1"
            style={{ height }}
          >
            <div ref={contentRef} className="">
              {activeContent.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
