import React from "react";

function IcAudience({ color }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
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
          cx="12"
          cy="12"
          r="10"
          stroke="#ffffff"
          strokeWidth="1.5"
        ></circle>{" "}
        <path
          d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>{" "}
        <path
          d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z"
          fill="#ffffff"
        ></path>{" "}
        <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="#ffffff"></ellipse>{" "}
      </g>
    </svg>
  );
}

export default React.memo(IcAudience);
