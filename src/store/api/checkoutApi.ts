import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiResponse, CheckoutSession, CreateCheckoutSessionRequest } from '@/types/redux';
import type { RootState } from '../index';

export const checkoutApi = createApi({
    reducerPath: 'checkoutApi',
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
    tagTypes: ['Checkout'],
    endpoints: (builder) => ({
        // Create checkout session
        createCheckoutSession: builder.mutation<CheckoutSession, CreateCheckoutSessionRequest>({
            query: (checkoutData) => ({
                url: '/create-checkout-session',
                method: 'POST',
                body: checkoutData,
            }),
            invalidatesTags: ['Checkout'],
        }),

        // Get checkout session status
        getCheckoutSession: builder.query<ApiResponse<CheckoutSession>, string>({
            query: (sessionId) => `/checkout/session/${sessionId}`,
            providesTags: (result, error, sessionId) => [{ type: 'Checkout', id: sessionId }],
        }),

        // Get user's subscription status
        getSubscriptionStatus: builder.query<
            ApiResponse<{
                isActive: boolean;
                plan: string;
                currentPeriodEnd: Date;
                cancelAtPeriodEnd: boolean;
            }>,
            void
        >({
            query: () => '/checkout/subscription',
            providesTags: ['Checkout'],
        }),

        // Cancel subscription
        cancelSubscription: builder.mutation<ApiResponse<void>, void>({
            query: () => ({
                url: '/checkout/subscription/cancel',
                method: 'POST',
            }),
            invalidatesTags: ['Checkout'],
        }),

        // Reactivate subscription
        reactivateSubscription: builder.mutation<ApiResponse<void>, void>({
            query: () => ({
                url: '/checkout/subscription/reactivate',
                method: 'POST',
            }),
            invalidatesTags: ['Checkout'],
        }),

        // Get billing history
        getBillingHistory: builder.query<
            ApiResponse<
                {
                    id: string;
                    amount: number;
                    currency: string;
                    status: string;
                    createdAt: Date;
                    description: string;
                }[]
            >,
            void
        >({
            query: () => '/checkout/billing-history',
            providesTags: ['Checkout'],
        }),
    }),
});

export const {
    useCreateCheckoutSessionMutation,
    useGetCheckoutSessionQuery,
    useGetSubscriptionStatusQuery,
    useCancelSubscriptionMutation,
    useReactivateSubscriptionMutation,
    useGetBillingHistoryQuery,
} = checkoutApi;
