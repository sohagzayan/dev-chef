'use client';

import { useEffect, useState } from 'react';
import type { AuthSession } from '../types/auth.types';

/**
 * Authentication hook
 * Example implementation - replace with your auth solution (NextAuth, etc.)
 */
export function useAuth() {
    const [session, setSession] = useState<AuthSession | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch session from your auth provider
        // Example: const session = await getSession();
        setLoading(false);
    }, []);

    return {
        session,
        loading,
        isAuthenticated: !!session,
        user: session?.user,
    };
}
