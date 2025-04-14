import { useEffect, useState } from "react";

export default function MarketplaceModule() {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  const fetchProducts = () => {
    let url = "http://localhost:8080/api/products";

    if (type) {
      url = `http://localhost:8080/api/products/type?type=${type}`;
    } else if (location) {
      url = `http://localhost:8080/api/products/location?location=${location}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, [type, location]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Farmer Marketplace</h1>

      <div className="flex gap-4 mb-6">
        <select onChange={(e) => setType(e.target.value)} className="border p-2 rounded">
          <option value="">All Types</option>
          <option value="Crop">Crop</option>
          <option value="Tool">Tool</option>
          <option value="Livestock">Livestock</option>
        </select>

        <input
          type="text"
          placeholder="Search by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((item, i) => (
          <div key={i} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-green-700">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-sm text-gray-500 mt-1">Type: {item.type}</p>
            <p className="text-sm text-blue-600">📍 {item.location}</p>
            <p className="text-lg font-bold text-green-800 mt-1">₹ {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
