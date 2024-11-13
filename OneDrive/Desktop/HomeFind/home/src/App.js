import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import AccommodationList from './Components/AccomodationList';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import ReviewsPage from './Components/Reviews';
import AccommodationCards from './Components/AccomodationCards';
import Payment from './Components/Payment';
import Success from './Components/Success';
import Cancel from './Components/Cancel';

function Home() {
  const [users, setUsers] = useState([]);
  const [searchUserQuery, setSearchUserQuery] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/data?search=${searchUserQuery}`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, [searchUserQuery]);

  // Function to handle the Explore Now button click
  const handleExploreNowClick = () => {
    navigate('/accommodation'); // Redirect to the accommodation page
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex-1 flex flex-col justify-center items-start p-8 bg-navColor text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to RentPal</h1>
        <p className="text-lg mb-6">
          Discover and find the perfect accommodation for your needs with RentPal.
        </p>
        <input
          type="text"
          placeholder="Search accommodations"
          value={searchUserQuery}
          onChange={(e) => setSearchUserQuery(e.target.value)}
          className="px-4 py-2 rounded mb-4"
        />
        <button
          onClick={handleExploreNowClick} // Attach the click handler
          className="bg-blue-500 text-white px-7 py-2 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Explore Now
        </button>
      </div>

      <div className="flex-none flex items-center justify-start h-full bg-navColor">
        <img 
          src='Accomodation.jpeg' 
          alt="Accommodation" 
          className="h-full w-auto object-cover border:none" 
        />
      </div>
    </div>
  );
}

function Accommodation() {
  const [accommodations, setAccommodations] = useState([]);
  const [searchAccommodationQuery, setSearchAccommodationQuery] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch(`http://localhost:5001/locations?search=${searchAccommodationQuery}`);
        const data = await response.json();
        setAccommodations(data);
      } catch (error) {
        console.error('Error fetching accommodation data:', error);
      }
    };

    fetchAccommodations();
  }, [searchAccommodationQuery]);

  // Function to handle the "Proceed to Payment" button click
  const handlePaymentClick = () => {
    navigate('/payment'); // Redirect to the payment page
  };

  return (
    <div className="flex flex-col items-center p-8 bg-navColor">
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Accommodation</h1>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Available Accommodations</h2>
        
        <AccommodationCards accommodations={accommodations} />

        {/* Payment Button */}
        <button
          onClick={handlePaymentClick} // Attach the click handler
          className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/payment" element={<Payment />} /> {/* Payment Route */}
          <Route path="/success" element={<Success />} /> {/* Success Route */}
          <Route path="/cancel" element={<Cancel />} /> {/* Cancel Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
