import { useEffect, useState } from "react";

export default function EventsModule() {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState("");

  const fetchEvents = () => {
    const url = location
      ? `http://localhost:8080/api/events/location?location=${location}`
      : "http://localhost:8080/api/events";

    fetch(url)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEvents();
  }, [location]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Events & Training</h1>

      <input
        type="text"
        placeholder="Filter by location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 rounded mb-4 w-full max-w-md"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((e, i) => (
          <div key={i} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-green-800">{e.title}</h2>
            <p className="text-gray-600 mt-2">{e.description}</p>
            <p className="text-sm text-green-700 mt-2">📍 {e.location}</p>
            <p className="text-sm text-blue-600">📅 {e.date}</p>
            <p className="text-sm text-gray-700 italic">{e.type}</p>
            {/* Optional future: Add Register button */}
          </div>
        ))}
      </div>
    </div>
  );
}
