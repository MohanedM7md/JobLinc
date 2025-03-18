import React from "react";

function SearchBar() {
  return (
    <div className="flex items-center justify-center ">
      <div className="h-10 flex items-center overflow-hidden cursor-pointer">
        <input
          type="text"
          name="text"
          className=" border-none outline-none text-sm caret-crimsonRed"
          id="input"
          placeholder="Search..."
        />
        <label htmlFor="input" className="cursor-text px-3">
          <svg
            data-testid="test-search-icon"
            viewBox="0 0 512 512"
            className="w-4 h-4"
          >
            <path
              fill="rgb(114, 114, 114)"
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            />
          </svg>
        </label>
        <div data-testid="test-filter-icon" className="text-darkBurgundy ml-4">
          <svg
            className="h-8"
            viewBox="0 0 30 28"
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
      </div>
    </div>
  );
}

export default SearchBar;
