'use client';

import { BookOpen, Target, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PreparationSectionProps {
    onInterviewPrepStart: () => void;
    onSkillsExplore: () => void;
}

export function PreparationSection({
    onInterviewPrepStart,
    onSkillsExplore,
}: PreparationSectionProps) {
    const preparationItems = [
        {
            id: 'interview-prep',
            title: 'Interview Preparation',
            description: 'Practice coding challenges and system design questions',
            icon: Target,
            action: 'Start Practice',
            onClick: onInterviewPrepStart,
            stats: { questions: 500, completed: 127, difficulty: 'Mixed' },
        },
        {
            id: 'skills-assessment',
            title: 'Skills Assessment',
            description: 'Evaluate your current skill level and identify gaps',
            icon: BookOpen,
            action: 'Take Assessment',
            onClick: onSkillsExplore,
            stats: { tests: 25, completed: 8, accuracy: '85%' },
        },
        {
            id: 'peer-learning',
            title: 'Peer Learning',
            description: 'Join study groups and learn with other developers',
            icon: Users,
            action: 'Join Groups',
            onClick: () => {},
            stats: { groups: 12, members: 156, active: '8 online' },
        },
    ];

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Preparation Tools</h2>
                <button className="text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {preparationItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                    <item.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">{item.title}</CardTitle>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-3 gap-2 text-center text-sm">
                                {Object.entries(item.stats).map(([key, value]) => (
                                    <div key={key} className="space-y-1">
                                        <div className="font-medium text-gray-900">{value}</div>
                                        <div className="text-xs text-gray-500 capitalize">
                                            {key}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={item.onClick}
                                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                {item.action}
                            </button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
