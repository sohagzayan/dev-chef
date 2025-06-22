'use client';

import { motion } from 'framer-motion';
import { Award, Coffee, Database, Target, Terminal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const certifications = [
    {
        id: 'problem-solving-basic',
        title: 'Problem Solving',
        level: 'Basic',
        icon: Target,
        description: 'Demonstrate fundamental problem-solving skills',
        duration: '90 minutes',
        questions: 15,
        passingScore: 70,
        badge: '🏆',
    },
    {
        id: 'python-basic',
        title: 'Python',
        level: 'Basic',
        icon: Terminal,
        description: 'Validate core Python programming knowledge',
        duration: '90 minutes',
        questions: 15,
        passingScore: 70,
        badge: '🐍',
    },
    {
        id: 'java-intermediate',
        title: 'Java',
        level: 'Intermediate',
        icon: Coffee,
        description: 'Advanced Java development certification',
        duration: '120 minutes',
        questions: 20,
        passingScore: 75,
        badge: '☕',
    },
    {
        id: 'sql-advanced',
        title: 'SQL',
        level: 'Advanced',
        icon: Database,
        description: 'Expert-level database management skills',
        duration: '120 minutes',
        questions: 18,
        passingScore: 80,
        badge: '🗄️',
    },
];

interface CertificationSectionProps {
    onCertificationStart: (certId: string) => void;
}

export function CertificationSection({ onCertificationStart }: CertificationSectionProps) {
    return (
        <motion.section
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-16"
        >
            <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900">
                    Professional Certifications
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                    Validate your expertise with industry-recognized certifications that showcase
                    your technical proficiency
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {certifications.map((cert, index) => (
                    <motion.div
                        key={cert.id}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="floating-card"
                        style={{ animationDelay: `${index * 0.5}s` }}
                    >
                        <Card className="certificate-gradient h-full border-0 transition-all duration-500 hover:shadow-2xl">
                            <CardContent className="flex h-full flex-col p-8 text-center">
                                <div className="mb-6">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                                        <cert.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="mb-2 text-3xl">{cert.badge}</div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                                        {cert.title}
                                    </h3>
                                    <Badge className="mb-4 border-purple-300 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800">
                                        {cert.level}
                                    </Badge>
                                    <p className="mb-6 text-sm text-gray-600">{cert.description}</p>

                                    <div className="mb-6 space-y-2 text-xs text-gray-500">
                                        <div className="flex justify-between">
                                            <span>Duration:</span>
                                            <span className="font-semibold">{cert.duration}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Questions:</span>
                                            <span className="font-semibold">{cert.questions}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Passing Score:</span>
                                            <span className="font-semibold">
                                                {cert.passingScore}%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:from-blue-700 hover:to-blue-800"
                                    onClick={() => onCertificationStart(cert.id)}
                                >
                                    <Award className="mr-2 h-4 w-4" />
                                    Get Certified
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
