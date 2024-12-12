import React from "react";

function IcAdEstimation({ color }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height="32px"
      width="32px"
      className="rounded-full p-1"
      style={{ backgroundColor: `${color}` }}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <circle
          opacity="0.5"
          cx="12"
          cy="12"
          r="10"
          stroke="#ffffff"
          strokeWidth="1.5"
        ></circle>{" "}
        <path
          d="M12 6V18"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>{" "}
        <path
          d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>{" "}
      </g>
    </svg>
  );
}

export default React.memo(IcAdEstimation);
