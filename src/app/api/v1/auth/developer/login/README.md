# Developer Login API

This API endpoint handles developer login with comprehensive validation, error handling, and security features.

## Endpoint

```
POST /api/v1/auth/developer/login
```

## Request Headers

```
Content-Type: application/json
```

## Request Body

```json
{
    "email": "john.doe@example.com",
    "password": "SecurePass123!",
    "rememberMe": false
}
```

### Field Validation Rules

| Field        | Type    | Required | Validation Rules                             |
| ------------ | ------- | -------- | -------------------------------------------- |
| `email`      | string  | Yes      | Valid email format, automatically lowercased |
| `password`   | string  | Yes      | Non-empty string                             |
| `rememberMe` | boolean | No       | Defaults to false                            |

## Response Format

### Success Response (200 OK)

```json
{
    "success": true,
    "data": {
        "user": {
            "id": "user_id",
            "email": "john.doe@example.com",
            "role": "CANDIDATE",
            "isActive": true,
            "lastLoginAt": "2024-01-01T00:00:00.000Z",
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z",
            "profile": {
                "id": "profile_id",
                "firstName": "John",
                "lastName": "Doe",
                "isOpenToWork": true
                // ... other profile fields
            }
        },
        "accessToken": "jwt_access_token",
        "refreshToken": "jwt_refresh_token",
        "rememberMe": false
    },
    "message": "Login successful! Welcome back!"
}
```

### Error Responses

#### Validation Error (400 Bad Request)

```json
{
    "success": false,
    "error": "VALIDATION_ERROR",
    "message": "Please check your input and try again",
    "errors": {
        "email": ["Please enter a valid email address"],
        "password": ["Password is required"]
    }
}
```

#### Invalid Credentials (401 Unauthorized)

```json
{
    "success": false,
    "error": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
}
```

#### Account Deactivated (401 Unauthorized)

```json
{
    "success": false,
    "error": "ACCOUNT_DEACTIVATED",
    "message": "Account is deactivated. Please contact support."
}
```

#### Rate Limit Exceeded (429 Too Many Requests)

```json
{
    "success": false,
    "error": "Too many requests",
    "message": "Please try again later"
}
```

#### Internal Server Error (500)

```json
{
    "success": false,
    "error": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
}
```

## Security Features

### Rate Limiting

- **Limit**: 10 requests per 15 minutes per IP
- **Window**: 15 minutes
- **Storage**: In-memory (use Redis in production)

### Input Validation

- Comprehensive Zod schema validation
- SQL injection prevention
- XSS protection
- Request size limits (1MB max)

### Password Security

- Secure password comparison using bcrypt
- No password exposure in logs
- Account status verification

### Database Security

- Parameterized queries via Prisma
- Proper error handling
- No sensitive data exposure

## Features

### User Authentication

- Validates user credentials
- Checks account status (active/inactive)
- Updates last login timestamp
- Generates JWT tokens

### Profile Loading

- Loads complete user profile based on role
- Includes skills, experiences, and education for candidates
- Returns role-specific profile data

### Token Management

- Generates access and refresh tokens
- Supports remember me functionality
- Ready for immediate authentication

### Error Handling

- Comprehensive validation errors
- Secure credential error messages
- Account status handling
- Network error handling

## Usage Examples

### JavaScript/TypeScript

```typescript
const loginDeveloper = async (credentials) => {
    const response = await fetch('/api/v1/auth/developer/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    const result = await response.json();

    if (result.success) {
        // Store tokens
        localStorage.setItem('accessToken', result.data.accessToken);
        localStorage.setItem('refreshToken', result.data.refreshToken);

        // Store user data
        localStorage.setItem('user', JSON.stringify(result.data.user));

        // Handle remember me
        if (result.data.rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }

        // Redirect to dashboard
        window.location.href = '/dashboard';
    } else {
        // Handle errors
        console.error('Login failed:', result.message);
    }
};
```

### cURL

```bash
curl -X POST http://localhost:3001/api/v1/auth/developer/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123!",
    "rememberMe": false
  }'
```

## Testing

Use the included test file `test.ts` to verify API functionality:

```bash
# Run tests (if Node.js environment)
node src/app/api/v1/auth/developer/login/test.ts
```

## Dependencies

- **bcryptjs**: Password comparison
- **zod**: Schema validation
- **prisma**: Database operations
- **jsonwebtoken**: Token generation

## Environment Variables

Ensure these are set in your `.env` file:

```env
DATABASE_URL="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret_key"
```

## Notes

- Email addresses are automatically lowercased and trimmed
- Passwords are compared securely using bcrypt
- Account status is verified before login
- Last login timestamp is updated on successful login
- Rate limiting is IP-based and resets every 15 minutes
- Remember me functionality is supported but optional
- All database operations use parameterized queries
