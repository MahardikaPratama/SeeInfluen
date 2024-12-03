import React from "react";
import UserProfile from "../components/Profile";

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
    <div className="p-8 w-full bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-700">Analisis Sentiment</h2>
        <UserProfile />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {/* Video Section */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold mb-4">{videoData.title}</h1>
          <div className="mb-6">
            <iframe
              className="w-full h-[800px] rounded-lg shadow"
              src={videoData.videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video Details */}
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-6">
            <div>
              <strong className="text-gray-800">Views:</strong>{" "}
              {videoData.views}
            </div>
            <div>
              <strong className="text-gray-800">Likes:</strong>{" "}
              {videoData.likes}
            </div>
            <div>
              <strong className="text-gray-800">Comments:</strong>{" "}
              {videoData.comments}
            </div>
          </div>

          {/* Sentiment Summary */}
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-6">
            <div>
              <strong className="text-gray-800">Positif:</strong>{" "}
              {videoData.sentimentSummary.positive}
            </div>
            <div>
              <strong className="text-gray-800">Netral:</strong>{" "}
              {videoData.sentimentSummary.neutral}
            </div>
            <div>
              <strong className="text-gray-800">Negatif:</strong>{" "}
              {videoData.sentimentSummary.negative}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Sentimen Komentar</h2>
          <table className="w-full border-none border border-gray-200">
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
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">Showing 1 to 3 of 3 entries</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-200 rounded text-sm">
                1
              </button>
              <button className="px-4 py-2 bg-gray-300 rounded text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentDetail;
