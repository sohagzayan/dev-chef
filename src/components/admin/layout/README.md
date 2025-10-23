# Admin Layout Components

This directory contains reusable layout components for the admin interface. All components are built with TypeScript, Tailwind CSS, and Framer Motion for smooth animations.

## Components Overview

### Core Layout Components

- **`AdminSidebar`** - Main sidebar navigation with collapsible functionality
- **`AdminHeader`** - Top header with search, notifications, and user menu
- **`SidebarMenu`** - Menu structure with sections and items
- **`MenuItem`** - Individual menu item with icons and animations
- **`MenuSection`** - Grouped menu sections with titles
- **`SidebarToggle`** - Button to collapse/expand sidebar
- **`SidebarLogo`** - Brand logo component

### New Enhanced Components

- **`BreadcrumbNav`** - Breadcrumb navigation showing current page path
- **`QuickActions`** - Dropdown with quick access to common admin tasks
- **`PageHeader`** - Consistent page headers with titles and actions
- **`StatsCard`** - Reusable cards for displaying metrics and statistics

## Usage Examples

### PageHeader Component

```tsx
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { Button } from '@/components/ui/button';

export default function UsersPage() {
    return (
        <div>
            <PageHeader title="User Management" description="Manage user accounts and permissions">
                <Button>Add New User</Button>
                <Button variant="outline">Export Users</Button>
            </PageHeader>

            {/* Page content */}
        </div>
    );
}
```

### StatsCard Component

```tsx
import { TrendingUp, Users } from 'lucide-react';
import { StatsCard } from '@/components/admin/layout/StatsCard';

export default function DashboardStats() {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <StatsCard
                title="Total Users"
                value="1,234"
                description="Active accounts"
                icon={Users}
                color="blue"
                trend={{
                    value: 12,
                    isPositive: true,
                    label: 'vs last month',
                }}
            />

            <StatsCard
                title="Revenue"
                value="$45,678"
                description="This month"
                icon={TrendingUp}
                color="green"
                trend={{
                    value: 8,
                    isPositive: true,
                    label: 'vs last month',
                }}
            />
        </div>
    );
}
```

### QuickActions Component

The QuickActions component is automatically integrated into the AdminHeader and provides:

- Quick access to common admin tasks
- Permission-based filtering
- Smooth animations and hover effects
- Responsive design

### BreadcrumbNav Component

The BreadcrumbNav component:

- Automatically generates breadcrumbs based on the current route
- Shows the navigation hierarchy
- Provides clickable links to parent pages
- Integrates seamlessly with PageHeader

## Component Features

### Animation & Interactions

- **Framer Motion** integration for smooth animations
- **Hover effects** and micro-interactions
- **Responsive animations** that work on all devices

### Accessibility

- **Keyboard navigation** support
- **Screen reader** friendly
- **Focus management** for interactive elements

### Responsive Design

- **Mobile-first** approach
- **Adaptive layouts** for different screen sizes
- **Touch-friendly** interactions

### Permission System

- **Role-based access control** integration
- **Permission filtering** for menu items and actions
- **Secure component rendering**

## Styling & Theming

All components use Tailwind CSS classes and follow a consistent design system:

- **Color palette**: Consistent with the admin theme
- **Spacing**: 4px grid system (space-1, space-2, etc.)
- **Typography**: Hierarchical text sizing
- **Shadows**: Subtle depth and elevation
- **Borders**: Consistent border radius and colors

## Performance Considerations

- **Lazy loading** for heavy components
- **Optimized animations** with proper easing
- **Efficient re-renders** with React best practices
- **Bundle splitting** for better load times

## Future Enhancements

Planned improvements include:

- **Dark mode** support
- **Custom themes** and color schemes
- **Advanced animations** and transitions
- **Keyboard shortcuts** for power users
- **Component variants** for different use cases
