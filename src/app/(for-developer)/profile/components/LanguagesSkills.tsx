'use client';

import { motion } from 'framer-motion';
import { Code, Database, Layers, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LanguagesSkillsProps {
    languages: Array<{
        name: string;
        problemsSolved: number;
        color: string;
    }>;
    skills: {
        advanced: Array<{ name: string; count: number }>;
        intermediate: Array<{ name: string; count: number }>;
        fundamental: Array<{ name: string; count: number }>;
    };
}

export default function LanguagesSkills({ languages, skills }: LanguagesSkillsProps) {
    const skillLevels = [
        {
            level: 'Advanced',
            skills: skills.advanced,
            icon: Zap,
            gradient: 'from-red-500 to-pink-500',
            bgGradient: 'from-red-50 to-pink-50',
            textColor: 'text-red-700',
            emptyMessage: 'Not enough data',
        },
        {
            level: 'Intermediate',
            skills: skills.intermediate,
            icon: Database,
            gradient: 'from-yellow-500 to-orange-500',
            bgGradient: 'from-yellow-50 to-orange-50',
            textColor: 'text-yellow-700',
            emptyMessage: 'Keep practicing!',
        },
        {
            level: 'Fundamental',
            skills: skills.fundamental,
            icon: Layers,
            gradient: 'from-[#94f27f] to-[#79d65e]',
            bgGradient: 'from-green-50 to-emerald-50',
            textColor: 'text-green-700',
            emptyMessage: 'Start with basics',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
        >
            {/* Languages Section */}
            <Card className="border-0 bg-white shadow-lg">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-600">
                            <Code className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold text-[rgba(14,15,12,1)] sm:text-xl">
                                Programming Languages
                            </CardTitle>
                            <p className="text-sm text-[rgba(106,108,106,1)]">
                                Your coding expertise
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                        {languages.map((language, index) => (
                            <motion.div
                                key={language.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 * index }}
                                className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 p-3 transition-all duration-200 hover:shadow-md sm:p-4"
                            >
                                <div className="flex min-w-0 flex-1 items-center gap-3">
                                    <div
                                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full shadow-lg sm:h-10 sm:w-10"
                                        style={{ backgroundColor: language.color }}
                                    >
                                        <Code className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="truncate font-semibold text-blue-700">
                                            {language.name}
                                        </div>
                                        <div className="text-sm text-[rgba(106,108,106,1)]">
                                            {language.problemsSolved} problem
                                            {language.problemsSolved !== 1 ? 's' : ''} solved
                                        </div>
                                    </div>
                                </div>
                                <Badge className="flex-shrink-0 bg-blue-100 text-xs text-blue-800 hover:bg-blue-200">
                                    {language.problemsSolved} solved
                                </Badge>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="border-0 bg-white shadow-lg">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
                            <Layers className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold text-[rgba(14,15,12,1)] sm:text-xl">
                                Skills & Topics
                            </CardTitle>
                            <p className="text-sm text-[rgba(106,108,106,1)]">
                                Your problem-solving expertise
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                    {skillLevels.map((level, levelIndex) => {
                        const IconComponent = level.icon;
                        return (
                            <motion.div
                                key={level.level}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 * levelIndex }}
                                className={`rounded-lg bg-gradient-to-r ${level.bgGradient} p-3 sm:p-4`}
                            >
                                <div className="mb-3 flex items-center gap-2">
                                    <div
                                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r ${level.gradient}`}
                                    >
                                        <IconComponent className="h-3 w-3 text-white" />
                                    </div>
                                    <h4 className={`font-semibold ${level.textColor}`}>
                                        {level.level}
                                    </h4>
                                </div>

                                {level.skills.length > 0 ? (
                                    <div className="space-y-2">
                                        {level.skills.map((skill, skillIndex) => (
                                            <motion.div
                                                key={skill.name}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: 0.05 * skillIndex,
                                                }}
                                                className="flex items-center justify-between rounded-md bg-white/50 p-2"
                                            >
                                                <span className="truncate text-sm font-medium text-[rgba(14,15,12,1)]">
                                                    {skill.name}
                                                </span>
                                                <Badge
                                                    variant="outline"
                                                    className="flex-shrink-0 border-gray-300 text-xs"
                                                >
                                                    x{skill.count}
                                                </Badge>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-4 text-center">
                                        <div className="text-sm text-[rgba(106,108,106,1)] italic">
                                            {level.emptyMessage}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </CardContent>
            </Card>
        </motion.div>
    );
}
