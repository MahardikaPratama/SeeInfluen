import React from "react";

function SuggestionCard({ title, by, time }) {
  return (
    <div className="flex flex-col bg-[#ffe2e5] w-2/3 px-8 pb-8 pt-2 rounded-2xl">
      <h2 className="font-bold mb-2">{title}</h2>
      <h3 className="font-semibold text-[#425166]">{by}</h3>
      <ul>
        {time.map((time, index) => (
          <li key={index} className="text-[#425166]">
            {index + 1} .{time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SuggestionCard;
