## Unit and integration testing with Jest

This project uses a multi-project Jest configuration to separate backend and frontend tests. Tests are written in TypeScript and organized under the TESTS/Jest-tests/ directory.


### Project structure

```
calculator/
├── TESTS/
│   └── jest-tests/
│       ├── backend/                    # Backend unit tests
│       │   └──unit
│       │   │   ├── Calculator.test.ts
│       │   │   ├── preprocessor.test.ts           
│       │   │   └── Validator.test.ts
│       │   └──integration
│       │       └── app.integration.test.ts
│       └── frontend/                   # Frontend DOM/unit tests
└── jest-config.cjs                     # Root Jest config (multi-project setup)
```


### How to run

1. install Jest in app ROOT 

``` bash
npm install --save-dev jest ts-jest @types/jest
```

2. Install SuperTest in the root as well so that the test files, wherever they live, can import it

``` bash
npm install --save-dev supertest @types/supertest
```

3. Run tests:

**Run all tests**
``` bash
npx jest --config jest.config.cjs
```

**Run only backend tests**
``` bash
npx jest --selectProjects backend --config jest.config.cjs
```

**Run only frontend tests**
``` bash
npx jest --selectProjects frontend --config jest.config.cjs
```



