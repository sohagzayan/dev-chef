import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    addNotification,
    clearNotifications,
    removeNotification,
    setLoading,
    setSidebarOpen,
    setTheme,
    toggleSidebar,
} from '@/store/slices/uiSlice';
import type { Notification } from '@/types/redux';

export const useUI = () => {
    const dispatch = useAppDispatch();
    const { isLoading, sidebarOpen, theme, notifications } = useAppSelector(
        (state: any) => state.ui,
    );

    const handleSetLoading = useCallback(
        (loading: boolean) => {
            dispatch(setLoading(loading));
        },
        [dispatch],
    );

    const handleToggleSidebar = useCallback(() => {
        dispatch(toggleSidebar());
    }, [dispatch]);

    const handleSetSidebarOpen = useCallback(
        (open: boolean) => {
            dispatch(setSidebarOpen(open));
        },
        [dispatch],
    );

    const handleSetTheme = useCallback(
        (newTheme: 'light' | 'dark' | 'system') => {
            dispatch(setTheme(newTheme));
        },
        [dispatch],
    );

    const showNotification = useCallback(
        (notification: Omit<Notification, 'id'>) => {
            dispatch(addNotification(notification));
        },
        [dispatch],
    );

    const hideNotification = useCallback(
        (id: string) => {
            dispatch(removeNotification(id));
        },
        [dispatch],
    );

    const clearAllNotifications = useCallback(() => {
        dispatch(clearNotifications());
    }, [dispatch]);

    // Convenience methods for different notification types
    const showSuccess = useCallback(
        (title: string, message: string, duration = 5000) => {
            showNotification({ type: 'success', title, message, duration });
        },
        [showNotification],
    );

    const showError = useCallback(
        (title: string, message: string, duration = 7000) => {
            showNotification({ type: 'error', title, message, duration });
        },
        [showNotification],
    );

    const showWarning = useCallback(
        (title: string, message: string, duration = 6000) => {
            showNotification({ type: 'warning', title, message, duration });
        },
        [showNotification],
    );

    const showInfo = useCallback(
        (title: string, message: string, duration = 4000) => {
            showNotification({ type: 'info', title, message, duration });
        },
        [showNotification],
    );

    return {
        // State
        isLoading,
        sidebarOpen,
        theme,
        notifications,

        // Actions
        setLoading: handleSetLoading,
        toggleSidebar: handleToggleSidebar,
        setSidebarOpen: handleSetSidebarOpen,
        setTheme: handleSetTheme,
        showNotification,
        hideNotification,
        clearAllNotifications,

        // Convenience methods
        showSuccess,
        showError,
        showWarning,
        showInfo,
    };
};
