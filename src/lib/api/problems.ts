export interface Problem {
    id: string;
    title: string;
    slug: string;
    description: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    tags: string[];
    companyTags: string[];
    timeLimit: number;
    memoryLimit: number;
    successRate: number;
    score: number;
    topic: {
        id: string;
        name: string;
        slug: string;
    };
    status: 'UNSOLVED' | 'ATTEMPTED' | 'SOLVED';
    isSolved: boolean; // New field: indicates if current user has solved this problem
    lastAttempted?: string;
    bestScore?: number;
    attempts: number;
    submissionCount: number;
    isActive: boolean;
    order: number;
    createdAt: string;
    updatedAt: string;
    // Additional properties for UI compatibility
    maxScore: number;
    solvedBy: string[]; // Array of user IDs who solved this problem
    companies: string[];
    estimatedTime: string;
    hints?: string[];
}

export interface ProblemsResponse {
    success: boolean;
    data: Problem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface ProblemResponse {
    success: boolean;
    data: Problem;
}

export async function fetchProblems(params?: {
    page?: number;
    limit?: number;
    topicId?: string;
    difficulty?: string;
    status?: string;
    search?: string;
    tags?: string;
    companyTags?: string;
}): Promise<ProblemsResponse> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.topicId) searchParams.append('topicId', params.topicId);
    if (params?.difficulty) searchParams.append('difficulty', params.difficulty);
    if (params?.status) searchParams.append('status', params.status);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.tags) searchParams.append('tags', params.tags);
    if (params?.companyTags) searchParams.append('companyTags', params.companyTags);

    const response = await fetch(`/api/v1/problems?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch problems: ${response.statusText}`);
    }

    return response.json();
}

export async function fetchProblem(problemId: string): Promise<ProblemResponse> {
    const response = await fetch(`/api/v1/problems/${problemId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch problem: ${response.statusText}`);
    }

    return response.json();
}

export interface UserStats {
    total: number;
    solved: number;
    attempted: number;
    unsolved: number;
    completionRate: number;
}

export interface UserStatsResponse {
    success: boolean;
    data: UserStats;
}

export async function fetchUserStats(params?: {
    topicId?: string;
    difficulty?: string;
    tags?: string;
    companies?: string;
}): Promise<UserStatsResponse> {
    const searchParams = new URLSearchParams();

    if (params?.topicId) searchParams.append('topicId', params.topicId);
    if (params?.difficulty) searchParams.append('difficulty', params.difficulty);
    if (params?.tags) searchParams.append('tags', params.tags);
    if (params?.companies) searchParams.append('companies', params.companies);

    const response = await fetch(`/api/v1/user/stats?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch user stats: ${response.statusText}`);
    }

    return response.json();
}
