// ts/modules/Evaluator.ts
// ——— Wraps the fetch logic and error handling plus formatting for history display ———

import { formatForHistory } from './formatter.js';
import State from './State.js';
import DisplayControl from './DisplayControl.js';
import HistoryPanel from './HistoryPanel.js';
import { getEvaluateUrl } from '../config-api.js';

interface ApiResponse {
    result?: string;
    error?: string;
}

export default class Evaluator {
    private state:        State;
    private display:      DisplayControl;
    private historyPanel: HistoryPanel;

    constructor(
        state: State,
        display: DisplayControl,
        historyPanel: HistoryPanel    // ← now injected directly
    ) {
        this.state        = state;
        this.display      = display;
        this.historyPanel = historyPanel;
    }

    evaluate = async (): Promise<void> => {
        const resultElement = this.display.resultElement;
        resultElement.classList.remove('error-text');

        // … inside the success path, before your fetch …
        const expr = formatForHistory(this.state.currentInput); // format input once for both history UIs

        try {
            const response = await fetch(getEvaluateUrl(), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ expression: this.state.currentInput })
            });
            const data: ApiResponse = await response.json();

            // Always record what the user attempted, update the one‑line “recent history” display
            this.state.recentHistory = `${expr} =`;

            if (!response.ok || data.error) {
                // Error path
                this.state.currentInput = data.error ?? 'Error';
                resultElement.classList.add('error-text');
                this.state.lastButtonWasEquals = false;

            } else {
                // Success path
                this.historyPanel.append(expr, data.result ?? '');

                // Then update main display state
                this.state.currentInput = data.result ?? '';
                this.state.lastButtonWasEquals = true;
            }

        } catch {
            // Network or CORS failure
            this.state.currentInput = 'Network Error';
            resultElement.classList.add('error-text');
            this.state.lastButtonWasEquals = false;
        }

        // Finally, refresh the one‑line display
        this.display.update();
    }
}