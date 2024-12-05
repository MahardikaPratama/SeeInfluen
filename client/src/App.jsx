import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Estimation from "./views/AdEstimation";
import TrendingTopics from "./views/TrendingTopics";
import Ranking from "./views/Ranking";
import Sentiment from "./views/SentimentAnalysis";
import SentimentDetail from "./views/SentimentDetail";
import Dashboard from "./views/Dashboard";

function App() {
  return (
    <Router>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/estimation" element={<Estimation />} />
            <Route path="/trending" element={<TrendingTopics />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/sentiment" element={<Sentiment />} />
            <Route path="/sentiment-detail" element={<SentimentDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
