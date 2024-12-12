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
  ];

  const data = [
    { month: "Jan", Ferdi: 200, Ariseta: 150 },
    { month: "Feb", Ferdi: 210, Ariseta: 160 },
    { month: "Mar", Ferdi: 220, Ariseta: 165 },
    { month: "Apr", Ferdi: 240, Ariseta: 170 },
    { month: "May", Ferdi: 260, Ariseta: 175 },
    { month: "Jun", Ferdi: 280, Ariseta: 180 },
    { month: "Jul", Ferdi: 300, Ariseta: 190 },
    { month: "Aug", Ferdi: 320, Ariseta: 200 },
    { month: "Sep", Ferdi: 340, Ariseta: 210 },
    { month: "Oct", Ferdi: 360, Ariseta: 220 },
    { month: "Nov", Ferdi: 380, Ariseta: 230 },
    { month: "Dec", Ferdi: 400, Ariseta: 240 },
  ];

  const lines = [
    { dataKey: "Ferdi", color: "#22c55e" }, // Warna hijau
    { dataKey: "Ariseta", color: "#a855f7" }, // Warna ungu
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

        <div className="flex flex-row gap-4">
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
