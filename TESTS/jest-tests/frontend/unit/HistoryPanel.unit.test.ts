// TESTS/jest-tests/frontend/unit/HistoryPanel.unit.test.ts
// —— Unit tests for HistoryPanel.ts ——

import HistoryPanel from '../../../../ts/modules/HistoryPanel';

describe('Unit test for History Panel', () => {
    let toggleButton: HTMLElement;
    let panelElement: HTMLElement;
    let panel: HistoryPanel;

    beforeEach(() => {
        document.body.innerHTML = `
            <button id="history-toggle"></button>
            <div id="history-panel"></div>
        `;

        toggleButton = document.getElementById('history-toggle')!;
        panelElement = document.getElementById('history-panel')!;
        panel = new HistoryPanel(toggleButton, panelElement);
    });

    test('history-toggle adds and removes "visible" class', () => {
        // Initially not visible
        expect(panelElement.classList.contains('visible')).toBe(false);

        // Click once
        toggleButton.click();
        expect(panelElement.classList.contains('visible')).toBe(true);

        // Click again
        toggleButton.click();
        expect(panelElement.classList.contains('visible')).toBe(false);
    });

    test('shows default message when panel is opened without any history', () => {
        // Ensure the panel is not visible initially
        expect(panelElement.classList.contains('visible')).toBe(false);

        // Click to open the panel
        toggleButton.click()
        expect(panelElement.classList.contains('visible')).toBe(true);

        // Check the placeholder
        const placeholder = panelElement.querySelector('.history-empty');
        expect(placeholder).not.toBeNull();
        expect(placeholder?.textContent).toBe('No history to show.');
    });    

    test('append() adds a new history entry', () => {
        panel.append('1 + 1', '2');
        const entry = panelElement.querySelector('.history-entry');
        expect(entry).not.toBeNull();

        const expr = entry?.querySelector('.history-expression')!;
        const res = entry?.querySelector('.history-result')!;

        expect(expr.textContent).toBe('1 + 1 =');   // Do not forget '='
        expect(res.textContent).toBe('2');
    });
});

// npx jest TESTS/jest-tests/frontend/unit/HistoryPanel.unit.test.ts