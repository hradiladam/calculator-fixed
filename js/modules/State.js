// js/modules/State.js
// ——— Encapsulates the calculator shared state ———

export default class State {
    constructor() {
        this.currentInput = '0';
        this.recentHistory = '';
        this.lastButtonWasEquals = false;
        this.operators = ['+', '-', '×', '÷'];
    }

    reset() {
        this.currentInput = '0';
        this.recentHistory = '';
        this.lastButtonWasEquals = false;
    }
}