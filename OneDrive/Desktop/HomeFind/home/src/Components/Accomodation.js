import React, { useEffect, useState } from 'react';
import AccommodationList from './AccommodationList';  // Corrected the import name

function Accommodation() {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/accommodations');
        const data = await response.json();
        console.log('Fetched accommodations:', data); // Debug log
        setAccommodations(data);  // Store accommodations data in the state
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      }
    };

    fetchAccommodations();
  }, []);

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Accommodation</h1>
      {/* Pass accommodations to AccommodationList as prop */}
      <AccommodationList accommodations={accommodations} /> 
    </div>
  );
}

export default Accommodation;
