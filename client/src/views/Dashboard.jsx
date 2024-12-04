import React from "react";
import StatsCard from "../components/StatsCard";
import VideoCard from "../components/VideoCard";
import Player from "../components/Player";
import UserProfile from "../components/Profile";

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
      <div className="flex justify-between items-center p-6 bg-white shadow-md">
        <h2 className="text-xl font-bold text-gray-700">Dashboard</h2>
        <UserProfile />
      </div>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Section */}
          <div className="col-span-1 bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">
              Selamat Datang Atseira
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <StatsCard title="Views" value="853" />
              <StatsCard title="Subscriber" value="50" />
              <StatsCard title="Uploads" value="14" />
            </div>
          </div>

          {/* Video Section */}
          <div className="col-span-2">
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold mb-4">Video terbaru</h2>
              <Player
                videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="[IndomaretSimulator] Tempat AC Misi"
              />
            </div>
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
  );
};

export default Dashboard;
