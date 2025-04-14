import { useEffect, useState } from "react";

export default function ExpertQAModule() {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({ farmerName: "", crop: "", question: "" });

  useEffect(() => {
    fetch("http://localhost:8080/api/qa/answered")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/qa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Question submitted!");
        setForm({ farmerName: "", crop: "", question: "" });
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Expert Q&A</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-xl">
        <input
          type="text"
          placeholder="Your name"
          value={form.farmerName}
          onChange={(e) => setForm({ ...form, farmerName: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          placeholder="Crop (e.g., Rice)"
          value={form.crop}
          onChange={(e) => setForm({ ...form, crop: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          placeholder="Your question"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit Question
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Answered Questions</h2>
      <div className="grid gap-4">
        {questions.map((q) => (
          <div key={q.id} className="border p-4 rounded shadow">
            <p><strong>Q ({q.crop}):</strong> {q.question}</p>
            <p className="text-green-700 mt-2"><strong>A:</strong> {q.answer}</p>
            <p className="text-sm text-gray-500 mt-1">– {q.farmerName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
