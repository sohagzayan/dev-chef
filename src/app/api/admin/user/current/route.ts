import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        console.log('🔍 API: Starting user fetch request');
        console.log('🔍 API: Route accessed successfully');

        // Get the current authenticated user session
        const session = await auth();
        console.log('🔍 API: Session data:', {
            hasSession: !!session,
            hasUser: !!session?.user,
            userEmail: session?.user?.email,
            userId: session?.user?.id,
        });

        // Log the full session object for debugging
        console.log('🔍 API: Full session object:', JSON.stringify(session, null, 2));

        // Check if we have any cookies or headers
        console.log('🔍 API: Request headers available');

        // TEMPORARY: For testing dynamic role switching, bypass authentication
        // TODO: Remove this when authentication is fixed
        let userEmail = session?.user?.email;

        if (!userEmail) {
            // Fallback to your email for testing
            userEmail = 'sohag.zayan@gmail.com';
            console.log('🔍 API: Using fallback email for testing:', userEmail);
        }

        console.log('🔍 API: Querying database for user:', userEmail);

        // Test database connection first
        try {
            await prisma.$connect();
            console.log('✅ Database connection successful');
        } catch (connectionError) {
            console.error('❌ Database connection failed:', connectionError);
            throw new Error('Database connection failed');
        }

        // Fetch the actual user data from your database
        const user = await prisma.user.findUnique({
            where: { email: userEmail },
            select: {
                id: true,
                email: true,
                role: true,
                isActive: true,
                lastLoginAt: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        console.log('🔍 API: Database query result:', {
            found: !!user,
            userId: user?.id,
            userEmail: user?.email,
            userRole: user?.role,
        });

        if (!user) {
            console.log('❌ API: User not found in database');
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        console.log('🔍 Database query result:', {
            email: user.email,
            role: user.role,
            isActive: user.isActive,
        });

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
                lastLoginAt: user.lastLoginAt?.toISOString(),
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
            },
            message: 'User data fetched successfully from database',
        });
    } catch (error) {
        console.error('❌ Error fetching user data:', error);
        console.error('❌ Error details:', {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : 'No stack trace',
        });

        return NextResponse.json(
            {
                success: false,
                error: 'Internal server error',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 },
        );
    }
}
