import React, { useState } from 'react';

const AccommodationSearch = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/accommodations/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude, radius }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch accommodations');
      }

      const data = await response.json();
      console.log('Accommodations found:', data);
      // Handle the fetched data as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Find Accommodations</h2>
      <input
        type="text"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <input
        type="text"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <input
        type="text"
        placeholder="Radius (km)"
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default AccommodationSearch;
