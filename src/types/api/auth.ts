export type UserRole = 'admin' | 'user' | 'candidate' | 'employer';

export interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
    role: UserRole;
    emailVerified?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthUser extends User {
    accessToken?: string;
}
