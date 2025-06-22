'use client';

import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Clock, Code2, Target, TrendingUp, Trophy, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PreparationSectionProps {
    onInterviewPrepStart: () => void;
    onSkillsExplore: () => void;
}

export function PreparationSection({
    onInterviewPrepStart,
    onSkillsExplore,
}: PreparationSectionProps) {
    return (
        <motion.section
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
        >
            <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900">Your Learning Journey</h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                    Structured learning paths designed to accelerate your professional growth
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <Card className="group border-0 shadow-lg transition-all duration-500 hover:shadow-2xl">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
                                <Briefcase className="h-8 w-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <Badge className="mb-3 border-green-200 bg-green-50 text-green-700">
                                    INTERVIEW PREP
                                </Badge>
                                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                                    Interview Mastery Kit
                                </h3>
                                <p className="mb-6 text-gray-600">
                                    Comprehensive preparation for technical interviews at top-tier
                                    companies. Practice with real interview questions and scenarios.
                                </p>
                                <div className="mb-6 flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <BookOpen className="h-4 w-4" />
                                        <span>150+ Problems</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>40 Hours</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        <span>50K+ Enrolled</span>
                                    </div>
                                </div>
                                <Button
                                    className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md hover:from-green-700 hover:to-green-800"
                                    onClick={onInterviewPrepStart}
                                >
                                    Start Preparation
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="group border-0 shadow-lg transition-all duration-500 hover:shadow-2xl">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
                                <Target className="h-8 w-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <Badge className="mb-3 border-purple-200 bg-purple-50 text-purple-700">
                                    SKILL BUILDING
                                </Badge>
                                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                                    Skill Development Path
                                </h3>
                                <p className="mb-6 text-gray-600">
                                    Personalized learning tracks to build expertise in your chosen
                                    technology stack. From beginner to expert level.
                                </p>
                                <div className="mb-6 flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Code2 className="h-4 w-4" />
                                        <span>12 Tracks</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Trophy className="h-4 w-4" />
                                        <span>Certificates</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <TrendingUp className="h-4 w-4" />
                                        <span>Progress Tracking</span>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                                    onClick={onSkillsExplore}
                                >
                                    Explore Skills
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.section>
    );
}
