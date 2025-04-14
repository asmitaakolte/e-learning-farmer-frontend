import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const modules = [
    { title: "E-Learning", description: "Crop-specific resources", path: "/learning" },
    { title: "Waste to Wealth", description: "Farm waste to value", path: "/waste" },
    { title: "Community", description: "Connect with farmers", path: "/community" },
    { title: "Expert Sessions", description: "Live Q&A with experts", path: "/experts" },
    { title: "Events & Training", description: "Join nearby sessions", path: "/events" },
    { title: "Marketplace", description: "Buy, sell, or barter", path: "/marketplace" },
    { title: "Learning Resources", description: "Register & track your farming courses", path: "/learning-resources" },

    
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-1">Welcome, {username} 👋</h1>
      <h2 className="text-xl text-green-900 mb-8 font-semibold">Farmer's Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod, i) => (
          <div
            key={i}
            onClick={() => navigate(mod.path)}
            className="w-40 h-40 bg-white border border-green-200 rounded-xl shadow-md hover:shadow-lg hover:bg-green-50 cursor-pointer flex flex-col items-center justify-center text-center transition"
          >
            <h3 className="text-lg font-semibold text-green-800">{mod.title}</h3>
            <p className="text-sm text-gray-600 mt-2 px-2">{mod.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
