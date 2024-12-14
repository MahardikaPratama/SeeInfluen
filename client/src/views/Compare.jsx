import React from "react";
import Header from "../components/Header";
import CompareCard from "../components/CompareCard";
import Chart from "../components/Chart";

function Compare() {
  const influencers = [
    {
      username: "john_doe",
      country: "USA",
      grade: "A",
      views: "50000",
      ads: "250000",
      rank: "1",
      date: "2021-09-01",
    },
    {
      username: "lisa_smith",
      country: "Canada",
      grade: "B",
      views: "40000",
      ads: "200000",
      rank: "2",
      date: "2023-02-06",
    },
    {
      username: "jane_doe",
      country: "UK",
      grade: "A",
      views: "30000",
      ads: "150000",
      rank: "3",
      date: "2022-11-15",
    },
  ];

  const data = Array.from({ length: 31 }, (_, index) => ({
    date: `${index + 1}`, // Tanggal dari 1 sampai 31
    Ferdi: Math.floor(200 + Math.random() * 200), // Data random
    Ariseta: Math.floor(150 + Math.random() * 150), // Data random
    MrBeast: Math.floor(100 + Math.random() * 100), // Data random
  }));

  const lines = [
    { dataKey: "Ferdi", color: "#22c55e" }, // Warna hijau
    { dataKey: "Ariseta", color: "#a855f7" }, // Warna ungu
    { dataKey: "MrBeast", color: "#f7a855" }, // Warna kun
  ];

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Header title={"Compare"} />

      <div className=" flex flex-col gap-4 p-8">
        <div className="flex flex-col bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Influencer 1"
              className="border border-gray-300 rounded px-4 py-2 text-sm w-1/3"
            />
            <span>VS</span>
            <input
              type="text"
              placeholder="Influencer 2"
              className="border border-gray-300 rounded px-4 py-2 text-sm w-1/3"
            />
            <span>VS</span>
            <input
              type="text"
              placeholder="Influencer 3"
              className="border border-gray-300 rounded px-4 py-2 text-sm w-1/3"
            />
            <button className="bg-gray-800 text-white px-8 py-2 rounded">
              Compare
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {influencers.map((influencer, index) => (
            <CompareCard key={index} influencer={influencer} />
          ))}
        </div>

        <div className="grid grid-cols-4 gap-x-4 gap-y-4">
          <div className="col-span-2">
            <Chart title={"Subcriber"} data={data} lines={lines} />
          </div>
          <div className="col-span-2">
            <Chart title={"Views"} data={data} lines={lines} />
          </div>
          <div className="col-start-2 col-span-2">
            <Chart title={"Ads"} data={data} lines={lines} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compare;
