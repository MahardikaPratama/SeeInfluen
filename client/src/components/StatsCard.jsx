import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div className="text-center p-4 bg-blue-50 rounded-lg shadow">
      <p className="text-xl font-bold">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
};

export default StatsCard;
