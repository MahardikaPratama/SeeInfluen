import React from "react";

function Pagination() {
  return (
    <div className="flex gap-2 place-content-center">
      <button className="px-4 py-2 text-sm text-[#9e9e9e]">Prev</button>
      <button className="px-4 py-2 bg-[#624DE3] rounded-md text-sm text-white">
        1
      </button>
      <button className="px-4 py-2 text-sm">2</button>
      <button className="px-4 py-2 text-sm">3</button>
      <button className="px-4 py-2 text-sm text-[#9e9e9e]">Next</button>
    </div>
  );
}

export default React.memo(Pagination);
