import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { adminApi } from './api/adminApi';
import { authApi } from './api/authApi';
import { candidatesApi } from './api/candidatesApi';
import { checkoutApi } from './api/checkoutApi';
import { recruitersApi } from './api/recruitersApi';
import { userApi } from './api/userApi';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        // API slices
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [candidatesApi.reducerPath]: candidatesApi.reducer,
        [recruitersApi.reducerPath]: recruitersApi.reducer,
        [checkoutApi.reducerPath]: checkoutApi.reducer,

        // Regular slices
        auth: authReducer,
        ui: uiReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }).concat(
            authApi.middleware,
            userApi.middleware,
            adminApi.middleware,
            candidatesApi.middleware,
            recruitersApi.middleware,
            checkoutApi.middleware,
        ),

    devTools: process.env.NODE_ENV !== 'production',
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
