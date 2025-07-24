import { NextResponse, type NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { sendWelcomeEmail } from '@/lib/email';
import { generateTokens } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

// const registerSchema = z.object({
//     name: z.string().min(2, 'Name must be at least 2 characters'),
//     email: z.string().email('Invalid email address'),
//     password: z
//         .string()
//         .min(8, 'Password must be at least 8 characters')
//         .regex(
//             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
//             'Password must contain uppercase, lowercase, number and special character',
//         ),
//     role: z.enum(['ADMIN', 'CANDIDATE', 'RECRUITER']).default('CANDIDATE'),
//     phone: z.string().optional(),
//     company: z.string().optional(),
// });

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
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Invalid email address'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                'Password must contain uppercase, lowercase, number and special character',
            ),
        role: z.enum(['ADMIN', 'CANDIDATE', 'RECRUITER']).default('CANDIDATE'),
        phone: z.string().optional(),
        company: z.string().optional(),
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

        // Create user
        const user = await prisma.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                password: hashedPassword,
                role: validatedData.role,
                phone: validatedData.phone,
                company: validatedData.company,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                phone: true,
                company: true,
                createdAt: true,
            },
        });

        // Generate tokens
        const { accessToken, refreshToken } = await generateTokens(user);

        // Send welcome email
        try {
            await sendWelcomeEmail(user.email, user.name || 'User');
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
        }

        // Set refresh token as httpOnly cookie
        const response = NextResponse.json({
            message: 'User registered successfully',
            user,
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
