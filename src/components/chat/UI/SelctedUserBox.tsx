import { X } from "lucide-react";
interface SelectedUserBoxProps {
  chatName: string;
  onClick: () => void;
  className?: string;
}

export default function SelectedUserBox({
  chatName,
  onClick,
  className = "",
}: SelectedUserBoxProps) {
  return (
    <div
      className={`flex items-center gap-2 bg-lightGray text-charcoalBlack px-3 py-1 rounded-md text-sm ${className}`}
    >
      <button
        onClick={onClick}
        className="text-mutedSilver hover:text-charcoalBlack transition"
        aria-label="Remove"
      >
        <X size={14} />
      </button>
      <span className="truncate">{chatName}</span>
    </div>
  );
}
