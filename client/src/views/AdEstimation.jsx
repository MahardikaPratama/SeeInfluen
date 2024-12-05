import React from "react";
import UserProfile from "../components/Profile";
import Header from "../components/Header";

const AdEstimation = () => {
  const data = [
    { date: "12/03/2022", views: "32,121", earnings: "Rp. -" },
    { date: "17/03/2022", views: "27,945", earnings: "Rp. 200,000" },
    { date: "10/05/2022", views: "65,542", earnings: "Rp. 200,000" },
    { date: "05/06/2022", views: "18,507", earnings: "Rp. 200,000" },
    { date: "07/06/2022", views: "54,475", earnings: "Rp. 200,000" },
    { date: "13/06/2022", views: "52,132", earnings: "Rp. 200,000" },
    { date: "15/06/2022", views: "33,390", earnings: "Rp. 200,000" },
    { date: "25/06/2022", views: "82,561", earnings: "Rp. 200,000" },
    { date: "04/07/2022", views: "52,234", earnings: "Rp. 200,000" },
  ];

  const summary = [
    { label: "Daily Average", views: "???", earnings: "Rp. 200,000" },
    { label: "Weekly", views: "???", earnings: "Rp. 200,000" },
    { label: "Monthly", views: "???", earnings: "Rp. 200,000" },
  ];

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Header title={"Ad Estimation"} />
      <div className="p-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex place-self-center items-center mb-4">
            <div className="flex items-center gap-4">
              <input type="date" className="rounded px-6 py-2 text-sm border" />
              <span className="text-gray-500">to</span>
              <input type="date" className="rounded px-6 py-2 text-sm border" />
              <button className="bg-gray-800 text-white px-8 py-2 rounded">
                Filter
              </button>
            </div>
          </div>

          <table className="w-full border-none border border-gray-200">
            <thead>
              <tr className="text-black">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Video Views</th>
                <th className="px-4 py-2 text-left">Estimated Earnings</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="even:bg-[rgba(168,169,255,0.22)]">
                  <td className="px-4 py-2">{row.date}</td>
                  <td className="px-4 py-2">{row.views}</td>
                  <td className="px-4 py-2">{row.earnings}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="py-4"></td>
              </tr>
              {summary.map((row, index) => (
                <tr key={index} className="font-semibold">
                  <td className="px-4 py-2">{row.label}</td>
                  <td className="px-4 py-2">{row.views}</td>
                  <td className="px-4 py-2">{row.earnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdEstimation;
