const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const depenseRoutes = require('./routes/depenseRoutes'); // Ensure you have this file with proper routes

dotenv.config();

const app = express();


app.use(cors());

// Use body-parser middleware
app.use(bodyParser.json());

// Routes for auth and depenses
app.use('/api/auth', authRoutes);
app.use('/api/depenses', depenseRoutes);  

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Expenses API!');
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
