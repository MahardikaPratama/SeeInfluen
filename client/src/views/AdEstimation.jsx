import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import InfluencerService from "../services/influencer.service";

const AdEstimation = () => {
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  // Use useQuery but don't automatically fetch when the component mounts
  const { data, isLoading, isError, error, refetch } = useQuery(
    {
      queryKey: ['adsense', dateStart, dateEnd],  // queryKey as an object
      queryFn: () => {
        if (dateStart && dateEnd) {
          return InfluencerService.get_adsense('UCieVKbAWx7R4ZfKNAVg0FYg', dateStart, dateEnd);
        }
        return Promise.resolve(null); // Return a resolved promise if no dates are selected
      },
      enabled: false, // Don't fetch automatically
    }
  );

  // Trigger refetching when the "Filter" button is clicked
  const handleFilter = () => {
    if (dateStart && dateEnd) {
      refetch(); // This triggers the fetch manually
    } else {
      alert("Please select both start and end dates.");
    }
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Header title={"Ad Estimation"} />
      <div className="p-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex place-self-center items-center mb-4">
            <div className="flex items-center gap-4">
              <input
                type="date"
                className="rounded px-6 py-2 text-sm border"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
              />
              <span className="text-gray-500">to</span>
              <input
                type="date"
                className="rounded px-6 py-2 text-sm border"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
              />
              <button
                onClick={handleFilter}
                className="bg-gray-800 text-white px-8 py-2 rounded"
              >
                Filter
              </button>
            </div>
          </div>

          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            <table className="w-full border-none border border-gray-200">
              <thead>
                <tr className="text-black">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Video Views</th>
                  <th className="px-4 py-2 text-left">Estimated Earnings</th>
                </tr>
              </thead>
              <tbody>
                {/* Render daily results from fetched data */}
                {data?.data?.daily_results?.map((row, index) => (
                  <tr key={index} className="even:bg-[rgba(168,169,255,0.22)]">
                    <td className="px-4 py-2">{row.date}</td>
                    <td className="px-4 py-2">{row.video_views}</td>
                    <td className="px-4 py-2">
                      {`${row.estimated_min_revenue} - ${row.estimated_max_revenue}`}
                    </td>
                  </tr>
                ))}

                {/* Summary Section */}
                <tr>
                  <td colSpan="3" className="py-4"></td>
                </tr>
                <tr className="font-semibold">
                  <td className="px-4 py-2">Daily Average</td>
                  <td className="px-4 py-2">{data?.data?.daily_avg?.views}</td>
                  <td className="px-4 py-2">{`${data?.data?.daily_avg?.estimated_min_revenue} - ${data?.data?.daily_avg?.estimated_max_revenue}`}</td>
                </tr>
                {/* Repeat for Weekly and Monthly summary */}
                <tr className="font-semibold">
                  <td className="px-4 py-2">Weekly Average</td>
                  <td className="px-4 py-2">{data?.data?.weekly_avg?.views}</td>
                  <td className="px-4 py-2">{`${data?.data?.weekly_avg?.estimated_min_revenue} - ${data?.data?.weekly_avg?.estimated_max_revenue}`}</td>
                </tr>
                <tr className="font-semibold">
                  <td className="px-4 py-2">Monthly Average</td>
                  <td className="px-4 py-2">{data?.data?.monthly_avg?.views}</td>
                  <td className="px-4 py-2">{`${data?.data?.monthly_avg?.estimated_min_revenue} - ${data?.data?.monthly_avg?.estimated_max_revenue}`}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdEstimation;
