export interface Topic {
    id: string;
    name: string;
    slug: string;
    description?: string;
    difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    type: 'CORE_CS' | 'SPECIALIZED' | 'LANGUAGE' | 'FRAMEWORK' | 'TOOL';
    problemCount: number;
    tags: string[];
    order: number;
}

export interface TopicStats {
    totalTopics: number;
    totalProblems: number;
    topicTypes: Array<{
        type: string;
        count: number;
    }>;
    difficulties: Array<{
        difficulty: string;
        count: number;
    }>;
}

export interface TopicsResponse {
    success: boolean;
    data: Topic[];
    stats: TopicStats;
}

export async function fetchTopics(params?: {
    type?: string;
    difficulty?: string;
    isActive?: boolean;
}): Promise<TopicsResponse> {
    const searchParams = new URLSearchParams();

    if (params?.type) searchParams.append('type', params.type);
    if (params?.difficulty) searchParams.append('difficulty', params.difficulty);
    if (params?.isActive !== undefined) searchParams.append('isActive', params.isActive.toString());

    const response = await fetch(`/api/v1/topics?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch topics: ${response.statusText}`);
    }

    return response.json();
}

export async function fetchTopic(topicId: string): Promise<{ success: boolean; data: Topic }> {
    const response = await fetch(`/api/v1/topics/${topicId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch topic: ${response.statusText}`);
    }

    return response.json();
}
