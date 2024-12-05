import React from "react";

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className={`p-6 rounded-lg shadow ${color}`}>
      {icon}
      <p className="text-xl font-bold my-1">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
};

export default React.memo(StatsCard);
