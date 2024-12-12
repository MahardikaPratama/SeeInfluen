import React from "react";

function IcDashboard({ color }) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffff"
      width="32px"
      height="32px"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <defs>
          <style>
            {`.cls-1{fill:#${color};stroke:#${color};strokeLinecap:round;strokeLinejoin:round;strokeWidth:2px;}.cls-2{fill:#737791;}`}
          </style>
        </defs>
        <title></title>
        <g data-name="Layer 48" id="Layer_48">
          <path
            className="cls-1"
            d="M57.11,34.71A27.92,27.92,0,1,1,29.19,6.79V34.71Z"
          ></path>
          <path
            className="cls-2"
            d="M62.69,30.31A28.94,28.94,0,0,0,33.75,1.38V30.31Z"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export default IcDashboard;
