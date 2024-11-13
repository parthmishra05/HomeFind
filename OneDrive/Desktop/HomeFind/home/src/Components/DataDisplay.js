import React, { useState, useEffect } from 'react';
import axios from 'axios'; // or use fetch()

const DataDisplay = () => {
  const [data, setData] = useState([]); // To store the fetched data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetch data from the API when the component mounts
  useEffect(() => {
    // Using Axios to fetch data
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        setData(response.data); // Store the data in the state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        setError(error.message); // Handle error
        setLoading(false); // Set loading to false in case of error
      });
  }, []); // Empty dependency array means it runs once when the component mounts

  // Return the UI for displaying data
  return (
    <div>
      {loading && <p>Loading...</p>} {/* Display loading message */}
      {error && <p>Error: {error}</p>} {/* Display error message */}
      {!loading && !error && (
        <div>
          <h1>Location Data</h1>
          <ul>
            {data.map((location, index) => (
              <li key={index}>
                {/* Assuming your locations have a `name` and `address` field */}
                <p>Name: {location.name}</p>
                <p>Address: {location.address}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DataDisplay;
