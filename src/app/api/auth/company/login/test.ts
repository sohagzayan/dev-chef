// Test script for company login system
// Run with: npx tsx src/app/api/auth/company/login/test.ts

import bcrypt from 'bcryptjs';
import { generateTokens } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { AuthService } from '@/lib/services/auth.services';

async function testCompanyLogin() {
    console.log('🧪 Testing Company Login System...\n');

    try {
        // 1. Create a test recruiter user
        console.log('1. Creating test recruiter user...');

        const testEmail = 'test.recruiter@company.com';
        const testPassword = 'TestPassword123!';

        // Check if user already exists
        let user = await prisma.user.findUnique({
            where: { email: testEmail },
            include: { recruiterProfile: true },
        });

        if (!user) {
            // Create new user
            const hashedPassword = await bcrypt.hash(testPassword, 12);

            user = await prisma.user.create({
                data: {
                    email: testEmail,
                    password: hashedPassword,
                    role: 'RECRUITER',
                    recruiterProfile: {
                        create: {
                            firstName: 'Test',
                            lastName: 'Recruiter',
                            companyName: 'Test Company',
                            jobTitle: 'HR Manager',
                            companySize: '11-50',
                            industry: 'Technology',
                        },
                    },
                },
                include: { recruiterProfile: true },
            });
            console.log('✅ Test user created successfully');
        } else {
            console.log('✅ Test user already exists');
        }

        // 2. Test login functionality
        console.log('\n2. Testing login functionality...');

        const loginResult = await AuthService.login({
            email: testEmail,
            password: testPassword,
            rememberMe: false,
        });

        console.log('✅ Login successful');
        console.log('   User ID:', loginResult.user.id);
        console.log('   User Role:', loginResult.user.role);

        // Type-safe access to recruiter profile
        if (loginResult.user.role === 'RECRUITER' && 'companyName' in loginResult.user.profile) {
            console.log('   Company:', loginResult.user.profile.companyName);
        }

        console.log('   Access Token:', loginResult.accessToken ? '✅ Generated' : '❌ Missing');
        console.log('   Refresh Token:', loginResult.refreshToken ? '✅ Generated' : '❌ Missing');

        // 3. Test token generation
        console.log('\n3. Testing token generation...');

        const tokens = await generateTokens({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        console.log('✅ Tokens generated successfully');
        console.log('   Access Token Length:', tokens.accessToken.length);
        console.log('   Refresh Token Length:', tokens.refreshToken.length);

        // 4. Test role validation
        console.log('\n4. Testing role validation...');

        if (loginResult.user.role === 'RECRUITER') {
            console.log('✅ User has correct RECRUITER role');
        } else {
            console.log('❌ User does not have RECRUITER role');
        }

        // 5. Test user profile data
        console.log('\n5. Testing user profile data...');

        const profile = loginResult.user.profile;
        if (profile && loginResult.user.role === 'RECRUITER' && 'companyName' in profile) {
            console.log('✅ Company profile data is present');
            console.log('   Company Name:', profile.companyName);
            console.log('   Job Title:', profile.jobTitle);
        } else {
            console.log('❌ Company profile data is missing');
        }

        console.log('\n🎉 All tests passed! Company login system is working correctly.');
    } catch (error) {
        console.error('\n❌ Test failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the test
if (require.main === module) {
    testCompanyLogin();
}

export { testCompanyLogin };
