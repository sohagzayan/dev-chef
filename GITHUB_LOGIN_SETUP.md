# GitHub OAuth Login Setup

This guide will help you set up GitHub OAuth login for the DevChef application.

## Prerequisites

- A GitHub account
- Access to GitHub Developer Settings

## Step 1: Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on "OAuth Apps" in the left sidebar
3. Click "New OAuth App"
4. Fill in the following details:

    - **Application name**: `DevChef` (or your preferred name)
    - **Homepage URL**: `http://localhost:3001` (for development)
    - **Application description**: `DevChef - Developer Platform` (optional)
    - **Authorization callback URL**: `http://localhost:3001/api/auth/github/popup/callback?userType=developer`

5. Click "Register application"

## Step 2: Get Your OAuth Credentials

After creating the OAuth app, you'll see:

- **Client ID**: Copy this value
- **Client Secret**: Click "Generate a new client secret" and copy the generated value

## Step 3: Configure Environment Variables

Add the following variables to your `.env.local` file:

```env
# GitHub OAuth
GITHUB_ID="your_github_client_id_here"
GITHUB_SECRET="your_github_client_secret_here"

# App URL
NEXTAUTH_URL="http://localhost:3001"
```

## Step 4: Test the Integration

1. Start your development server:

    ```bash
    npm run dev
    ```

2. Navigate to the test page:

    ```
    http://localhost:3001/test-github-login
    ```

3. Click "Test GitHub Login" to verify the integration works

## Step 5: Production Setup

For production deployment:

1. Update your GitHub OAuth app settings:

    - **Homepage URL**: Your production domain (e.g., `https://yourdomain.com`)
    - **Authorization callback URL**: `https://yourdomain.com/api/auth/github/popup/callback?userType=developer`

2. Update environment variables:
    ```env
    NEXTAUTH_URL="https://yourdomain.com"
    ```

## Features

The GitHub login implementation includes:

- ✅ Popup-based authentication (no page redirects)
- ✅ Automatic user creation for new users
- ✅ Account linking for existing users
- ✅ Email verification
- ✅ Welcome email sending
- ✅ JWT token generation
- ✅ Role-based user assignment (CANDIDATE/RECRUITER)
- ✅ Error handling and user feedback
- ✅ Support for both developer and company user types

## Troubleshooting

### Common Issues

1. **"Popup blocked" error**

    - Make sure popup blockers are disabled for your domain
    - Check browser settings

2. **"Invalid client" error**

    - Verify your `GITHUB_ID` and `GITHUB_SECRET` are correct
    - Ensure the callback URL matches exactly

3. **"Email is required" error**

    - Make sure the user's email is public on GitHub
    - Or the user has added an email to their GitHub account

4. **404 errors on callback**
    - Ensure the callback route is properly configured
    - Check that the `userType` parameter is included in the callback URL

### Debug Mode

To enable debug logging, add this to your environment:

```env
DEBUG=true
```

## Security Notes

- Never commit your `GITHUB_SECRET` to version control
- Use environment variables for all sensitive configuration
- Regularly rotate your client secret
- Monitor OAuth app usage in GitHub Developer Settings

## API Endpoints

The GitHub OAuth implementation uses these endpoints:

- `GET /api/auth/github/popup` - Initiates the OAuth flow
- `GET /api/auth/github/popup/callback` - Handles the OAuth callback
- `POST /api/auth/github` - Legacy endpoint (not used by popup flow)

## User Flow

1. User clicks GitHub login button
2. Popup opens with GitHub OAuth authorization
3. User authorizes the application
4. GitHub redirects to callback URL with authorization code
5. Server exchanges code for access token
6. Server fetches user information from GitHub
7. User is created/linked in the database
8. JWT tokens are generated
9. Success message is sent to parent window
10. Popup closes and user is logged in
