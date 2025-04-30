// PageChatHeader.tsx
import { EllipsisVertical } from "lucide-react";
import type { PageChatHeader as PageChatHeaderProps } from "../interfaces/Chat.interfaces";

function PageChatHeader({ name, status }: PageChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-white shadow-sm border-b border-gray-200 z-10">
      <div className="flex items-center gap-2">
        <h2 className="font-semibold text-gray-800">{name}</h2>
      </div>
    </div>
  );
}

export default PageChatHeader;
