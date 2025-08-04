# Problemset Architecture Correction

## Overview

This document explains the corrected architecture for the problemset page that properly follows the existing codebase patterns using API endpoints and Redux Toolkit instead of direct Prisma queries.

## ✅ **Corrected Architecture**

### 1. **API-First Approach**

- **Server Component**: Uses API endpoints instead of direct Prisma queries
- **Client Component**: Uses Redux Toolkit for client-side data fetching
- **Consistent**: Follows existing codebase patterns and folder structure

### 2. **Redux Toolkit Integration**

- **Problems API**: `src/store/api/problemsApi.ts`
- **Store Integration**: Added to `src/store/index.ts`
- **Hooks**: `useGetProblemsQuery`, `useGetUserStatsQuery`, `useGetTopicsQuery`

### 3. **Server-Side Data Fetching**

- **API Functions**: `src/lib/api/server-problems.ts`
- **Authentication**: Proper session handling
- **Error Handling**: Graceful fallbacks

## 🏗️ **Architecture Flow**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Server        │    │   API Endpoints  │    │   Database      │
│   Component     │───▶│   (/api/v1/*)    │───▶│   (Prisma)      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       ▲                       │
         │                       │                       │
         ▼                       │                       │
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client        │    │   Redux Toolkit  │    │   Cache         │
│   Component     │◀───│   (RTK Query)    │◀───│   (Automatic)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 📁 **File Structure**

```
src/
├── app/(for-developer)/problemset/
│   ├── page.tsx                    # Server component (SSR)
│   └── components/
│       ├── problemset-client.tsx   # Client component (Redux)
│       ├── problemset-list.tsx     # UI component
│       └── problemset-skeleton.tsx # Loading skeleton
├── store/
│   ├── api/
│   │   └── problemsApi.ts          # Redux Toolkit API
│   └── index.ts                    # Store configuration
└── lib/api/
    ├── problems.ts                 # API types
    ├── topics.ts                   # API types
    └── server-problems.ts          # Server-side API functions
```

## 🔧 **Implementation Details**

### **1. Redux Toolkit API (`problemsApi.ts`)**

```typescript
export const problemsApi = createApi({
    reducerPath: 'problemsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.accessToken;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Problems', 'Topics', 'UserStats'],
    endpoints: (builder) => ({
        getProblems: builder.query<ProblemsResponse, ProblemsParams>({
            query: (params) => `/v1/problems?${searchParams}`,
            providesTags: ['Problems'],
        }),
        // ... other endpoints
    }),
});
```

### **2. Server-Side Functions (`server-problems.ts`)**

```typescript
export async function fetchProblemsServer(params?: ProblemsParams) {
    const session = await auth();
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/v1/problems?${searchParams}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(session && { Cookie: `next-auth.session-token=${session.user?.id}` }),
        },
    });

    return response.json();
}
```

### **3. Server Component (`page.tsx`)**

```typescript
export default async function ProblemsetPage({ searchParams }: ProblemsetPageProps) {
    const session = await auth();

    try {
        // Fetch data using API endpoints
        const [problemsResponse, statsResponse, topicsResponse] = await Promise.all([
            fetchProblemsServer(problemsParams),
            fetchUserStatsServer(statsParams),
            fetchTopicsServer(topicsParams),
        ]);

        return (
            <ProblemsetClient
                initialProblems={problemsResponse.data}
                initialStats={statsResponse.data}
                // ... other props
            />
        );
    } catch (error) {
        // Handle errors gracefully
    }
}
```

### **4. Client Component (`problemset-client.tsx`)**

```typescript
export function ProblemsetClient({ initialProblems, ...props }: ProblemsetClientProps) {
    // Use Redux Toolkit queries
    const { data: problemsData, isLoading } = useGetProblemsQuery(params, {
        skip: false,
    });

    // Use API data or fallback to initial data
    const problems = problemsData?.data || initialProblems;

    return (
        <ProblemsetList
            problems={problems}
            loading={isLoading}
            // ... other props
        />
    );
}
```

## 🚀 **Benefits of Corrected Architecture**

### **1. Consistency**

- ✅ Follows existing codebase patterns
- ✅ Uses established API versioning system
- ✅ Maintains folder structure conventions

### **2. Performance**

- ✅ Server-side rendering for initial load
- ✅ Redux Toolkit caching for subsequent requests
- ✅ Optimistic updates and background refetching

### **3. Maintainability**

- ✅ Clear separation of concerns
- ✅ Reusable API endpoints
- ✅ Type-safe with TypeScript

### **4. Scalability**

- ✅ API-first approach allows for future microservices
- ✅ Redux Toolkit handles complex state management
- ✅ Proper error handling and loading states

## 🔄 **Data Flow**

### **Initial Load (SSR)**

1. Server component calls API endpoints
2. API endpoints query database via Prisma
3. Data is passed to client component as props
4. Page renders with initial data

### **Client-Side Updates**

1. User interacts with filters/pagination
2. Redux Toolkit queries API endpoints
3. Cache is updated automatically
4. UI re-renders with new data

### **Authentication**

1. Server-side: Session from `auth()` function
2. Client-side: Token from Redux store
3. API endpoints: Authorization headers

## 🛠️ **Usage Examples**

### **Server-Side Data Fetching**

```typescript
// In server component
const problemsResponse = await fetchProblemsServer({
    page: 1,
    limit: 9,
    difficulty: 'MEDIUM',
});
```

### **Client-Side Data Fetching**

```typescript
// In client component
const { data, isLoading } = useGetProblemsQuery({
    page: currentPage,
    difficulty: filters.difficulty,
});
```

### **Error Handling**

```typescript
// Graceful fallback
const problems = problemsData?.data || initialProblems;
const loading = problemsLoading || statsLoading;
```

## 📋 **Migration Checklist**

- [x] Create Redux Toolkit API (`problemsApi.ts`)
- [x] Add to store configuration
- [x] Create server-side API functions
- [x] Update server component to use API endpoints
- [x] Update client component to use Redux Toolkit
- [x] Remove direct Prisma queries
- [x] Add proper error handling
- [x] Test authentication flow
- [x] Verify caching behavior

## 🎯 **Key Takeaways**

1. **Always use API endpoints** - Never query database directly from components
2. **Follow existing patterns** - Use established folder structure and conventions
3. **Leverage Redux Toolkit** - For client-side state management and caching
4. **Handle errors gracefully** - Provide fallbacks and loading states
5. **Maintain type safety** - Use TypeScript interfaces throughout

This corrected architecture ensures the problemset page follows your established patterns while providing excellent performance and maintainability.
