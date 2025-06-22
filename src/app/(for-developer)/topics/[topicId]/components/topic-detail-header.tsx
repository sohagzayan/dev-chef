'use client';

import { ArrowLeft, ChevronRight, Sparkles, Star, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TopicDetailHeaderProps {
    topicName: string;
    onBack: () => void;
    rank?: string;
    points?: string;
}

export function TopicDetailHeader({
    topicName,
    onBack,
    rank = '3,302,923',
    points = '22/30',
}: TopicDetailHeaderProps) {
    return (
        <div className="glass-effect sticky top-0 z-40 border-b border-gray-100 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onBack}
                            className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Topics
                        </Button>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500">Prepare</span>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                            <span className="font-semibold text-gray-900">{topicName}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Trophy className="h-4 w-4 text-yellow-500" />
                                <span className="text-gray-600">Rank:</span>
                                <span className="font-semibold text-gray-900">{rank}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-blue-500" />
                                <span className="text-gray-600">Points:</span>
                                <span className="font-semibold text-gray-900">{points}</span>
                            </div>
                        </div>
                        <Badge className="border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100 px-3 py-1 text-orange-700">
                            <Sparkles className="mr-1 h-3 w-3" />8 more points to get your first
                            star!
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    );
}
