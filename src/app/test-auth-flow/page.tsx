'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export default function TestAuthFlow() {
    const { googleLogin, isAuthenticated, user, userType, refreshSession, logout } = useAuth();
    const [testResults, setTestResults] = useState<string[]>([]);

    const addResult = (message: string) => {
        setTestResults((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    const testGoogleLogin = async (userType: 'developer' | 'company') => {
        addResult(`Testing Google login for ${userType}...`);
        const result = await googleLogin(userType);
        addResult(
            `Google login result: ${result.success ? 'Success' : 'Failed'} - ${result.error || 'No error'}`,
        );
    };

    const testRefreshSession = async () => {
        addResult('Testing session refresh...');
        const result = await refreshSession();
        addResult(`Session refresh result: ${result ? 'Success' : 'Failed'}`);
    };

    const testLogout = async () => {
        addResult('Testing logout...');
        await logout();
        addResult('Logout completed');
    };

    useEffect(() => {
        addResult(
            `Auth state changed - Authenticated: ${isAuthenticated}, User: ${user?.email || 'None'}, Type: ${userType || 'None'}`,
        );
    }, [isAuthenticated, user, userType]);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-6 rounded-lg bg-white p-6 shadow-lg">
                    <h1 className="mb-4 text-3xl font-bold text-gray-900">
                        Authentication Flow Test
                    </h1>

                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Button
                            onClick={() => testGoogleLogin('developer')}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Test Developer Google Login
                        </Button>

                        <Button
                            onClick={() => testGoogleLogin('company')}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            Test Company Google Login
                        </Button>

                        <Button
                            onClick={testRefreshSession}
                            className="bg-yellow-600 hover:bg-yellow-700"
                        >
                            Test Session Refresh
                        </Button>

                        <Button onClick={testLogout} className="bg-red-600 hover:bg-red-700">
                            Test Logout
                        </Button>
                    </div>

                    <div className="mb-6 rounded-lg bg-gray-100 p-4">
                        <h3 className="mb-2 font-semibold text-gray-900">Current Auth State:</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
                            <p>User Type: {userType || 'None'}</p>
                            <p>User Email: {user?.email || 'None'}</p>
                            <p>User Role: {user?.role || 'None'}</p>
                            <p>User ID: {user?.id || 'None'}</p>
                        </div>
                    </div>

                    <div className="rounded-lg bg-gray-100 p-4">
                        <h3 className="mb-2 font-semibold text-gray-900">Test Results:</h3>
                        <div className="max-h-64 overflow-y-auto text-sm text-gray-600">
                            {testResults.length === 0 ? (
                                <p className="text-gray-500">No tests run yet...</p>
                            ) : (
                                testResults.map((result, index) => (
                                    <div
                                        key={index}
                                        className="border-b border-gray-200 py-1 last:border-b-0"
                                    >
                                        {result}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-lg">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">Quick Links</h2>
                    <div className="space-y-2">
                        <a
                            href="/developers/login"
                            className="block text-blue-600 underline hover:text-blue-700"
                        >
                            Developer Login Page
                        </a>
                        <a
                            href="/companies/login"
                            className="block text-blue-600 underline hover:text-blue-700"
                        >
                            Company Login Page
                        </a>
                        <a
                            href="/test-google-login"
                            className="block text-blue-600 underline hover:text-blue-700"
                        >
                            Simple Google Login Test
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
