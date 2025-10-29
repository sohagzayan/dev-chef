# Architecture Implementation Guide

## ✅ Completed: Feature-Based + Server-First Architecture

Your project now follows the industry-standard **Feature-Based Architecture + Server-First Pattern**!

## 📁 New Structure

```
src/features/auth/
├── actions/                    # 🆕 Server Actions ('use server')
│   ├── login.action.ts
│   ├── signup.action.ts
│   ├── logout.action.ts
│   └── index.ts
├── queries/                    # 🆕 Data Fetching (Server-side)
│   ├── get-user.query.ts
│   ├── get-current-user.query.ts
│   └── index.ts
├── components/
│   ├── LoginForm/             # ✅ Client Component
│   │   ├── LoginForm.tsx      # Updated to use Server Actions
│   │   └── index.ts
│   └── server/                # 🆕 Server Components
│       ├── UserProfile.tsx     # Example Server Component
│       └── index.ts
├── hooks/
│   └── useAuth.ts             # Client hooks
├── lib/
│   ├── services.ts            # ✅ Updated business logic
│   └── validators.ts          # Zod schemas
├── types/
│   └── auth.types.ts
└── index.ts                   # 🆕 Feature public API
```

## 🚀 How to Use

### 1. Using Server Actions in Pages

**Example: Login Page**

```typescript
// app/(auth)/login/page.tsx
import { LoginForm } from '@/features/auth';

export default function LoginPage() {
    return (
        <div className="container mx-auto p-8">
            <h1>Login</h1>
            <LoginForm />
        </div>
    );
}
```

### 2. Using Server Components

**Example: Dashboard with User Profile**

```typescript
// app/dashboard/page.tsx
import { UserProfile } from '@/features/auth';
import { getCurrentUser } from '@/features/auth/queries';

export default async function DashboardPage() {
    // Fetch data on server
    const { user } = await getCurrentUser('user-id-here'); // TODO: Get from session

    return (
        <div className="container mx-auto p-8">
            <h1>Dashboard</h1>
            {user && <UserProfile userId={user.id} />}
        </div>
    );
}
```

### 3. Using Server Actions Directly

```typescript
// In any Client Component
'use client';

import { loginAction } from '@/features/auth/actions';
import { useRouter } from 'next/navigation';

export function MyComponent() {
    const router = useRouter();

    const handleLogin = async (formData: FormData) => {
        const result = await loginAction(formData);
        if (result.success) {
            router.push('/dashboard');
        }
    };

    return <form action={handleLogin}>...</form>;
}
```

### 4. Using Queries in Server Components

```typescript
// Any Server Component
import { getUserById } from '@/features/auth/queries';

export default async function ProfilePage({ params }: { params: { id: string } }) {
    const { user, error } = await getUserById(params.id);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <div>{user?.email}</div>;
}
```

## 🎯 Key Benefits

✅ **Server Actions** - No API routes needed, direct server-side mutations  
✅ **Server Components** - Minimal JavaScript, better performance  
✅ **Type Safety** - Full TypeScript support across all layers  
✅ **Scalable** - Add new features without touching existing code  
✅ **Testable** - Clear separation of concerns

## 📝 Next Steps

1. **Complete Authentication Flow**

    - Implement session management (NextAuth or custom)
    - Add session handling in Server Actions

2. **Add More Features**

    - Follow the same pattern for other features (dashboard, profile, etc.)
    - Each feature is self-contained

3. **Create Feature Pages**
    - Use Server Components for data fetching
    - Use Client Components only for interactivity

## 📚 File Usage Guide

| Layer                 | Use Case                           | Example                              |
| --------------------- | ---------------------------------- | ------------------------------------ |
| **Actions**           | Mutations (create, update, delete) | `loginAction()`, `signupAction()`    |
| **Queries**           | Data fetching (read operations)    | `getUserById()`, `getCurrentUser()`  |
| **Services**          | Business logic                     | `authenticateUser()`, `createUser()` |
| **Components/Client** | Interactive UI                     | `LoginForm` (forms, buttons, inputs) |
| **Components/Server** | Data display                       | `UserProfile` (read-only views)      |
| **Hooks**             | Client-side state/logic            | `useAuth()` (client-only hooks)      |

## 🔄 Migration from Old Pattern

**Before (API Routes):**

```typescript
// app/api/auth/login/route.ts
export async function POST(req: Request) {
    const body = await req.json();
    // ... handler
    return Response.json({ success: true });
}
```

**After (Server Actions):**

```typescript
// features/auth/actions/login.action.ts
'use server';
export async function loginAction(formData: FormData) {
    // Direct server-side logic
    // No need for API routes!
}
```

This is the modern Next.js 15 way! 🎉
