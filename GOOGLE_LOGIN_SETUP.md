# Google OAuth Login Setup

This guide explains how to set up Google OAuth login for the application.

## Prerequisites

1. A Google Cloud Console project
2. OAuth 2.0 credentials configured

## Setup Steps

### 1. Google Cloud Console Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API
4. Go to "Credentials" in the left sidebar
5. Click "Create Credentials" → "OAuth 2.0 Client IDs"
6. Choose "Web application" as the application type
7. Add authorized redirect URIs:
    - `http://localhost:3000/api/auth/google/callback?userType=developer` (for development)
    - `http://localhost:3000/api/auth/google/callback?userType=company` (for development)
    - `https://yourdomain.com/api/auth/google/callback?userType=developer` (for production)
    - `https://yourdomain.com/api/auth/google/callback?userType=company` (for production)
8. Copy the Client ID and Client Secret

### 2. Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your_google_client_id"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Other required variables
DATABASE_URL="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret_key"
JWT_REFRESH_SECRET="your_jwt_refresh_secret_key"
```

### 3. Database Schema

Make sure your Prisma schema includes the Account model for OAuth providers:

```prisma
model Account {
  id                String  @id @default(auto()) @map("_id") @db.ObjectId
  userId            String  @map("user_id")
  type              String
  provider          String
  providerAccountId String  @map("provider_account_id")
  refresh_token     String? @map("refresh_token")
  access_token      String? @map("access_token")
  expires_at        Int?
  token_type        String? @map("token_type")
  scope             String?
  id_token          String? @map("id_token")
  session_state     String? @map("session_state")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}
```

### 4. Testing

1. Start your development server: `npm run dev`
2. Navigate to `/developers/login` or `/companies/login`
3. Click the Google login button
4. Complete the OAuth flow
5. You should be redirected back to the login page with a success message

## Features

- **Automatic User Creation**: New users are automatically created with appropriate profiles
- **Account Linking**: Existing users can link their Google accounts
- **Role-based Registration**: Users are assigned the correct role (CANDIDATE/RECRUITER) based on the login type
- **Profile Creation**: Automatically creates candidate or recruiter profiles with basic information
- **Welcome Email**: Sends welcome emails to new users

## Security Notes

- All OAuth tokens are stored securely in the database
- Refresh tokens are stored as HTTP-only cookies
- Access tokens have short expiration times
- User sessions are properly managed with JWT tokens

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**: Make sure your redirect URIs in Google Cloud Console match exactly
2. **"Client ID not found" error**: Verify your environment variables are set correctly
3. **Database errors**: Ensure your Prisma schema is up to date and migrations are applied

### Debug Mode

To enable debug logging, add this to your environment variables:

```env
DEBUG=true
```

This will log OAuth flow details to help troubleshoot issues.
