// Authentication feature types

export interface User {
    id: string;
    email: string;
    role: 'ADMIN' | 'CANDIDATE' | 'RECRUITER';
    name?: string;
}

export interface AuthSession {
    user: User;
    expires: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupData {
    email: string;
    password: string;
    name: string;
    role?: 'CANDIDATE' | 'RECRUITER';
}
