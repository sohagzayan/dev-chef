import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Problem, ProblemsResponse, UserStatsResponse } from '@/lib/api/problems';
import type { Topic, TopicsResponse } from '@/lib/api/topics';
import type { RootState } from '../index';

export const problemsApi = createApi({
    reducerPath: 'problemsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.accessToken;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Problems', 'Topics', 'UserStats'],
    endpoints: (builder) => ({
        // Get problems with filters
        getProblems: builder.query<
            ProblemsResponse,
            {
                page?: number;
                limit?: number;
                topicId?: string;
                difficulty?: string;
                status?: string;
                search?: string;
                tags?: string;
                companyTags?: string;
            }
        >({
            query: (params) => {
                const searchParams = new URLSearchParams();

                if (params.page) searchParams.append('page', params.page.toString());
                if (params.limit) searchParams.append('limit', params.limit.toString());
                if (params.topicId) searchParams.append('topicId', params.topicId);
                if (params.difficulty) searchParams.append('difficulty', params.difficulty);
                if (params.status) searchParams.append('status', params.status);
                if (params.search) searchParams.append('search', params.search);
                if (params.tags) searchParams.append('tags', params.tags);
                if (params.companyTags) searchParams.append('companyTags', params.companyTags);

                return {
                    url: `/v1/problems?${searchParams.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['Problems'],
        }),

        // Get single problem
        getProblem: builder.query<{ success: boolean; data: Problem }, string>({
            query: (problemId) => `/v1/problems/${problemId}`,
            providesTags: (result, error, problemId) => [{ type: 'Problems', id: problemId }],
        }),

        // Get user stats
        getUserStats: builder.query<
            UserStatsResponse,
            {
                topicId?: string;
                difficulty?: string;
                tags?: string;
                companies?: string;
            }
        >({
            query: (params) => {
                const searchParams = new URLSearchParams();

                if (params.topicId) searchParams.append('topicId', params.topicId);
                if (params.difficulty) searchParams.append('difficulty', params.difficulty);
                if (params.tags) searchParams.append('tags', params.tags);
                if (params.companies) searchParams.append('companies', params.companies);

                return {
                    url: `/v1/user/stats?${searchParams.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['UserStats'],
        }),

        // Get general problem stats (for non-authenticated users)
        getGeneralStats: builder.query<
            UserStatsResponse,
            {
                topicId?: string;
                difficulty?: string;
                tags?: string;
                companies?: string;
            }
        >({
            query: (params) => {
                const searchParams = new URLSearchParams();

                if (params.topicId) searchParams.append('topicId', params.topicId);
                if (params.difficulty) searchParams.append('difficulty', params.difficulty);
                if (params.tags) searchParams.append('tags', params.tags);
                if (params.companies) searchParams.append('companies', params.companies);

                return {
                    url: `/v1/problems/stats?${searchParams.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['UserStats'],
        }),

        // Get topics
        getTopics: builder.query<
            TopicsResponse,
            {
                type?: string;
                difficulty?: string;
                isActive?: boolean;
            }
        >({
            query: (params) => {
                const searchParams = new URLSearchParams();

                if (params.type) searchParams.append('type', params.type);
                if (params.difficulty) searchParams.append('difficulty', params.difficulty);
                if (params.isActive !== undefined)
                    searchParams.append('isActive', params.isActive.toString());

                return {
                    url: `/v1/topics?${searchParams.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['Topics'],
        }),

        // Get single topic
        getTopic: builder.query<{ success: boolean; data: Topic }, string>({
            query: (topicId) => `/v1/topics/${topicId}`,
            providesTags: (result, error, topicId) => [{ type: 'Topics', id: topicId }],
        }),
    }),
});

export const {
    useGetProblemsQuery,
    useGetProblemQuery,
    useGetUserStatsQuery,
    useGetGeneralStatsQuery,
    useGetTopicsQuery,
    useGetTopicQuery,
} = problemsApi;
