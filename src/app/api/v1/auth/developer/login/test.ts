// Test file for developer login API
// This file can be used with tools like Postman or curl to test the API

const API_URL = 'http://localhost:3001/api/v1/auth/developer/login';

// Test cases
const testCases = [
    {
        name: 'Valid Login',
        data: {
            email: 'sohag@example.com',
            password: 'TestPass123!',
            rememberMe: false,
        },
        expectedStatus: 200,
    },
    {
        name: 'Invalid Email',
        data: {
            email: 'invalid-email',
            password: 'TestPass123!',
            rememberMe: false,
        },
        expectedStatus: 400,
    },
    {
        name: 'Empty Password',
        data: {
            email: 'sohag@example.com',
            password: '',
            rememberMe: false,
        },
        expectedStatus: 400,
    },
    {
        name: 'Wrong Password',
        data: {
            email: 'sohag@example.com',
            password: 'WrongPassword123!',
            rememberMe: false,
        },
        expectedStatus: 401,
    },
    {
        name: 'Non-existent Email',
        data: {
            email: 'nonexistent@example.com',
            password: 'TestPass123!',
            rememberMe: false,
        },
        expectedStatus: 401,
    },
    {
        name: 'Remember Me Enabled',
        data: {
            email: 'sohag@example.com',
            password: 'TestPass123!',
            rememberMe: true,
        },
        expectedStatus: 200,
    },
];

// Function to run tests
async function runTests() {
    console.log('🧪 Running Developer Login API Tests\n');

    for (const testCase of testCases) {
        console.log(`📋 Test: ${testCase.name}`);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testCase.data),
            });

            const result = await response.json();

            const statusMatch = response.status === testCase.expectedStatus;
            const success = statusMatch ? '✅' : '❌';

            console.log(
                `${success} Status: ${response.status} (expected: ${testCase.expectedStatus})`,
            );
            console.log(`   Response:`, result);
            console.log('');
        } catch (error) {
            console.log(`❌ Error: ${error}`);
            console.log('');
        }
    }
}

// Export for use in other test runners
export { testCases, runTests };

// Run tests if this file is executed directly
if (typeof window === 'undefined' && require.main === module) {
    runTests();
}
