import React from "react";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import SuggestionCard from "../components/SuggestionCard";

function PostingTime() {
  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Header title={"Posting Time"} />

      <div className="grid grid-cols-3">
        <div className="flex flex-col col-span-2 p-8 mx-8 bg-white rounded-lg shadow">
          <Calendar />
          <div className="flex justify-center items-center mt-8 gap-4">
            <p className="text-xl font-bold">Few viewers</p>
            <ul className="flex gap-4">
              <li className="w-4 h-4 bg-[#312437] rounded-2xl"></li>
              <li className="w-4 h-4 bg-[#482559] rounded-2xl"></li>
              <li className="w-4 h-4 bg-[#6a2a89] rounded-2xl"></li>
              <li className="w-4 h-4 bg-[#9130bf] rounded-2xl"></li>
            </ul>
            <p className="text-xl font-bold">Many viewers</p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col items-start gap-8">
            <SuggestionCard
              title={"BEST TIME TO POST"}
              by={"Overall"}
              time={[
                "Monday, 08.00 am",
                "Tuesday, 09.00 am",
                "Wednesday, 10.00 am",
              ]}
            />
            <SuggestionCard
              title={"BEST TIME TO POST"}
              by={"by Hour"}
              time={["08.00 pm", "09.00 am", "10.0 am"]}
            />
            <SuggestionCard
              title={"BEST TIME TO POST"}
              by={"by Day"}
              time={["Monday", "Tuesday", "Wednesday"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostingTime;
