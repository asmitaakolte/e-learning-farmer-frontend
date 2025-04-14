// src/pages/LearningModule.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ELearningModule = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Replace with your real backend
    axios.get('http://localhost:8080/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-green-800">📚 Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-4 rounded-xl shadow border">
            <h2 className="text-xl font-semibold text-green-700">{course.title}</h2>
            <p className="text-gray-600 my-2">{course.description}</p>
            <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ELearningModule;
