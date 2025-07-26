# Redux Store Setup with RTK Query

This directory contains the complete Redux setup for the application using Redux Toolkit and RTK Query for efficient state management and API calls.

## 📁 Directory Structure

```
src/store/
├── index.ts                 # Main store configuration
├── hooks.ts                 # Typed Redux hooks
├── api/                     # RTK Query API slices
│   ├── baseApi.ts          # Base API configuration
│   ├── authApi.ts          # Authentication endpoints
│   ├── userApi.ts          # User profile endpoints
│   ├── adminApi.ts         # Admin-specific endpoints
│   ├── candidatesApi.ts    # Candidate endpoints
│   ├── recruitersApi.ts    # Recruiter endpoints
│   └── checkoutApi.ts      # Payment/checkout endpoints
├── slices/                  # Redux slices
│   ├── authSlice.ts        # Authentication state
│   └── uiSlice.ts          # UI state (loading, sidebar, notifications)
└── README.md               # This file
```

## 🚀 Quick Start

### 1. Provider Setup

Wrap your app with the Redux provider in your root layout:

```tsx
// app/layout.tsx
import { ReduxProvider } from '@/components/providers/ReduxProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}
```

### 2. Using Redux Hooks

```tsx
import { useAuth } from '@/hooks/redux/useAuth';
import { useUI } from '@/hooks/redux/useUI';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

function MyComponent() {
    // Use typed hooks
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    // Use custom hooks
    const { login, logout, isAuthenticated } = useAuth();
    const { showSuccess, showError, isLoading } = useUI();

    // Your component logic
}
```

## 🔧 API Endpoints

### Authentication (`authApi`)

- `useLoginMutation()` - User login
- `useRegisterMutation()` - User registration
- `useLogoutMutation()` - User logout
- `useRefreshTokenMutation()` - Refresh access token
- `useForgotPasswordMutation()` - Forgot password
- `useResetPasswordMutation()` - Reset password
- `useChangePasswordMutation()` - Change password
- `useVerifyTokenQuery()` - Verify token validity
- `useGoogleAuthMutation()` - Google OAuth
- `useGithubAuthMutation()` - GitHub OAuth

### User Profile (`userApi`)

- `useGetProfileQuery()` - Get user profile
- `useUpdateProfileMutation()` - Update user profile

### Admin (`adminApi`)

- `useGetUsersQuery()` - Get all users (paginated)
- `useGetUserByIdQuery()` - Get specific user
- `useUpdateUserMutation()` - Update user
- `useDeleteUserMutation()` - Delete user
- `useToggleUserStatusMutation()` - Activate/deactivate user

### Candidates (`candidatesApi`)

- `useGetCandidateProfileQuery()` - Get candidate profile
- `useUpdateCandidateProfileMutation()` - Update candidate profile
- `useCreateCandidateProfileMutation()` - Create candidate profile
- `useUploadResumeMutation()` - Upload resume
- `useSearchCandidatesQuery()` - Search candidates

### Recruiters (`recruitersApi`)

- `useGetRecruiterProfileQuery()` - Get recruiter profile
- `useUpdateRecruiterProfileMutation()` - Update recruiter profile
- `useCreateRecruiterProfileMutation()` - Create recruiter profile
- `useGetHiringStatsQuery()` - Get hiring statistics
- `useGetRecentActivitiesQuery()` - Get recent activities

### Checkout (`checkoutApi`)

- `useCreateCheckoutSessionMutation()` - Create checkout session
- `useGetCheckoutSessionQuery()` - Get session status
- `useGetSubscriptionStatusQuery()` - Get subscription status
- `useCancelSubscriptionMutation()` - Cancel subscription
- `useReactivateSubscriptionMutation()` - Reactivate subscription
- `useGetBillingHistoryQuery()` - Get billing history

## 🎯 State Management

### Authentication State

```typescript
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    accessToken: string | null;
}
```

### UI State

```typescript
interface UIState {
    isLoading: boolean;
    sidebarOpen: boolean;
    theme: 'light' | 'dark' | 'system';
    notifications: Notification[];
}
```

