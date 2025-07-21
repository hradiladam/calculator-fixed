import request from 'supertest'; 
import app from '../../../../BACKEND/app';      // Import the Express application (without starting the server)


// All tests for the evaluate endpoint
describe('POST /evaluete', () => {
    // TEst a simple valid expression
    it('should return 200 and the result for a simple expression', async () => {
        // Request is the default export from the supertest module
        // - it gives SuperTest an Express application instance and tells it it will send HTTP calls to it
        const response = await request(app)
            .post('/evaluate')                  // Send a POST request to /evaluate with expression 2+2
            .send({ expression: '2+2' })        // Body must have an expression string
            .expect('Content-Type', /json/)     // Expect JSON response header
            .expect(200);                       // Expect HTTP 200 OK

        // The API wraps the result in { result: string }
        expect(response.body).toEqual({ result: '4' });     // 2 + 2 = "4" (formatted as string)                       
    });

    // Test percentage handling logic
    it ('should handle percentages correctly', async () => {
        const response = await request(app)
            .post('/evaluate')
            .send({ expression: '100+20%' })
            .expect(200);

        // 100+20% = 100 + (100 * 20/100) = 120
        expect(response.body.result).toBe('120');
    });

    // Test rejection of empty or whitespace-only expressions
    it ('should reject empty expressions', async () => {
        const response = await request(app)
            .post('/evaluate')
            .send({ expression: '    ' })
            .expect(400);

        // The validator in app.ts returns this exact error message
        expect(response.body).toHaveProperty(
            'error', 
            'Expression must be a non-empty string'
        );
    });

    // Test unmatched parentheses validation
    it ('should reject unmatched parentheses', async () => {
        const response = await request(app)
            .post('/evaluate')
            .send({ expression: '(2+3' })
            .expect(400);

        // Error message should mention "Unmatched parentheses"
        expect(response.body.error).toMatch('Unmatched parentheses');
    });

    // Test division-by-zero semantic check
    it ('should reject division by zero', async () => {
        const response = await request(app)
            .post('/evaluate')
            .send({ expression: '5/0' })
            .expect(400);

        //
        expect(response.body.error).toMatch("Can't divide by 0");
    });

    // Test expression ending in operator validation
    it ('should reject expressions ending with operator', async () => {
        const response = await request(app)
            .post('/evaluate')
            .send({ expression: '5+' })
            .expect(400);

        //
        expect(response.body.error).toMatch('Incomplete expression');
    });

    // TEst of remocing trailign zeroes
    it('should trim trailing zeros but keep precision', async () => {
        // 1/8 = 0.125 exactly, no trailing zeros
        const res = await request(app)
        .post('/evaluate')
        .send({ expression: '1/8' })
        .expect(200);

        expect(res.body).toEqual({ result: '0.125' });
    });

    // Test formatting to round to 12 significant digits
    it('should round to 12 significant digits by default', async () => {
    // 1/3 in infinite decimal, trimmed+rounded to 12 significant figures -> 0.333333333333
        const res = await request(app)
        .post('/evaluate')
        .send({ expression: '1/3' })
        .expect(200);

        expect(res.body).toEqual({ result: '0.333333333333' });
    });

    // Test preprocessing normalizatioon of × and ÷ in an integration test
    it('should normalize × and ÷ operators', async () => {
        const response = await request(app)
        .post('/evaluate')
        .send({ expression: '2×3÷2' })
        .expect(200);

        // 2×3=6, 6÷2=3
        expect(response.body.result).toBe('3');
    });

    // Test preprocessin for implicit multiplication test
    it('should handle implicit multiplication', async () => {
        const res = await request(app)
        .post('/evaluate')
        .send({ expression: '2(3+4)' })
        .expect(200);

        // 2*(3+4)=14
        expect(res.body).toEqual({ result: '14' });
    });
})


// npx jest TESTS/jest-tests/backend/integration/app.integration.test.ts


