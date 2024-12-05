import React from "react";
import UserProfile from "../components/Profile";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import IcArrowDown from "../assets/IcArrowDown";

const TrendingTopics = () => {
  const topics = [
    { topic: "Mukbang", frequency: "19040" },
    { topic: "Trukus Indonesia", frequency: "16377" },
    { topic: "Artboxing", frequency: "15780" },
    { topic: "FansWar2Emote", frequency: "15642" },
    { topic: "Cinematic", frequency: "14752" },
    { topic: "MemeBot", frequency: "13751" },
    { topic: "Reckorder", frequency: "12953" },
    { topic: "CrazyHorse", frequency: "12821" },
    { topic: "ProTek", frequency: "12699" },
    { topic: "CloudPastCloud", frequency: "11842" },
  ];

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Header title={"Trending Topics"} />

      <div className="p-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4 gap-2">
            <div className="flex items-center gap-4">
              <label htmlFor="show" className="text-sm text-gray-600">
                Show:
              </label>
              <div className="flex flex-row items-center rounded-md bg-gray-300 pr-2">
                <select
                  id="show"
                  className="bg-gray-300 rounded px-3 py-2 text-sm appearance-none"
                >
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <IcArrowDown color="#000000" />
              </div>
            </div>
            <label htmlFor="search" className="text-sm text-gray-600">
              Search:
            </label>
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded px-4 py-2 text-sm w-1/3"
            />
          </div>

          <table className="w-full border-none border border-gray-200 my-4">
            <thead>
              <tr className="bg-[rgb(114,116,240)] text-white">
                <th className=" px-4 py-2 text-left">Topik</th>
                <th className=" px-4 py-2 text-left">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((row, index) => (
                <tr key={index} className="even:bg-[rgba(168,169,255,0.22)]">
                  <td className="px-4 py-2">{row.topic}</td>
                  <td className="px-4 py-2">{row.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;
