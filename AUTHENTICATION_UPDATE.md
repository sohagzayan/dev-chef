# Authentication Update for Problem Page

## Overview

Added authentication checks to the problem page (`/problems/[problemId]`) to require users to log in before they can run or submit code.

## Changes Made

### 1. Created LoginBanner Component

- **File**: `src/app/(for-developer)/problems/[problemId]/components/LoginBanner.tsx`
- **Purpose**: Displays a banner at the top of the page when users try to run/submit without authentication
- **Design**: Dark blue background with highlighted "log in / sign up" text matching the provided image description

### 2. Updated Workspace Component

- **File**: `src/app/(for-developer)/problems/[problemId]/components/Workspace.tsx`
- **Changes**:
    - Added authentication check using `useAuth()` hook
    - Modified `handleRunCode()` to check authentication before allowing code execution
    - Modified `handleSubmit()` to check authentication before allowing submission
    - Added banner display logic that shows only when users attempt to run/submit
    - Adjusted navigation bar positioning to account for banner space

### 3. Authentication Flow

1. User visits problem page without being logged in
2. User can view the problem description and code editor
3. When user clicks "Run Code" or "Submit":
    - Authentication is checked
    - If not authenticated, a banner appears at the top
    - Banner contains link to login page
    - Navigation bar adjusts position to accommodate banner
4. After successful login, banner disappears and user can run/submit

### 4. Banner Features

- **Position**: Fixed at top of page
- **Content**: "You need to log in / sign up to run or submit"
- **Styling**: Dark blue background (`bg-blue-900`) with light gray text
- **Links**: "log in / sign up" text is highlighted in blue and links to `/developers/login`
- **Responsive**: Adjusts navigation bar positioning when shown

## Technical Implementation

### Authentication Context

- Uses existing `AuthContext` from `@/context/AuthContext`
- Checks `isAuthenticated` state before allowing actions
- Integrates with existing authentication system

### State Management

- `showAuthBanner`: Controls banner visibility
- `loginAction`: Tracks which action triggered the banner ('run' or 'submit')
- Banner only shows when user attempts to perform authenticated actions

### UI/UX Considerations

- Banner doesn't block content - users can still view problem
- Clear call-to-action with login link
- Smooth positioning adjustments
- Consistent with existing design system

## Testing

To test the implementation:

1. Visit a problem page without being logged in
2. Try clicking "Run Code" or "Submit" buttons
3. Verify banner appears with correct styling
4. Click login link to verify it redirects properly
5. After login, verify banner disappears and actions work

## Files Modified

- `src/app/(for-developer)/problems/[problemId]/components/Workspace.tsx`
- `src/app/(for-developer)/problems/[problemId]/components/LoginBanner.tsx` (new)
- `src/app/(for-developer)/problems/[problemId]/components/LoginPrompt.tsx` (new, alternative modal approach)
