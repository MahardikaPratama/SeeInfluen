import React from "react";

function TestimoniCard({ testimoni, profile, name, job }) {
  return (
    <div className="flex flex-col p-8 border border-gray-400 shadow-lg">
      <p className=" text-lg font-bold">"{testimoni}"</p>
      <div className="flex items-center mt-4">
        <img src={profile} alt="testimoni" className="rounded-full w-16 h-16" />
        <div className="flex flex-col ml-4">
          <p className="text-lg font-bold">{name}</p>
          <p className="text-md font-extralight">{job}</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(TestimoniCard);
