import { useState, useEffect } from "react";

export default function WasteModule() {
  const [category, setCategory] = useState("");
  const [solutions, setSolutions] = useState([]);

  const fetchSolutions = () => {
    const url = category
      ? `http://localhost:8080/api/waste/category?category=${category}`
      : `http://localhost:8080/api/waste`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setSolutions(data))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchSolutions();
  }, [category]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Waste-to-Wealth Solutions</h1>

      <select
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className="border p-2 rounded mb-6"
      >
        <option value="">All Categories</option>
        <option value="Composting">Composting</option>
        <option value="Biogas">Biogas</option>
        <option value="Fertilizer">Organic Fertilizer</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {solutions.map((item, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h2 className="font-semibold text-lg text-green-700">{item.title}</h2>
            <p className="text-gray-700 mt-2">{item.description}</p>
            <span className="text-sm mt-1 inline-block text-green-600">Category: {item.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
