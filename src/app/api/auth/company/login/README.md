# Company Login System

This directory contains the implementation of a secure company login system with proper error handling, secure cookies, and refresh tokens.

## Features

- **Secure Authentication**: JWT-based authentication with access and refresh tokens
- **Role-based Access**: Only users with RECRUITER role can access company login
- **Rate Limiting**: 5 login attempts per 15 minutes to prevent brute force attacks
- **Secure Cookies**: HttpOnly cookies with proper security settings
- **Token Refresh**: Automatic token refresh mechanism
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Professional UI**: Modern, responsive design with proper loading states

## API Endpoints

### POST `/api/auth/company/login`

Company login endpoint for recruiters.

**Request Body:**

```json
{
    "email": "user@company.com",
    "password": "securepassword",
    "rememberMe": false
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "user": {
            "id": "user_id",
            "email": "user@company.com",
            "role": "RECRUITER",
            "profile": {
                "firstName": "John",
                "lastName": "Doe",
                "companyName": "Tech Corp",
                "jobTitle": "HR Manager"
            }
        },
        "accessToken": "jwt_access_token"
    },
    "message": "Login successful"
}
```

### POST `/api/auth/refresh`

Refresh access token using refresh token from cookies.

**Response:**

```json
{
    "success": true,
    "data": {
        "user": {
            /* user data */
        },
        "accessToken": "new_jwt_access_token"
    },
    "message": "Token refreshed successfully"
}
```

### POST `/api/auth/logout`

Logout user and revoke tokens.

**Response:**

```json
{
    "success": true,
    "message": "Logged out successfully"
}
```

## Security Features

### Cookie Security

- **HttpOnly**: Prevents XSS attacks
- **Secure**: HTTPS only in production
- **SameSite**: Lax policy for CSRF protection
- **Path**: Restricted to application path

### Token Management

- **Access Token**: 15 minutes expiry
- **Refresh Token**: 7 days expiry
- **Remember Me**: 30 days for extended sessions
- **Token Revocation**: Proper cleanup on logout

### Rate Limiting

- **Login Attempts**: 5 per 15 minutes
- **IP-based**: Tracks by client IP
- **Automatic Reset**: Window-based limiting

## Client-Side Implementation

### Hooks

- `useCompanyLogin`: Handles login form submission and error states
- `useAuthClient`: Manages authentication state and token refresh

### Components

- `ProtectedCompanyRoute`: Route protection for company pages
- `LoginForm`: Enhanced form with error handling

### Usage Example

```tsx
import { useCompanyLogin } from '@/hooks/client/use-company-login';

function LoginForm() {
    const { login, isLoading, error } = useCompanyLogin();

    const handleSubmit = async (formData) => {
        const success = await login(formData);
        if (success) {
            // Redirect to dashboard
        }
    };
}
```

## Error Handling

### Common Errors

- **Invalid Credentials**: Wrong email/password
- **Account Inactive**: Deactivated user account
- **Access Denied**: Non-recruiter trying to access company login
- **Rate Limited**: Too many login attempts
- **Network Error**: Connection issues

### Error Display

- **Form-level Errors**: General authentication errors with helpful tips
- **Field-level Errors**: Validation errors for specific fields with clear guidance
- **Toast Notifications**: Non-intrusive notifications for success/error states
- **URL Parameter Errors**: Handle errors passed via URL (e.g., from redirects)
- **Loading States**: Clear feedback during authentication process
- **Contextual Tips**: Helpful suggestions based on error type

### Enhanced Error Messages

- **Invalid Credentials**: "The email or password you entered is incorrect. Please try again."
- **Account Inactive**: "Your account has been deactivated. Please contact support for assistance."
- **Access Denied**: "This login is only for company recruiters. If you're a developer, please use the developer login."
- **Rate Limited**: "Too many login attempts. Please wait a few minutes before trying again."
- **Network Error**: "Connection error. Please check your internet connection and try again."
- **Validation Failed**: "Please check your input and try again."
- **Internal Server Error**: "Something went wrong on our end. Please try again later."

## Database Schema

The system uses the existing User and RecruiterProfile models:

```prisma
model User {
  id          String    @id @default(auto()) @map("_id") @db.ObjectId
  email       String    @unique
  password    String?
  role        UserRole
  isActive    Boolean   @default(true)
  lastLoginAt DateTime?
  // ... other fields
}

model RecruiterProfile {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  userId      String   @unique @map("user_id")
  firstName   String   @map("first_name")
  lastName    String   @map("last_name")
  companyName String   @map("company_name")
  jobTitle    String?  @map("job_title")
  // ... other fields
}
```

## Environment Variables

Required environment variables:

```env
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
DATABASE_URL=your_mongodb_connection_string
NODE_ENV=production
```

## Testing

To test the login system:

1. Create a recruiter user in the database
2. Navigate to `/companies/login`
3. Enter valid credentials
4. Verify successful login and redirect to dashboard
5. Test logout functionality
6. Test token refresh by waiting for access token expiry

## Security Best Practices

1. **Password Hashing**: bcrypt with salt rounds
2. **Token Storage**: HttpOnly cookies only
3. **CSRF Protection**: SameSite cookie policy
4. **Rate Limiting**: Prevent brute force attacks
5. **Input Validation**: Zod schema validation
6. **Error Sanitization**: No sensitive data in error messages
7. **Token Revocation**: Proper cleanup on logout
8. **HTTPS Only**: Secure cookies in production
