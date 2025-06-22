'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Brain,
    Code,
    Database,
    Globe,
    Palette,
    Server,
    Shield,
    Smartphone,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function SkillsPage() {
    const router = useRouter();

    const skillTracks = [
        {
            id: 'frontend',
            title: 'Frontend Development',
            icon: Code,
            description: 'Master modern frontend technologies and frameworks',
            level: 'Beginner to Advanced',
            duration: '12-16 weeks',
            skills: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript', 'Next.js'],
            projects: 8,
            color: 'from-blue-500 to-blue-600',
            progress: 45,
            enrolled: 15420,
        },
        {
            id: 'backend',
            title: 'Backend Development',
            icon: Server,
            description: 'Build scalable server-side applications and APIs',
            level: 'Intermediate to Advanced',
            duration: '14-18 weeks',
            skills: ['Node.js', 'Python', 'Databases', 'APIs', 'Microservices'],
            projects: 10,
            color: 'from-green-500 to-green-600',
            progress: 0,
            enrolled: 12850,
        },
        {
            id: 'fullstack',
            title: 'Full Stack Development',
            icon: Globe,
            description: 'Complete web development from frontend to backend',
            level: 'Intermediate to Advanced',
            duration: '20-24 weeks',
            skills: ['React', 'Node.js', 'Databases', 'DevOps', 'Testing'],
            projects: 15,
            color: 'from-purple-500 to-purple-600',
            progress: 20,
            enrolled: 18750,
        },
        {
            id: 'mobile',
            title: 'Mobile Development',
            icon: Smartphone,
            description: 'Create native and cross-platform mobile applications',
            level: 'Beginner to Advanced',
            duration: '16-20 weeks',
            skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Mobile UI/UX'],
            projects: 12,
            color: 'from-orange-500 to-orange-600',
            progress: 0,
            enrolled: 9340,
        },
        {
            id: 'data-science',
            title: 'Data Science & ML',
            icon: Brain,
            description: 'Analyze data and build machine learning models',
            level: 'Intermediate to Advanced',
            duration: '18-22 weeks',
            skills: [
                'Python',
                'Machine Learning',
                'Statistics',
                'Data Visualization',
                'Deep Learning',
            ],
            projects: 10,
            color: 'from-pink-500 to-pink-600',
            progress: 0,
            enrolled: 11200,
        },
        {
            id: 'devops',
            title: 'DevOps & Cloud',
            icon: Shield,
            description: 'Master deployment, monitoring, and cloud infrastructure',
            level: 'Intermediate to Advanced',
            duration: '12-16 weeks',
            skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Monitoring'],
            projects: 8,
            color: 'from-indigo-500 to-indigo-600',
            progress: 0,
            enrolled: 7890,
        },
        {
            id: 'database',
            title: 'Database Engineering',
            icon: Database,
            description: 'Design and optimize database systems',
            level: 'Intermediate to Advanced',
            duration: '10-14 weeks',
            skills: ['SQL', 'NoSQL', 'Database Design', 'Performance Tuning', 'Data Modeling'],
            projects: 6,
            color: 'from-teal-500 to-teal-600',
            progress: 0,
            enrolled: 6540,
        },
        {
            id: 'ui-ux',
            title: 'UI/UX Design',
            icon: Palette,
            description: 'Create beautiful and user-friendly interfaces',
            level: 'Beginner to Advanced',
            duration: '8-12 weeks',
            skills: ['Design Principles', 'Figma', 'Prototyping', 'User Research', 'Accessibility'],
            projects: 12,
            color: 'from-rose-500 to-rose-600',
            progress: 0,
            enrolled: 8920,
        },
    ];

    const handleStartTrack = (trackId: string) => {
        router.push(`/skills/${trackId}`);
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
                            Skill Development Paths
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            Personalized learning tracks to build expertise in your chosen
                            technology stack. From beginner to expert level.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {skillTracks.map((track, index) => (
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
                                                <track.icon className="h-6 w-6 text-white" />
                                            </div>
                                            <Badge variant="secondary" className="text-xs">
                                                {track.level}
                                            </Badge>
                                        </div>
                                        <CardTitle className="mb-2 text-lg font-bold text-gray-900">
                                            {track.title}
                                        </CardTitle>
                                        <p className="text-sm text-gray-600">{track.description}</p>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
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
                                            <div>
                                                <span className="text-gray-600">Duration:</span>
                                                <div className="font-semibold text-gray-900">
                                                    {track.duration}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Projects:</span>
                                                <div className="font-semibold text-gray-900">
                                                    {track.projects}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-2 text-sm font-semibold text-gray-700">
                                                Key Skills:
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {track.skills
                                                    .slice(0, 3)
                                                    .map((skill, skillIndex) => (
                                                        <Badge
                                                            key={skillIndex}
                                                            variant="secondary"
                                                            className="text-xs"
                                                        >
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                {track.skills.length > 3 && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        +{track.skills.length - 3} more
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-xs text-gray-500">
                                            {track.enrolled.toLocaleString()} students enrolled
                                        </div>

                                        <Button
                                            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800"
                                            onClick={() => handleStartTrack(track.id)}
                                        >
                                            {track.progress > 0
                                                ? 'Continue Learning'
                                                : 'Start Learning'}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16">
                        <Card className="border-0 bg-gradient-to-r from-purple-50 to-blue-50 shadow-lg">
                            <CardContent className="p-8">
                                <div className="text-center">
                                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                                        Why Choose Our Skill Tracks?
                                    </h2>
                                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                                        <div className="text-center">
                                            <div className="mb-4 text-4xl">🎯</div>
                                            <h3 className="mb-2 font-semibold text-gray-900">
                                                Personalized Learning
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Adaptive curriculum that adjusts to your pace and
                                                skill level
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <div className="mb-4 text-4xl">🚀</div>
                                            <h3 className="mb-2 font-semibold text-gray-900">
                                                Real-World Projects
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Build portfolio-worthy projects that employers love
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <div className="mb-4 text-4xl">🏆</div>
                                            <h3 className="mb-2 font-semibold text-gray-900">
                                                Industry Recognition
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Earn certificates recognized by top tech companies
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
