const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies for POST requests

// Set up the MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Srmist#06',
  database: 'accomodation',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Endpoint to fetch data from the 'accommodation_distance' table
app.get('/api/accommodation', (req, res) => { // Removed extra space
  const query = 'SELECT * FROM accommodation_distance';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('An error occurred while fetching accommodations');
    } else {
      res.json(results);
    }
  });
});

// Endpoint to fetch data from the 'bookings2' table
app.get('/api/bookings2', (req, res) => {
  const query = 'SELECT * FROM bookings2';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('An error occurred while fetching bookings');
    } else {
      res.json(results);
    }
  });
});

// Endpoint to fetch data from the 'locations' table
app.get('/api/locations', (req, res) => {
  const query = 'SELECT * FROM locations';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('An error occurred while fetching locations');
    } else {
      res.json(results);
    }
  });
});

// Endpoint to fetch data from the 'login' table
app.get('/api/login', (req, res) => {
  const query = 'SELECT * FROM login';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('An error occurred while fetching login data');
    } else {
      res.json(results);
    }
  });
});

// Endpoint to fetch data from the 'ratings' table
app.get('/api/ratings', (req, res) => {
  const query = 'SELECT * FROM ratings';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('An error occurred while fetching reviews');
    } else {
      res.json(results);
    }
  });
});

// Endpoint to fetch data from the 'signup' table
app.get('/api/signup', (req, res) => {
  const query = 'SELECT * FROM signup';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('An error occurred while fetching signup data');
    } else {
      res.json(results);
    }
  });
});

// Endpoint to fetch data from the 'users' table
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('An error occurred while fetching users');
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
