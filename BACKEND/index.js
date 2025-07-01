// BACKEND/index.js

// Import required libraries
import express from 'express';          // Web framework to build the HTTP API
import cors from 'cors';                // Middleware to handle Cross-Origin Resource Sharing
import { create, all } from 'mathjs';   // Math.js factory function

import {
    hasUnmatchedParentheses,
    endsWithOperator,
    hasInvalidPercentUsage,
    hasDivisionByZero
} from './utils/validate.js';  // ← import helpers


// Create an Express app instance
const app = express();


// —— MIDDLEWARE SETUP ——

// Allow only the GitHub Pages frontend to access this API.
// Adds appropriate CORS headers to all responses.
// Without this, the browser would block the frontend from making requests.
app.use(cors({ origin: 'https://hradiladam.github.io' }));

// Enable Express to parse incoming JSON bodies.
// Required to access `req.body` in POST requests.
app.use(express.json());


// —— CALCULATOR ENDPOINT ——

// POST/evaluate
// Accepts an expression string from the frontend and returns a high-precision result.

app.post('/evaluate', (req, res) => {
    // Create a new math.js instance with BigNumber support
    const math = create(all);
    math.config({ number: 'BigNumber', precision: 64 }); // high accuracy

    const { expression } = req.body;
    
    try {
        // Preprocess the expression for safe and valid mathjs parsing
        // let expr = expression
        let expr = expression
            .replace(/×/g, '*')                     // visual × → *
            .replace(/÷/g, '/')                     // visual ÷ → /
            .replace(/(\d+%)\s*(\d+%)/g, '$1*$2')   // chained percentages
            .replace(/(\d+%)\s*(\d+)/g, '$1*$2')    // percent then number
            .replace(/(\d+%)\s*\(/g, '$1*(')        // percent then '('
            .replace(/(\d|\))\s*\(/g, '$1*(')       // number or ')' then '('
            .replace(/\)\s*(\d)/g, ')*$1');         // ')' then number

        // Validation for errors before evaluation
            if (hasDivisionByZero(expr)) {
                return res.status(400).json({ error: "Can't divide by 0" });
            }

            if (endsWithOperator(expr)) {
                return res.status(400).json({ error: 'Incomplete expression' });
            }

            if (hasUnmatchedParentheses(expr)) {
                return res.status(400).json({ error: 'Unmatched parentheses' });
            }

            if (hasInvalidPercentUsage(expr)) {
                return res.status(400).json({ error: 'Misplaced percent sign' });
            }

        // EVALUATION
        const rawResult = math.evaluate(expr);

        // Final check for invalid result
        const nativeResult = Number(rawResult);
        if (!isFinite(nativeResult)) {
            return res.status(400).json({ error: 'Infinity' });
        }
        if (isNaN(nativeResult)) {
            return res.status(400).json({ error: 'Undefined result' });
        }

        // Format the result with auto notation for display
        const formattedResult = math.format(rawResult, {
            notation: 'auto',
            precision: 12,
            lowerExp: -12,
            upperExp: 12
        });

        // Send result and history string back to frontend
        res.json({ 
            result: formattedResult, 
            history: `${expression} =` 
        });
        
    } catch (error) {
        console.error('Evaluate Failed:', error);
        res.status(400).json({ error: 'Unexpected evaluation error' });
    }
});


// —— START SERVER ——

// Listen on the environment-defined port (Render sets this) or 3000 locally.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Calculator API listening on port ${PORT}`);
});
