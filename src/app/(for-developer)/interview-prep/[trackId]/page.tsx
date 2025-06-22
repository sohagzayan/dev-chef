'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Clock, Lock, Play, Star, Target, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function InterviewTrackPage019() {
    const params = useParams();
    const router = useRouter();
    const trackId = params.trackId as string;

    const trackData = {
        faang: {
            title: 'FAANG Interview Prep',
            description:
                'Prepare for interviews at top tech companies like Google, Meta, Amazon, Apple, and Netflix',
            difficulty: 'Advanced',
            duration: '8-12 weeks',
            enrolled: 25420,
            rating: 4.9,
            progress: 0,
            companies: ['Google', 'Meta', 'Amazon', 'Apple', 'Netflix'],
            phases: [
                {
                    id: 1,
                    title: 'Data Structures Mastery',
                    duration: '2-3 weeks',
                    problems: 40,
                    completed: false,
                    current: true,
                    description: 'Master fundamental data structures used in technical interviews',
                    topics: [
                        'Arrays & Strings',
                        'Linked Lists',
                        'Stacks & Queues',
                        'Trees & Graphs',
                        'Hash Tables',
                    ],
                    difficulty: 'Medium',
                },
                {
                    id: 2,
                    title: 'Algorithm Patterns',
                    duration: '3-4 weeks',
                    problems: 50,
                    completed: false,
                    description: 'Learn common algorithmic patterns and problem-solving techniques',
                    topics: [
                        'Two Pointers',
                        'Sliding Window',
                        'Dynamic Programming',
                        'Backtracking',
                        'Greedy Algorithms',
                    ],
                    difficulty: 'Hard',
                },
                {
                    id: 3,
                    title: 'System Design Fundamentals',
                    duration: '2-3 weeks',
                    problems: 25,
                    completed: false,
                    description: 'Design scalable systems and understand distributed architecture',
                    topics: [
                        'Load Balancing',
                        'Caching',
                        'Database Design',
                        'Microservices',
                        'Scalability',
                    ],
                    difficulty: 'Advanced',
                },
                {
                    id: 4,
                    title: 'Behavioral Interview Prep',
                    duration: '1-2 weeks',
                    problems: 35,
                    completed: false,
                    description: 'Master behavioral questions and leadership principles',
                    topics: [
                        'STAR Method',
                        'Leadership Stories',
                        'Conflict Resolution',
                        'Team Collaboration',
                        'Career Goals',
                    ],
                    difficulty: 'Medium',
                },
            ],
            mockInterviews: [
                {
                    title: 'Google Technical Interview',
                    description:
                        '45-minute coding interview simulation with Google-style questions',
                    difficulty: 'Hard',
                    duration: '45 min',
                    completed: false,
                    current: true,
                },
                {
                    title: 'Meta System Design',
                    description:
                        'System design interview focusing on social media platform architecture',
                    difficulty: 'Advanced',
                    duration: '60 min',
                    completed: false,
                },
                {
                    title: 'Amazon Leadership Principles',
                    description: "Behavioral interview based on Amazon's 16 leadership principles",
                    difficulty: 'Medium',
                    duration: '30 min',
                    completed: false,
                },
            ],
        },
        algorithms: {
            title: 'Algorithm Mastery',
            description: 'Master algorithmic thinking and problem-solving patterns',
            difficulty: 'Intermediate',
            duration: '6-8 weeks',
            enrolled: 18750,
            rating: 4.8,
            progress: 25,
            companies: ['Microsoft', 'Uber', 'Airbnb'],
            phases: [
                {
                    id: 1,
                    title: 'Sorting & Searching',
                    duration: '1-2 weeks',
                    problems: 25,
                    completed: true,
                    description: 'Master fundamental sorting and searching algorithms',
                    topics: [
                        'Quick Sort',
                        'Merge Sort',
                        'Binary Search',
                        'Heap Sort',
                        'Radix Sort',
                    ],
                    difficulty: 'Easy',
                },
                {
                    id: 2,
                    title: 'Dynamic Programming',
                    duration: '2-3 weeks',
                    problems: 35,
                    completed: false,
                    current: true,
                    description: 'Solve complex problems using dynamic programming techniques',
                    topics: [
                        'Memoization',
                        'Tabulation',
                        'Knapsack Problems',
                        'Longest Subsequence',
                        'Path Problems',
                    ],
                    difficulty: 'Hard',
                },
                {
                    id: 3,
                    title: 'Graph Algorithms',
                    duration: '2-3 weeks',
                    problems: 30,
                    completed: false,
                    description: 'Navigate complex graph problems and traversal algorithms',
                    topics: [
                        'DFS & BFS',
                        'Shortest Path',
                        'Minimum Spanning Tree',
                        'Topological Sort',
                        'Union Find',
                    ],
                    difficulty: 'Medium',
                },
                {
                    id: 4,
                    title: 'Advanced Techniques',
                    duration: '1-2 weeks',
                    problems: 30,
                    completed: false,
                    description: 'Master advanced algorithmic techniques and optimizations',
                    topics: [
                        'Bit Manipulation',
                        'Mathematical Algorithms',
                        'String Algorithms',
                        'Segment Trees',
                        'Trie',
                    ],
                    difficulty: 'Hard',
                },
            ],
            mockInterviews: [
                {
                    title: 'Microsoft Coding Challenge',
                    description: 'Algorithm-focused interview with Microsoft-style problems',
                    difficulty: 'Medium',
                    duration: '45 min',
                    completed: true,
                },
                {
                    title: 'Uber Technical Screen',
                    description: 'Real-world problem solving with algorithmic optimization',
                    difficulty: 'Hard',
                    duration: '60 min',
                    completed: false,
                    current: true,
                },
            ],
        },
    };

    const currentTrack = trackData[trackId as keyof typeof trackData] || trackData.faang;

    const handleStartPhase = (phaseId: number) => {
        router.push(`/interview-prep/${trackId}/phase/${phaseId}`);
    };

    const handleStartMockInterview = (interviewIndex: number) => {
        router.push(`/interview-prep/${trackId}/mock/${interviewIndex}`);
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="sticky top-0 z-40 border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push('/interview-prep')}
                            className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Interview Prep
                        </Button>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-600">
                                Progress:{' '}
                                <span className="font-semibold text-green-600">
                                    {currentTrack.progress}%
                                </span>
                            </div>
                            <Progress value={currentTrack.progress} className="h-2 w-32" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-8">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                    {/* Header */}
                    <div className="mb-12">
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <h1 className="mb-4 text-4xl font-bold text-gray-900">
                                    {currentTrack.title}
                                </h1>
                                <p className="mb-4 text-lg text-gray-600">
                                    {currentTrack.description}
                                </p>
                                <div className="flex items-center gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-blue-500" />
                                        <span>{currentTrack.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-green-500" />
                                        <span>
                                            {currentTrack.enrolled.toLocaleString()} enrolled
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span>{currentTrack.rating} rating</span>
                                    </div>
                                </div>
                            </div>
                            <Badge
                                className={`${
                                    currentTrack.difficulty === 'Advanced'
                                        ? 'border-red-200 bg-red-50 text-red-700'
                                        : 'border-yellow-200 bg-yellow-50 text-yellow-700'
                                }`}
                            >
                                {currentTrack.difficulty}
                            </Badge>
                        </div>

                        {/* Target Companies */}
                        <div className="mb-8">
                            <h3 className="mb-3 text-sm font-semibold text-gray-700">
                                Target Companies:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {currentTrack.companies.map((company, index) => (
                                    <Badge
                                        key={index}
                                        className="border-blue-200 bg-blue-50 text-blue-700"
                                    >
                                        {company}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Tabs defaultValue="phases" className="space-y-8">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="phases">Learning Phases</TabsTrigger>
                            <TabsTrigger value="mock-interviews">Mock Interviews</TabsTrigger>
                        </TabsList>

                        <TabsContent value="phases" className="space-y-6">
                            <div className="grid gap-6">
                                {currentTrack.phases.map((phase, index) => (
                                    <motion.div
                                        key={phase.id}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card
                                            className={`border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
                                                phase.current
                                                    ? 'bg-green-50/30 ring-2 ring-green-500'
                                                    : ''
                                            }`}
                                        >
                                            <CardContent className="p-8">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex flex-1 items-start gap-6">
                                                        <div
                                                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                                                                phase.completed
                                                                    ? 'bg-green-100'
                                                                    : phase.current
                                                                      ? 'bg-green-100'
                                                                      : 'bg-gray-100'
                                                            }`}
                                                        >
                                                            {phase.completed ? (
                                                                <CheckCircle className="h-6 w-6 text-green-600" />
                                                            ) : phase.current ? (
                                                                <Target className="h-6 w-6 text-green-600" />
                                                            ) : (
                                                                <Lock className="h-6 w-6 text-gray-400" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="mb-2 flex items-center gap-3">
                                                                <h3 className="text-xl font-bold text-gray-900">
                                                                    {phase.title}
                                                                </h3>
                                                                {phase.current && (
                                                                    <Badge className="bg-green-100 text-green-700">
                                                                        Current
                                                                    </Badge>
                                                                )}
                                                                {phase.completed && (
                                                                    <Badge className="bg-green-100 text-green-700">
                                                                        Completed
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="mb-4 text-gray-600">
                                                                {phase.description}
                                                            </p>
                                                            <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
                                                                <span>{phase.duration}</span>
                                                                <span>•</span>
                                                                <span>
                                                                    {phase.problems} problems
                                                                </span>
                                                                <span>•</span>
                                                                <Badge
                                                                    variant="secondary"
                                                                    className={`text-xs ${
                                                                        phase.difficulty === 'Easy'
                                                                            ? 'bg-green-50 text-green-700'
                                                                            : phase.difficulty ===
                                                                                'Medium'
                                                                              ? 'bg-yellow-50 text-yellow-700'
                                                                              : phase.difficulty ===
                                                                                  'Hard'
                                                                                ? 'bg-red-50 text-red-700'
                                                                                : 'bg-purple-50 text-purple-700'
                                                                    }`}
                                                                >
                                                                    {phase.difficulty}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {phase.topics.map(
                                                                    (topic, topicIndex) => (
                                                                        <Badge
                                                                            key={topicIndex}
                                                                            variant="secondary"
                                                                            className="text-xs"
                                                                        >
                                                                            {topic}
                                                                        </Badge>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        onClick={() => handleStartPhase(phase.id)}
                                                        disabled={
                                                            !phase.completed && !phase.current
                                                        }
                                                        className={
                                                            phase.completed
                                                                ? 'bg-green-600 hover:bg-green-700'
                                                                : phase.current
                                                                  ? 'bg-green-600 hover:bg-green-700'
                                                                  : ''
                                                        }
                                                    >
                                                        {phase.completed
                                                            ? 'Review'
                                                            : phase.current
                                                              ? 'Start Phase'
                                                              : 'Locked'}
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="mock-interviews" className="space-y-6">
                            <div className="grid gap-6">
                                {currentTrack.mockInterviews.map((interview, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card
                                            className={`border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
                                                interview.current
                                                    ? 'bg-orange-50/30 ring-2 ring-orange-500'
                                                    : ''
                                            }`}
                                        >
                                            <CardContent className="p-8">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex flex-1 items-start gap-6">
                                                        <div
                                                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                                                                interview.completed
                                                                    ? 'bg-green-100'
                                                                    : interview.current
                                                                      ? 'bg-orange-100'
                                                                      : 'bg-gray-100'
                                                            }`}
                                                        >
                                                            {interview.completed ? (
                                                                <CheckCircle className="h-6 w-6 text-green-600" />
                                                            ) : interview.current ? (
                                                                <Play className="h-6 w-6 text-orange-600" />
                                                            ) : (
                                                                <Lock className="h-6 w-6 text-gray-400" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="mb-2 flex items-center gap-3">
                                                                <h3 className="text-xl font-bold text-gray-900">
                                                                    {interview.title}
                                                                </h3>
                                                                {interview.current && (
                                                                    <Badge className="bg-orange-100 text-orange-700">
                                                                        Available
                                                                    </Badge>
                                                                )}
                                                                {interview.completed && (
                                                                    <Badge className="bg-green-100 text-green-700">
                                                                        Completed
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="mb-4 text-gray-600">
                                                                {interview.description}
                                                            </p>
                                                            <div className="flex items-center gap-4 text-sm">
                                                                <Badge
                                                                    className={`${
                                                                        interview.difficulty ===
                                                                        'Easy'
                                                                            ? 'border-green-200 bg-green-50 text-green-700'
                                                                            : interview.difficulty ===
                                                                                'Medium'
                                                                              ? 'border-yellow-200 bg-yellow-50 text-yellow-700'
                                                                              : interview.difficulty ===
                                                                                  'Hard'
                                                                                ? 'border-red-200 bg-red-50 text-red-700'
                                                                                : 'border-purple-200 bg-purple-50 text-purple-700'
                                                                    }`}
                                                                >
                                                                    {interview.difficulty}
                                                                </Badge>
                                                                <span className="text-gray-500">
                                                                    {interview.duration}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        onClick={() =>
                                                            handleStartMockInterview(index)
                                                        }
                                                        disabled={
                                                            !interview.completed &&
                                                            !interview.current
                                                        }
                                                        className={
                                                            interview.completed
                                                                ? 'bg-green-600 hover:bg-green-700'
                                                                : interview.current
                                                                  ? 'bg-orange-600 hover:bg-orange-700'
                                                                  : ''
                                                        }
                                                    >
                                                        {interview.completed
                                                            ? 'Review Results'
                                                            : interview.current
                                                              ? 'Start Interview'
                                                              : 'Locked'}
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </div>
        </div>
    );
}
