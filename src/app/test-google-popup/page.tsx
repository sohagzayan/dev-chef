'use client';

import { useState } from 'react';
import { GoogleLoginPopup } from '@/components/client/common/GoogleLoginPopup';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export default function TestGooglePopup() {
    const { handlePopupLoginSuccess, isAuthenticated, user } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleLoginSuccess = async (userData: any) => {
        try {
            await handlePopupLoginSuccess(userData);
            setError(null);
            console.log('Google login successful:', userData);
        } catch (err) {
            setError('Failed to complete Google login');
            console.error('Google login error:', err);
        }
    };

    const handleGoogleLoginError = (errorMessage: string) => {
        setError(errorMessage);
        console.error('Google login error:', errorMessage);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
                    Google Login Popup Test
                </h1>

                <div className="space-y-4">
                    <div className="text-center">
                        <p className="mb-4 text-gray-600">
                            Test the popup-based Google login functionality
                        </p>

                        <Button onClick={() => setShowPopup(true)} className="w-full">
                            Test Google Login Popup
                        </Button>
                    </div>

                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {isAuthenticated && user && (
                        <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                            <p className="text-sm font-medium text-green-600">
                                Successfully logged in!
                            </p>
                            <p className="mt-1 text-sm text-green-600">
                                User: {user.email} (Role: {user.role})
                            </p>
                        </div>
                    )}

                    <div className="mt-6 text-center text-xs text-gray-500">
                        <p>This page tests the popup-based Google OAuth flow.</p>
                        <p>
                            The popup should open, handle authentication, and close automatically.
                        </p>
                    </div>
                </div>

                {/* Google Login Popup */}
                <GoogleLoginPopup
                    isOpen={showPopup}
                    onClose={() => setShowPopup(false)}
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                    userType="developer"
                />
            </div>
        </div>
    );
}
