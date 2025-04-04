import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import HomePage from './components/HomePage';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // Handle login and registration success
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleRegisterSuccess = (userData) => {
    setCurrentUser(userData);
  };

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />

        {/* Registration route */}
        <Route path="/register" element={<RegistrationForm onRegisterSuccess={handleRegisterSuccess} />} />

        {/* HomePage route, protected */}
        <Route path="/home" element={currentUser ? <HomePage currentUser={currentUser} /> : <LoginForm onLoginSuccess={handleLoginSuccess} />} />
      </Routes>
    </Router>
  );
};

export default App;
