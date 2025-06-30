// js/modules/state.js
// ——— Shared State ———

const state = {
  currentInput: '',                 //  what user types
  recentHistory: '',                // stores the previous operation
  lastButtonWasEquals: false,       // flag to track if last button pressed was '='
  operators: ['+', '-', '×', '÷']   // list of operators
};

export default state;