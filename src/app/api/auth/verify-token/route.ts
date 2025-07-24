import { NextResponse, type NextRequest } from 'next/server';
import {
    authenticateRequest,
    createApiResponse,
    handleApiError,
} from '@/lib/middleware/api.middleware';
import { AuthService } from '@/lib/services/auth.services';

export async function GET(request: NextRequest) {
    try {
        const authResult = await authenticateRequest(request);

        if (authResult instanceof NextResponse) {
            return authResult;
        }

        const { user } = authResult;

        // Get complete user data with profile
        const completeUser = await AuthService.getUserById(user.id);

        return NextResponse.json(
            createApiResponse(true, { user: completeUser }, 'Token verified successfully'),
        );
    } catch (error) {
        return handleApiError(error);
    }
}
