import React from "react";
import { MoreHorizontal } from "lucide-react"; // Horizontal dots icon

interface PageChatHeader {
  name: string;
  status?: string;
}

function PageChatHeader({ name, status }: PageChatHeader) {
  console.log("--------------PageChatHeader rendered--------------");
  return (
    <div className="flex items-center justify-between p-3 bg-charcoalWhite text-white border-b border-gray-200">
      <div>
        <h2 className="font-semibold text-charcoalBlack">{name}</h2>
        {status && <p className="text-sm text-gray-400">{status}</p>}
      </div>

      <MoreHorizontal className="cursor-pointer hover:text-gray-300" />
    </div>
  );
}

export default PageChatHeader;
