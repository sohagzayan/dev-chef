'use server';

import { revalidatePath } from 'next/cache';
import { createUser } from '../lib/services';
import { signupSchema } from '../lib/validators';

export interface SignupActionResult {
    success: boolean;
    error?: string;
    user?: {
        id: string;
        email: string;
        name?: string;
    };
}

/**
 * Server Action for user signup
 * Handles user registration on the server side
 */
export async function signupAction(formData: FormData): Promise<SignupActionResult> {
    try {
        const rawData = {
            email: formData.get('email'),
            password: formData.get('password'),
            name: formData.get('name'),
            role: formData.get('role'),
        };

        // Validate input
        const validated = signupSchema.parse({
            email: rawData.email,
            password: rawData.password,
            name: rawData.name,
            role: rawData.role,
        });

        // Create user
        const result = await createUser(validated);

        if (!result.success) {
            return {
                success: false,
                error: result.error || 'Failed to create user',
            };
        }

        // Revalidate pages
        revalidatePath('/');

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
