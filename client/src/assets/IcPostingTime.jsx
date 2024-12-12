import React from "react";

function IcPostingTime({ color }) {
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
        <g id="style=linear">
          {" "}
          <g id="clock-stand">
            {" "}
            <path
              id="line"
              d="M18 20.5L19.5 22"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
            <path
              id="line_2"
              d="M6 20.5L4.5 22"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
            <path
              id="vector"
              d="M21 13C21 17.968 16.968 22 12 22C7.032 22 3 17.968 3 13C3 8.032 7.032 4 12 4C16.968 4 21 8.032 21 13Z"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
            <path
              id="vector_2"
              d="M15.339 15.862L12.549 14.197C12.063 13.909 11.667 13.216 11.667 12.649V8.95898"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
            <path
              id="line_3"
              d="M18 2L21.747 5.31064"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
            <path
              id="line_4"
              d="M6 2L2.25304 5.31064"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

export default React.memo(IcPostingTime);
