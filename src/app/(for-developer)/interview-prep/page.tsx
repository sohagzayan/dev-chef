'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Clock, Code, Star, Target, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function InterviewPrepPage() {
    const router = useRouter();

    const interviewTracks = [
        {
            id: 'faang',
            title: 'FAANG Interview Prep',
            description:
                'Prepare for interviews at top tech companies like Google, Meta, Amazon, Apple, and Netflix',
            difficulty: 'Advanced',
            duration: '8-12 weeks',
            problems: 150,
            topics: ['System Design', 'Algorithms', 'Data Structures', 'Behavioral'],
            companies: ['Google', 'Meta', 'Amazon', 'Apple', 'Netflix'],
            color: 'from-red-500 to-red-600',
            progress: 0,
        },
        {
            id: 'algorithms',
            title: 'Algorithm Mastery',
            description: 'Master algorithmic thinking and problem-solving patterns',
            difficulty: 'Intermediate',
            duration: '6-8 weeks',
            problems: 120,
            topics: ['Dynamic Programming', 'Graphs', 'Trees', 'Sorting'],
            companies: ['Microsoft', 'Uber', 'Airbnb'],
            color: 'from-blue-500 to-blue-600',
            progress: 25,
        },
        {
            id: 'system-design',
            title: 'System Design Interview',
            description: 'Learn to design scalable systems and architecture',
            difficulty: 'Advanced',
            duration: '4-6 weeks',
            problems: 50,
            topics: ['Scalability', 'Databases', 'Caching', 'Load Balancing'],
            companies: ['Netflix', 'Spotify', 'Twitter'],
            color: 'from-purple-500 to-purple-600',
            progress: 0,
        },
        {
            id: 'frontend',
            title: 'Frontend Interview Prep',
            description: 'Master frontend development interviews',
            difficulty: 'Intermediate',
            duration: '4-6 weeks',
            problems: 80,
            topics: ['JavaScript', 'React', 'CSS', 'Performance'],
            companies: ['Airbnb', 'Stripe', 'Shopify'],
            color: 'from-green-500 to-green-600',
            progress: 60,
        },
    ];

    const handleStartTrack = (trackId: string) => {
        router.push(`/interview-prep/${trackId}`);
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Button>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-12">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-gray-900">
                            Interview Mastery Kit
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            Comprehensive preparation for technical interviews at top-tier
                            companies. Choose your track and start your journey to success.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {interviewTracks.map((track, index) => (
                            <motion.div
                                key={track.id}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                            >
                                <Card className="h-full border-0 shadow-xl transition-all duration-500 hover:shadow-2xl">
                                    <CardHeader>
                                        <div className="mb-4 flex items-start justify-between">
                                            <div
                                                className={`h-12 w-12 bg-gradient-to-br ${track.color} flex items-center justify-center rounded-xl`}
                                            >
                                                <Target className="h-6 w-6 text-white" />
                                            </div>
                                            <Badge
                                                className={`${
                                                    track.difficulty === 'Advanced'
                                                        ? 'border-red-200 bg-red-50 text-red-700'
                                                        : 'border-yellow-200 bg-yellow-50 text-yellow-700'
                                                }`}
                                            >
                                                {track.difficulty}
                                            </Badge>
                                        </div>
                                        <CardTitle className="mb-2 text-xl font-bold text-gray-900">
                                            {track.title}
                                        </CardTitle>
                                        <p className="text-sm text-gray-600">{track.description}</p>
                                    </CardHeader>

                                    <CardContent className="space-y-6">
                                        {track.progress > 0 && (
                                            <div>
                                                <div className="mb-2 flex items-center justify-between">
                                                    <span className="text-sm font-medium text-gray-700">
                                                        Progress
                                                    </span>
                                                    <span className="text-sm font-bold text-blue-600">
                                                        {track.progress}%
                                                    </span>
                                                </div>
                                                <Progress value={track.progress} className="h-2" />
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-blue-500" />
                                                <span className="text-gray-600">
                                                    {track.duration}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Code className="h-4 w-4 text-green-500" />
                                                <span className="text-gray-600">
                                                    {track.problems} problems
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-2 text-sm font-semibold text-gray-700">
                                                Key Topics:
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {track.topics.map((topic, topicIndex) => (
                                                    <Badge
                                                        key={topicIndex}
                                                        variant="secondary"
                                                        className="text-xs"
                                                    >
                                                        {topic}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-2 text-sm font-semibold text-gray-700">
                                                Target Companies:
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {track.companies.map((company, companyIndex) => (
                                                    <Badge
                                                        key={companyIndex}
                                                        className="border-blue-200 bg-blue-50 text-xs text-blue-700"
                                                    >
                                                        {company}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <Button
                                            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
                                            onClick={() => handleStartTrack(track.id)}
                                        >
                                            {track.progress > 0 ? 'Continue Track' : 'Start Track'}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16">
                        <Card className="border-0 bg-gradient-to-r from-blue-50 to-green-50 shadow-lg">
                            <CardContent className="p-8">
                                <div className="text-center">
                                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                                        Why Choose Our Interview Prep?
                                    </h2>
                                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                                        <div className="text-center">
                                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                                <Star className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <h3 className="mb-2 font-semibold text-gray-900">
                                                Real Interview Questions
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Practice with actual questions from top tech
                                                companies
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                                <TrendingUp className="h-6 w-6 text-green-600" />
                                            </div>
                                            <h3 className="mb-2 font-semibold text-gray-900">
                                                Proven Success Rate
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                85% of our users get offers from their target
                                                companies
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                                <CheckCircle className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <h3 className="mb-2 font-semibold text-gray-900">
                                                Expert Guidance
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Learn from engineers who work at FAANG companies
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
