import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate to different pages

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
    } else {
      setError('');
      // Handle login logic (e.g., call an API or Firebase auth)
      alert(`Logged in with email: ${email}`);
      // Redirect to the home page after successful login
      navigate('/');
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-fixed bg-cover bg-center bg-no-repeat bg-navColor"
      style={{
        backgroundImage: `url('/path/to/your/image.jpg')`, // Replace with your image path
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for contrast
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md bg-opacity-80 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Create an account here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
