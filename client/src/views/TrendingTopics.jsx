import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import InfluencerService from "../services/influencer.service";

const TrendingTopics = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: trending, isLoading, isError } = useQuery({
    queryKey: ["trending", limit, currentPage],
    queryFn: () => {
      const offset = (currentPage - 1) * limit;
      return InfluencerService.getTrending(limit, offset).then((res) => res.data);
    },
    keepPreviousData: true,
  });

  const totalPages = trending ? Math.ceil(trending.total / limit) : 1;

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data!</div>;
  }

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Header title={"Trending Topics"} />

      <div className="p-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4 gap-2">
            <div className="flex items-center gap-4">
              <label htmlFor="show" className="text-sm text-gray-600">
                Show:
              </label>
              <select
                id="show"
                className="rounded px-3 py-2 text-sm bg-gray-300 appearance-none"
                value={limit}
                onChange={handleLimitChange}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          <table className="w-full border-none border border-gray-200 my-4">
            <thead>
              <tr className="bg-[rgb(114,116,240)] text-white">
                <th className="px-4 py-2 text-left">Topik</th>
                <th className="px-4 py-2 text-left">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {trending?.data.map((row, index) => (
                <tr key={index} className="even:bg-[rgba(168,169,255,0.22)]">
                  <td className="px-4 py-2">{row.Topic}</td>
                  <td className="px-4 py-2">{row.Frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;
