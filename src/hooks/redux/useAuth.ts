import { useCallback } from 'react';
import { useLoginMutation, useLogoutMutation, useRegisterMutation } from '@/store/api/authApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    clearError,
    logout as logoutAction,
    setAccessToken,
    setUser,
} from '@/store/slices/authSlice';
import type { LoginRequest, RegisterRequest } from '@/types/redux';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, isAuthenticated, isLoading, error, accessToken } = useAppSelector(
        (state) => state.auth,
    );

    const [login, { isLoading: isLoginLoading }] = useLoginMutation();
    const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
    const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

    const handleLogin = useCallback(
        async (credentials: LoginRequest) => {
            try {
                const result = await login(credentials).unwrap();
                dispatch(setUser(result.user));
                dispatch(setAccessToken(result.accessToken));
                return { success: true, data: result };
            } catch (error: any) {
                const errorMessage = error?.data?.error || 'Login failed';
                return { success: false, error: errorMessage };
            }
        },
        [login, dispatch],
    );

    const handleRegister = useCallback(
        async (userData: RegisterRequest) => {
            try {
                const result = await register(userData).unwrap();
                return { success: true, data: result };
            } catch (error: any) {
                const errorMessage = error?.data?.error || 'Registration failed';
                return { success: false, error: errorMessage };
            }
        },
        [register],
    );

    const handleLogout = useCallback(async () => {
        try {
            await logout().unwrap();
        } catch (error) {
            // Even if logout API fails, clear local state
            console.error('Logout API error:', error);
        } finally {
            dispatch(logoutAction());
        }
    }, [logout, dispatch]);

    const clearAuthError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    return {
        // State
        user,
        isAuthenticated,
        isLoading: isLoading || isLoginLoading || isRegisterLoading || isLogoutLoading,
        error,
        accessToken,

        // Actions
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        clearError: clearAuthError,
    };
};
