'use client';

import { Star, Trophy } from 'lucide-react';

interface HeaderProps {
    rank: string;
    points: string;
}

export function Header({ rank = '3,302,923', points = '22/30' }: HeaderProps) {
    return (
        <div className="border-b border-gray-100 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="mb-2 text-4xl font-bold text-gray-900">
                            Developer Excellence Hub
                        </h1>
                        <p className="text-lg text-gray-600">
                            Master coding skills, ace technical interviews, and advance your career
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-green-100 px-4 py-2">
                                <Trophy className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-semibold text-green-700">
                                    Rank: {rank}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2">
                                <Star className="h-5 w-5 text-blue-600" />
                                <span className="text-sm font-semibold text-blue-700">
                                    Points: {points}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
