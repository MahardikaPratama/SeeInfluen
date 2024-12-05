import React from "react";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import IcArrowDown from "../assets/IcArrowDown";
import FilterDropdown from "../components/FilterDropdown";
import IcChat from "../assets/IcChat";
import IcClock from "../assets/IcClock";

const TrendingTopics = () => {
  const topics = [
    { username: "john_doe", country: "USA" },
    { username: "jane_smith", country: "Canada" },
    { username: "mike_jones", country: "UK" },
    { username: "sara_lee", country: "Australia" },
    { username: "tom_hardy", country: "New Zealand" },
    { username: "emma_watson", country: "France" },
    { username: "chris_evans", country: "Germany" },
    { username: "scarlett_johansson", country: "Sweden" },
    { username: "robert_downey", country: "Italy" },
    { username: "chris_hemsworth", country: "Norway" },
  ];

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Header title={"Ranking"} />

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
                  className="rounded px-3 py-2 text-sm bg-gray-300 appearance-none"
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

          <div className="flex items-center gap-4">
            <FilterDropdown
              icon={<IcChat />}
              options={["Grade", "Subcriber"]}
              color="#624de3"
            />
            <FilterDropdown
              icon={<IcClock />}
              options={["Indonesia", "Malaysia", "Singapore"]}
              color="#624de3"
            />
          </div>

          <table className="w-full border-none border border-gray-200 my-4">
            <thead>
              <tr className="bg-[rgb(114,116,240)] text-white">
                <th className=" px-4 py-2 text-left">Rank</th>
                <th className=" px-4 py-2 text-left">Username</th>
                <th className=" px-4 py-2 text-left">Country</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((row, index) => (
                <tr key={index} className="even:bg-[rgba(168,169,255,0.22)]">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{row.username}</td>
                  <td className="px-4 py-2">{row.country}</td>
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