## 🔄 RTK Query Features

### Automatic Caching

- All queries are automatically cached
- Cache invalidation through tags
- Optimistic updates for mutations

### Loading States

```tsx
const { data, isLoading, isFetching, error } = useGetProfileQuery();
```

### Mutations with Optimistic Updates

```tsx
const [updateProfile, { isLoading }] = useUpdateProfileMutation();

const handleUpdate = async (data) => {
    try {
        await updateProfile(data).unwrap();
        showSuccess('Success', 'Profile updated successfully');
    } catch (error) {
        showError('Error', 'Failed to update profile');
    }
};
```

## 🎨 Custom Hooks

### useAuth Hook

```tsx
const { user, isAuthenticated, isLoading, error, login, register, logout, clearError } = useAuth();
```

### useUI Hook

```tsx
const {
    isLoading,
    sidebarOpen,
    theme,
    notifications,
    setLoading,
    toggleSidebar,
    setTheme,
    showSuccess,
    showError,
    showWarning,
    showInfo,
} = useUI();
```

## 🔐 Error Handling

### Global Error Handling

The base API configuration includes automatic error handling for:

- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 500+ Server Errors

### Custom Error Handling

```tsx
const [login, { error }] = useLoginMutation();

if (error) {
    // Handle specific error
    console.error('Login failed:', error);
}
```

## 📱 Notifications System

### Display Notifications

```tsx
const { showSuccess, showError, showWarning, showInfo } = useUI();

// Usage
showSuccess('Success', 'Operation completed successfully');
showError('Error', 'Something went wrong');
showWarning('Warning', 'Please check your input');
showInfo('Info', 'Here is some information');
```

### Notification Component

Add the `NotificationToast` component to your layout to display notifications:

```tsx
import { NotificationToast } from '@/components/ui/NotificationToast';

function Layout() {
    return (
        <div>
            {/* Your app content */}
            <NotificationToast />
        </div>
    );
}
```

## 🏗️ Best Practices

### 1. Type Safety

- Always use typed hooks (`useAppDispatch`, `useAppSelector`)
- Define proper TypeScript interfaces for all data structures
- Use the provided type definitions in `@/types/redux`

### 2. Performance

- Use RTK Query's automatic caching
- Implement proper cache invalidation with tags
- Use `skip` option for conditional queries

### 3. Error Handling

- Always handle errors in mutations
- Use the notification system for user feedback
- Implement proper loading states

### 4. Code Organization

- Keep API slices focused on specific domains
- Use custom hooks for complex logic
- Separate concerns between API calls and UI state

## 🔄 Adding New Endpoints

### 1. Create API Slice

```tsx
// store/api/newApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newApi = createApi({
    reducerPath: 'newApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['New'],
    endpoints: (builder) => ({
        getData: builder.query<DataType, void>({
            query: () => '/new-endpoint',
            providesTags: ['New'],
        }),
        updateData: builder.mutation<DataType, UpdateDataRequest>({
            query: (data) => ({
                url: '/new-endpoint',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['New'],
        }),
    }),
});
```

### 2. Add to Store

```tsx
// store/index.ts
import { newApi } from './api/newApi';

export const store = configureStore({
    reducer: {
        [newApi.reducerPath]: newApi.reducer,
        // ... other reducers
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(newApi.middleware),
});
```

### 3. Export Hooks

```tsx
// store/api/newApi.ts
export const { useGetDataQuery, useUpdateDataMutation } = newApi;
```

## 🧪 Testing

### Testing Redux Components

```tsx
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';

function renderWithRedux(component: React.ReactElement) {
    return render(<Provider store={store}>{component}</Provider>);
}
```

### Testing API Calls

```tsx
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
    rest.get('/api/user/profile', (req, res, ctx) => {
        return res(ctx.json({ user: mockUser }));
    }),
);
```

## 📚 Additional Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [React Redux Hooks](https://react-redux.js.org/api/hooks)
- [TypeScript with Redux](https://redux-toolkit.js.org/usage/usage-with-typescript)
