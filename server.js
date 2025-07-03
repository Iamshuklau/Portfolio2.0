const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images)
app.use(express.static('.'));

// API route for contact form
app.post('/api/send-email', async (req, res) => {
  try {
    // Import the email handler
    const sendEmail = require('./api/send-email.js');
    
    // Call the email handler with request and response
    await sendEmail(req, res);
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle all other routes by serving index.html (for SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio server is running!`);
  console.log(`📱 Local: http://localhost:${PORT}`);
  console.log(`💌 Contact form is ready to receive messages!`);
  console.log(`\n🔧 Make sure you have RESEND_API_KEY in your .env file`);
});
