import { getServerAuth } from '@/lib/server-auth';
import { ClientAuthStatus } from './client-auth-status';

export default async function TestAuthStatusPage() {
    const { user, isAuthenticated } = await getServerAuth();

    return (
        <div className="min-h-screen bg-black p-6 text-white">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-8 text-3xl font-bold">Authentication Status Debug</h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Server-side Auth Status */}
                    <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-6">
                        <h2 className="mb-4 text-xl font-semibold text-blue-400">
                            Server-Side Auth
                        </h2>
                        <div className="space-y-2">
                            <p>
                                <span className="font-medium">Is Authenticated:</span>{' '}
                                {isAuthenticated ? '✅ Yes' : '❌ No'}
                            </p>
                            {user && (
                                <>
                                    <p>
                                        <span className="font-medium">User ID:</span> {user.id}
                                    </p>
                                    <p>
                                        <span className="font-medium">Email:</span> {user.email}
                                    </p>
                                    <p>
                                        <span className="font-medium">Role:</span> {user.role}
                                    </p>
                                </>
                            )}
                            {!user && <p className="text-gray-400">No user data available</p>}
                        </div>
                    </div>

                    {/* Client-side Auth Status */}
                    <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-6">
                        <h2 className="mb-4 text-xl font-semibold text-green-400">
                            Client-Side Auth
                        </h2>
                        <ClientAuthStatus />
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-8 rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-6">
                    <h3 className="mb-3 text-lg font-semibold text-yellow-400">
                        Troubleshooting Steps
                    </h3>
                    <ol className="list-inside list-decimal space-y-2 text-gray-300">
                        <li>If both sides show "Not Authenticated", you need to log in</li>
                        <li>
                            If client shows "Authenticated" but server shows "Not Authenticated",
                            try refreshing the page
                        </li>
                        <li>If the issue persists, try logging out and logging back in</li>
                        <li>Check if your browser accepts cookies</li>
                    </ol>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 flex gap-4">
                    <a
                        href="/developers/login"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Go to Login
                    </a>
                    <a
                        href="/problemset"
                        className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                    >
                        Go to Problemset
                    </a>
                </div>
            </div>
        </div>
    );
}
