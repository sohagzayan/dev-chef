'use client';

import { useState } from 'react';
import { Camera, Eye, EyeOff } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProfileFormProps {
    profileData: {
        name: string;
        avatar: string;
    };
    formData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        password: string;
    };
    onInputChange: (field: string, value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function ProfileForm({ profileData, formData, onInputChange, onSubmit }: ProfileFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-6">
                <div className="relative">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={profileData.avatar} alt={profileData.name} />
                        <AvatarFallback className="bg-blue-600 text-2xl font-bold text-white">
                            {profileData.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <button
                        type="button"
                        className="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
                    >
                        <Camera className="h-4 w-4" />
                    </button>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-900">{profileData.name}</h3>
                    <p className="text-sm text-gray-600">Profile picture</p>
                </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <Input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => onInputChange('firstName', e.target.value)}
                        className="border-gray-200 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <Input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => onInputChange('lastName', e.target.value)}
                        className="border-gray-200 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                    <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => onInputChange('email', e.target.value)}
                        className="border-gray-200 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Contact Number
                    </label>
                    <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => onInputChange('phone', e.target.value)}
                        className="border-gray-200 focus:border-blue-500"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">Address</label>
                    <Input
                        type="text"
                        value={formData.address}
                        onChange={(e) => onInputChange('address', e.target.value)}
                        className="border-gray-200 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">City</label>
                    <Input
                        type="text"
                        value={formData.city}
                        onChange={(e) => onInputChange('city', e.target.value)}
                        className="border-gray-200 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">State</label>
                    <Input
                        type="text"
                        value={formData.state}
                        onChange={(e) => onInputChange('state', e.target.value)}
                        className="border-gray-200 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Zip Code</label>
                    <Input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => onInputChange('zipCode', e.target.value)}
                        className="border-gray-200 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Country</label>
                    <Input
                        type="text"
                        value={formData.country}
                        onChange={(e) => onInputChange('country', e.target.value)}
                        className="border-gray-200 focus:border-blue-500"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => onInputChange('password', e.target.value)}
                            className="border-gray-200 pr-10 focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="pt-6">
                <Button
                    type="submit"
                    className="bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
                >
                    Save
                </Button>
            </div>
        </form>
    );
}
