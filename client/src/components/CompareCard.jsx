/* eslint-disable react/prop-types */
import React from "react";

function CompareCard({ influencer }) {
  return (
    <div className="w-72 bg-white p-4 rounded-lg shadow-xl m-4">
      <div className="flex items-center gap-4 mb-4">
        <img
          src="https://via.placeholder.com/50"
          alt="thumbnail"
          className="rounded-full w-12 h-12"
        />
        <div>
          <p className="text-lg font-semibold">{influencer.username}</p>
          <p className="text-sm text-gray-500">{influencer.created_at}</p>
        </div>
      </div>
      <table className="w-full text-center">
        <thead>
          <tr className="text-sm text-gray-500">
            <th className="p-2">Ranking</th>
            <th className="p-2">Country</th>
            <th className="p-2">Watch</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-[#f7f6fe]">
            <td className="py-1 px-2">{influencer.ranking}</td>
            <td className="py-1 px-2">{influencer.country}</td>
            <td className="py-1 px-2">{influencer.views}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(CompareCard);
