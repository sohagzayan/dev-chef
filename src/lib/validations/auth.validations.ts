import { z } from 'zod';

// Base validations
export const emailSchema = z.string().email('Invalid email address');
export const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain uppercase, lowercase, number and special character',
    );

// Login validation
export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional(),
});

// Base profile schemas
const candidateProfileSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    phone: z.string().optional(),
});

const recruiterProfileSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    phone: z.string().optional(),
    companyName: z.string().min(2, 'Company name must be at least 2 characters'),
    jobTitle: z.string().optional(),
});

// Register validation with role-based profiles
export const registerSchema = z.discriminatedUnion('role', [
    z.object({
        email: emailSchema,
        password: passwordSchema,
        role: z.literal('CANDIDATE'),
        profile: candidateProfileSchema,
    }),
    z.object({
        email: emailSchema,
        password: passwordSchema,
        role: z.literal('RECRUITER'),
        profile: recruiterProfileSchema,
    }),
    z.object({
        email: emailSchema,
        password: passwordSchema,
        role: z.literal('ADMIN'),
        profile: z.object({
            firstName: z.string(),
            lastName: z.string(),
            permissions: z.array(z.string()),
            department: z.string().optional(),
            isSuperAdmin: z.boolean().optional(),
        }),
    }),
]);

// Profile update validations
export const updateCandidateProfileSchema = z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    phone: z.string().optional(),
    dateOfBirth: z.string().datetime().optional(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']).optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    zipCode: z.string().optional(),
    linkedinUrl: z.string().url().optional(),
    portfolioUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    summary: z.string().max(1000).optional(),
    expectedSalary: z.number().positive().optional(),
    currentSalary: z.number().positive().optional(),
    experienceYears: z.number().min(0).optional(),
    availability: z.string().optional(),
    workType: z.enum(['REMOTE', 'ONSITE', 'HYBRID']).optional(),
    isOpenToWork: z.boolean().optional(),
});

export const updateRecruiterProfileSchema = z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    phone: z.string().optional(),
    companyName: z.string().min(2).optional(),
    companySize: z.string().optional(),
    industry: z.string().optional(),
    website: z.string().url().optional(),
    linkedinUrl: z.string().url().optional(),
    companyAddress: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    zipCode: z.string().optional(),
    jobTitle: z.string().optional(),
    department: z.string().optional(),
});

// Password validations
export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
});

export const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Reset token is required'),
    password: passwordSchema,
});

export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type UpdateCandidateProfileInput = z.infer<typeof updateCandidateProfileSchema>;
export type UpdateRecruiterProfileInput = z.infer<typeof updateRecruiterProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
