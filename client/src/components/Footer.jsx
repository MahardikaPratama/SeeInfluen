import React from "react";
import IcLogo from "../assets/IcLogo";
import IcX from "../assets/IcX";
import IcInstagram from "../assets/IcInstagram";
import IcYoutube from "../assets/IcYoutube";
import IcLinkedIn from "../assets/IcLinkedIn";

function Footer() {
  return (
    <footer className="bg-[#F2F2F2] py-8 px-16">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <IcLogo />
          <p className="text-xl font-bold">Seeinfluence</p>
        </div>
        <div className="flex gap-4">
          <IcX />
          <IcInstagram />
          <IcYoutube />
          <IcLinkedIn />
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
