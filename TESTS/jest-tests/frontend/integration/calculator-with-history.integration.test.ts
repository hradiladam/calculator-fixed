// TESTS/jest-tests/frontend/component/calculator-with-history.integration.test


import State from '../../../../ts/modules/State.js';
import DisplayControl from '../../../../ts/modules/DisplayControl.js';
import Evaluator from '../../../../ts/modules/Evaluator.js';
import InputHandler from '../../../../ts/modules/InputHandler.js';
import { formatForHistory } from '../../../../ts/modules/formatter.js';
import HistoryPanel from '../../../../ts/modules/HistoryPanel.js';
import ThemeSwitch from '../../../../ts/modules/ThemeSwitch.js'; 

// ————— Helpers —————

/** Stub fetch to resolve once with `{ ok: true, result }` */
function stubFetchSuccess(result: string) {
	(global as any).fetch = jest.fn().mockResolvedValueOnce({
		ok: true,
		json: async () => ({ result })
	});
}

/** Press a sequence of calculator buttons */
async function press(input: InputHandler, ...buttons: string[]) {
	for (const b of buttons) {
		await input.handleButtons(b);
	}
}

// ————— Minimal DOM fixture —————

const HTML = `
	<div id="recent-history"></div>
	<div id="result"></div>
	<button id="history-toggle"></button>
	<div id="history-panel"></div>
	<button id="theme-switch" aria-label="Toggle theme"></button>
`;

describe('Calculator integration (Jest + JSDOM)', () => {
	let input: InputHandler;

	beforeEach(() => {
		document.body.innerHTML = HTML;

		const state = new State();
		const historyEl = document.getElementById('recent-history')!;
		const resultEl = document.getElementById('result')!;
		const toggleBtn = document.getElementById('history-toggle')!;
		const panelEl = document.getElementById('history-panel')!;
		const themeButton = document.getElementById('theme-switch')!;

		const display = new DisplayControl(historyEl, resultEl, state);
		const historyPanel = new HistoryPanel(toggleBtn, panelEl);
		const evaluator = new Evaluator(state, display, historyPanel);

		input  = new InputHandler(state, evaluator, display);
    	new ThemeSwitch(themeButton).init(); // initialize theme switch
		display.update();
	});

	test('computes 2 + 3 = 5', async () => {
		// Stub network to return "5"
		stubFetchSuccess('5');

		// Press "2 + 3 ="
		await press(input, '2', '+', '3', '=');

		// UI assertions
		expect(document.getElementById('result')!.textContent).toBe('5');
		expect(document.getElementById('recent-history')!.textContent).toBe('2 + 3 =');

		// Verify the request contained the spaced expression "2 + 3"
		expect((global as any).fetch).toHaveBeenCalledWith(
			expect.stringContaining('/evaluate'),
			expect.objectContaining({
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ expression: '2 + 3' })
			})
		);
	});

	test('shows error on divide by zero', async () => {
		// Stub network to return the error message
		stubFetchSuccess(`Can't divide by 0`);

		// Press "5 ÷ 0 ="
		await press(input, '5', '÷', '0', '=');

		// UI assertions
		expect(document.getElementById('result')!.textContent).toBe(`Can't divide by 0`);
		expect(document.getElementById('recent-history')!.textContent).toBe('5 ÷ 0 =');

		// Verify the request contained the spaced expression "5 ÷ 0"
		expect((global as any).fetch).toHaveBeenCalledWith(
			expect.stringContaining('/evaluate'),
			expect.objectContaining({
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ expression: '5 ÷ 0' })
			})
		);
	});

	test('handles implicit multiplication with parentheses (50%(2+1)=1.5)', async () => {
		// Stub network to return "1.5"
		stubFetchSuccess('1.5');

		// Press "50%(2+1)=" without explicit multiply
		await press(
			input, '5', '0', '%', '( )', '2', '+', '1', '( )', '='
		);

		// UI assertions
		expect(document.getElementById('result')!.textContent).toBe('1.5');
		expect(document.getElementById('recent-history')!.textContent).toBe(formatForHistory('50% × (2 + 1)') + ' =');

		// Verify the request contained the spaced expression "50%(2 + 1)"
		expect((global as any).fetch).toHaveBeenCalledWith(
			expect.stringContaining('/evaluate'),
			expect.objectContaining({
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ expression: '50%(2 + 1)' })
			})
		);
	});

	test('history panel shows the computed entry after success', async () => {
		// Stub network to return "5"
		stubFetchSuccess('5');

		// Press "2 + 3 ="
		await press(input, '2', '+', '3', '=');

		// Sanity: recent-history and result are correct already
		expect(document.getElementById('result')!.textContent).toBe('5');
		expect(document.getElementById('recent-history')!.textContent).toBe('2 + 3 =');

		// —— Open history panel ——
		const toggleBtn = document.getElementById('history-toggle')!;
    	const panelElement = document.getElementById('history-panel')!;

		// Initially hidden
		expect(panelElement.classList.contains('visible')).toBe(false);
		toggleBtn.click();
		expect(panelElement.classList.contains('visible')).toBe(true);

		// It should have one history entry: expression = result
		const entry = panelElement.querySelector<HTMLElement>('.history-entry');
		expect(entry).not.toBeNull();

		const expressionElement = entry!.querySelector<HTMLElement>('.history-expression')!;
		const resultElement = entry!.querySelector<HTMLElement>('.history-result')!;

		expect(expressionElement.textContent).toBe('2 + 3 =');
		expect(resultElement.textContent).toBe('5');
	});

	test('toggling theme does not clear history panel log', async () => {
		// Stub network to return "5"
		stubFetchSuccess('5');

		// Perform a calculation so there is something in history panel
		await press(input, '2', '+', '3', '=');

		// Sanity: recent history populated
		expect(document.getElementById('recent-history')!.textContent).toBe('2 + 3 =');

		const toggleBtn = document.getElementById('history-toggle')!;
		const panelEl = document.getElementById('history-panel')!;

		// Open history panel and capture entry
		toggleBtn.click();
		expect(panelEl.classList.contains('visible')).toBe(true);
		const entryBefore = panelEl.querySelector<HTMLElement>('.history-entry');
		expect(entryBefore).not.toBeNull();

		// Toggle theme
		const themeButton = document.getElementById('theme-switch')!;
		themeButton.click();
		expect(document.body.classList.contains('dark-theme')).toBe(true);

		// History panel should still contain the same entry
		const entryAfter = panelEl.querySelector<HTMLElement>('.history-entry');
		expect(entryAfter).not.toBeNull();
		expect(entryAfter!.innerHTML).toBe(entryBefore!.innerHTML);
	});
});


// npx jest TESTS/jest-tests/frontend/integration/calculator-with-history.integration.test