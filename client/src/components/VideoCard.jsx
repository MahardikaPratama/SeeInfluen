import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <h3 className="font-semibold text-sm">{video.title}</h3>
        <p className="text-xs text-gray-500">{video.views} views</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-gray-500 text-sm">👍 {video.likes}</p>
        <p className="text-gray-500 text-sm">💬 {video.comments}</p>
      </div>
    </div>
  );
};

export default VideoCard;
