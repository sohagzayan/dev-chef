import { getCurrentUser } from '../../queries';

interface UserProfileProps {
    userId?: string;
}

/**
 * Server Component for displaying user profile
 * Fetches data on the server, no JavaScript sent to client
 */
export async function UserProfile({ userId }: UserProfileProps) {
    if (!userId) {
        return <div className="text-gray-500">Please log in to view your profile</div>;
    }

    const { user, error } = await getCurrentUser(userId);

    if (error || !user) {
        return <div className="text-red-500">{error || 'User not found'}</div>;
    }

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold">Profile</h3>
            <div className="space-y-1">
                <p>
                    <span className="font-medium">Name:</span> {user.name || 'Not set'}
                </p>
                <p>
                    <span className="font-medium">Email:</span> {user.email}
                </p>
                <p>
                    <span className="font-medium">Role:</span> {user.role}
                </p>
            </div>
        </div>
    );
}
