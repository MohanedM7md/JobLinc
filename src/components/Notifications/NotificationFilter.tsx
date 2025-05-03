import { useState } from "react";

const filters = [
  { label: "All", key: "all" },
  { label: "Mentions", key: "mentions" },
  { label: "Follows", key: "follows" },
  { label: "Reactions", key: "reactions" },
  { label: "Messages", key: "messages" },
];

const NotificationFilter = ({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (key: string) => void;
}) => {
  return (
    <aside className="w-full sm:w-48 p-4 bg-white rounded-xl shadow-md border">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 tracking-wide uppercase">
        Filters
      </h3>
      <ul className="space-y-2">
        {filters.map((filter) => (
          <li key={filter.key}>
            <button
              onClick={() => onChange(filter.key)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                selected === filter.key
                  ? "bg-red-50 text-red-600 font-semibold shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {filter.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NotificationFilter;
