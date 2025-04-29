// GroupSettingsDropdown.tsx
import { IoPersonRemove, IoTrash, IoPersonAdd } from "react-icons/io5";

interface GroupSettingsDropdownProps {
  onAddParticipant: () => void;
  onRemoveParticipant: () => void;
  onDeleteChat: () => void;
}

function GroupSettingsDropdown({
  onAddParticipant,
  onRemoveParticipant,
  onDeleteChat,
}: GroupSettingsDropdownProps) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-[var(--color-SoftRed)]">
      <div className="py-1">
        <button
          onClick={onAddParticipant}
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[var(--color-SoftRed)] w-full text-left"
        >
          <IoPersonAdd className="mr-2 text-[var(--color-softRosewood)]" />
          Add Participant
        </button>
        <button
          onClick={onRemoveParticipant}
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[var(--color-SoftRed)] w-full text-left"
        >
          <IoPersonRemove className="mr-2 text-[var(--color-softRosewood)]" />
          Remove Participant
        </button>
        <button
          onClick={onDeleteChat}
          className="flex items-center px-4 py-2 text-sm text-[var(--color-crimsonRed)] hover:bg-[var(--color-SoftRed)] w-full text-left"
        >
          <IoTrash className="mr-2" />
          Delete Chat
        </button>
      </div>
    </div>
  );
}

export default GroupSettingsDropdown;
