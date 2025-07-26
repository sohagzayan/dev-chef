// Store types - defined without importing store to avoid circular dependency
export type RootState = {
    auth: AuthState;
    ui: UIState;
    authApi: any;
    userApi: any;
    adminApi: any;
    candidatesApi: any;
    recruitersApi: any;
    checkoutApi: any;
};

export type AppDispatch = any;

// Auth types
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    accessToken: string | null;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    company?: string;
    image?: string;
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type UserRole = 'admin' | 'user' | 'candidate' | 'employer';

// UI types
export interface UIState {
    isLoading: boolean;
    sidebarOpen: boolean;
    theme: 'light' | 'dark' | 'system';
    notifications: Notification[];
}

export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    duration?: number;
}

// API Response types
export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// Auth API types
export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    phone?: string;
    company?: string;
}

export interface ForgotPasswordRequest {
    email: string;
    userType?: 'candidate' | 'recruiter';
}

export interface ResetPasswordRequest {
    token: string;
    password: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export interface LoginResponse {
    user: User;
    accessToken: string;
}

// User API types
export interface UpdateProfileRequest {
    name?: string;
    phone?: string;
    company?: string;
}

// Admin API types
export interface AdminUser extends User {
    isActive: boolean;
    emailVerified?: Date;
}

// Candidates API types
export interface CandidateProfile {
    id: string;
    userId: string;
    skills: string[];
    experience: number;
    education: string;
    certifications: string[];
    resume?: string;
    portfolio?: string;
    linkedin?: string;
    github?: string;
}

// Recruiters API types
export interface RecruiterProfile {
    id: string;
    userId: string;
    company: string;
    position: string;
    industry: string;
    hiringNeeds: string[];
    contactInfo: {
        phone: string;
        linkedin?: string;
    };
}

// Checkout API types
export interface CreateCheckoutSessionRequest {
    priceId: string;
    successUrl: string;
    cancelUrl: string;
}

export interface CheckoutSession {
    id: string;
    url: string;
    status: string;
}
