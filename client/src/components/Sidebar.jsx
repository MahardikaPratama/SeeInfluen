import React from "react";

const Sidebar = () => {
  return (
    <div className="w-80 px-12 h-screen shadow-md text-white">
      <div className="p-6 flex items-center space-x-4">
        <div className="flex flex-ro text-white p-3 rounded-xl bg-[#5d5fef]">
          <svg
            width="50"
            height="50"
            viewBox="0 0 79 79"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="78.4" height="78.4" rx="11.2" fill="#5D5FEF" />
            <path
              d="M31.324 24.6783C29.739 26.2926 29.739 28.9048 31.3533 30.5191L34.8754 34.0412C38.1921 37.3578 38.1921 42.7584 34.8754 46.075L28.4183 39.6179C26.76 37.9595 25.9235 35.7729 25.9235 33.601C25.9235 31.429 26.76 29.2424 28.4183 27.5841L31.28 24.7224C31.2946 24.7077 31.3093 24.693 31.324 24.6783Z"
              fill="#5D5FEF"
              stroke="white"
              stroke-width="2.8"
              stroke-miterlimit="10"
            />
            <path
              d="M34.1418 33.3059L31.3535 30.5176C29.7392 28.9033 29.7246 26.3058 31.3242 24.6768C32.9091 23.1212 35.4333 23.1506 37.0035 24.7208C37.796 25.5133 38.1922 26.5552 38.1922 27.5825C38.1922 28.6098 37.796 29.6517 37.0035 30.4442L36.3432 31.1046"
              fill="#5D5FEF"
            />
            <path
              d="M34.1418 33.3059L31.3535 30.5176C29.7392 28.9033 29.7246 26.3058 31.3242 24.6768C32.9091 23.1212 35.4333 23.1506 37.0035 24.7208C37.796 25.5133 38.1922 26.5552 38.1922 27.5825C38.1922 28.6098 37.796 29.6517 37.0035 30.4442L36.3432 31.1046"
              stroke="white"
              stroke-width="2.8"
              stroke-miterlimit="10"
            />
            <path
              d="M47.9804 53.5145C49.5653 51.9002 49.5653 49.288 47.9511 47.6737L44.429 44.1516C41.1123 40.835 41.1123 35.4344 44.429 32.1178L50.8861 38.5749C52.5444 40.2333 53.3809 42.4199 53.3809 44.5918C53.3809 46.7638 52.5444 48.9504 50.8861 50.6087L48.0244 53.4704C47.9951 53.4998 47.9804 53.5145 47.9804 53.5145Z"
              fill="#5D5FEF"
              stroke="white"
              stroke-width="2.8"
              stroke-miterlimit="10"
            />
            <path
              d="M45.1472 44.8999L47.9355 47.6882C49.5498 49.3025 49.5645 51.9 47.9649 53.529C46.38 55.0846 43.8558 55.0553 42.2855 53.485C41.4931 52.6925 41.0968 51.6506 41.0968 50.6233C41.0968 49.596 41.4931 48.5541 42.2855 47.7616L42.9606 47.0865"
              fill="#5D5FEF"
            />
            <path
              d="M45.1472 44.8999L47.9355 47.6882C49.5498 49.3025 49.5645 51.9 47.9649 53.529C46.38 55.0846 43.8558 55.0553 42.2855 53.485C41.4931 52.6925 41.0968 51.6506 41.0968 50.6233C41.0968 49.596 41.4931 48.5541 42.2855 47.7616L42.9606 47.0865"
              stroke="white"
              stroke-width="2.8"
              stroke-miterlimit="10"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-[#151d48]">SeeInfluen</h1>
      </div>
      <nav className="mt-8">
        <ul className="space-y-4 list-none">
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 py-3 px-6 rounded-lg bg-[#5d5fef]"
            >
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
                      {`.cls-1{fill:#ffffff;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}.cls-2{fill:rgba(255, 255, 255, 0.5);}`}
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
              <span className="font-medium">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 py-3 px-6 rounded-lg hover:bg-gray-700 text-[#737791] "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="32px"
                height="32px"
                className="bg-[#151d48] rounded-full p-1"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#ffffff"
                    stroke-width="1.5"
                  ></circle>{" "}
                  <path
                    d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z"
                    fill="#ffffff"
                  ></path>{" "}
                  <ellipse
                    cx="9"
                    cy="10.5"
                    rx="1"
                    ry="1.5"
                    fill="#ffffff"
                  ></ellipse>{" "}
                </g>
              </svg>
              <span className="font-medium">Audience</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 py-3 px-6 rounded-lg hover:bg-gray-700 text-[#737791]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="32px"
                height="32px"
                className="bg-[#151d48] rounded-full p-1"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                        stroke-width="1.5"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        id="line_2"
                        d="M6 20.5L4.5 22"
                        stroke="#ffffff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        id="vector"
                        d="M21 13C21 17.968 16.968 22 12 22C7.032 22 3 17.968 3 13C3 8.032 7.032 4 12 4C16.968 4 21 8.032 21 13Z"
                        stroke="#ffffff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        id="vector_2"
                        d="M15.339 15.862L12.549 14.197C12.063 13.909 11.667 13.216 11.667 12.649V8.95898"
                        stroke="#ffffff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        id="line_3"
                        d="M18 2L21.747 5.31064"
                        stroke="#ffffff"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        id="line_4"
                        d="M6 2L2.25304 5.31064"
                        stroke="#ffffff"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
              <span className="font-medium">Posting Time</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 py-3 px-6 rounded-lg hover:bg-gray-700 text-[#737791]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="32px"
                height="32px"
                className="bg-[#151d48] rounded-full p-1"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M4 4V16C4 18.2091 5.79086 20 8 20H20"
                    stroke="#ffffff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M6.59869 14.5841C6.43397 14.8057 6.48012 15.1189 6.70176 15.2837C6.9234 15.4484 7.2366 15.4022 7.40131 15.1806L6.59869 14.5841ZM19.4779 4.85296C19.3967 4.58903 19.1169 4.4409 18.853 4.52211L14.552 5.8455C14.288 5.92671 14.1399 6.2065 14.2211 6.47043C14.3023 6.73436 14.5821 6.88249 14.846 6.80128L18.6692 5.62493L19.8455 9.44805C19.9267 9.71198 20.2065 9.8601 20.4704 9.7789C20.7344 9.69769 20.8825 9.41789 20.8013 9.15396L19.4779 4.85296ZM13.5434 12.4067L13.1671 12.7359L13.5434 12.4067ZM15.1797 12.2161L15.6216 12.45L15.1797 12.2161ZM7.40131 15.1806L10.6621 10.7929L9.85952 10.1964L6.59869 14.5841L7.40131 15.1806ZM11.4397 10.7619L13.1671 12.7359L13.9196 12.0774L12.1923 10.1034L11.4397 10.7619ZM15.6216 12.45L19.4419 5.23394L18.5581 4.76606L14.7378 11.9821L15.6216 12.45ZM13.1671 12.7359C13.8594 13.5272 15.1297 13.3792 15.6216 12.45L14.7378 11.9821C14.5739 12.2919 14.1504 12.3412 13.9196 12.0774L13.1671 12.7359ZM10.6621 10.7929C10.8522 10.5371 11.2299 10.522 11.4397 10.7619L12.1923 10.1034C11.5628 9.38385 10.4298 9.42903 9.85952 10.1964L10.6621 10.7929Z"
                    fill="#ffffff"
                  ></path>
                </g>
              </svg>
              <span className="font-medium">Trending Topic</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 py-3 px-6 rounded-lg hover:bg-gray-700 text-[#737791]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                width="32px"
                className="bg-[#151d48] rounded-full p-1"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <circle
                    opacity="0.5"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#ffffff"
                    stroke-width="1.5"
                  ></circle>{" "}
                  <path
                    d="M12 6V18"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                </g>
              </svg>
              <span className="font-medium">Ads Estimation</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 py-3 px-6 rounded-lg hover:bg-gray-700 text-[#737791]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                width="32px"
                className="bg-[#151d48] rounded-full p-1"
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
                    d="M21 8L19 20H5L3 8M21 8L15.5 12.5L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7L8.5 12.5L3 8M12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7ZM3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8Z"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <span className="font-medium">Ranking</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 py-3 px-6 rounded-lg hover:bg-gray-700 text-[#737791]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                transform="matrix(-1, 0, 0, 1, 0, 0)"
                height="32px"
                width="32px"
                className="bg-[#151d48] rounded-full p-1"
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
                    d="M1 20V19C1 15.134 4.13401 12 8 12V12C11.866 12 15 15.134 15 19V20"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    d="M13 14V14C13 11.2386 15.2386 9 18 9V9C20.7614 9 23 11.2386 23 14V14.5"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9Z"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <span className="font-medium">Compare</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
