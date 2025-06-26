// js/modules/keyboard.js
// ——— Keyboard support ———

import { handleButtons } from './inputs.js';
import { updateDisplay } from './display.js';

// map physical keys to our button values
const keyMap = {
    '0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9',
    '.':'.','%':'%','+':'+','-':'-','*':'×','/':'÷',
    '(': '( )', ')':'( )',
    'Enter':'=','=':'=',
    'Backspace':'⌫','Escape':'AC'
};

// listen for keydown and send it to handleButtons
export const keyboard = (recentHistoryDisplay, resultDisplay) => {
    document.addEventListener('keydown', (e) => {
        const mapped = keyMap[e.key];
        if (!mapped) return;
        e.preventDefault();

        // give the matching button style with class "press-active" when pressed
        const btn = document.querySelector(`button[data-value="${mapped}"]`);
        if (btn) btn.classList.add('press-active');
        
        try {
            handleButtons(mapped);
            updateDisplay(recentHistoryDisplay, resultDisplay);
        } catch (error) {
            console.error("Keyboard handling error:", error);
        }
    });

    document.addEventListener('keyup', (e) => {
        const mapped = keyMap[e.key];
        if (!mapped) return;
        const btn = document.querySelector(`button[data-value="${mapped}"]`);
        if (btn) btn.classList.remove('press-active');
    });
};