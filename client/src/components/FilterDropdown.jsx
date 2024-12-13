/* eslint-disable react/prop-types */
// FilterDropdown.jsx
import React from "react";
import IcArrowDown from "../assets/IcArrowDown";

function FilterDropdown({ icon, options, color, onChange }) {
  return (
    <div className={`w-fit py-1 px-2 rounded-full border border-[${color}]`}>
      <div className="flex items-center gap-2">
        {icon}
        <select
          className={`bg-transparent px-4 appearance-none text-[${color}]}`}
          onChange={onChange}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option.country_id} value={option.country_id}>
              {option.country_name}
            </option>
          ))}
        </select>
        <IcArrowDown color={color} />
      </div>
    </div>
  );
}

export default React.memo(FilterDropdown);