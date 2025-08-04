import { auth } from '@/lib/auth';

// Server-side function to fetch problems using API endpoint
export async function fetchProblemsServer(params?: {
    page?: number;
    limit?: number;
    topicId?: string;
    difficulty?: string;
    status?: string;
    search?: string;
    tags?: string;
    companyTags?: string;
}) {
    const session = await auth();

    console.log('Server-side session debug:', {
        hasSession: !!session,
        hasUser: !!session?.user,
        userId: session?.user?.id,
        userEmail: session?.user?.email,
    });

    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.topicId) searchParams.append('topicId', params.topicId);
    if (params?.difficulty) searchParams.append('difficulty', params.difficulty);
    if (params?.status) searchParams.append('status', params.status);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.tags) searchParams.append('tags', params.tags);
    if (params?.companyTags) searchParams.append('companyTags', params.companyTags);

    // Get the base URL for server-side requests
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/v1/problems?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // For server-side requests, we need to pass the session differently
            // The auth() function should handle this automatically
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch problems: ${response.statusText}`);
    }

    return response.json();
}

// Server-side function to fetch user stats using API endpoint
export async function fetchUserStatsServer(params?: {
    topicId?: string;
    difficulty?: string;
    tags?: string;
    companies?: string;
}) {
    const session = await auth();

    const searchParams = new URLSearchParams();

    if (params?.topicId) searchParams.append('topicId', params.topicId);
    if (params?.difficulty) searchParams.append('difficulty', params.difficulty);
    if (params?.tags) searchParams.append('tags', params.tags);
    if (params?.companies) searchParams.append('companies', params.companies);

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    if (session?.user?.id) {
        // Fetch user-specific stats for authenticated users
        const response = await fetch(`${baseUrl}/api/v1/user/stats?${searchParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Cookie: `next-auth.session-token=${session.user.id}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user stats: ${response.statusText}`);
        }

        return response.json();
    } else {
        // Fetch general stats for unauthenticated users
        const response = await fetch(
            `${baseUrl}/api/v1/problems/stats?${searchParams.toString()}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch general stats: ${response.statusText}`);
        }

        return response.json();
    }
}

// Server-side function to fetch topics using API endpoint
export async function fetchTopicsServer(params?: {
    type?: string;
    difficulty?: string;
    isActive?: boolean;
}) {
    const searchParams = new URLSearchParams();

    if (params?.type) searchParams.append('type', params.type);
    if (params?.difficulty) searchParams.append('difficulty', params.difficulty);
    if (params?.isActive !== undefined) searchParams.append('isActive', params.isActive.toString());

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/v1/topics?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch topics: ${response.statusText}`);
    }

    return response.json();
}
