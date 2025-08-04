import { fetchProblemsServer } from '@/lib/api/server-problems';
import { auth } from '@/lib/auth';

export default async function TestIsSolvedPage() {
    const session = await auth();

    // Fetch a single problem to test
    const problemsResponse = await fetchProblemsServer({
        page: 1,
        limit: 1,
    });

    const problem = problemsResponse.data?.[0];

    return (
        <div className="p-8 text-white">
            <h1 className="mb-6 text-2xl font-bold">Debug isSolved Issue</h1>

            <div className="space-y-6">
                <div className="rounded bg-gray-800 p-4">
                    <h2 className="mb-2 text-xl font-semibold">Session Info</h2>
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

                {problem && (
                    <div className="rounded bg-gray-800 p-4">
                        <h2 className="mb-2 text-xl font-semibold">Problem Info</h2>
                        <pre className="text-sm">
                            {JSON.stringify(
                                {
                                    id: problem.id,
                                    title: problem.title,
                                    solvedBy: problem.solvedBy,
                                    isSolved: problem.isSolved,
                                    status: problem.status,
                                    solvedByTypes: problem.solvedBy.map((id) => typeof id),
                                    solvedByLength: problem.solvedBy.length,
                                },
                                null,
                                2,
                            )}
                        </pre>
                    </div>
                )}

                {problem && session?.user?.id && (
                    <div className="rounded bg-gray-800 p-4">
                        <h2 className="mb-2 text-xl font-semibold">Comparison Test</h2>
                        <pre className="text-sm">
                            {JSON.stringify(
                                {
                                    userId: session.user.id,
                                    userIdString: session.user.id.toString(),
                                    solvedBy: problem.solvedBy,
                                    solvedByStrings: problem.solvedBy.map((id) => id.toString()),
                                    includesCheck: problem.solvedBy.includes(session.user.id),
                                    someCheck: problem.solvedBy.some(
                                        (id) => id.toString() === session.user.id.toString(),
                                    ),
                                    directComparison: problem.solvedBy.some(
                                        (id) => id === session.user.id,
                                    ),
                                },
                                null,
                                2,
                            )}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
