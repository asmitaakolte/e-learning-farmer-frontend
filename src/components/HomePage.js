import React from 'react';
import Recommendations from './Recommendations';

const HomePage = ({ currentUser }) => {
  // Log userId to the console to ensure it's correct
  console.log('User ID:', currentUser.id);  // Logs userId to the console

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {currentUser.username}!</h2>

      {/* Display the userId to confirm it */}
      <p>User ID: {currentUser.id}</p> {/* Display userId directly on the page */}

      {/* Display Recommendations */}
      <Recommendations userId={currentUser.id} />
    </div>
  );
};

export default HomePage;
