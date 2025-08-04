// Test script to verify authentication flow
// Run this in the browser console on the problem page

async function testAuth() {
    console.log('🧪 Testing Authentication Flow...');

    // Test 1: Check if user is logged in
    console.log('\n1. Checking authentication status...');
    try {
        const response = await fetch('/api/v1/auth/me', {
            credentials: 'include',
        });
        console.log('Auth status:', response.status);
        if (response.ok) {
            const data = await response.json();
            console.log('✅ User is authenticated:', data.data.user.email);
        } else {
            console.log('❌ User is not authenticated');
        }
    } catch (error) {
        console.log('❌ Error checking auth:', error);
    }

    // Test 2: Try to submit a solution
    console.log('\n2. Testing submission...');
    try {
        const response = await fetch('/api/v1/submissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                problemId: '688992b1cfbf234f98a74e61',
                language: 'javascript',
                code: 'function twoSum(nums, target) { return [0, 1]; }',
            }),
        });
        console.log('Submission status:', response.status);
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Submission successful:', data);
        } else {
            const data = await response.json();
            console.log('❌ Submission failed:', data);
        }
    } catch (error) {
        console.log('❌ Error submitting:', error);
    }

    // Test 3: Check cookies
    console.log('\n3. Checking cookies...');
    const cookies = document.cookie;
    console.log('Cookies:', cookies);

    console.log('\n🎯 Test complete!');
}

// Instructions for the user
console.log(`
🔧 Authentication Test Script
============================

To test the authentication:

1. First, log in at: http://localhost:3000/developers/login
   - Email: sohag@example.com
   - Password: TestPass123!

2. Then run this test:
   testAuth()

3. Check the debug panel in the bottom-right corner of the page

4. If authentication fails, try refreshing the page after login
`);

// Make the function available globally
window.testAuth = testAuth;
