import React from "react";

function IcSubDashboard() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
      className="p-1 rounded-full bg-[#bf83ff]"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M19.75 14V11.75H22V10.25H19.75V8H18.25V10.25H16V11.75H18.25V14H19.75Z"
          fill="#ffffff"
        ></path>{" "}
        <path
          d="M11 4C8.79 4 7 5.79 7 8C7 10.21 8.79 12 11 12C13.21 12 15 10.21 15 8C15 5.79 13.21 4 11 4Z"
          fill="#ffffff"
        ></path>{" "}
        <path
          d="M3 18C3 15.34 8.33 14 11 14C13.67 14 19 15.34 19 18V20H3V18Z"
          fill="#ffffff"
        ></path>{" "}
      </g>
    </svg>
  );
}

export default React.memo(IcSubDashboard);
