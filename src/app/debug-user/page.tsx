import { auth } from '@/lib/auth';

export default async function DebugUserPage() {
    const session = await auth();

    return (
        <div className="p-8 text-white">
            <h1 className="mb-6 text-2xl font-bold">Current User Debug</h1>

            <div className="rounded bg-gray-800 p-4">
                <h2 className="mb-2 text-xl font-semibold">Your Current Session</h2>
                <pre className="text-sm">
                    {JSON.stringify(
                        {
                            hasSession: !!session,
                            hasUser: !!session?.user,
                            userId: session?.user?.id,
                            userEmail: session?.user?.email,
                            userIdType: typeof session?.user?.id,
                        },
                        null,
                        2,
                    )}
                </pre>
            </div>

            <div className="mt-6 rounded bg-gray-800 p-4">
                <h2 className="mb-2 text-xl font-semibold">Problem Data (from your image)</h2>
                <pre className="text-sm">
                    {JSON.stringify(
                        {
                            solvedBy: ['68851453aae31ba016071277'],
                            expectedUserId: '68851453aae31ba016071277',
                        },
                        null,
                        2,
                    )}
                </pre>
            </div>

            {session?.user?.id && (
                <div className="mt-6 rounded bg-gray-800 p-4">
                    <h2 className="mb-2 text-xl font-semibold">Comparison</h2>
                    <pre className="text-sm">
                        {JSON.stringify(
                            {
                                currentUserId: session.user.id,
                                expectedUserId: '68851453aae31ba016071277',
                                isMatch: session.user.id === '68851453aae31ba016071277',
                                currentUserIdType: typeof session.user.id,
                                expectedUserIdType: typeof '68851453aae31ba016071277',
                            },
                            null,
                            2,
                        )}
                    </pre>
                </div>
            )}
        </div>
    );
}
