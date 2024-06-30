import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div>
      <div className="flex items-center space-x-2">
        {/* Icon Part */}
        <svg
          className="h-10 w-10 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-3.333 0-5 1.333-5 4s1.667 4 5 4 5-1.333 5-4-1.667-4-5-4z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 12v2m0-4v-2m0 6v4m0-10c2.5 0 4 2.5 4 4m0 0c0 2.5-1.5 4-4 4m0 0c-2.5 0-4-1.5-4-4m0 0c0-1.5.5-3 2-3m0 0h4"
          />
        </svg>

        <span className="text-2xl font-bold text-gray-800">bL000G@r</span>
      </div>
    </div>
  );
}

export default Logo;
