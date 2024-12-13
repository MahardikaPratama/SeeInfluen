import React from "react";
import { useQuery } from "@tanstack/react-query";
import StatsCard from "../components/StatsCard";
import VideoCard from "../components/VideoCard";
import Player from "../components/Player";
import Header from "../components/Header";
import IcViewDashboard from "../assets/IcViewDashboard";
import IcSubDashboard from "../assets/IcSubDashboard";
import IcUploadDashboard from "../assets/IcUploadDashboard";
import InfluencerService from "../services/influencer.service";

const Dashboard = () => {
  const influencerId = 'UCieVKbAWx7R4ZfKNAVg0FYg';

  // Use React Query to fetch dashboard data with the new format
  const { data: dashboardData, isLoading, isError, error } = useQuery({
    queryKey: ['dashboard', influencerId], // The query key is an array
    queryFn: () => InfluencerService.getDashboard(influencerId), // The query function
    onError: (error) => {
      console.error("Failed to fetch dashboard data:", error);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Destructure data from the response
  const data = dashboardData.data[0];
  const { username, latest_subscriber_count, latest_view_count, latest_video_count, growth_rate_subscribers, growth_rate_views, growth_rate_videos, videos } = data;
  console.log("videos", videos);
  const stats = {
    views: { value: latest_view_count, percentage: growth_rate_views },
    subscribers: { value: latest_subscriber_count, percentage: growth_rate_subscribers },
    uploads: { value: latest_video_count, percentage: growth_rate_videos },
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Header title={"Dashboard"} />
      <div className="p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Stats Section */}
            <div className="col-span-1 p-4 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-lg font-semibold">Selamat Datang, {username}</h2>
              <div className="grid grid-cols-3 grid-rows-1 gap-4">
                <StatsCard
                  title="Views"
                  value={stats.views.value}
                  percentage={stats.views.percentage}
                  icon={<IcViewDashboard />}
                  color="bg-[#ffe2e5]"
                />
                <StatsCard
                  title="Subscriber"
                  value={stats.subscribers.value}
                  percentage={stats.subscribers.percentage}
                  icon={<IcSubDashboard />}
                  color="bg-[#f3e8ff]"
                />
                <StatsCard
                  title="Uploads"
                  value={stats.uploads.value}
                  percentage={stats.uploads.percentage}
                  icon={<IcUploadDashboard />}
                  color="bg-[#fff4de]"
                />
                <div className="col-span-3 p-4 mb-6 bg-white rounded-lg shadow-md">
                  <h2 className="mb-4 text-lg font-semibold">Video terbaru</h2>
                  {videos.length > 0 && (
                    <Player
                      videoUrl={videos[0].embed_link}
                      title={videos[0].video_title}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Video Section */}
            <div className="col-span-1">
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-lg font-semibold">Video Terbaru</h2>
                {videos.map((video) => (
                  <VideoCard key={video.video_id} video={video} />
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