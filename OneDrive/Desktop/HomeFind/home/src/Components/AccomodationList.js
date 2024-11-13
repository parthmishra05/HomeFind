import React, { useState, useEffect } from 'react';

// Helper function to calculate distance between two points (in km)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
  const dLon = (lon2 - lon1) * (Math.PI / 180); // Convert degrees to radians
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const AccommodationList = ({ accommodations }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [maxDistance, setMaxDistance] = useState(10); // Default max distance: 10 km

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => setError('Failed to get current location'),
        { enableHighAccuracy: true }
      );

      // Clear watch on component unmount
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (currentLocation && accommodations.length > 0) {
      // Filter accommodations based on distance
      const filtered = accommodations.filter((accommodation) => {
        const distance = calculateDistance(
          currentLocation.lat,
          currentLocation.lon,
          accommodation.lat,
          accommodation.lon
        );
        return distance <= maxDistance;
      });
      setFilteredAccommodations(filtered);
    }
  }, [currentLocation, accommodations, maxDistance]);

  const handleBooking = async (id) => {
    console.log(`Booking accommodation with ID: ${id}`);
  };

  const handleDistanceChange = (e) => {
    setMaxDistance(e.target.value); // Update the max distance based on user input
  };

  return (
    <div>
      {loading ? (
        <p>Loading accommodations...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h3>Set the maximum distance (in km)</h3>
          <input
            type="number"
            value={maxDistance}
            onChange={handleDistanceChange}
            min="1"
            max="100"
            step="1"
          />
          <p>Showing accommodations within {maxDistance} km</p>
          
          <ul>
            {filteredAccommodations.length > 0 ? (
              filteredAccommodations.map((accommodation) => {
                const distance = calculateDistance(
                  currentLocation.lat,
                  currentLocation.lon,
                  accommodation.lat,
                  accommodation.lon
                );

                return (
                  <li key={accommodation.id}>
                    <h3>{accommodation.name}</h3>
                    <p>Address: {accommodation.address}</p>
                    <p>Distance: {distance.toFixed(2)} km</p>
                    <p>Reviews: {accommodation.reviews.join(', ')}</p>
                    <button onClick={() => handleBooking(accommodation.id)}>Book Now</button>
                  </li>
                );
              })
            ) : (
              <p>No accommodations found within this distance.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccommodationList;
