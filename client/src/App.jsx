import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import "./main";
import "./index.css";
import "./input.css";
import Sidebar from "./components/Sidebar";
import Estimation from "./views/AdEstimation";
import TrendingTopics from "./views/TrendingTopics";
import Ranking from "./views/Ranking";
import Sentiment from "./views/SentimentAnalysis";
import SentimentDetail from "./views/SentimentDetail";
import Dashboard from "./views/Dashboard";
import Compare from "./views/Compare";
import PostingTime from "./views/PostingTime";
import LandingPage from "./views/LandingPage";
import Pricing from "./views/Pricing";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    // <LandingPage />
    <Pricing />
    // <QueryClientProvider client={queryClient}>
    //   <Router>
    //     <div className="flex flex-row">
    //       <Sidebar />
    //       <div className="flex-grow">
    //         <Routes>
    //           <Route path="/" element={<Dashboard />} />
    //           <Route path="/estimation" element={<Estimation />} />
    //           <Route path="/trending" element={<TrendingTopics />} />
    //           <Route path="/ranking" element={<Ranking />} />
    //           <Route path="/sentiment" element={<Sentiment />} />
    //           <Route path="/sentiment-detail" element={<SentimentDetail />} />
    //           <Route path="/compare" element={<Compare />} />
    //           <Route path="/posting-time" element={<PostingTime />} />
    //         </Routes>
    //       </div>
    //     </div>
    //   </Router>
    // </QueryClientProvider>
  );
}

export default App;
