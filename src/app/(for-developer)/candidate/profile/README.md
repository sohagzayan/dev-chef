# Candidate Profile Page

This is the profile page for candidates with the route structure: `/candidate/profile`

## File Structure

```
src/app/(for-developer)/candidate/profile/
├── page.tsx          # Main profile page component
├── components/       # Child components specific to this page
│   ├── index.ts     # Component exports
│   ├── ProfileForm.tsx      # Profile editing form
│   └── ProfileSidebar.tsx   # Left sidebar navigation
├── loading.tsx      # Loading state component
├── error.tsx        # Error handling component
└── README.md        # This documentation
```

## Components

### ProfileForm

- Handles profile editing form
- Includes profile picture, personal info, and password fields
- Manages form state and validation

### ProfileSidebar

- Left panel navigation for profile settings
- Tabs: Edit Profile, Notifications, Choose Plan, Password & Security
- Handles tab switching

## Features

- **Static Routing**: Simple profile page route
- **Tabbed Interface**: Multiple profile sections in one page
- **Form Validation**: Input validation and error handling
- **Skeleton Loading**: Beautiful loading states
- **Error Boundaries**: Graceful error handling
- **Responsive Design**: Mobile-friendly layout

## Usage

Navigate to `/candidate/profile` to access the candidate profile page.

## State Management

- `activeProfileTab`: Controls which tab is currently active
- `formData`: Manages form input values
- `isLoading`: Controls loading states
- `showPassword`: Toggles password visibility

## Navigation

The page includes a left sidebar with navigation to:

- Dashboard
- Profile (current page)
- Job Feed
- Save Jobs
- Settings
