import React from "react";
import UserProfile from "../components/Profile";
import FilterDropdown from "../components/FilterDropdown";
import IcClock from "../assets/IcClock";
import IcChat from "../assets/IcChat";
import Header from "../components/Header";
import IcArrowDown from "../assets/IcArrowDown";
import Pagination from "../components/Pagination";

const SentimentAnalysis = ({ setActive }) => {
  const data = [
    {
      video: "Tangan AC mini Bambank Indomaret Simulator",
      sentiment: "Positif",
    },
    {
      video: "Tutorial Main Pak Sudar Indomaret Simulator",
      sentiment: "Positif",
    },
    { video: "Semifinalis APEX MOBILE Easy Recoil", sentiment: "Positif" },
    { video: "APEX MOBILE GAMEPLAY Beta test", sentiment: "Positif" },
    {
      video: "DAMIA RTX 10 KE MOBILE LEGENDS, KEKERIBOAN",
      sentiment: "Positif",
    },
    {
      video: "HONKAN ALICE DI BANDED?! Itu Yang BALIK CODE",
      sentiment: "Positif",
    },
    { video: "NEW STAGE EVENT: GRAND NOW", sentiment: "Positif" },
    { video: "MIRIP LEGEN…INI APA SEBENARNYA?", sentiment: "Positif" },
    { video: "Mauhan Ketemu Atlas Gantikan Purity?", sentiment: "Positif" },
  ];

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Header title="Sentiment Analysis" />

      <div className="p-4">
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

          <FilterDropdown
            icon={<IcClock />}
            options={["Positif", "Negatif", "Neutral"]}
            color="#624de3"
          />

          <table className="w-full border-none border border-gray-200 my-4">
            <thead>
              <tr className="bg-[rgb(114,116,240)] text-white">
                <th className="px-4 py-2 text-left">Video</th>
                <th className="px-4 py-2 text-left">Sentimen</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`text-sm hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2 border-b">{item.video}</td>
                  <td className="px-4 py-2 border-b text-green-600">
                    {item.sentiment}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      className="px-4 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                      onClick={() => setActive("sentimentDetail")}
                    >
                      Detail
                    </button>
                  </td>
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

export default SentimentAnalysis;
