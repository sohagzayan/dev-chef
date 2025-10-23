'use client';

import { CheckCircle, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CertificationSectionProps {
    onCertificationStart: (certId: string) => void;
}

export function CertificationSection({ onCertificationStart }: CertificationSectionProps) {
    const certifications = [
        {
            id: 'js-fundamentals',
            title: 'JavaScript Fundamentals',
            description: 'Master the basics of JavaScript programming',
            difficulty: 'Beginner',
            duration: '4-6 weeks',
            rating: 4.8,
            enrolled: 1247,
            completed: false,
        },
        {
            id: 'react-advanced',
            title: 'React Advanced Patterns',
            description: 'Learn advanced React concepts and patterns',
            difficulty: 'Advanced',
            duration: '6-8 weeks',
            rating: 4.9,
            enrolled: 892,
            completed: true,
        },
        {
            id: 'node-backend',
            title: 'Node.js Backend Development',
            description: 'Build scalable backend services with Node.js',
            difficulty: 'Intermediate',
            duration: '5-7 weeks',
            rating: 4.7,
            enrolled: 1563,
            completed: false,
        },
    ];

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Certifications</h2>
                <button className="text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {certifications.map((cert) => (
                    <Card key={cert.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-lg">{cert.title}</CardTitle>
                                    <p className="text-sm text-gray-600">{cert.description}</p>
                                </div>
                                {cert.completed && (
                                    <CheckCircle className="h-6 w-6 text-green-500" />
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Difficulty:</span>
                                <span className="font-medium">{cert.difficulty}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Duration:</span>
                                <span className="font-medium">{cert.duration}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Rating:</span>
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">{cert.rating}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Enrolled:</span>
                                <span className="font-medium">
                                    {cert.enrolled.toLocaleString()}
                                </span>
                            </div>
                            <button
                                onClick={() => onCertificationStart(cert.id)}
                                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
                                disabled={cert.completed}
                            >
                                {cert.completed ? 'Completed' : 'Start Learning'}
                            </button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
