'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Clock, Code, Lock, Play, Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SkillTrackPage019() {
    const params = useParams();
    const router = useRouter();
    const trackId = params.trackId as string;

    const trackData = {
        frontend: {
            title: 'Frontend Development',
            description: 'Master modern frontend technologies and frameworks',
            level: 'Beginner to Advanced',
            duration: '12-16 weeks',
            enrolled: 15420,
            rating: 4.8,
            progress: 45,
            modules: [
                {
                    id: 1,
                    title: 'HTML & CSS Fundamentals',
                    duration: '2 weeks',
                    lessons: 12,
                    completed: true,
                    description: 'Learn the building blocks of web development',
                    topics: [
                        'HTML5 Semantic Elements',
                        'CSS Grid & Flexbox',
                        'Responsive Design',
                        'CSS Animations',
                    ],
                },
                {
                    id: 2,
                    title: 'JavaScript Essentials',
                    duration: '3 weeks',
                    lessons: 18,
                    completed: true,
                    description: 'Master JavaScript fundamentals and ES6+ features',
                    topics: [
                        'Variables & Functions',
                        'DOM Manipulation',
                        'Async/Await',
                        'ES6+ Features',
                    ],
                },
                {
                    id: 3,
                    title: 'React Development',
                    duration: '4 weeks',
                    lessons: 24,
                    completed: false,
                    current: true,
                    description: 'Build dynamic user interfaces with React',
                    topics: ['Components & Props', 'State Management', 'Hooks', 'Context API'],
                },
                {
                    id: 4,
                    title: 'TypeScript Integration',
                    duration: '2 weeks',
                    lessons: 15,
                    completed: false,
                    description: 'Add type safety to your JavaScript applications',
                    topics: ['Type Annotations', 'Interfaces', 'Generics', 'React with TypeScript'],
                },
                {
                    id: 5,
                    title: 'Next.js & Advanced Concepts',
                    duration: '3 weeks',
                    lessons: 20,
                    completed: false,
                    description: 'Build production-ready applications with Next.js',
                    topics: [
                        'Server-Side Rendering',
                        'API Routes',
                        'Deployment',
                        'Performance Optimization',
                    ],
                },
            ],
            projects: [
                {
                    title: 'Personal Portfolio Website',
                    description: 'Create a responsive portfolio showcasing your skills',
                    difficulty: 'Beginner',
                    duration: '1 week',
                    completed: true,
                },
                {
                    title: 'Todo App with React',
                    description: 'Build a full-featured todo application with CRUD operations',
                    difficulty: 'Intermediate',
                    duration: '2 weeks',
                    completed: true,
                },
                {
                    title: 'E-commerce Dashboard',
                    description: 'Create an admin dashboard with charts and data visualization',
                    difficulty: 'Advanced',
                    duration: '3 weeks',
                    completed: false,
                    current: true,
                },
            ],
        },
        backend: {
            title: 'Backend Development',
            description: 'Build scalable server-side applications and APIs',
            level: 'Intermediate to Advanced',
            duration: '14-18 weeks',
            enrolled: 12850,
            rating: 4.7,
            progress: 0,
            modules: [
                {
                    id: 1,
                    title: 'Node.js Fundamentals',
                    duration: '3 weeks',
                    lessons: 20,
                    completed: false,
                    current: true,
                    description: 'Learn server-side JavaScript with Node.js',
                    topics: ['Node.js Basics', 'NPM & Modules', 'File System', 'HTTP Server'],
                },
                {
                    id: 2,
                    title: 'Express.js & APIs',
                    duration: '3 weeks',
                    lessons: 22,
                    completed: false,
                    description: 'Build RESTful APIs with Express.js',
                    topics: ['Express Setup', 'Routing', 'Middleware', 'Error Handling'],
                },
                {
                    id: 3,
                    title: 'Database Integration',
                    duration: '4 weeks',
                    lessons: 25,
                    completed: false,
                    description: 'Work with SQL and NoSQL databases',
                    topics: ['MongoDB', 'PostgreSQL', 'ORMs', 'Database Design'],
                },
                {
                    id: 4,
                    title: 'Authentication & Security',
                    duration: '2 weeks',
                    lessons: 15,
                    completed: false,
                    description: 'Implement secure authentication systems',
                    topics: ['JWT Tokens', 'OAuth', 'Password Hashing', 'Security Best Practices'],
                },
                {
                    id: 5,
                    title: 'Testing & Deployment',
                    duration: '2 weeks',
                    lessons: 18,
                    completed: false,
                    description: 'Test and deploy your applications',
                    topics: ['Unit Testing', 'Integration Testing', 'CI/CD', 'Cloud Deployment'],
                },
            ],
            projects: [
                {
                    title: 'REST API for Blog',
                    description: 'Create a complete blog API with CRUD operations',
                    difficulty: 'Intermediate',
                    duration: '2 weeks',
                    completed: false,
                    current: true,
                },
                {
                    title: 'Real-time Chat Application',
                    description: 'Build a chat app with WebSocket integration',
                    difficulty: 'Advanced',
                    duration: '3 weeks',
                    completed: false,
                },
                {
                    title: 'Microservices Architecture',
                    description: 'Design and implement a microservices system',
                    difficulty: 'Expert',
                    duration: '4 weeks',
                    completed: false,
                },
            ],
        },
    };

    const currentTrack = trackData[trackId as keyof typeof trackData] || trackData.frontend;

    const handleStartModule = (moduleId: number) => {
        router.push(`/skills/${trackId}/module/${moduleId}`);
    };

    const handleStartProject = (projectIndex: number) => {
        router.push(`/skills/${trackId}/project/${projectIndex}`);
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="sticky top-0 z-40 border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push('/skills')}
                            className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Skills
                        </Button>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-600">
                                Progress:{' '}
                                <span className="font-semibold text-blue-600">
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
                            <Badge className="border-purple-200 bg-purple-50 text-purple-700">
                                {currentTrack.level}
                            </Badge>
                        </div>
                    </div>

                    <Tabs defaultValue="modules" className="space-y-8">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="modules">Learning Modules</TabsTrigger>
                            <TabsTrigger value="projects">Projects</TabsTrigger>
                        </TabsList>

                        <TabsContent value="modules" className="space-y-6">
                            <div className="grid gap-6">
                                {currentTrack.modules.map((module, index) => (
                                    <motion.div
                                        key={module.id}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card
                                            className={`border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
                                                module.current
                                                    ? 'bg-blue-50/30 ring-2 ring-blue-500'
                                                    : ''
                                            }`}
                                        >
                                            <CardContent className="p-8">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex flex-1 items-start gap-6">
                                                        <div
                                                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                                                                module.completed
                                                                    ? 'bg-green-100'
                                                                    : module.current
                                                                      ? 'bg-blue-100'
                                                                      : 'bg-gray-100'
                                                            }`}
                                                        >
                                                            {module.completed ? (
                                                                <CheckCircle className="h-6 w-6 text-green-600" />
                                                            ) : module.current ? (
                                                                <Play className="h-6 w-6 text-blue-600" />
                                                            ) : (
                                                                <Lock className="h-6 w-6 text-gray-400" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="mb-2 flex items-center gap-3">
                                                                <h3 className="text-xl font-bold text-gray-900">
                                                                    {module.title}
                                                                </h3>
                                                                {module.current && (
                                                                    <Badge className="bg-blue-100 text-blue-700">
                                                                        Current
                                                                    </Badge>
                                                                )}
                                                                {module.completed && (
                                                                    <Badge className="bg-green-100 text-green-700">
                                                                        Completed
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="mb-4 text-gray-600">
                                                                {module.description}
                                                            </p>
                                                            <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
                                                                <span>{module.duration}</span>
                                                                <span>•</span>
                                                                <span>
                                                                    {module.lessons} lessons
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {module.topics.map(
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
                                                        onClick={() => handleStartModule(module.id)}
                                                        disabled={
                                                            !module.completed && !module.current
                                                        }
                                                        className={
                                                            module.completed
                                                                ? 'bg-green-600 hover:bg-green-700'
                                                                : module.current
                                                                  ? 'bg-blue-600 hover:bg-blue-700'
                                                                  : ''
                                                        }
                                                    >
                                                        {module.completed
                                                            ? 'Review'
                                                            : module.current
                                                              ? 'Continue'
                                                              : 'Locked'}
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="projects" className="space-y-6">
                            <div className="grid gap-6">
                                {currentTrack.projects.map((project, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card
                                            className={`border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
                                                project.current
                                                    ? 'bg-orange-50/30 ring-2 ring-orange-500'
                                                    : ''
                                            }`}
                                        >
                                            <CardContent className="p-8">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex flex-1 items-start gap-6">
                                                        <div
                                                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                                                                project.completed
                                                                    ? 'bg-green-100'
                                                                    : project.current
                                                                      ? 'bg-orange-100'
                                                                      : 'bg-gray-100'
                                                            }`}
                                                        >
                                                            {project.completed ? (
                                                                <CheckCircle className="h-6 w-6 text-green-600" />
                                                            ) : project.current ? (
                                                                <Code className="h-6 w-6 text-orange-600" />
                                                            ) : (
                                                                <Lock className="h-6 w-6 text-gray-400" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="mb-2 flex items-center gap-3">
                                                                <h3 className="text-xl font-bold text-gray-900">
                                                                    {project.title}
                                                                </h3>
                                                                {project.current && (
                                                                    <Badge className="bg-orange-100 text-orange-700">
                                                                        Current
                                                                    </Badge>
                                                                )}
                                                                {project.completed && (
                                                                    <Badge className="bg-green-100 text-green-700">
                                                                        Completed
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="mb-4 text-gray-600">
                                                                {project.description}
                                                            </p>
                                                            <div className="flex items-center gap-4 text-sm">
                                                                <Badge
                                                                    className={`${
                                                                        project.difficulty ===
                                                                        'Beginner'
                                                                            ? 'border-green-200 bg-green-50 text-green-700'
                                                                            : project.difficulty ===
                                                                                'Intermediate'
                                                                              ? 'border-yellow-200 bg-yellow-50 text-yellow-700'
                                                                              : project.difficulty ===
                                                                                  'Advanced'
                                                                                ? 'border-red-200 bg-red-50 text-red-700'
                                                                                : 'border-purple-200 bg-purple-50 text-purple-700'
                                                                    }`}
                                                                >
                                                                    {project.difficulty}
                                                                </Badge>
                                                                <span className="text-gray-500">
                                                                    {project.duration}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        onClick={() => handleStartProject(index)}
                                                        disabled={
                                                            !project.completed && !project.current
                                                        }
                                                        className={
                                                            project.completed
                                                                ? 'bg-green-600 hover:bg-green-700'
                                                                : project.current
                                                                  ? 'bg-orange-600 hover:bg-orange-700'
                                                                  : ''
                                                        }
                                                    >
                                                        {project.completed
                                                            ? 'View Project'
                                                            : project.current
                                                              ? 'Start Project'
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
