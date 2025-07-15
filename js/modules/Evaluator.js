// js/modules/Evaluator.js
// ——— Wraps the fetch logic and error handling plus formatting for history display ———


export default class Evaluator {
    constructor(state, display) {
        this.state = state;
        this.display = display;
    }

    evaluate = async () => {
        // Remove any previous error messages
        const resultElement = this.display.resultElement;
        resultElement.classList.remove('error-text');

        // Attempt the network request
        try {
            // chooses the correct backend URL depending on whether you’re running locally (for development) or in production.
            const API_URL = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
                ?  'http://localhost:3000/evaluate'
                :  'https://calculator-yzjs.onrender.com/evaluate';

            // Sends a POST request with a JSON body containing the user’s current expression (state.currentInput)
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ expression: this.state.currentInput })
            });
            
            // Parses the JSON response body into a JavaScript object
            const data = await response.json();

            // Always record what the user attempted
            this.state.recentHistory = `${this._formattedHistory(this.state.currentInput)} =`;

            // Checks for HTTP errors
            if (!response.ok) {
                // On failure, keep recentHistory but show the error
                this.state.currentInput = data.error;               // Displays the server’s error message (e.g. “Divide by zero”) in calcualtor display.
                resultElement.classList.add('error-text');          // Adds a CSS class that can shrink and recolor the text to indicate an error.
                // On success, overwrite currentInput with the result
            } else {
                this.state.currentInput = data.result;
                this.state.lastButtonWasEquals = true;
            }
        
        // Runs if the fetch itself throws (e.g. network problem}
        } catch {
            this.state.currentInput = 'Network Error';
            resultElement.classList.add('error-text');
        }    
    }

    _formattedHistory = (expression) => {
            return expression
                .replace(/(\d+%)\s*(\d+%)/g, '$1 × $2')   // percent followed by percent, e.g., "20%30%" → "20% × 30%"
                .replace(/(\d+%)\s*(\d+)/g, '$1 × $2')    // percent followed by number, e.g., "20%3" → "20% × 3"
                .replace(/(\d+%)\s*\(/g, '$1 × (')        // percent followed by '(', e.g., "20%(" → "20% × ("
                .replace(/([0-9%])\s*\(/g, '$1 × (')      // number or percent before '(', e.g., "9(" → "9 × (", "20%(" → "20% × ("
                .replace(/\)\s*\(/g, ') × (')             // closing ')' before '(', e.g., ")(" → ") × ("
                .replace(/\)\s*([0-9%])/g, ') × $1');     // closing ')' before number/percent, e.g., ")9" → ") × 9", ")%" → ") × %"
        }
};