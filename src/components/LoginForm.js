import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to redirect
import { Link } from 'react-router-dom'; // Link component for navigation

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate for programmatic navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Invalid username or password');

      const data = await response.json();
      onLoginSuccess(data); // Pass the logged-in user to the parent

      // Redirect to the HomePage after successful login
      navigate('/home');  // This will redirect the user to the /home page

      // Clear form fields after successful login
      setUsername('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>

      {/* Link to Registration Page */}
      <div style={styles.registerLink}>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '400px', margin: 'auto', padding: '20px' },
  form: { display: 'flex', flexDirection: 'column' },
  input: { marginBottom: '10px', padding: '10px', fontSize: '16px' },
  button: { padding: '10px', backgroundColor: '#28a745', color: 'white', fontSize: '16px' },
  error: { color: 'red' },
  registerLink: { marginTop: '10px', textAlign: 'center' },
};

export default LoginForm;
