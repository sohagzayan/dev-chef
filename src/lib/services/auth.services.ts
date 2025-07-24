import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '@/lib/email';
import { generateTokens, revokeAllUserRefreshTokens } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import type {
    AdminUser,
    AuthenticatedUser,
    CandidateUser,
    LoginRequest,
    RecruiterUser,
    RegisterRequest,
} from '@/types/api/api';

export class AuthService {
    static async login(data: LoginRequest) {
        const { email, password, rememberMe } = data;

        // Find user with profile based on role
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                candidateProfile: true,
                recruiterProfile: true,
                adminProfile: true,
            },
        });

        if (!user || !user.password) {
            throw new Error('Invalid credentials');
        }

        if (!user.isActive) {
            throw new Error('Account is deactivated');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Revoke existing tokens
        await revokeAllUserRefreshTokens(user.id);

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });

        // Generate tokens
        const { accessToken, refreshToken } = await generateTokens({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        // Format user response based on role
        const authenticatedUser = this.formatUserByRole(user);

        return {
            user: authenticatedUser,
            accessToken,
            refreshToken,
            rememberMe,
        };
    }

    static async register(data: RegisterRequest) {
        const { email, password, role, profile } = data;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user with profile in transaction
        const result = await prisma.$transaction(async (tx: any) => {
            // Create base user
            const user = await tx.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role,
                },
            });

            // Create role-specific profile
            let userProfile;
            switch (role) {
                case 'CANDIDATE':
                    userProfile = await tx.candidateProfile.create({
                        data: {
                            userId: user.id,
                            firstName: (profile as any).firstName,
                            lastName: (profile as any).lastName,
                            phone: (profile as any).phone,
                        },
                    });
                    break;

                case 'RECRUITER':
                    userProfile = await tx.recruiterProfile.create({
                        data: {
                            userId: user.id,
                            firstName: (profile as any).firstName,
                            lastName: (profile as any).lastName,
                            phone: (profile as any).phone,
                            companyName: (profile as any).companyName,
                            jobTitle: (profile as any).jobTitle,
                        },
                    });
                    break;

                case 'ADMIN':
                    userProfile = await tx.adminProfile.create({
                        data: {
                            userId: user.id,
                            firstName: (profile as any).firstName,
                            lastName: (profile as any).lastName,
                            phone: (profile as any).phone,
                            permissions: [],
                        },
                    });
                    break;
            }

            return { user, profile: userProfile };
        });

        // Send welcome email
        try {
            const fullName = `${(profile as any).firstName} ${(profile as any).lastName}`;
            await sendWelcomeEmail(email, fullName);
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
        }

        // Generate tokens
        const { accessToken, refreshToken } = await generateTokens({
            id: result.user.id,
            email: result.user.email,
            role: result.user.role,
        });

        // Get complete user data
        const completeUser = await this.getUserById(result.user.id);

        return {
            user: completeUser,
            accessToken,
            refreshToken,
        };
    }

    static async getUserById(userId: string): Promise<AuthenticatedUser> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                candidateProfile: {
                    include: {
                        skills: true,
                        experiences: true,
                        educations: true,
                    },
                },
                recruiterProfile: true,
                adminProfile: true,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        return this.formatUserByRole(user);
    }

    private static formatUserByRole(user: any): AuthenticatedUser {
        const baseUser = {
            id: user.id,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            lastLoginAt: user.lastLoginAt?.toISOString(),
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        };

        switch (user.role) {
            case 'CANDIDATE':
                return {
                    ...baseUser,
                    role: 'CANDIDATE',
                    profile: user.candidateProfile,
                } as CandidateUser;

            case 'RECRUITER':
                return {
                    ...baseUser,
                    role: 'RECRUITER',
                    profile: user.recruiterProfile,
                } as RecruiterUser;

            case 'ADMIN':
                return {
                    ...baseUser,
                    role: 'ADMIN',
                    profile: user.adminProfile,
                } as AdminUser;

            default:
                throw new Error('Invalid user role');
        }
    }
}
