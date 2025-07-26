import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiResponse, CandidateProfile, PaginatedResponse } from '@/types/redux';
import type { RootState } from '../index';

export const candidatesApi = createApi({
    reducerPath: 'candidatesApi',
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
    tagTypes: ['Candidates'],
    endpoints: (builder) => ({
        // Get candidate profile
        getCandidateProfile: builder.query<ApiResponse<CandidateProfile>, void>({
            query: () => '/v1/candidates/profile',
            providesTags: ['Candidates'],
        }),

        // Update candidate profile
        updateCandidateProfile: builder.mutation<
            ApiResponse<CandidateProfile>,
            Partial<CandidateProfile>
        >({
            query: (profileData) => ({
                url: '/v1/candidates/profile',
                method: 'PUT',
                body: profileData,
            }),
            invalidatesTags: ['Candidates'],
        }),

        // Create candidate profile
        createCandidateProfile: builder.mutation<
            ApiResponse<CandidateProfile>,
            Omit<CandidateProfile, 'id' | 'userId'>
        >({
            query: (profileData) => ({
                url: '/v1/candidates/profile',
                method: 'POST',
                body: profileData,
            }),
            invalidatesTags: ['Candidates'],
        }),

        // Upload resume
        uploadResume: builder.mutation<ApiResponse<{ resumeUrl: string }>, FormData>({
            query: (formData) => ({
                url: '/v1/candidates/resume',
                method: 'POST',
                body: formData,
                headers: {
                    // Don't set Content-Type for FormData
                },
            }),
            invalidatesTags: ['Candidates'],
        }),

        // Search candidates (for recruiters)
        searchCandidates: builder.query<
            PaginatedResponse<CandidateProfile>,
            {
                skills?: string[];
                experience?: number;
                location?: string;
                page?: number;
                limit?: number;
            }
        >({
            query: (params) => ({
                url: '/v1/candidates/search',
                params,
            }),
            providesTags: ['Candidates'],
        }),
    }),
});

export const {
    useGetCandidateProfileQuery,
    useUpdateCandidateProfileMutation,
    useCreateCandidateProfileMutation,
    useUploadResumeMutation,
    useSearchCandidatesQuery,
} = candidatesApi;
