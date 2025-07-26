# Unified Forgot Password Page

This page provides a unified forgot password experience for both candidates and recruiters.

## Features

- **User Type Selection**: Users can choose between "Job Seeker" (candidate) and "Recruiter" account types
- **Role-Specific Forms**: Different form validation and styling based on user type
- **Responsive Design**: Works on both desktop and mobile devices
- **Smooth Animations**: Uses Framer Motion for smooth transitions
- **Backward Compatibility**: Old URLs redirect to the new unified page

## User Types

### Job Seeker (Candidate)

- Accepts email or username
- Developer-themed styling
- Links back to `/developers/login`

### Recruiter

- Accepts work email only
- Company-themed styling with enhanced security features
- Links back to `/companies/login`

## File Structure

```
src/app/forgot-password/
├── page.tsx                           # Main unified forgot password page
├── components/
│   ├── candidate-forgot-password-form.tsx  # Candidate-specific form
│   └── recruiter-forgot-password-form.tsx  # Recruiter-specific form
└── README.md                          # This file
```

## Usage

Users can access the forgot password page at:

- `/forgot-password` - New unified page
- `/developers/forgot-password` - Redirects to unified page
- `/companies/forgot-password` - Redirects to unified page

## Implementation Details

The page uses a two-step process:

1. User selects their account type (candidate or recruiter)
2. User fills out the appropriate form based on their selection

The form components are based on the existing forgot password forms but adapted for the unified experience.
