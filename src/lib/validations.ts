import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().email('Please enter a valid email address');

export const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const nameSchema = z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces');

// Company login validation
export const companyLoginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional(),
});

// Developer login validation
export const developerLoginSchema = z.object({
    email: z.string().min(1, 'Email or username is required'),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional(),
});

// Developer signup validation
export const developerSignupSchema = z
    .object({
        fullName: nameSchema,
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: z.string(),
        agreeToTerms: z.boolean().refine((val) => val === true, 'You must agree to the terms'),
        subscribeNewsletter: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

// Company free trial validation
export const companyTrialSchema = z.object({
    firstName: nameSchema,
    lastName: nameSchema,
    workEmail: emailSchema,
    companyName: z.string().min(2, 'Company name must be at least 2 characters'),
    jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
    companySize: z.string().min(1, 'Please select company size'),
    agreeToTerms: z.boolean().refine((val) => val === true, 'You must agree to the terms'),
});

// Contact sales validation
export const contactSalesSchema = z.object({
    businessEmail: emailSchema,
    firstName: nameSchema,
    lastName: nameSchema,
    companyName: z.string().min(2, 'Company name must be at least 2 characters'),
    jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
    companySize: z.string().min(1, 'Please select company size'),
    country: z.string().min(1, 'Please select country'),
    interests: z.array(z.string()).min(1, 'Please select at least one interest'),
    agreeToTerms: z.boolean().refine((val) => val === true, 'You must agree to the terms'),
});

// Demo request validation (keeping for backward compatibility)
export const demoRequestSchema = contactSalesSchema.extend({
    additionalInfo: z.string().optional(),
});

export type CompanyLoginForm = z.infer<typeof companyLoginSchema>;
export type DeveloperLoginForm = z.infer<typeof developerLoginSchema>;
export type DeveloperSignupForm = z.infer<typeof developerSignupSchema>;
export type CompanyTrialForm = z.infer<typeof companyTrialSchema>;
export type ContactSalesForm = z.infer<typeof contactSalesSchema>;
export type DemoRequestForm = z.infer<typeof demoRequestSchema>;
export type DemoRequestFormType = DemoRequestForm;
