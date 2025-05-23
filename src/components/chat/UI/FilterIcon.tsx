import React from "react";

interface FilterIconProps {
  onClick?: () => void;
  className?: string;
}

const FilterIcon: React.FC<FilterIconProps> = ({ onClick, className }) => {
  return (
    <div
      data-testid="test-filter-icon"
      className={`text-darkBurgundy ml-4 ${className}`}
      onClick={onClick}
    >
      <svg
        className="h-8"
        viewBox="0 0 35 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5ZM14 5H20M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM16 12H13M20 19H11M4 12H10M4 5L7 5M6 17C7.10457 17 8 17.8954 8 19C8 20.1046 7.10457 21 6 21C4.89543 21 4 20.1046 4 19C4 17.8954 4.89543 17 6 17Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className=""
        />
      </svg>
    </div>
  );
};

export default FilterIcon;
