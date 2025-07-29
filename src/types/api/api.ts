export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string | null;
    error?: string;
    errors?: Record<string, string[]>;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
    };
}

// User Types by Role
export interface BaseUser {
    id: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    lastLoginAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CandidateUser extends BaseUser {
    role: 'CANDIDATE';
    profile: CandidateProfile;
}

export interface RecruiterUser extends BaseUser {
    role: 'RECRUITER';
    profile: RecruiterProfile;
}

export interface AdminUser extends BaseUser {
    role: 'ADMIN';
    profile: AdminProfile;
}

export type AuthenticatedUser = CandidateUser | RecruiterUser | AdminUser;

// Profile Types
export interface CandidateProfile {
    id: string;
    firstName: string;
    lastName: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: Gender;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
    githubUrl?: string;
    summary?: string;
    expectedSalary?: number;
    currentSalary?: number;
    experienceYears?: number;
    availability?: string;
    workType?: WorkType;
    isOpenToWork: boolean;
    skills?: CandidateSkill[];
    experiences?: WorkExperience[];
    educations?: Education[];
}

export interface RecruiterProfile {
    id: string;
    firstName: string;
    lastName: string;
    phone?: string;
    companyName: string;
    companySize?: string;
    industry?: string;
    website?: string;
    linkedinUrl?: string;
    companyAddress?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    jobTitle?: string;
    department?: string;
    isVerified: boolean;
    verifiedAt?: string;
    subscriptionPlan?: string;
}

export interface AdminProfile {
    id: string;
    firstName: string;
    lastName: string;
    phone?: string;
    department?: string;
    permissions: string[];
    isSuperAdmin: boolean;
}

// Auth Types
export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterRequest {
    email: string;
    password: string;
    role: UserRole;
    profile: CandidateRegisterProfile | RecruiterRegisterProfile;
}

export interface CandidateRegisterProfile {
    firstName: string;
    lastName: string;
    phone?: string;
}

export interface RecruiterRegisterProfile {
    firstName: string;
    lastName: string;
    phone?: string;
    companyName: string;
    jobTitle?: string;
}

export type UserRole = 'ADMIN' | 'CANDIDATE' | 'RECRUITER';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
export type WorkType = 'REMOTE' | 'ONSITE' | 'HYBRID';
export type SkillLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

// New Types Declaration
export interface CandidateSkill {
    id: string;
    name: string;
    level: SkillLevel;
}

export interface WorkExperience {
    id: string;
    company: string;
    jobTitle: string;
    startDate: string;
    endDate?: string;
    description?: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
}
