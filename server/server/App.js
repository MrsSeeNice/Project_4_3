const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Initialize dotenv for environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)

// Database connection (using MongoDB for this example)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Example route
app.get('/', (req, res) => {
  res.send("Welcome to the Server");
});

// Routes for authentication (you'll define these)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Serve static files if React is built and running in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Set server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
