'use client';

import { motion } from 'framer-motion';
import { Coffee, Heart, Moon, Smile, Sparkles, Star, Sun, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HelloPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="mx-auto max-w-4xl text-center"
            >
                {/* Main Hello Card */}
                <Card className="mb-8 border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
                    <CardHeader className="pb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-6 flex justify-center"
                        >
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
                                <Smile className="h-12 w-12 text-white" />
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-6xl font-bold text-transparent"
                        >
                            Hello! 👋
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mx-auto max-w-2xl text-2xl text-gray-700"
                        >
                            Welcome to our amazing platform! We're thrilled to have you here.
                        </motion.p>
                    </CardHeader>

                    <CardContent className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mx-auto max-w-3xl text-lg text-gray-600"
                        >
                            <p className="mb-4">
                                This is a special hello page created just for you! 🎉
                            </p>
                            <p>
                                Whether you're here to find remote jobs, hire amazing talent, or
                                just explore what we have to offer, we're excited to be part of your
                                journey.
                            </p>
                        </motion.div>

                        {/* Interactive Elements */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer"
                            >
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 text-white hover:from-pink-600 hover:to-purple-700"
                                >
                                    <Heart className="mr-2 h-5 w-5" />
                                    Spread Love
                                </Button>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer"
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-purple-300 px-8 py-3 text-purple-700 hover:bg-purple-50"
                                >
                                    <Sparkles className="mr-2 h-5 w-5" />
                                    Get Started
                                </Button>
                            </motion.div>
                        </motion.div>
                    </CardContent>
                </Card>

                {/* Feature Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
                >
                    <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Card className="h-full border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                            <CardContent className="p-6 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">
                                    <Sun className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    Bright Future
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Every day brings new opportunities and possibilities.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Card className="h-full border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                            <CardContent className="p-6 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-cyan-500">
                                    <Moon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    Dream Big
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Your dreams are the foundation of your success story.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Card className="h-full border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                            <CardContent className="p-6 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500">
                                    <Coffee className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    Stay Energized
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Keep your energy high and your spirits even higher.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Card className="h-full border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                            <CardContent className="p-6 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-500">
                                    <Zap className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    Be Amazing
                                </h3>
                                <p className="text-sm text-gray-600">
                                    You have the power to create something extraordinary.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>

                {/* Footer Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-12"
                >
                    <Card className="border-0 bg-gradient-to-r from-pink-100 to-purple-100">
                        <CardContent className="p-8">
                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="mb-4 flex justify-center"
                            >
                                <Star className="h-8 w-8 fill-current text-yellow-500" />
                            </motion.div>
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">
                                Thank You for Being Here! 🌟
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-gray-700">
                                We believe in the power of connection, creativity, and making the
                                world a better place. Thank you for being part of our community!
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
}
