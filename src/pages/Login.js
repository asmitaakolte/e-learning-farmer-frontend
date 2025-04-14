import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // 🔁 Step 1: useNavigate hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', form, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Step 2: Save user or token if needed
      localStorage.setItem("username", response.data.username); // ✅ store username directly
      localStorage.setItem("user", JSON.stringify(response.data)); // optional full user
      
      console.log('Login success:', response.data)

      // Step 3: Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl mb-4 font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={form.username}
          className="p-2 border"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          className="p-2 border"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
};

export default Login;
