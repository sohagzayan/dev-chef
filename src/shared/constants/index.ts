// Shared constants
export const APP_NAME = 'Hirely.ai';
export const APP_VERSION = '1.0.0';

// API Routes
export const API_ROUTES = {
    AUTH: '/api/auth',
    USERS: '/api/users',
    PROBLEMS: '/api/problems',
    JOBS: '/api/jobs',
} as const;

// Environment
export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_DEV = process.env.NODE_ENV === 'development';
