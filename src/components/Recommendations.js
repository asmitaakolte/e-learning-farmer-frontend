import React, { useState, useEffect } from 'react';

const Recommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}/recommendations`);
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        const data = await response.json();
        setRecommendations(data); // Set the recommendations for the user
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  // Open link in new tab on button click
  const handleLinkClick = (link) => {
    window.open(link, "_blank"); // Opens the link in a new tab
  };

  return (
    <div style={styles.container}>
      <h3>Recommended Videos and Articles</h3>
      {loading ? (
        <p>Loading recommendations...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {recommendations.length > 0 ? (
            recommendations.map((item) => (
              <div key={item.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
                <h4>{item.type === 'YouTube' ? 'Watch Video' : 'Read Article'}</h4>
                <p>{item.description}</p>
                <button
                  style={{
                    backgroundColor: '#FF0000',
                    color: 'white',
                    cursor: 'pointer',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                  }}
                  onClick={() => handleLinkClick(item.link)} // Use window.open for redirection
                >
                  {item.type === 'YouTube' ? 'Watch Video' : 'Read Article'}
                </button>
              </div>
            ))
          ) : (
            <p>No recommendations available for your crops.</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px' },
};

export default Recommendations;
