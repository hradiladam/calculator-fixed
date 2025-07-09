## API Testing with Postman

This project includes automated API tests for the calculator backend located in `/tests/postman-tests` using **Postman Collection Runner**. The tests verify both valid math expressions and proper error handling.

### Test Overview

- **Total tests:** 34  
- **CSV files:** 7  
- **Test scripts used:** 2  
- **Test method:** POST requests using `expression` values from CSV rows

Each test sends a math expression to the API and verifies whether the response matches the expected `result` or `error`.


### How to Run the Tests in Postman

- Open Postman
- Import the provided .postman_collection.json
- Open the Runner in sidebar or press Ctrl+R
- Select the collection
- Upload a .csv test file
- Click Run


### Directory Structure
/postman-tests/
- test-collections/ directory containing 
    - scripts/ subfolder with error-tests.js and normal-tests.js
    - Calculator.postman_collection
- test-data-csv/
    - basic-calculations.csv
    - formated-results.csv
    - handle-error-cases.csv
    - overall-complex-calculations.csv
    - parentheses-calculations.csv
    - percent-calculations.csv
    - unlikely-error-cases.csv




