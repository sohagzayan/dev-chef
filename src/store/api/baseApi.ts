import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';

// Base API configuration
export const baseApi = createApi({
    reducerPath: 'baseApi',
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
    endpoints: () => ({}),
    tagTypes: ['User', 'Auth', 'Admin', 'Candidates', 'Recruiters', 'Checkout'],
});

// Error handling utility
export const handleApiError = (error: any) => {
    if (error?.status === 401) {
        // Handle unauthorized access
        return { error: 'Unauthorized access. Please login again.' };
    }

    if (error?.status === 403) {
        return { error: 'Access forbidden. You do not have permission for this action.' };
    }

    if (error?.status === 404) {
        return { error: 'Resource not found.' };
    }

    if (error?.status >= 500) {
        return { error: 'Server error. Please try again later.' };
    }

    return { error: error?.data?.error || 'An unexpected error occurred.' };
};
