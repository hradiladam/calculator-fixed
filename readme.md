# Calculator Project


## Project Structure

### Frontend (root folder)
- index.html
- css/ directory containing reset.css and style.css for layout and theming
- js/ directory with: 
   - main.js
   - modules/ subfolder with display.js, inputs.js, evaluator.js, keyboard.js, theme.js, and state.js for UI logic
- BACKEND/ directory with:
   - index.js
   - utils/ subfolder with validate.js

### Backend (BACKEND/ folder)
- index.js, package.json for a Node.js + Express API

## Features
**Basic operations:** Addition, subtraction, multiplication, division.
**Percentage Calculations:** Handles percentages in a way that mirrors how most calculators work. Simple values like 50% are interpreted as 50 / 100. Multiplication and division involving a percentage follow standard math:A × B% becomes A × (B / 100).
**Decimal Support:** Enables precise decimal calculations. Addition and subtraction use a "discount-style" approach for intuitiveness:
A + B% is interpreted as A + (A × B / 100) — meaning you’re increasing or decreasing A by B percent of A.
**Parentheses Support:** Lets you group operations for more complex expressions. Expressions like 50%5 or 10%(10) are parsed as 50% × 5 and 10% × (10), respectively.
**Clear & Delete:** Use "AC" to clear the entire input or "⌫" to delete the last character or operator
**Theme Toggle:** Switch between light and dark themes.
**Keyboard Shortcuts:** Type directly using your keyboard—Enter, numbers, operators, backspace, etc.
**Format Error Handling:** Invalid input formats result in a "Format Error" message for now, without crashing the app.


## Technologies Used

**Frontend:** 
- HTML, CSS, and modular JavaScript
- Font Awesome for button icons
- Google Fonts
- Hosted on GitHub Pages

**Backend:**
- Node.js + Express
- Math.js using BigNumber mode
- Hosted on Render

## How to Access

1. **Online:** Open the application directly in your browser by visiting the following link: [Calculator](https://hradiladam.github.io/calculator/)

2. **Locally:** 

### Requirements

- [Node.js](https://nodejs.org/) (v14 or later)
- (Option A) VS Code with Live Server extension
- (Option B) Python 3 installed

1. Clone or Download the Project

If you downloaded the ZIP, unzip it and open the folder.

```bash
git clone https://github.com/hradiladam/calculator.git
cd calculator
```

2. Start the Backend: This project uses a backend powered by Node.js and Express, with mathjs for calculations.

```bash
cd BACKEND
npm install
node index.js
```


3. . Start the frontend: Choose one of the two options below

### Option A: VS Code + Live Server
- Open the project folder in VS Code with Live Extention installed
- Right-click index.html
- Select "Open with Live Server"
- It opens in your browser at: http://127.0.0.1:5500/

### Option B: Python 3
- open new terminal

```bash
- cd path/to/project/root
- python -m http.server 8000
```

- open browser
- go to: http://localhost:8000/index.html


## Features in Detail
- **Basic operations:** Basic operations are evaluated using Math.js to ensure accurate calculations. 
- **Percentage Logic:** Custom logic handles percent expressions intuitively: 50%50% → 50% * 50%, 50%6 → 50% * 6, 10%(10) → 10% * (10)
- **Precision & Formatting:** Uses Math.js BigNumber with 64-digit precision. Results are rounded to 12 significant digits. Scientific notation is applied when results are extremely large or small (e.g., 1.23e+15).
- **Floating-Point Fixes:** Prevents common JS issues like 0.1 + 0.2 = 0.30000000000000004. All calculations are handled server-side for consistency.
- **Scientific Notation:** Large or small results are formatted using scientific notation when they exceed 10^15 or fall below 10^-15 (e.g., 1.23e+15 or 1.23e-15).
- **Regular Expressions:** Used to rewrite expressions before evaluation—for example, inserting * where needed between % and numbers/parentheses.
- **Error hanfdling:** The backend detects and returns specific errors: divide by zero, incomplete expressions, unmatched parentheses, invalid % usage, infinity, and undefined results. The frontend displays these as clear red error messages.

## Licence
MIT — Free to use, modify, and build upon.
>>>>>>> fbcbc07 (Adjust readme to correspond to How To Access options)

---

> This project is a work in progress and it will be gradually updated and enhanced. Rewrite to Typescript (better typing and IDE support). Refactor to OOP (Encapsulate logic and state into classes for clearer structure and easier testing)

