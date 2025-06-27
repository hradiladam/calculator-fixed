// main.js
// ——— Main script that wires everything together ———

import themeSwitch from './modules/theme.js'; // import theme toggle module
import { keyboard } from './modules/keyboard.js'; 
import { updateDisplay } from './modules/display.js'; // import display control
import { handleButtons } from './modules/inputs.js'; // import input handler — make sure filename matches!

document.addEventListener('DOMContentLoaded', () => {
    const recentHistoryDisplay = document.getElementById('recent-history'); // get recent-history element
    const resultDisplay = document.getElementById('result'); // get result element

    themeSwitch.init(); // initialize dark mode switch
    updateDisplay(recentHistoryDisplay, resultDisplay); // initiates the display
    keyboard(recentHistoryDisplay, resultDisplay); // keyboard shortcuts

    // add event listeners to buttons and connect buttons data-value with JS
    document.querySelectorAll('button[data-value]').forEach((button) => {
        button.addEventListener('click', async () => {
            try {
                await handleButtons(button.dataset.value);  // grabs custom value in data- of HTML button elements and passes it as an argument
                updateDisplay(recentHistoryDisplay, resultDisplay); // resets the display
                button.blur(); // remove keyboard focus from that button immediately after it’s been clicked
            } catch (err) {
                console.error("Button handling error:", err); // logs error if button logic fails
            }
        });       
    });
});

