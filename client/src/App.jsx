import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Estimation from "./views/AdEstimation";
import TrendingTopics from "./views/TrendingTopics";
import Ranking from "./views/Ranking";
import Sentiment from "./views/SentimentAnalysis";
import SentimentDetail from "./views/SentimentDetail";

function App() {
  const [active, setActive] = useState("sentimentDetail");

  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
        {active === "estimation" && <Estimation />}
        {active === "trending" && <TrendingTopics />}
        {active === "ranking" && <Ranking />}
        {active === "sentiment" && <Sentiment />}
        {active === "sentimentDetail" && <SentimentDetail />}
      </div>
    </>
  );
}

export default App;
