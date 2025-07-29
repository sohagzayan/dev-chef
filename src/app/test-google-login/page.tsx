'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export default function TestGoogleLogin() {
    const { googleLogin, isAuthenticated, user, userType } = useAuth();

    const handleGoogleLogin = async (userType: 'developer' | 'company') => {
        console.log(`Testing Google login for ${userType}`);
        const result = await googleLogin(userType);
        console.log('Google login result:', result);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Google Login Test</h2>
                    <p className="mt-2 text-gray-600">Test Google OAuth integration</p>
                </div>

                <div className="space-y-4">
                    <Button
                        onClick={() => handleGoogleLogin('developer')}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                        Test Developer Google Login
                    </Button>

                    <Button
                        onClick={() => handleGoogleLogin('company')}
                        className="w-full bg-green-600 hover:bg-green-700"
                    >
                        Test Company Google Login
                    </Button>
                </div>

                <div className="mt-8 rounded-lg bg-gray-100 p-4">
                    <h3 className="mb-2 font-semibold text-gray-900">Current Auth State:</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                        <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
                        <p>User Type: {userType || 'None'}</p>
                        <p>User Email: {user?.email || 'None'}</p>
                        <p>User Role: {user?.role || 'None'}</p>
                    </div>
                </div>

                <div className="text-center">
                    <a
                        href="/developers/login"
                        className="text-blue-600 underline hover:text-blue-700"
                    >
                        Go to Developer Login
                    </a>
                    <span className="mx-2">|</span>
                    <a
                        href="/companies/login"
                        className="text-blue-600 underline hover:text-blue-700"
                    >
                        Go to Company Login
                    </a>
                </div>
            </div>
        </div>
    );
}
