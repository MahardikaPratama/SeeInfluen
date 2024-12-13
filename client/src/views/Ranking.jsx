import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import FilterDropdown from "../components/FilterDropdown";
import InfluencerService from "../services/influencer.service";

const Ranking = () => {
  const [countryId, setCountryId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: () => InfluencerService.getCountries().then((res) => res.data),
  });

  const { data: ranking, refetch } = useQuery({
    queryKey: ["ranking", countryId, searchTerm, limit, currentPage],
    queryFn: () => {
      const offset = (currentPage - 1) * limit;
      if (searchTerm) {
        return InfluencerService.searchRanking(searchTerm, limit, offset).then((res) => res.data);
      } else if (countryId) {
        return InfluencerService.filterRanking(limit, countryId, offset).then((res) => res.data);
      } else {
        return InfluencerService.getRanking(limit, offset).then((res) => res.data);
      }
    },
    keepPreviousData: true,
  });

  // Cek jika data ranking tidak ada
  const totalPages = ranking ? Math.ceil(ranking.total / limit) : 1;
  const noDataMessage = ranking?.data.length === 0 ? "Tidak terdapat data influencer." : "";

  // Cek jika tidak ada influencer berdasarkan negara
  const noCountryDataMessage =
    countryId && ranking?.data.filter((row) => row.country_name === countryId).length === 0
      ? "Tidak ada influencer dari negara yang dipilih."
      : "";

  // Cek jika tidak ada influencer berdasarkan username
  const noUsernameDataMessage =
    searchTerm && ranking?.data.filter((row) => row.username.toLowerCase() === searchTerm.toLowerCase()).length === 0
      ? "Tidak ada influencer dari username yang dimasukkan."
      : "";

  const handleCountryChange = (e) => {
    setCountryId(e.target.value);
    setCurrentPage(1);
    refetch();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    refetch();
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
    refetch();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    refetch();
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Header title="Ranking" />
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
            <label htmlFor="search" className="text-sm text-gray-600">
              Search:
            </label>
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded px-4 py-2 text-sm w-1/3"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="flex items-center gap-4">
            <FilterDropdown
              icon={<i className="icon-world" />}
              options={countries || []}
              color="#624de3"
              onChange={handleCountryChange}
            />
          </div>

          {/* Tampilkan pesan error jika data tidak ditemukan */}
          {noDataMessage && <p className="text-red-500">{noDataMessage}</p>}
          {noCountryDataMessage && <p className="text-red-500">{noCountryDataMessage}</p>}
          {noUsernameDataMessage && <p className="text-red-500">{noUsernameDataMessage}</p>}

          <table className="w-full border-none border border-gray-200 my-4">
            <thead>
              <tr className="bg-[rgb(114,116,240)] text-white">
                <th className="px-4 py-2 text-left">Rank</th>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Score</th>
                <th className="px-4 py-2 text-left">Country</th>
              </tr>
            </thead>
            <tbody>
              {ranking?.data.map((row, index) => (
                <tr key={index} className="even:bg-[rgba(168,169,255,0.22)]">
                  <td className="px-4 py-2">{row.ranking}</td>
                  <td className="px-4 py-2">{row.username}</td>
                  <td className="px-4 py-2">{row.score}</td>
                  <td className="px-4 py-2">{row.country_name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Ranking;
