## End-to-end testing with Playwright

This project includes automated E2E and UI tests for the calculator using **Playwright**. The tests are written in TypeScript and verify user interactions across both the frontend UI and backend API.


### Test Overview

- **Test framework:** Playwright Test (@playwright/test)  
- **Setup:** Backend warmup before test execution
- **Target URLs:** 
    - Frontend: https://hradiladam.github.io/calculator/
    - Backend: https://calculator-ihdr.onrender.com/evaluate

- The tests simulate real browser usage to validate workflows such as button clicks, input rendering, theme switching, and (soon) expression evaluation via the live API.


### Current Test Suite
**theme-toggle.test.ts:**
- verifies the theme switch button: applies and removes the dark-theme class, visual icon changes with each switch, switching theme does not reset input field

More tests will be added soon.


### How to Run the Tests

1. Navigate to the test folder:
```bash
cd TESTS/playwright-tests
```

2. Install dependencies
```bash
npm install
npx playwright install
```

3. Run all tests: with custom config to activate cold storage wake up
``` bash
npx playwright test --config=TESTS/playwright-tests/playwright.config.ts
```

Optional: Run only in chromium
```bash
npx playwright test --config=TESTS/playwright-tests/playwright.config.ts --project=chromium
```


### Directory Structure
/playwright-tests/
- page/ 
    - CalculatorPage.ts
- test-scripts/
    - theme-toggle.test.ts
    - basic-inputs.test
    - operator-inputs.test.ts
    - functional-buttons-behaviour.test.ts
- playwright.config.ts
- globalSetup.ts
- package.json
- package-lock.json
- .gitignore
- README.md



This test suite is a work in progess. More tests will be added soon.