// ts/modules/HistoryPanel.ts
// ——— Manages the slide-out history panel UI ———
export default class HistoryPanel {
    panelEl;
    toggleBtn;
    constructor(toggleBtn, panelEl) {
        this.toggleBtn = toggleBtn;
        this.panelEl = panelEl;
        // Wire up the toggle button
        this.toggleBtn.addEventListener('click', this.toggle);
    }
    // —— Toggle the panel’s visible class ——
    toggle = () => {
        this.panelEl.classList.toggle('visible');
    };
    // —— Append one “expression = result” line ——
    append = (expression, result) => {
        // Create container for this entry
        const wrapper = document.createElement('div');
        wrapper.classList.add('history-entry');
        // Create and populate the expression part (“expr =”)
        const ex = document.createElement('div');
        ex.classList.add('history-expression');
        ex.textContent = `${expression} =`;
        // Create and populate the result part
        const re = document.createElement('div');
        re.classList.add('history-result');
        re.textContent = result;
        // Nest the expression and result inside the wrapper
        wrapper.appendChild(ex);
        wrapper.appendChild(re);
        // Add this new entry to the panel’s DOM
        this.panelEl.appendChild(wrapper);
        // Scroll the panel to the bottom so the newest entry is in view
        this.panelEl.scrollTop = this.panelEl.scrollHeight;
    };
    /*
        Clears all entries from the history panel.
        - This method is currently unused.
        - Not sure if I want "AC" to overall clear history panel, not just the current input and recent history
    */
    clear = () => {
        this.panelEl.innerHTML = '';
    };
}
