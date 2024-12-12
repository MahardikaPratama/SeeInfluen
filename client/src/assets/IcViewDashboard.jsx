import React from "react";

const IcViewDashboard = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
      className=" bg-[#fa5a7d] p-1 rounded-full"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path opacity="0.15" d="M20 4H4V20H20V4Z" fill="#000000"></path>
        <path
          d="M16 11V17M12 7L12 17M8 14L8 17M4 4H20V20H4V4Z"
          stroke="#fa5a7d"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export default React.memo(IcViewDashboard);
