'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/redux/useAuth';
import { useUI } from '@/hooks/redux/useUI';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/store/api/userApi';

export function ReduxExample() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    // Custom hooks
    const { user, isAuthenticated, login, logout } = useAuth();
    const { showSuccess, showError, showWarning, showInfo, isLoading } = useUI();

    // RTK Query hooks
    const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(undefined, {
        skip: !isAuthenticated, // Skip query if not authenticated
    });

    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

    // Example login function
    const handleLogin = async () => {
        const result = await login({
            email: 'user@example.com',
            password: 'password123',
        });

        if (result.success) {
            showSuccess('Login Successful', 'Welcome back!');
        } else {
            showError('Login Failed', result.error || 'Invalid credentials');
        }
    };

    // Example logout function
    const handleLogout = async () => {
        await logout();
        showSuccess('Logout Successful', 'You have been logged out');
    };

    // Example profile update function
    const handleUpdateProfile = async () => {
        try {
            await updateProfile({
                name: name || undefined,
                phone: phone || undefined,
            }).unwrap();

            showSuccess('Profile Updated', 'Your profile has been updated successfully');
            setName('');
            setPhone('');
        } catch (error: any) {
            showError('Update Failed', error?.data?.error || 'Failed to update profile');
        }
    };

    return (
        <div className="mx-auto max-w-2xl space-y-6 p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Redux with RTK Query Example</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Authentication Section */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Authentication</h3>
                        <div className="flex gap-2">
                            {!isAuthenticated ? (
                                <Button onClick={handleLogin} disabled={isLoading}>
                                    Login
                                </Button>
                            ) : (
                                <Button onClick={handleLogout} variant="outline">
                                    Logout
                                </Button>
                            )}
                        </div>
                        {user && (
                            <div className="text-sm text-gray-600">
                                Logged in as: {user.name} ({user.email})
                            </div>
                        )}
                    </div>

                    {/* Profile Section */}
                    {isAuthenticated && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">User Profile</h3>

                            {isProfileLoading ? (
                                <div className="text-sm text-gray-500">Loading profile...</div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <strong>Current Name:</strong>{' '}
                                        {profileData?.user?.name || 'Not set'}
                                    </div>
                                    <div className="text-sm">
                                        <strong>Current Phone:</strong>{' '}
                                        {profileData?.user?.phone || 'Not set'}
                                    </div>
                                </div>
                            )}

                            {/* Update Profile Form */}
                            <div className="space-y-2">
                                <h4 className="font-medium">Update Profile</h4>
                                <div className="space-y-2">
                                    <Input
                                        placeholder="New name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <Input
                                        placeholder="New phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <Button
                                        onClick={handleUpdateProfile}
                                        disabled={isUpdating || (!name && !phone)}
                                        className="w-full"
                                    >
                                        {isUpdating ? 'Updating...' : 'Update Profile'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications Section */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Notifications</h3>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                onClick={() => showSuccess('Success', 'This is a success message')}
                                variant="outline"
                                size="sm"
                            >
                                Show Success
                            </Button>
                            <Button
                                onClick={() => showError('Error', 'This is an error message')}
                                variant="outline"
                                size="sm"
                            >
                                Show Error
                            </Button>
                            <Button
                                onClick={() => showWarning('Warning', 'This is a warning message')}
                                variant="outline"
                                size="sm"
                            >
                                Show Warning
                            </Button>
                            <Button
                                onClick={() => showInfo('Info', 'This is an info message')}
                                variant="outline"
                                size="sm"
                            >
                                Show Info
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
