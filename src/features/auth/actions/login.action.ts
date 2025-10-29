'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { authenticateUser } from '../lib/services';
import { loginSchema } from '../lib/validators';

export interface LoginActionResult {
    success: boolean;
    error?: string;
    user?: {
        id: string;
        email: string;
        name?: string;
    };
}

/**
 * Server Action for user login
 * Handles authentication on the server side
 */
export async function loginAction(formData: FormData): Promise<LoginActionResult> {
    try {
        const rawData = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        // Validate input
        const validated = loginSchema.parse({
            email: rawData.email,
            password: rawData.password,
        });

        // Authenticate user
        const result = await authenticateUser(validated);

        if (!result.success) {
            return {
                success: false,
                error: result.error || 'Invalid credentials',
            };
        }

        // Revalidate dashboard page if login successful
        revalidatePath('/dashboard');
        revalidatePath('/');

        // Redirect will be handled on client side
        return {
            success: true,
            user: result.user,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            };
        }

        return {
            success: false,
            error: 'An unexpected error occurred',
        };
    }
}
