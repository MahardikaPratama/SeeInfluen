import React from "react";
import UserProfile from "./Profile";

function Header({ title }) {
  return (
    <div className="flex justify-between bg-white items-center mb-6 py-4 px-8">
      <h2 className="text-xl font-bold text-gray-700">{title}</h2>
      <UserProfile />
    </div>
  );
}

export default Header;
