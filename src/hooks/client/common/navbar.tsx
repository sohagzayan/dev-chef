import { useEffect, useState } from 'react';
import { AuthState } from '@/types/client/common/navbar-types';

const useAuth = (): [AuthState, (state: AuthState) => void] => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
        notificationCount: 0,
    });

    useEffect(() => {
        const savedAuth = localStorage.getItem('auth');
        if (savedAuth) {
            try {
                setAuthState(JSON.parse(savedAuth));
            } catch (e) {
                console.error('Failed to parse auth state', e);
            }
        }
    }, []);

    const updateAuthState = (newState: AuthState) => {
        setAuthState(newState);
        localStorage.setItem('auth', JSON.stringify(newState));
    };

    return [authState, updateAuthState];
};

export default useAuth;
