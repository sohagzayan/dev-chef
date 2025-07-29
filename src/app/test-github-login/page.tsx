'use client';

import { useState } from 'react';
import { GitHubLoginPopup } from '@/components/client/common/GitHubLoginPopup';
import { Button } from '@/components/ui/button';

export default function TestGitHubLogin() {
    const [showGitHubPopup, setShowGitHubPopup] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGitHubLogin = () => {
        setError(null);
        setUserData(null);
        setShowGitHubPopup(true);
    };

    const handleGitHubLoginSuccess = (userData: any) => {
        setUserData(userData);
        setShowGitHubPopup(false);
    };

    const handleGitHubLoginError = (errorMessage: string) => {
        setError(errorMessage);
        setShowGitHubPopup(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-bold">GitHub Login Test</h1>

                <Button onClick={handleGitHubLogin} className="mb-4 w-full">
                    Test GitHub Login
                </Button>

                {error && (
                    <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {userData && (
                    <div className="mb-4 rounded border border-green-400 bg-green-100 p-3 text-green-700">
                        <strong>Success!</strong>
                        <pre className="mt-2 overflow-auto text-sm">
                            {JSON.stringify(userData, null, 2)}
                        </pre>
                    </div>
                )}

                <div className="text-sm text-gray-600">
                    <p>This page tests the GitHub login popup functionality.</p>
                    <p className="mt-2">
                        Make sure you have configured your GitHub OAuth app with:
                    </p>
                    <ul className="mt-1 list-inside list-disc">
                        <li>
                            Authorization callback URL:{' '}
                            <code>
                                http://localhost:3001/api/auth/github/popup/callback?userType=developer
                            </code>
                        </li>
                        <li>
                            Environment variables: <code>GITHUB_ID</code> and{' '}
                            <code>GITHUB_SECRET</code>
                        </li>
                    </ul>
                </div>
            </div>

            <GitHubLoginPopup
                isOpen={showGitHubPopup}
                onClose={() => setShowGitHubPopup(false)}
                onSuccess={handleGitHubLoginSuccess}
                onError={handleGitHubLoginError}
                userType="developer"
            />
        </div>
    );
}
