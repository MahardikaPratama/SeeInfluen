import React from "react";
import UserProfile from "../components/Profile";

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
    <div className="p-8 w-full bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-700">Trending</h2>
        <UserProfile />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <label htmlFor="show" className="text-sm text-gray-600">
              Show:
            </label>
            <select
              id="show"
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded px-4 py-2 text-sm w-1/3"
          />
        </div>

        <table className="w-full border-none border border-gray-200">
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

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">Showing 1 to 10 of 10 entries</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-200 rounded text-sm">1</button>
            <button className="px-4 py-2 bg-gray-300 rounded text-sm">2</button>
            <button className="px-4 py-2 bg-gray-300 rounded text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;
