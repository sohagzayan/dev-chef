import { getUserById } from './get-user.query';

/**
 * Query to get current authenticated user
 * This should be used with session/auth token
 */
export async function getCurrentUser(userId?: string) {
    if (!userId) {
        return {
            user: null,
            error: 'No user ID provided',
        };
    }

    return getUserById(userId);
}
