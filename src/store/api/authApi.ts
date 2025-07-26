import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
    ApiResponse,
    ChangePasswordRequest,
    ForgotPasswordRequest,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    ResetPasswordRequest,
    User,
} from '@/types/redux';
import type { RootState } from '../index';

export const authApi = createApi({
    reducerPath: 'authApi',
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
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        // Login
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),

        // Register
        register: builder.mutation<ApiResponse<User>, RegisterRequest>({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),

        // Logout
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),

        // Refresh token
        refreshToken: builder.mutation<{ accessToken: string }, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
            }),
        }),

        // Forgot password
        forgotPassword: builder.mutation<ApiResponse<void>, ForgotPasswordRequest>({
            query: (data) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: data,
            }),
        }),

        // Reset password
        resetPassword: builder.mutation<ApiResponse<void>, ResetPasswordRequest>({
            query: (data) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: data,
            }),
        }),

        // Change password
        changePassword: builder.mutation<ApiResponse<void>, ChangePasswordRequest>({
            query: (data) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: data,
            }),
        }),

        // Verify token
        verifyToken: builder.query<ApiResponse<User>, void>({
            query: () => '/auth/verify-token',
            providesTags: ['Auth'],
        }),

        // Google OAuth
        googleAuth: builder.mutation<LoginResponse, { code: string }>({
            query: (data) => ({
                url: '/auth/google',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),

        // GitHub OAuth
        githubAuth: builder.mutation<LoginResponse, { code: string }>({
            query: (data) => ({
                url: '/auth/github',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),

        // V1 API endpoints
        v1Login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/v1/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),

        v1Register: builder.mutation<ApiResponse<User>, RegisterRequest>({
            query: (userData) => ({
                url: '/v1/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useRefreshTokenMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useVerifyTokenQuery,
    useGoogleAuthMutation,
    useGithubAuthMutation,
    useV1LoginMutation,
    useV1RegisterMutation,
} = authApi;
