// js/modules/state.js
// ——— Shared State ———

const state = {
  currentInput: '',                   // What user types
  recentHistory: '',                  // Stores the previous operation
  lastButtonWasEquals: false,         // Flag to track if last button pressed was '='
  operators: ['+', '-', '×', '÷'],    // List of operators
};

export default state;