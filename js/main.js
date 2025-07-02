// main.js
// ——— Main script that wires everything together ———

import State from './modules/State.js';                               // Encapsulates calculator state
import DisplayControl from './modules/DisplayControl.js';               // Controls UI updates
import Evaluator from './modules/Evaluator.js';                         // Handles backend calls and formatting
import InputHandler from './modules/InputHandler.js';                   // Processes button inputs
import ThemeSwitch from './modules/ThemeSwitch.js';                    // Toggles dark/light themes
import KeyboardHandler from './modules/KeyboardHandler.js';             // Maps phusical keys to calculator


// Wait until the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const historyElement = document.getElementById('recent-history');   // Get recent-history element
    const resultElement = document.getElementById('result');            // Get recent-history element
    const themeButton = document.getElementById('theme-switch');        // Get dark theme switch button

     // Instantiate main modules
    const state = new State();                                                          // Holds current input & history
    const displayControl = new DisplayControl(historyElement, resultElement, state);    // Updates the UI
    const evaluator = new Evaluator(state, displayControl);                             // Runs & formats calculations
    const inputHandler = new InputHandler(state, evaluator, displayControl);            // Handles button inputs 

    displayControl.update();   // Sets initial display to “0” / “No history” 

    // Wire up button clicks
    document.querySelectorAll('button[data-value]').forEach((button) => {
        button.addEventListener('click', () => {
            inputHandler.handleButtons(button.dataset.value);     // Pass the button’s data-value into InputHandler to process the action and update state/display  
            button.blur();                                        // Remove focus to reset style
        });
        
    });

    // Initialize dark/light theme switch behavior
        new ThemeSwitch(themeButton).init();

        // Initialize keyboard support (maps physical keys to calculator buttons)
        new KeyboardHandler(inputHandler).init();
});