import { NextResponse, type NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { sendWelcomeEmail } from '@/lib/email';
import { generateTokens } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

const CandidateProfileSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
});

const RecruiterProfileSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    companyName: z.string(),
});

const AdminProfileSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    permissions: z.array(z.string()),
    department: z.string().optional(),
    isSuperAdmin: z.boolean().optional(),
});

export const registerSchema = z
    .object({
        email: z.string().email('Invalid email address'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                'Password must contain uppercase, lowercase, number and special character',
            ),
        role: z.enum(['ADMIN', 'CANDIDATE', 'RECRUITER']).default('CANDIDATE'),
        profile: z.any(), // temporarily allow any, then refine below
    })
    .superRefine((data, ctx) => {
        if (data.role === 'CANDIDATE') {
            const result = CandidateProfileSchema.safeParse(data.profile);
            if (!result.success) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['profile'],
                    message: 'Invalid candidate profile',
                });
            }
        }

        if (data.role === 'RECRUITER') {
            const result = RecruiterProfileSchema.safeParse(data.profile);
            if (!result.success) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['profile'],
                    message: 'Invalid recruiter profile',
                });
            }
        }

        if (data.role === 'ADMIN') {
            const result = AdminProfileSchema.safeParse(data.profile);
            if (!result.success) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['profile'],
                    message: 'Invalid admin profile',
                });
            }
        }
    });

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = registerSchema.parse(body);

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 400 },
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(validatedData.password, 12);

        // Create user with profile in a transaction
        const result = await prisma.$transaction(async (tx) => {
            // Create the user first
            const user = await tx.user.create({
                data: {
                    email: validatedData.email,
                    password: hashedPassword,
                    role: validatedData.role,
                },
                select: {
                    id: true,
                    email: true,
                    role: true,
                    createdAt: true,
                },
            });

            // Create the appropriate profile based on role
            if (validatedData.role === 'CANDIDATE') {
                await tx.candidateProfile.create({
                    data: {
                        userId: user.id,
                        firstName: validatedData.profile.firstName,
                        lastName: validatedData.profile.lastName,
                    },
                });
            } else if (validatedData.role === 'RECRUITER') {
                await tx.recruiterProfile.create({
                    data: {
                        userId: user.id,
                        firstName: validatedData.profile.firstName,
                        lastName: validatedData.profile.lastName,
                        companyName: validatedData.profile.companyName,
                    },
                });
            } else if (validatedData.role === 'ADMIN') {
                await tx.adminProfile.create({
                    data: {
                        userId: user.id,
                        firstName: validatedData.profile.firstName,
                        lastName: validatedData.profile.lastName,
                        permissions: validatedData.profile.permissions,
                        department: validatedData.profile.department,
                        isSuperAdmin: validatedData.profile.isSuperAdmin || false,
                    },
                });
            }

            return user;
        });

        // Generate tokens
        const { accessToken, refreshToken } = await generateTokens(result);

        // Send welcome email
        try {
            const fullName = `${validatedData.profile.firstName} ${validatedData.profile.lastName}`;
            await sendWelcomeEmail(result.email, fullName);
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
        }

        // Set refresh token as httpOnly cookie
        const response = NextResponse.json({
            message: 'User registered successfully',
            user: result,
            accessToken,
        });

        response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        return response;
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 },
            );
        }

        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
