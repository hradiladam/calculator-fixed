// BACKEND/server.js

// —— IMPORT DEPENDENCIES ——

import express from 'express';              // Express powers our HTTP API
import cors from 'cors';                    // CORS lets browsers from different origins talk to us
import Calculator from './services/Calculator.js';   // Our calculator service that handles the actual math logic

// Create the Express app
const app = express();

// Create a new calculator instance
const calculator = new Calculator();

// —— MIDDLEWARE SETUP ——

// Allow only specific frontend URLs to access the API
app.use(cors({
  origin: [
    'https://hradiladam.github.io',
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:8000'
  ]
}));

// Automatically parse incoming JSON requests
app.use(express.json());

// —— ROUTES ——

// Handle POST requests to /evaluate
app.post('/evaluate', async (request, response) => {
  try {
    // Evaluate the expression using our calculator logic
    const { expression } = request.body;
    const result = await calculator.evaluate(expression);

    response.json({ result }); // Send back the result

  } catch (err) {
    // Send error details (e.g., invalid input, divide by zero, etc.)
    response.status(400).json({ error: err.message });
  }
});

// —— START SERVER ——

// Use environment port if available (for Render), fallback to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Calculator API listening on port ${PORT}`);
});
