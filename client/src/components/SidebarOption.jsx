import React from "react";
import { Link } from "react-router-dom";

function SidebarOption({ path, title, icon }) {
  return (
    <Link
      to={path}
      className={`flex items-center space-x-4 py-3 px-6 rounded-lg  ${
        location.pathname === path ? "bg-[#5d5fef]" : "bg-white"
      } `}
    >
      {icon}
      <span
        className={`font-medium ${
          location.pathname === path ? "text-white" : "text-[#737791]"
        }`}
      >
        {title}
      </span>
    </Link>
  );
}

export default SidebarOption;
