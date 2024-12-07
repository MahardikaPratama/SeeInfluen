import React from "react";
import { Link, useLocation } from "react-router-dom";
import IcLogo from "../assets/IcLogo";
import IcDashboard from "../assets/IcDashboard";
import IcAudience from "../assets/IcAudience";
import IcPostingTime from "../assets/IcPostingTime";
import IcTrendingTopic from "../assets/IcTrendingTopic";
import IcAdEstimation from "../assets/IcAdEstimation";
import IcRanking from "../assets/IcRanking";
import IcCompare from "../assets/IcCompare";
import SidebarOption from "./SidebarOption";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-80 px-12 h-full text-white">
      <Link to="/">
        <div className="p-6 flex items-center space-x-4">
          <div
            className={`flex flex-row text-white p-3 rounded-xl bg-[#5d5fef]`}
          >
            <IcLogo />
          </div>
          <h1 className="text-xl font-semibold text-[#151d48]">SeeInfluen</h1>
        </div>
      </Link>
      <nav className="mt-8">
        <ul className="space-y-4 list-none">
          <li>
            <SidebarOption
              path="/"
              title="Dashboard"
              icon={
                <IcDashboard
                  color={location.pathname == "/" ? "ffffff" : "51525d"}
                />
              }
            />
          </li>
          <li>
            <SidebarOption
              path="/sentiment"
              title="Audience"
              icon={
                <IcAudience
                  color={
                    location.pathname === "/sentiment" ? "#9e9ff5" : "#51525d"
                  }
                />
              }
            />
          </li>
          <li>
            <SidebarOption
              path="/posting-time"
              title="Posting Time"
              icon={
                <IcPostingTime
                  color={
                    location.pathname === "/posting-time"
                      ? "#9e9ff5"
                      : "#51525d"
                  }
                />
              }
            />
          </li>
          <li>
            <SidebarOption
              path="/trending"
              title="Trending Topic"
              icon={
                <IcTrendingTopic
                  color={
                    location.pathname === "/trending" ? "#9e9ff5" : "#51525d"
                  }
                />
              }
            />
          </li>
          <li>
            <SidebarOption
              path="/estimation"
              title="Ads Estimation"
              icon={
                <IcAdEstimation
                  color={
                    location.pathname === "/estimation" ? "#9e9ff5" : "#51525d"
                  }
                />
              }
            />
          </li>
          <li>
            <SidebarOption
              path="/ranking"
              title="Ranking"
              icon={
                <IcRanking
                  color={
                    location.pathname === "/ranking" ? "#9e9ff5" : "#51525d"
                  }
                />
              }
            />
          </li>
          <li>
            <SidebarOption
              path="/compare"
              title="Compare"
              icon={
                <IcCompare
                  color={
                    location.pathname === "/compare" ? "#9e9ff5" : "#51525d"
                  }
                />
              }
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default React.memo(Sidebar);
