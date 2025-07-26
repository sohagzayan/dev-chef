import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiResponse, PaginatedResponse, RecruiterProfile } from '@/types/redux';
import type { RootState } from '../index';

export const recruitersApi = createApi({
    reducerPath: 'recruitersApi',
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
    tagTypes: ['Recruiters'],
    endpoints: (builder) => ({
        // Get recruiter profile
        getRecruiterProfile: builder.query<ApiResponse<RecruiterProfile>, void>({
            query: () => '/v1/recruiters/profile',
            providesTags: ['Recruiters'],
        }),

        // Update recruiter profile
        updateRecruiterProfile: builder.mutation<
            ApiResponse<RecruiterProfile>,
            Partial<RecruiterProfile>
        >({
            query: (profileData) => ({
                url: '/v1/recruiters/profile',
                method: 'PUT',
                body: profileData,
            }),
            invalidatesTags: ['Recruiters'],
        }),

        // Create recruiter profile
        createRecruiterProfile: builder.mutation<
            ApiResponse<RecruiterProfile>,
            Omit<RecruiterProfile, 'id' | 'userId'>
        >({
            query: (profileData) => ({
                url: '/v1/recruiters/profile',
                method: 'POST',
                body: profileData,
            }),
            invalidatesTags: ['Recruiters'],
        }),

        // Get hiring statistics
        getHiringStats: builder.query<
            ApiResponse<{
                totalCandidates: number;
                activePositions: number;
                successfulHires: number;
                averageTimeToHire: number;
            }>,
            void
        >({
            query: () => '/v1/recruiters/stats',
            providesTags: ['Recruiters'],
        }),

        // Get recent activities
        getRecentActivities: builder.query<
            PaginatedResponse<{
                id: string;
                type: 'profile_view' | 'application' | 'interview_scheduled' | 'offer_sent';
                candidateId: string;
                candidateName: string;
                timestamp: Date;
            }>,
            { page?: number; limit?: number }
        >({
            query: (params) => ({
                url: '/v1/recruiters/activities',
                params,
            }),
            providesTags: ['Recruiters'],
        }),
    }),
});

export const {
    useGetRecruiterProfileQuery,
    useUpdateRecruiterProfileMutation,
    useCreateRecruiterProfileMutation,
    useGetHiringStatsQuery,
    useGetRecentActivitiesQuery,
} = recruitersApi;
