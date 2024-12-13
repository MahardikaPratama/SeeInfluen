import React from "react";

const StatsCard = ({ title, value, icon, color, percentage }) => {  
  const percentageColor = 
    percentage > 0 ? "text-blue-500" : percentage < 0 ? "text-red-500" : "text-gray-500";

  return (
    <div className={`p-6 rounded-lg shadow ${color}`}>
      {icon}
      <p className="my-1 text-xl font-bold">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
      {percentage !== undefined && (
        <p className={`text-sm ${percentageColor}`}>
          {percentage > 0 ? `+${percentage}%` : `${percentage}%`} dari minggu lalu
        </p>
      )}
    </div>
  );
};

export default React.memo(StatsCard);
