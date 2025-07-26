# Authentication System Documentation

## Overview

This document describes the comprehensive authentication system implemented for the DevChef application. The system provides secure authentication for both developers and companies with automatic session management, redirect handling, and session expiry notifications.

## Features

### 🔐 Multi-User Type Support

- **Developers**: Individual users who practice coding and prepare for interviews
- **Companies/Recruiters**: Enterprise users who hire developers
- **Admins**: System administrators with full access

### 🔄 Dynamic Session Management

- Automatic token refresh every 14 minutes
- Session expiry detection and user notification
- Secure cookie-based token storage
- Automatic logout on session expiry

### 🚀 Smart Redirect System

- Remembers the page user was trying to access before login
- Redirects authenticated users away from login pages
- Role-based access control and redirects
- Automatic redirect to appropriate dashboard after login

### 🛡️ Security Features

- HTTP-only cookies for token storage
- Automatic token revocation on logout
- Role-based route protection
- Session expiry popup notifications

## Architecture

### Components

1. **AuthContext** (`src/context/AuthContext.tsx`)

    - Central authentication state management
    - Provides login, logout, and session refresh functions
    - Handles automatic redirects and session expiry

2. **SessionExpiryModal** (`src/components/ui/session-expiry-modal.tsx`)

    - Shows when user session expires
    - Provides options to refresh session or login again

3. **Updated Navbar** (`src/components/client/common/Navbar/Navbar.tsx`)

    - Dynamic authentication state display
    - Smart sign-in/sign-up button routing
    - User type detection and display

4. **Middleware** (`src/middleware.ts`)
    - Route protection and authentication checks
    - Automatic redirects for unauthenticated users
    - Role-based access control

### API Routes

1. **Login Routes**

    - `/api/v1/auth/developer/login` - Developer authentication
    - `/api/auth/company/login` - Company authentication

2. **Session Management**
    - `/api/v1/auth/refresh` - Token refresh
    - `/api/v1/auth/logout` - Logout and token revocation

## Usage

### Setting Up Authentication

1. **Wrap your app with AuthProvider** (already done in `src/app/layout.tsx`):

```tsx
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <ReduxProvider>
                    <AuthProvider>
                        <Navbar />
                        {children}
                        <FooterSection />
                    </AuthProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
```

2. **Use the useAuth hook in components**:

```tsx
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
    const { user, isAuthenticated, login, logout } = useAuth();

    // Your component logic
}
```

### Login Flow

1. **User visits protected page** → Middleware redirects to login
2. **User fills login form** → AuthContext handles authentication
3. **Login successful** → User redirected to original page or dashboard
4. **Session management** → Automatic token refresh every 14 minutes

### Logout Flow

1. **User clicks logout** → AuthContext calls logout API
2. **Server revokes tokens** → Clears all authentication cookies
3. **Client clears state** → Redirects to home page

### Session Expiry Flow

1. **Token expires** → AuthContext detects failed refresh
2. **Session expiry modal** → Shows popup to user
3. **User chooses action** → Refresh session or login again

## Route Protection

### Protected Routes

- `/for-developer/dashboard` - Developer dashboard
- `/for-developer/profile` - Developer profile
- `/for-developer/settings` - Developer settings
- `/companies/dashboard` - Company dashboard
- `/admin/*` - Admin routes

### Auth Routes (Redirect if authenticated)

- `/developers/login` - Developer login
- `/developers/signup` - Developer signup
- `/companies/login` - Company login
- `/companies/trial` - Company trial signup
- `/access-account` - General signup

### Public Routes

- `/` - Home page
- `/blog` - Blog
- `/products` - Products
- `/pricing` - Pricing
- `/support` - Support
- `/whats-new` - What's new
- `/customers` - Customer stories

## User Types and Roles

### Developer Users

- **Role**: `CANDIDATE`
- **Access**: Developer dashboard, coding challenges, interview prep
- **Login**: `/developers/login`
- **Dashboard**: `/for-developer/dashboard`

### Company Users

- **Role**: `RECRUITER`
- **Access**: Company dashboard, candidate management, hiring tools
- **Login**: `/companies/login`
- **Dashboard**: `/companies/dashboard`

### Admin Users

- **Role**: `ADMIN`
- **Access**: System administration, user management
- **Login**: `/developers/login` (with admin role)
- **Dashboard**: `/admin/*`

## Security Best Practices

### Token Management

- Access tokens expire in 15 minutes
- Refresh tokens expire in 7 days
- Remember me extends session to 30 days
- Automatic token refresh prevents session interruption

### Cookie Security

- HTTP-only cookies prevent XSS attacks
- Secure cookies in production
- SameSite protection against CSRF
- Automatic cookie clearing on logout

### Route Protection

- Server-side middleware validation
- Role-based access control
- Automatic redirects for unauthorized access
- Protection against direct URL access

## Error Handling

### Common Error Scenarios

1. **Invalid credentials** → Clear error message
2. **Account deactivated** → Contact support message
3. **Session expired** → Automatic popup with refresh option
4. **Access denied** → Role-based error messages
5. **Network errors** → Retry mechanism

### Error Recovery

- Automatic session refresh on 401 errors
- Graceful fallback to login page
- User-friendly error messages
- Retry mechanisms for network issues

## Testing

### Manual Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Access protected routes without authentication
- [ ] Access auth routes when authenticated
- [ ] Session expiry and refresh
- [ ] Logout functionality
- [ ] Role-based access control
- [ ] Redirect after login
- [ ] Remember me functionality

### Automated Testing

- Unit tests for AuthContext
- Integration tests for API routes
- E2E tests for login/logout flows
- Middleware route protection tests

## Troubleshooting

### Common Issues

1. **Session not persisting**

    - Check cookie settings
    - Verify token refresh is working
    - Check browser console for errors

2. **Redirect loops**

    - Verify middleware configuration
    - Check route protection rules
    - Ensure proper role assignments

3. **Login not working**
    - Check API endpoint configuration
    - Verify database user records
    - Check authentication service logs

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` and checking browser console for authentication-related logs.

## Future Enhancements

### Planned Features

- Two-factor authentication (2FA)
- Social login integration
- Password reset functionality
- Account verification emails
- Session analytics and monitoring
- Advanced role permissions
- API rate limiting
- Audit logging

### Performance Optimizations

- Token caching strategies
- Optimistic UI updates
- Background session validation
- Lazy loading of auth components

## Support

For authentication-related issues:

1. Check this documentation
2. Review browser console for errors
3. Check server logs for API errors
4. Contact the development team

---

**Last Updated**: December 2024
**Version**: 1.0.0
