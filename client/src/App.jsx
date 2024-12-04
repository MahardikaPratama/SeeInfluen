import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Estimation from "./views/AdEstimation";
import TrendingTopics from "./views/TrendingTopics";
import Ranking from "./views/Ranking";
import Sentiment from "./views/SentimentAnalysis";
import SentimentDetail from "./views/SentimentDetail";
import Dashboard from "./views/Dashboard";

function App() {
  const [active, setActive] = useState("dashboard");

  return (
    <>
      <div className="flex flex-row">
        <Sidebar setActive={setActive} />
        {active === "dashboard" && <Dashboard />}
        {active === "estimation" && <Estimation />}
        {active === "trending" && <TrendingTopics />}
        {active === "ranking" && <Ranking />}
        {active === "sentiment" && <Sentiment setActive={setActive} />}
        {active === "sentimentDetail" && <SentimentDetail />}
      </div>
    </>
  );
}

export default App;
