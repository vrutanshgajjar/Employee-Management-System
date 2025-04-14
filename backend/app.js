const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
require('dotenv').config();

const app = express();

// Define CORS options
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Use employee routes
app.use('/api/employees', employeeRoutes); // Ensure this line is correct

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1/prodigytask2';
mongoose.connect(mongoURI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
