import React from "react";
import IcLeftArrow from "../assets/IcLeftArrow";
import IcRightArrow from "../assets/IcRightArrow";

function Calendar() {
  const colors = ["bg-[#9130bf]", "bg-[#312437]", "bg-[#482559]"];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const year = 2024;
  const month = 0; // January (0-based index)
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  return (
    <>
      <div className="flex flex-row self-center gap-8">
        <button>
          <IcLeftArrow />
        </button>
        <h2 className="font-bold content-center">January, 2024</h2>
        <button>
          <IcRightArrow />
        </button>
      </div>
      <div className="grid grid-cols-7 mt-4">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
          <p key={index} className="text-center font-bold">
            {day}
          </p>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={index} className="h-32 "></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => (
          <div
            key={index}
            className={`${
              colors[index % colors.length]
            } h-32 border border-collapse border-dashed border-zinc-100`}
          ></div>
        ))}
      </div>
    </>
  );
}

export default Calendar;
