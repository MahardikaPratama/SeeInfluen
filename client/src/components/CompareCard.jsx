import React from "react";

function CompareCard({ influencer }) {
  return (
    <div className="w-1/5 bg-white p-4 rounded-lg shadow-xl m-4">
      <div className="grid grid-cols-4 gap-x-4 gap-y-16">
        <img
          src="https://via.placeholder.com/150"
          alt="thumbnail"
          className="rounded-md"
        />
        <div className="col-span-3">
          <p className="text-lg font-semibold">{influencer.username}</p>
          <p className="text-sm text-gray-500">{influencer.date}</p>
        </div>
        <table className="col-span-4">
          <tr>
            <td className="text-sm text-gray-500 p-2">Ranking</td>
            <td className="text-sm text-gray-500 p-2">Country</td>
            <td className="text-sm text-gray-500 p-2">Watch</td>
            <td className="text-sm text-gray-500 p-2">Ads</td>
          </tr>
          <tr className="bg-[#f7f6fe]">
            <td className="py-1 px-2">{influencer.rank}</td>
            <td className="py-1 px-2">{influencer.country}</td>
            <td className="py-1 px-2">{influencer.views}</td>
            <td className="py-1 px-2">{influencer.ads}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default React.memo(CompareCard);
