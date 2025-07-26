# Developer Registration API

This API endpoint handles developer registration with comprehensive validation, error handling, and security features.

## Endpoint

```
POST /api/v1/auth/developer/register
```

## Request Headers

```
Content-Type: application/json
```

## Request Body

```json
{
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!",
    "agreeToTerms": true,
    "subscribeNewsletter": false
}
```

### Field Validation Rules

| Field                 | Type    | Required | Validation Rules                                        |
| --------------------- | ------- | -------- | ------------------------------------------------------- |
| `fullName`            | string  | Yes      | 2-100 characters, letters and spaces only               |
| `email`               | string  | Yes      | Valid email format, automatically lowercased            |
| `password`            | string  | Yes      | Min 8 chars, uppercase, lowercase, number, special char |
| `confirmPassword`     | string  | Yes      | Must match password exactly                             |
| `agreeToTerms`        | boolean | Yes      | Must be true                                            |
| `subscribeNewsletter` | boolean | No       | Defaults to false                                       |

## Response Format

### Success Response (201 Created)

```json
{
    "success": true,
    "data": {
        "user": {
            "id": "user_id",
            "email": "john.doe@example.com",
            "role": "CANDIDATE",
            "isActive": true,
            "lastLoginAt": null,
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
        "refreshToken": "jwt_refresh_token"
    },
    "message": "Account created successfully! Welcome to DevChef!"
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
        "password": ["Password must contain at least one uppercase letter"]
    }
}
```

#### Email Already Exists (409 Conflict)

```json
{
    "success": false,
    "error": "EMAIL_EXISTS",
    "message": "An account with this email already exists"
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

- **Limit**: 5 requests per 15 minutes per IP
- **Window**: 15 minutes
- **Storage**: In-memory (use Redis in production)

### Input Validation

- Comprehensive Zod schema validation
- SQL injection prevention
- XSS protection
- Request size limits (1MB max)

### Password Security

- Bcrypt hashing with salt rounds of 12
- Strong password requirements
- Secure token generation

### Database Security

- Transaction-based operations
- Proper error handling
- No sensitive data exposure

## Features

### User Creation

- Creates base user record with CANDIDATE role
- Creates associated candidate profile
- Sets default values (isOpenToWork: true)

### Email Integration

- Sends welcome email (non-blocking)
- Graceful handling of email failures
- Doesn't affect registration success

### Authentication

- Generates JWT access and refresh tokens
- Stores tokens in response for client storage
- Ready for immediate authentication

### Error Handling

- Comprehensive validation errors
- Database constraint handling
- Network error handling
- Consistent error response format

## Usage Examples

### JavaScript/TypeScript

```typescript
const registerDeveloper = async (userData) => {
    const response = await fetch('/api/v1/auth/developer/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (result.success) {
        // Store tokens
        localStorage.setItem('accessToken', result.data.accessToken);
        localStorage.setItem('refreshToken', result.data.refreshToken);

        // Redirect to dashboard
        window.location.href = '/dashboard';
    } else {
        // Handle errors
        console.error('Registration failed:', result.message);
    }
};
```

### cURL

```bash
curl -X POST http://localhost:3000/api/v1/auth/developer/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!",
    "agreeToTerms": true
  }'
```

## Testing

Use the included test file `test.ts` to verify API functionality:

```bash
# Run tests (if Node.js environment)
node src/app/api/v1/auth/developer/register/test.ts
```

## Dependencies

- **bcryptjs**: Password hashing
- **zod**: Schema validation
- **prisma**: Database operations
- **framer-motion**: UI animations (client-side)

## Environment Variables

Ensure these are set in your `.env` file:

```env
DATABASE_URL="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret_key"
SMTP_HOST="your_smtp_host"
SMTP_PORT="587"
SMTP_USER="your_smtp_username"
SMTP_PASS="your_smtp_password"
```

## Notes

- The API automatically splits fullName into firstName and lastName
- Email addresses are automatically lowercased and trimmed
- Passwords are validated against multiple criteria
- All database operations are wrapped in transactions
- Email sending is non-blocking and won't fail registration
- Rate limiting is IP-based and resets every 15 minutes
