// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LearningModule from "./pages/LearningModule";
import WasteModule from "./pages/WasteModule";
import EventsModule from "./pages/EventsModule";
import MarketplaceModule from "./pages/MarketplaceModule";
import ExpertQAModule from "./pages/ExpertQAModule";
import Login from './pages/Login';
import Community from "./pages/Community";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learning" element={<LearningModule />} />
        <Route path="/waste" element={<WasteModule />} />
        <Route path="/events" element={<EventsModule />} />
        <Route path="/marketplace" element={<MarketplaceModule />} />
        <Route path="/experts" element={<ExpertQAModule />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}

<div className="bg-yellow-100 text-black p-4 rounded-xl">
  ✅ Tailwind is working!
</div>
export default App;
