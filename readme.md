# Calculator Project


## Project Structure

### Frontend (root folder)
- index.html
- css/ directory containing reset.css and style.css for layout and theming
- js/ directory with: 
   - main.js
   - modules/ subfolder with DisplayControl.js, InputsHandler.js, Evaluator.js, KeyboardHandler.js, ThemeSwitch.js, and State.js for UI logic and API requests
   
### Backend (BACKEND/ folder)
- server.js
- utils/ subfolder with Validator.js
- services/ subfolder with Calculator.js


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

## Features
- **Basic operations:** Basic operations are evaluated using Math.js to ensure accurate calculations.
- **Clear & Delete:** Use "AC" to clear the entire input or "⌫" to delete the last character or operator 
- **Theme Toggle:** Switch between light and dark themes.
- **Percentage Calculations:** Handles percentages in a way that mirrors how most calculators work. Simple values like 50% are interpreted as 50 / 100. Multiplication and division involving a percentage follow standard math: A × B% becomes A × (B/100).  Addition and subtraction use a "discount-style" approach for intuitiveness: A = B% becomes A + (A × B / 100)
- **Precision & Formatting:** Uses Math.js BigNumber with 64-digit precision. Results are rounded to 12 significant digits and automatically switch to scientific notation for values above 10⁹ or below 10⁻⁶.
- **Parentheses Support:** Lets you group operations for more complex expressions. Expressions like 50%5 or 10%(10) are parsed as 50% × 5 and 10% × (10), respectively.
- **Keyboard Shortcuts:** Type directly using your keyboard: Enter, numbers, operators, backspace, Esc.
- **Error Handling:** The backend detects and returns specific errors: divide by zero, incomplete expressions, unmatched parentheses, invalid % usage, infinity, and undefined results. The frontend displays these as clear red error messages.


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


## Licence
MIT — Free to use, modify, and build upon.


---

> This project is a work in progress and it will be gradually updated and enhanced. Add testing scripts, rewrite and develop the project in TypeScript.

