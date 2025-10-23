import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        console.log('🧪 Testing database connection...');

        // Test basic connection
        await prisma.$connect();
        console.log('✅ Database connection successful');

        // Test simple query
        const userCount = await prisma.user.count();
        console.log('✅ User count query successful:', userCount);

        // Test schema fields
        const sampleUser = await prisma.user.findFirst({
            select: {
                id: true,
                email: true,
                role: true,
                isActive: true,
            },
        });

        console.log('✅ Sample user query successful:', sampleUser);

        return NextResponse.json({
            success: true,
            message: 'Database connection and queries working',
            userCount,
            sampleUser,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('❌ Database test failed:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Database test failed',
                details: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString(),
            },
            { status: 500 },
        );
    } finally {
        await prisma.$disconnect();
    }
}
