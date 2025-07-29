# Google Login Popup Implementation

This document describes the implementation of popup-based Google OAuth login for the Next.js application.

## Overview

The implementation provides a seamless Google login experience using a popup window instead of full page redirects. This maintains the user's context on the main page while handling authentication in a separate popup.

## Architecture

### Components

1. **GoogleLoginPopup** (`src/components/client/common/GoogleLoginPopup.tsx`)

    - Modal dialog that opens the Google OAuth popup
    - Handles communication between popup and parent window
    - Manages popup lifecycle and cleanup

2. **Popup API Routes**

    - `/api/auth/google/popup` - Initiates the OAuth flow
    - `/api/auth/google/popup/callback` - Handles OAuth callback and user creation

3. **AuthContext Integration**
    - `handlePopupLoginSuccess` function to handle successful authentication
    - Updated `googleLogin` function to support popup flow

### Flow

1. User clicks "Continue with Google" button
2. `GoogleLoginPopup` modal opens
3. User clicks "Continue with Google" in modal
4. Popup window opens with Google OAuth URL
5. User completes Google authentication
6. Popup receives callback and processes user data
7. Popup sends success/error message to parent window via `postMessage`
8. Parent window receives message and updates authentication state
9. Popup closes automatically
10. User is redirected to appropriate dashboard

## Security Features

- **Same-origin validation**: Only accepts messages from the same domain
- **Secure communication**: Uses `postMessage` with origin validation
- **Token management**: Proper JWT token generation and storage
- **User role assignment**: Automatically assigns roles based on user type (developer/company)

## Usage

### In Login Forms

```tsx
import { GoogleLoginPopup } from '@/components/client/common/GoogleLoginPopup';
import { useAuth } from '@/context/AuthContext';

export function LoginForm() {
    const { handlePopupLoginSuccess } = useAuth();
    const [showGooglePopup, setShowGooglePopup] = useState(false);

    const handleGoogleLogin = () => {
        setShowGooglePopup(true);
    };

    const handleGoogleLoginSuccess = async (userData: any) => {
        await handlePopupLoginSuccess(userData);
        // Handle redirect or other post-login logic
    };

    const handleGoogleLoginError = (error: string) => {
        // Handle error display
    };

    return (
        <>
            <button onClick={handleGoogleLogin}>Continue with Google</button>

            <GoogleLoginPopup
                isOpen={showGooglePopup}
                onClose={() => setShowGooglePopup(false)}
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                userType="developer"
            />
        </>
    );
}
```

### Testing

Visit `/test-google-popup` to test the popup functionality.

## Environment Variables

Ensure these environment variables are set:

```env
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your_google_client_id"
NEXT_PUBLIC_APP_URL="http://localhost:3001"
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: - `http://localhost:3001/api/auth/google/popup/callback?userType=developer`
    - `http://localhost:3001/api/auth/google/popup/callback?userType=company`
6. Copy Client ID and Client Secret to environment variables

## Browser Compatibility

- Modern browsers with popup support
- Popup blockers must be disabled or the site must be trusted
- Same-origin policy enforced for security

## Error Handling

The implementation handles various error scenarios:

- Popup blocked by browser
- OAuth cancellation by user
- Network errors during authentication
- Invalid OAuth response
- User account creation failures

## Benefits

1. **Better UX**: No page redirects, maintains user context
2. **Seamless integration**: Works within existing authentication flow
3. **Security**: Proper origin validation and secure communication
4. **Flexibility**: Supports both developer and company user types
5. **Error handling**: Comprehensive error handling and user feedback

## Troubleshooting

### Popup Blocked

- Ensure popup blockers are disabled for the site
- Check browser settings for popup permissions

### OAuth Errors

- Verify Google OAuth credentials are correct
- Check redirect URIs match exactly
- Ensure environment variables are properly set

### Communication Issues

- Verify same-origin policy compliance
- Check browser console for postMessage errors
- Ensure popup and parent window are on same domain
