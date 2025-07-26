import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AdminUser, ApiResponse, PaginatedResponse } from '@/types/redux';
import type { RootState } from '../index';

export const adminApi = createApi({
    reducerPath: 'adminApi',
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
    tagTypes: ['Admin'],
    endpoints: (builder) => ({
        // Get all users (admin only)
        getUsers: builder.query<PaginatedResponse<AdminUser>, { page?: number; limit?: number }>({
            query: (params) => ({
                url: '/v1/admin/users',
                params,
            }),
            providesTags: ['Admin'],
        }),

        // Get user by ID (admin only)
        getUserById: builder.query<ApiResponse<AdminUser>, string>({
            query: (userId) => `/v1/admin/users/${userId}`,
            providesTags: (result, error, userId) => [{ type: 'Admin', id: userId }],
        }),

        // Update user (admin only)
        updateUser: builder.mutation<
            ApiResponse<AdminUser>,
            { userId: string; data: Partial<AdminUser> }
        >({
            query: ({ userId, data }) => ({
                url: `/v1/admin/users/${userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: 'Admin', id: userId },
                'Admin',
            ],
        }),

        // Delete user (admin only)
        deleteUser: builder.mutation<ApiResponse<void>, string>({
            query: (userId) => ({
                url: `/v1/admin/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Admin'],
        }),

        // Activate/Deactivate user (admin only)
        toggleUserStatus: builder.mutation<
            ApiResponse<AdminUser>,
            { userId: string; isActive: boolean }
        >({
            query: ({ userId, isActive }) => ({
                url: `/v1/admin/users/${userId}/status`,
                method: 'PATCH',
                body: { isActive },
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: 'Admin', id: userId },
                'Admin',
            ],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useToggleUserStatusMutation,
} = adminApi;
