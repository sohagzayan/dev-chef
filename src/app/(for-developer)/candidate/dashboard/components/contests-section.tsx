'use client';

import { Calendar, Trophy, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ContestsSectionProps {
    onContestRegister: (contestId: string) => void;
    onContestView: (contestId: string) => void;
}

export function ContestsSection({ onContestRegister, onContestView }: ContestsSectionProps) {
    const contests = [
        {
            id: 'weekly-coding',
            title: 'Weekly Coding Challenge',
            description: 'Solve algorithmic problems and compete with peers',
            startDate: '2024-01-15',
            endDate: '2024-01-22',
            participants: 342,
            prize: '$500',
            status: 'active',
            registered: true,
        },
        {
            id: 'ai-hackathon',
            title: 'AI Innovation Hackathon',
            description: 'Build AI-powered solutions in 48 hours',
            startDate: '2024-02-01',
            endDate: '2024-02-03',
            participants: 156,
            prize: '$2000',
            status: 'upcoming',
            registered: false,
        },
        {
            id: 'system-design',
            title: 'System Design Competition',
            description: 'Design scalable architectures for real-world problems',
            startDate: '2024-01-20',
            endDate: '2024-01-25',
            participants: 89,
            prize: '$1000',
            status: 'upcoming',
            registered: false,
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'upcoming':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Coding Contests</h2>
                <button className="text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {contests.map((contest) => (
                    <Card key={contest.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-lg">{contest.title}</CardTitle>
                                    <p className="text-sm text-gray-600">{contest.description}</p>
                                </div>
                                {contest.registered && (
                                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                        Registered
                                    </span>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-600">
                                        {formatDate(contest.startDate)} -{' '}
                                        {formatDate(contest.endDate)}
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center text-sm">
                                <div className="space-y-1">
                                    <div className="flex items-center justify-center gap-1">
                                        <Users className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">{contest.participants}</span>
                                    </div>
                                    <div className="text-xs text-gray-500">Participants</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-center gap-1">
                                        <Trophy className="h-4 w-4 text-yellow-500" />
                                        <span className="font-medium">{contest.prize}</span>
                                    </div>
                                    <div className="text-xs text-gray-500">Prize</div>
                                </div>
                                <div className="space-y-1">
                                    <span
                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(contest.status)}`}
                                    >
                                        {contest.status}
                                    </span>
                                    <div className="text-xs text-gray-500">Status</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {contest.registered ? (
                                    <button
                                        onClick={() => onContestView(contest.id)}
                                        className="flex-1 rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                                    >
                                        View Details
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onContestRegister(contest.id)}
                                        className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                    >
                                        Register Now
                                    </button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
