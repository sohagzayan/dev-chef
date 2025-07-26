# Cookie-Based Authentication System

This document describes the secure cookie-based authentication system implemented for the DevChef application.

## Overview

The authentication system uses HTTP-only cookies for secure token storage with the following security features:

- **HTTP-Only Cookies**: Prevents XSS attacks by making tokens inaccessible to JavaScript
- **Secure Cookies**: HTTPS-only in production
- **SameSite Protection**: Prevents CSRF attacks
- **Automatic Token Refresh**: Seamless user experience
- **Token Revocation**: Secure logout functionality

## Cookie Configuration

### Access Token

- **Name**: `devchef_access_token`
- **Lifetime**: 15 minutes
- **Security**: HTTP-only, secure in production
- **Purpose**: Short-lived token for API authentication

### Refresh Token

- **Name**: `devchef_refresh_token`
- **Lifetime**: 7 days
- **Security**: HTTP-only, secure in production
- **Purpose**: Long-lived token for refreshing access tokens

### Remember Me

- **Name**: `devchef_remember_me`
- **Lifetime**: 30 days
- **Security**: HTTP-only, secure in production
- **Purpose**: Extended session for "Remember Me" functionality

### User Data

- **Name**: `devchef_user`
- **Lifetime**: 7 days
- **Security**: Client-accessible (non-HTTP-only)
- **Purpose**: Store non-sensitive user information for UI

## Security Best Practices

### 1. Token Storage

- Access and refresh tokens are stored in HTTP-only cookies
- User data is stored in client-accessible cookies (non-sensitive info only)
- No sensitive data in localStorage or sessionStorage

### 2. Token Lifetimes

- **Access Token**: 15 minutes (short-lived for security)
- **Refresh Token**: 7 days (longer-lived for convenience)
- **Remember Me**: 30 days (extended sessions)

### 3. Automatic Refresh

- Tokens are automatically refreshed every 14 minutes
- Failed refresh attempts trigger logout
- Seamless user experience with no interruptions

### 4. Token Revocation

- Refresh tokens are revoked on logout
- Old tokens are invalidated when new ones are issued
- Database tracking of revoked tokens

## API Endpoints

### Authentication Endpoints

#### 1. Developer Registration

```
POST /api/v1/auth/developer/register
```

- Creates new user account
- Sets authentication cookies
- Returns user data and tokens
- Redirects to home page after success

#### 2. Developer Login

```
POST /api/v1/auth/developer/login
```

- Authenticates existing user
- Sets authentication cookies
- Supports "Remember Me" functionality
- Redirects to home page after success

#### 3. Token Refresh

```
POST /api/v1/auth/refresh
```

- Refreshes access and refresh tokens
- Accepts refresh token from cookies or request body
- Revokes old refresh token
- Sets new authentication cookies

#### 4. Logout

```
DELETE /api/v1/auth/refresh
```

- Revokes refresh token
- Clears all authentication cookies
- Redirects to home page

## Client-Side Usage

### Authentication Hook

```typescript
import { useAuth } from '@/hooks/client/use-auth';

function MyComponent() {
    const { user, isAuthenticated, isLoading, logout } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <div>Please log in</div>;
    }

    return (
        <div>
            <h1>Welcome, {user?.email}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
```

### Authenticated API Calls

```typescript
import { useAuthenticatedFetch } from '@/hooks/client/use-auth';

function MyComponent() {
    const authenticatedFetch = useAuthenticatedFetch();

    const fetchData = async () => {
        try {
            const response = await authenticatedFetch('/api/protected-endpoint');
            const data = await response.json();
            // Handle data
        } catch (error) {
            // Handle error (authentication failed)
        }
    };
}
```

## Server-Side Usage

### Setting Cookies

```typescript
import { setAuthCookies } from '@/lib/utils/cookies';

// In API route
let response = NextResponse.json({ success: true });
response = setAuthCookies(response, accessToken, refreshToken, rememberMe, userData);
return response;
```

### Reading Cookies

```typescript
import { ServerCookies } from '@/lib/utils/cookies';

// In API route
const accessToken = ServerCookies.getAccessToken(request);
const refreshToken = ServerCookies.getRefreshToken(request);
const userData = ServerCookies.getUserData(request);
```

### Clearing Cookies

```typescript
import { clearAuthCookies } from '@/lib/utils/cookies';

// In logout API route
let response = NextResponse.json({ success: true });
response = clearAuthCookies(response);
return response;
```

## Middleware Protection

The application uses Next.js middleware to protect routes:

### Protected Routes

- `/for-developer/dashboard`
- `/for-developer/profile`
- `/for-developer/settings`
- `/admin`

### Auth Routes

- `/developers/login`
- `/developers/signup`

### Middleware Behavior

1. **Protected Routes**: Redirects to login if no valid token
2. **Auth Routes**: Redirects to dashboard if valid token exists
3. **Token Verification**: Validates tokens and checks user status
4. **Header Injection**: Adds user info to request headers for API routes

## Error Handling

### Common Error Scenarios

1. **Invalid Token**: Redirects to login page
2. **Expired Token**: Automatically attempts refresh
3. **Refresh Failed**: Logs out user and redirects to login
4. **Deactivated Account**: Redirects to login with error message

### Error Responses

```json
{
    "success": false,
    "error": "INVALID_REFRESH_TOKEN",
    "message": "Invalid or expired refresh token"
}
```

## Security Considerations

### 1. XSS Protection

- HTTP-only cookies prevent JavaScript access to tokens
- No sensitive data in client-side storage

### 2. CSRF Protection

- SameSite cookie attribute prevents cross-site requests
- Additional CSRF tokens for sensitive operations

### 3. Token Security

- Short-lived access tokens minimize exposure
- Refresh tokens are revoked on logout
- Database tracking of revoked tokens

### 4. Secure Headers

- HTTPS-only cookies in production
- Proper cookie attributes (httpOnly, secure, sameSite)

## Environment Variables

Required environment variables:

```env
# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key

# Cookie Configuration (optional, defaults provided)
NODE_ENV=production
```

## Migration from localStorage

If migrating from localStorage-based authentication:

1. **Update API calls**: Include `credentials: 'include'`
2. **Remove localStorage calls**: No need to manually store tokens
3. **Update hooks**: Use `useAuth` and `useAuthenticatedFetch`
4. **Test thoroughly**: Verify all authentication flows work

## Best Practices

1. **Always use HTTPS** in production
2. **Set appropriate cookie lifetimes** based on security requirements
3. **Implement proper error handling** for authentication failures
4. **Monitor token refresh** for potential issues
5. **Regular security audits** of authentication flows
6. **Keep dependencies updated** for security patches
