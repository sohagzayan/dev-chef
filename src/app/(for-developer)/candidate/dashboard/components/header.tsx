'use client';

import { Bell, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
    return (
        <div className="border-b border-gray-100 bg-white px-8 py-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Developer Dashboard</h1>
                    <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100">
                        <Bell className="h-6 w-6" />
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            3
                        </span>
                    </button>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/user.jpg" alt="User" />
                        <AvatarFallback className="bg-blue-600 text-white">TD</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
}
