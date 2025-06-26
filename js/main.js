// main.js
// ——— Main script that wires everything together ———

import themeSwitch from './modules/theme.js'; // import theme toggle module
import { updateDisplay } from './modules/display.js'; // import display control
import { handleButtons } from './modules/inputs.js'; // import input handler — make sure filename matches!

document.addEventListener('DOMContentLoaded', () => {
    const recentHistoryDisplay = document.getElementById('recent-history'); // get recent-history element
    const resultDisplay = document.getElementById('result'); // get result element

    themeSwitch.init(); // initialize dark mode switch
    updateDisplay(recentHistoryDisplay, resultDisplay); // initiates the display

    // add event listeners to buttons and connect buttons data-value with JS
    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => {
            try {
                handleButtons(button.dataset.value);  // grabs custom value in data- of HTML button elements and passes it as an argument
                updateDisplay(recentHistoryDisplay, resultDisplay); // resets the display
            } catch (err) {
                console.error("Button handling error:", err); // logs error if button logic fails
            }
        });       
    });
});
