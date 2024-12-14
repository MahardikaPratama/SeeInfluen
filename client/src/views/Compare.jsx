import Header from "../components/Header";
import CompareCard from "../components/CompareCard";
import Chart from "../components/Chart";
import influencerService from "../services/influencer.service";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// Query function to fetch benchmarking data
const fetchBenchmarkingData = async (username1, username2, username3) => {
  if (username1 || username2 || username3) {
    return influencerService.get_benchmarking(username1, username2, username3);
  }
  return Promise.resolve(null);
};

function Compare() {
  const [influencers, setInfluencers] = useState({ username1: "", username2: "", username3: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const { data, refetch } = useQuery(
    {
      queryKey: ["benchmark", influencers.username1, influencers.username2, influencers.username3],
      queryFn: () => fetchBenchmarkingData(influencers.username1, influencers.username2, influencers.username3),
      enabled: false, // Disable automatic fetching, we will trigger it manually
    }
  );

  console.log(data);

  const handleInputChange = (e, field) => {
    setInfluencers({ ...influencers, [field]: e.target.value });
  };

  const handleCompare = () => {
    if (influencers.username1 || influencers.username2 || influencers.username3) {
      refetch().then((res) => {
        if (!res.data || !res.data.influencers || res.data.influencers.length === 0) {
          setErrorMessage("One or more usernames do not exist in the database.");
        } else {
          setErrorMessage("");
        }
      });
    } else {
      alert("Please fill in at least one influencer.");
    }
  };

  // Prepare `lines` dynamically based on `username`
  const colors = ["#FF0000", "#00FF00", "#0000FF"]; // Red, Green, Blue
  const lines = data?.data?.influencers.map((influencer, index) => ({
      dataKey: influencer.username, // Map `username` as the key
      color: colors[index % colors.length], // Cycle through the colors
  }));

  const prepareChartData = (data, metricKey) => {
    // Ambil data history_metrics dari setiap influencer
    const allMetrics = data?.data?.influencers.flatMap((influencer) =>
      influencer.history_metrics.map((metric) => ({
        date: metric.date,
        [influencer.username]: metric[metricKey], // Gunakan metricKey untuk nilai spesifik (subscriber, view, video)
      }))
    );
  
    // Gabungkan data berdasarkan tanggal agar setiap `date` memiliki semua username
    const groupedData = Object.values(
      allMetrics.reduce((acc, curr) => {
        if (!acc[curr.date]) acc[curr.date] = { date: curr.date };
        Object.keys(curr).forEach((key) => {
          if (key !== "date") acc[curr.date][key] = curr[key];
        });
        return acc;
      }, {})
    );
  
    return groupedData;
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Header title={"Compare"} />

      <div className="flex flex-col gap-4 p-8">
        <div className="flex flex-col bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Influencer 1"
              className="border border-gray-300 rounded px-4 py-2 text-sm w-1/3"
              value={influencers.username1}
              onChange={(e) => handleInputChange(e, "username1")}
            />
            <span>VS</span>
            <input
              type="text"
              placeholder="Influencer 2"
              className="border border-gray-300 rounded px-4 py-2 text-sm w-1/3"
              value={influencers.username2}
              onChange={(e) => handleInputChange(e, "username2")}
            />
            <span>VS</span>
            <input
              type="text"
              placeholder="Influencer 3"
              className="border border-gray-300 rounded px-4 py-2 text-sm w-1/3"
              value={influencers.username3}
              onChange={(e) => handleInputChange(e, "username3")}
            />
            <button 
              className="bg-gray-800 text-white px-8 py-2 rounded"
              onClick={handleCompare}
            >
              Compare
            </button>
          </div>
        </div>

        {/* Display error message if any */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {/* Render CompareCards if data is available */}
        {data && data.data.influencers && data.data.influencers.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {data.data.influencers.map((influencer, index) => (
              <CompareCard key={index} influencer={influencer} />
            ))}
          </div>
        ) : (
          <p>No data to display</p>
        )}

        {/* Render Charts */}
        {data && (
          <div className="grid grid-cols-3 gap-x-4 gap-y-4">
            <div className="col-span-1">
              <Chart
                title={"Subscriber"}
                data={prepareChartData(data, "subscriber_count")} // Gunakan subscriber_count
                lines={lines}
              />
            </div>
            <div className="col-span-1">
              <Chart
                title={"Views"}
                data={prepareChartData(data, "view_count")} // Gunakan view_count
                lines={lines}
              />
            </div>
            <div className="col-span-1">
              <Chart
                title={"Video"}
                data={prepareChartData(data, "video_count")} // Gunakan video_count
                lines={lines}
              />
            </div>
          </div>
        )}

        {/* Summary Section */}
        {data && data.data.influencers && (
          <table className="table-auto mt-8 w-full text-left bg-white p-4 rounded-lg shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 w-1/6">Estimasi Adsense</th>
                <th className="px-4 py-2 w-1/5 text-left">{data.data.influencers[0]?.username}</th>
                <th className="px-4 py-2 w-1/5 text-left">{data.data.influencers[1]?.username}</th>
                <th className="px-4 py-2 w-1/5 text-left">{data.data.influencers[2]?.username}</th>
              </tr>
            </thead>

            <tbody>
              {/* Daily Average */}
              <tr className="font-semibold">
                <td className="px-4 py-2 text-left">Daily Average</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">Views</td>
                <td className="px-4 py-2 text-left">{data.data.influencers[0]?.daily_avg?.views || "N/A"}</td>
                <td className="px-4 py-2 text-left">{data.data.influencers[1]?.daily_avg?.views || "N/A"}</td>
                <td className="px-4 py-2 text-left">{data.data.influencers[2]?.daily_avg?.views || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">Revenue (Min-Max)</td>
                <td className="px-4 py-2 text-left">{`${data.data.influencers[0]?.daily_avg?.estimated_min_revenue || "N/A"} - ${data.data.influencers[0]?.daily_avg?.estimated_max_revenue || "N/A"}`}</td>
                <td className="px-4 py-2 text-left">{`${data.data.influencers[1]?.daily_avg?.estimated_min_revenue || "N/A"} - ${data.data.influencers[1]?.daily_avg?.estimated_max_revenue || "N/A"}`}</td>
                <td className="px-4 py-2 text-left">{`${data.data.influencers[2]?.daily_avg?.estimated_min_revenue || "N/A"} - ${data.data.influencers[2]?.daily_avg?.estimated_max_revenue || "N/A"}`}</td>
              </tr>

              {/* Weekly Average */}
              <tr className="font-semibold">
                <td className="px-4 py-2 text-left">Weekly Average</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">Views</td>
                <td className="px-4 py-2 text-left">{data.data.influencers[0]?.weekly_avg?.views || "N/A"}</td>
                <td className="px-4 py-2 text-left">{data.data.influencers[1]?.weekly_avg?.views || "N/A"}</td>
                <td className="px-4 py-2 text-left">{data.data.influencers[2]?.weekly_avg?.views || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">Revenue (Min-Max)</td>
                <td className="px-4 py-2 text-left">{`${data.data.influencers[0]?.weekly_avg?.estimated_min_revenue || "N/A"} - ${data.data.influencers[0]?.weekly_avg?.estimated_max_revenue || "N/A"}`}</td>
                <td className="px-4 py-2 text-left">{`${data.data.influencers[1]?.weekly_avg?.estimated_min_revenue || "N/A"} - ${data.data.influencers[1]?.weekly_avg?.estimated_max_revenue || "N/A"}`}</td>
                <td className="px-4 py-2 text-left">{`${data.data.influencers[2]?.weekly_avg?.estimated_min_revenue || "N/A"} - ${data.data.influencers[2]?.weekly_avg?.estimated_max_revenue || "N/A"}`}</td>
              </tr>

              {/* Monthly Average */}
              <tr className="font-semibold">
                <td className="px-4 py-2 text-left">Monthly Average</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">Views</td>
                <td className="px-4 py-2 text-left">{data.data.influencers[0]?.monthly_avg?.views || "N/A"}</td>
                <td className="px-4 py-2 text-left">{data.data.influencers[1]?.monthly_avg?.views || "N/A"}</td>
                <td className="px-4 py-2 text-left">{data.data.influencers[2]?.monthly_avg?.views || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">Revenue (Min-Max)</td>
                <td className="px-4 py-2 text-left">{`${data.data.influencers[0]?.monthly_avg?.estimated_min_revenue || "N/A"} - ${data.data.influencers[0]?.monthly_avg?.estimated_max_revenue || "N/A"}`}</td>
                <td className="px-4 py-2 text-left">{`${data.data.influencers[1]?.monthly_avg?.estimated_min_revenue || "N/A"} - ${data.data.influencers[1]?.monthly_avg?.estimated_max_revenue || "N/A"}`}</td>
                <td className="px-4 py-2 text-left">{`${data.data.influencers[2]?.monthly_avg?.estimated_min_revenue || "N/A"} - ${data.data.influencers[2]?.monthly_avg?.estimated_max_revenue || "N/A"}`}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Compare;