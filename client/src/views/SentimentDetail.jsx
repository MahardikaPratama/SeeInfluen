import React from "react";
import UserProfile from "../components/Profile";
import Pagination from "../components/Pagination";
import Header from "../components/Header";

const SentimentDetail = () => {
  const videoData = {
    title: "Mukbang Bersama Teman",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // URL video untuk embed
    views: "113",
    likes: "5",
    comments: "3",
    sentimentSummary: {
      positive: "78%",
      neutral: "12%",
      negative: "10%",
    },
  };

  const commentsData = [
    { username: "User1", comment: "Sangat menarik", sentiment: "Positif" },
    { username: "User2", comment: "Biasa saja", sentiment: "Netral" },
    { username: "User3", comment: "Kurang seru", sentiment: "Negatif" },
  ];

  return (
    <div className="w-full h-full bg-gray-100">
      <Header title="Sentiment Detail" />

      <div className="p-4">
        <div className="bg-white rounded-lg shadow p-6">
          {/* Video Section */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold mb-4 w-full">
              {videoData.title}
            </h1>
            <div className="mb-6">
              <iframe
                className="w-1/2 h-[400px] rounded-lg shadow "
                src={videoData.videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div>
              <table className="w-full border-none border border-gray-200 my-4">
                <thead>
                  <tr className="text-black">
                    <th className="px-4 py-2 text-left">Views</th>
                    <th className="px-4 py-2 text-left">Likes</th>
                    <th className="px-4 py-2 text-left">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-sm hover:bg-gray-50 bg-gray-100">
                    <td className="px-4 py-2 border-b">{videoData.views}</td>
                    <td className="px-4 py-2 border-b">{videoData.likes}</td>
                    <td className="px-4 py-2 border-b">{videoData.comments}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <table className="w-full border-none border border-gray-200 my-4">
                <thead>
                  <tr className="text-black">
                    <th className="px-4 py-2 text-left">Positif</th>
                    <th className="px-4 py-2 text-left">Netral</th>
                    <th className="px-4 py-2 text-left">Negatif</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-sm hover:bg-gray-50 bg-gray-100">
                    <td className="px-4 py-2 border-b">
                      {videoData.sentimentSummary.positive}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {videoData.sentimentSummary.neutral}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {videoData.sentimentSummary.negative}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Comments Section */}
            <div>
              <h1 className="text-lg font-semibold mb-4">Sentimen Komentar</h1>
              <table className="w-full border-none border border-gray-200 my-4">
                <thead>
                  <tr className="bg-[rgb(114,116,240)] text-white">
                    <th className="px-4 py-2 text-left">Username</th>
                    <th className="px-4 py-2 text-left">Komentar</th>
                    <th className="px-4 py-2 text-left">Sentimen</th>
                  </tr>
                </thead>
                <tbody>
                  {commentsData.map((comment, index) => (
                    <tr
                      key={index}
                      className={`text-sm hover:bg-gray-50 ${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <td className="px-4 py-2 border-b">{comment.username}</td>
                      <td className="px-4 py-2 border-b">{comment.comment}</td>
                      <td
                        className={`px-4 py-2 border-b ${
                          comment.sentiment === "Positif"
                            ? "text-green-600"
                            : comment.sentiment === "Netral"
                            ? "text-gray-600"
                            : "text-red-600"
                        }`}
                      >
                        {comment.sentiment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentDetail;
