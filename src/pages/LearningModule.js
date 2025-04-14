import { useState, useEffect } from "react";

export default function LearningModule() {
  const [crop, setCrop] = useState("rice");
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/resources?crop=${crop}`)
      .then(res => res.json())
      .then(data => setResources(data))
      .catch(err => console.error("Error fetching:", err));
  }, [crop]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-4">E-Learning: {crop.toUpperCase()}</h1>

      <select
        onChange={(e) => setCrop(e.target.value)}
        value={crop}
        className="border p-2 rounded mb-6"
      >
        <option value="rice">Rice</option>
        <option value="wheat">Wheat</option>
        <option value="maize">Maize</option>
        {/* Add more crops */}
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((res, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h2 className="font-semibold text-lg">{res.title}</h2>
            <p className="text-gray-700 mt-2">{res.description}</p>
            <span className="text-sm mt-1 inline-block text-green-600">Type: {res.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
