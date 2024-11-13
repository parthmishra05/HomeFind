import React, { useState, useEffect } from 'react';
import axios from 'axios';


function AccommodationCards() {
  const [accommodations, setAccommodations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5000/api/accommodation');
        setAccommodations(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <p className="text-center text-xl">Loading accommodations...</p>
      ) : error ? (
        <p className="text-center text-xl text-red-500">Error fetching accommodations: {error.message}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-[900px]">
          {accommodations.map((accommodation) => (
            <div key={accommodation.id} className="card shadow rounded overflow-hidden">
              <img src='Accomodation.avif' alt={accommodation.name} className="w-full h-[200px] object-cover border-rounded" />  {/* Updated image styles */}
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{accommodation.name}</h2>
                <p className="font-bold text-sm">{accommodation.address}</p>
                <p className="font-bold text-sm">Price: ₹{accommodation.price}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AccommodationCards;