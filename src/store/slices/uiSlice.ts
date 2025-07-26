import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Notification, UIState } from '@/types/redux';

const initialState: UIState = {
    isLoading: false,
    sidebarOpen: false,
    theme: 'system',
    notifications: [],
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload;
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
            state.theme = action.payload;
        },
        addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
            const id = Date.now().toString();
            state.notifications.push({ ...action.payload, id });
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== action.payload,
            );
        },
        clearNotifications: (state) => {
            state.notifications = [];
        },
    },
});

export const {
    setLoading,
    toggleSidebar,
    setSidebarOpen,
    setTheme,
    addNotification,
    removeNotification,
    clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;
