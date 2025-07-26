// Test file for developer registration API
// This file can be used with tools like Postman or curl to test the API

const API_URL = 'http://localhost:3000/api/v1/auth/developer/register';

// Test cases
const testCases = [
    {
        name: 'Valid Registration',
        data: {
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            password: 'SecurePass123!',
            confirmPassword: 'SecurePass123!',
            agreeToTerms: true,
            subscribeNewsletter: false,
        },
        expectedStatus: 201,
    },
    {
        name: 'Invalid Email',
        data: {
            fullName: 'John Doe',
            email: 'invalid-email',
            password: 'SecurePass123!',
            confirmPassword: 'SecurePass123!',
            agreeToTerms: true,
        },
        expectedStatus: 400,
    },
    {
        name: 'Weak Password',
        data: {
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            password: 'weak',
            confirmPassword: 'weak',
            agreeToTerms: true,
        },
        expectedStatus: 400,
    },
    {
        name: 'Passwords Dont Match',
        data: {
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            password: 'SecurePass123!',
            confirmPassword: 'DifferentPass123!',
            agreeToTerms: true,
        },
        expectedStatus: 400,
    },
    {
        name: 'Terms Not Agreed',
        data: {
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            password: 'SecurePass123!',
            confirmPassword: 'SecurePass123!',
            agreeToTerms: false,
        },
        expectedStatus: 400,
    },
    {
        name: 'Invalid Name',
        data: {
            fullName: 'John123',
            email: 'john.doe@example.com',
            password: 'SecurePass123!',
            confirmPassword: 'SecurePass123!',
            agreeToTerms: true,
        },
        expectedStatus: 400,
    },
];

// Function to run tests
async function runTests() {
    console.log('🧪 Running Developer Registration API Tests\n');

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
