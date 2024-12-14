import React from "react";
import IcLogo from "../assets/IcLogo";

function Navigation() {
  return (
    <nav className="flex flex-row justify-between py-4 px-8 bg-[#B9B9B9]">
      <div>
        <IcLogo />
      </div>
      <div className="flex flex-row gap-6 items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded h-fit">
          Product
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded h-fit">
          Pricing
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded h-fit">
          Sign Up
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded h-fit">
          Sign In
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
