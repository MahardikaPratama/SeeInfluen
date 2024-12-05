import React from "react";
import IcArrowDown from "../assets/IcArrowDown";

function FilterDropdown({ icon, options, color }) {
  return (
    <div className={`w-fit py-1 px-2 rounded-full border border-[${color}]`}>
      <div className="flex items-center gap-2">
        {icon}
        <select
          className={`bg-transparent px-4 appearance-none text-[${color}]}`}
        >
          {options.map((option, index) => (
            <option key={option} value={option} defaultValue={index === 1}>
              {option}
            </option>
          ))}
        </select>
        <IcArrowDown color={color} />
      </div>
    </div>
  );
}

export default React.memo(FilterDropdown);
