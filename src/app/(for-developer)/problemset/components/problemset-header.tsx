'use client';

import { motion } from 'framer-motion';
import { Code2, Trophy, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProblemsetHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-8 text-white shadow-2xl"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-white"></div>
                <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white"></div>
                <div className="absolute top-1/2 left-1/4 h-16 w-16 rounded-full bg-white"></div>
            </div>

            <div className="relative z-10">
                <div className="flex flex-col items-start space-y-6 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
                                <Code2 className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold lg:text-4xl">Problem Set</h1>
                                <p className="text-gray-300">
                                    Master coding challenges and improve your skills
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-sm">
                            <div className="flex items-center space-x-2">
                                <Trophy className="h-4 w-4 text-yellow-400" />
                                <span className="text-gray-300">2000+ Problems</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-blue-400" />
                                <span className="text-gray-300">50K+ Developers</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Zap className="h-4 w-4 text-green-400" />
                                <span className="text-gray-300">Daily Challenges</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <Button
                            variant="secondary"
                            className="border border-gray-600 bg-gray-700/50 text-white backdrop-blur-sm hover:bg-gray-700 hover:text-white"
                        >
                            View Leaderboard
                        </Button>
                        <Button className="bg-white text-gray-900 hover:bg-gray-100">
                            Start Practice
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
