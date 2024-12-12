import React from "react";
import StatsCard from "../components/StatsCard";
import VideoCard from "../components/VideoCard";
import Player from "../components/Player";
import Header from "../components/Header";
import IcViewDashboard from "../assets/IcViewDashboard";
import IcSubDashboard from "../assets/IcSubDashboard";
import IcUploadDashboard from "../assets/IcUploadDashboard";
import FilterDropdown from "../components/FilterDropdown";

const Dashboard = () => {
  const videos = [
    {
      id: 1,
      title: "[IndomaretSimulator] Tempat AC",
      views: 175,
      likes: 3,
      comments: 3,
    },
    {
      id: 2,
      title: "[IndomaretSimulator] Tutorial",
      views: 111,
      likes: 9,
      comments: 3,
    },
    {
      id: 3,
      title: "Sensitivitas APEX MOBILE",
      views: 39,
      likes: 2,
      comments: 4,
    },
  ];

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Header title={"Dashboard"} />
      <div className="p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stats Section */}
            <div className="col-span-1 bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">
                Selamat Datang Atseira
              </h2>
              <div className="grid grid-cols-3 grid-rows-1 gap-4">
                <StatsCard
                  title="Views"
                  value="853"
                  icon={<IcViewDashboard />}
                  color="bg-[#ffe2e5]"
                />
                <StatsCard
                  title="Subscriber"
                  value="50"
                  icon={<IcSubDashboard />}
                  color="bg-[#f3e8ff]"
                />
                <StatsCard
                  title="Uploads"
                  value="14"
                  icon={<IcUploadDashboard />}
                  color="bg-[#fff4de]"
                />
                <div className="bg-white shadow-md rounded-lg p-4 mb-6 col-span-3">
                  <h2 className="text-lg font-semibold mb-4">Video terbaru</h2>
                  <Player
                    videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="[IndomaretSimulator] Tempat AC Misi"
                  />
                </div>
              </div>
            </div>

            {/* Video Section */}
            <div className="col-span-1">
              <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Video Terbaru</h2>
                {videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
