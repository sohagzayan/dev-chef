import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { UpdateProfileRequest, User } from '@/types/redux';
import type { RootState } from '../index';

export const userApi = createApi({
    reducerPath: 'userApi',
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
    tagTypes: ['User'],
    endpoints: (builder) => ({
        // Get user profile
        getProfile: builder.query<{ user: User }, void>({
            query: () => '/user/profile',
            providesTags: ['User'],
        }),

        // Update user profile
        updateProfile: builder.mutation<{ message: string; user: User }, UpdateProfileRequest>({
            query: (profileData) => ({
                url: '/user/profile',
                method: 'PUT',
                body: profileData,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;
