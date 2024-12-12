import React from "react";

const Player = ({ videoUrl, title }) => {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={videoUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-[400px] rounded-lg"
      ></iframe>
    </div>
  );
};

export default React.memo(Player);
