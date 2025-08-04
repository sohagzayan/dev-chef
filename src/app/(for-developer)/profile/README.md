# Profile Page

This is a LeetCode-style profile page that displays user statistics, progress, and activity.

## Features

### Left Panel

- **Profile Card**: Shows user avatar, name, rank, and edit profile button
- **Community Stats**: Displays views, solutions, discussions, and reputation
- **Languages**: Shows programming languages used and problems solved
- **Skills**: Categorized skills (Advanced, Intermediate, Fundamental)

### Right Panel

- **Problem Solved Stats**: Circular progress indicator with difficulty breakdown
- **Badges**: Shows earned badges and locked badges
- **Submission History**: Activity heatmap showing submission activity over the past year
- **Recent Activity**: Tabs for recent AC, list, solutions, and discussions

## Navigation

The profile page can be accessed in two ways:

1. **Clicking the profile avatar** in the navbar (direct navigation)
2. **Clicking "Profile"** in the user dropdown menu

## URL Path

The profile page is accessible at: `/profile`

## Components Used

- `Avatar` - User profile picture
- `Card` - Content containers
- `Badge` - Skill and status indicators
- `Button` - Action buttons
- `Tabs` - Activity section navigation
- `motion` - Framer Motion animations

## Styling

- Uses Tailwind CSS for styling
- Responsive design with grid layout
- Dark mode compatible
- Smooth animations and transitions

## Data

Currently uses mock data for demonstration:

- Problem statistics
- Activity heatmap
- User information from auth context

## Future Enhancements

- Connect to real API endpoints
- Add more interactive features
- Implement profile editing
- Add more detailed statistics
- Social features (following, followers)
