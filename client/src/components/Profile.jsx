import React from "react";

const UserProfile = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-sm font-medium text-gray-800">Alexa11</p>
        <p className="text-xs text-gray-500">Gamer</p>
      </div>
      <img
        src="https://via.placeholder.com/40"
        alt="Profile"
        className="w-10 h-10 rounded-full border-2 border-gray-300"
      />
    </div>
  );
};

export default UserProfile;
