const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session'); // Added for session management
const User = require('./models/User'); // Ensure User model has password hashing and verification

// Initialize dotenv for environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Set up session middleware for session handling
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret', // Replace with a secure secret
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set `true` if using HTTPS
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Route to fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from the database
    res.json(users);  // Return the list of users
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
});

// Route to create a new user
app.post('/api/users', async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password }); // Create a new user
    await newUser.save(); // Save the user to the database
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error registering user' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && await user.verifyPassword(password)) {
      req.session.userId = user._id; // Store user ID in session
      res.json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error: ' + error.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Interview Preparation Platform API');
});

// Set the port and listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
