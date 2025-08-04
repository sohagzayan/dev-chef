# Problem Set Page

A comprehensive problem set page that displays all coding challenges from the database with advanced filtering and a unique design.

## Features

### 🎨 Unique Design

- **Gradient Background**: Beautiful gradient background from gray to blue to indigo
- **Animated Components**: Smooth animations using Framer Motion
- **Status Indicators**: Color-coded status lines on problem cards
- **Modern UI**: Clean, modern interface with hover effects and transitions

### 🔍 Advanced Filtering

- **Search**: Search problems by title or tags
- **Status Filter**: Filter by Solved, Attempted, or Unsolved problems
- **Difficulty Filter**: Filter by Easy, Medium, or Hard problems
- **Tag Filter**: Filter by popular algorithm tags (Array, String, Dynamic Programming, etc.)
- **Company Filter**: Filter by company tags (Google, Microsoft, Amazon, etc.)
- **Clear Filters**: One-click clear all active filters

### 📊 Progress Tracking

- **Real-time Stats**: Shows total, solved, attempted, and unsolved problems
- **Progress Bar**: Visual progress indicator
- **Completion Rate**: Percentage of problems completed

### 📱 Responsive Design

- **Mobile First**: Optimized for all screen sizes
- **Grid Layout**: Responsive grid that adapts to screen size
- **Sticky Sidebar**: Filters sidebar stays in view on desktop

### ⚡ Performance

- **Infinite Scroll**: Load more problems as you scroll
- **Lazy Loading**: Efficient loading with intersection observer
- **Optimized API Calls**: Smart API calls with proper pagination

## Components

### ProblemsetHeader

- Hero section with gradient background
- Statistics overview (2000+ problems, 50K+ developers)
- Call-to-action buttons

### ProblemsetFilters

- Comprehensive filtering options
- Progress statistics card
- Expandable tag selection
- Company filter with checkboxes

### ProblemsetStats

- Four metric cards showing progress
- Visual progress indicators
- Color-coded statistics
- Filter indicator showing active filters
- Real-time updates based on filtered results

### ProblemsetList

- Problem cards with status indicators
- Detailed problem information
- Action buttons (Solve, Favorite)
- Loading states and empty states

### ProblemsetTopicFilters

- **Specific Topic Tags**: Array, String, Hash Table, Dynamic Programming, etc. with problem counts
- **Category Buttons**: All Topics, Algorithms, Database, Shell, Concurrency, JavaScript, etc.
- **Expandable Lists**: Show more topics and categories with expand buttons
- **Interactive Selection**: Click to filter problems by topic or category
- **Dynamic Filtering**: Real-time filtering of problems based on selected topics/categories
- **Visual Feedback**: Selected topics and categories are highlighted
- **Dark Theme**: Matches the modern dark interface design

## API Integration

The page integrates with the database through the following APIs:

### Problems API (`/api/v1/problems`)

- `fetchProblems()` - Fetches problems with filtering and pagination
- Supports all filter parameters (difficulty, status, search, tags, companies)
- Includes user problem status (SOLVED, ATTEMPTED, UNSOLVED)
- Returns real problem data with submission counts and success rates

### Topics API (`/api/v1/topics`)

- `fetchTopics()` - Fetches topics with problem counts and statistics
- Returns topic types (CORE_CS, SPECIALIZED, LANGUAGE, FRAMEWORK, TOOL)
- Includes difficulty levels (BEGINNER, INTERMEDIATE, ADVANCED)
- Provides overall statistics for the problemset

### Database Schema

- **Topics**: Name, slug, description, difficulty, type, problem count, tags
- **Problems**: Title, description, difficulty, tags, company tags, time/memory limits
- **User Problem Status**: Tracks user progress (UNSOLVED, ATTEMPTED, SOLVED)
- **Submissions**: User code submissions with test results

### Data Seeding

- Sample data script: `src/scripts/seed-problemset-data.ts`
- Creates 20+ topics with different types and difficulties
- Adds sample problems with real company tags and statistics
- Updates topic problem counts automatically

## Navigation

The problemset page is accessible via:

- **URL**: `/problemset`
- **Navigation**: Resource → Problem Set
- **Direct Link**: Available in the main navigation menu

## Styling

- **Tailwind CSS**: Utility-first styling
- **Custom Gradients**: Beautiful gradient backgrounds
- **Framer Motion**: Smooth animations and transitions
- **Responsive Design**: Mobile-first approach

## Future Enhancements

- [ ] Add sorting options (by difficulty, popularity, etc.)
- [ ] Implement problem bookmarking
- [ ] Add problem difficulty distribution charts
- [ ] Include problem recommendations
- [ ] Add dark mode support
