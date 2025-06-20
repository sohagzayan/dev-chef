'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Code2, Pause, Play, RotateCcw, Sparkles, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const algorithms = [
    {
        name: 'Bubble Sort',
        steps: 8,
        complexity: 'O(n²)',
        description: 'Simple comparison-based sorting algorithm',
        code: `for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
        if (arr[j] > arr[j+1]) {
            swap(arr[j], arr[j+1]);
        }
    }
}`,
        array: [64, 34, 25, 12, 22, 11, 90, 88],
    },
    {
        name: 'Quick Sort',
        steps: 12,
        complexity: 'O(n log n)',
        description: 'Efficient divide-and-conquer sorting algorithm',
        code: `int partition(arr[], low, high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}`,
        array: [10, 80, 30, 90, 40, 50, 70, 60],
    },
    {
        name: 'Binary Search',
        steps: 6,
        complexity: 'O(log n)',
        description: 'Efficient search algorithm for sorted arrays',
        code: `int binarySearch(arr[], l, r, x) {
    if (r >= l) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == x)
            return mid;
        if (arr[mid] > x)
            return binarySearch(arr, l, mid - 1, x);
        return binarySearch(arr, mid + 1, r, x);
    }
    return -1;
}`,
        array: [2, 3, 4, 10, 40, 50, 60, 70],
    },
];

export function HeroSection() {
    const [activeAlgorithm, setActiveAlgorithm] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const [isClient, setIsClient] = useState(false); // ✅ Added to manage client-side rendering

    useEffect(() => {
        setIsClient(true); // ✅ Set `isClient` to true after the component is mounted on the client side
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentStep((prev) => (prev + 1) % algorithms[activeAlgorithm].steps);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, activeAlgorithm]);

    // If the component is rendered on the server, return null to prevent hydration issues
    if (!isClient) {
        return null; // ✅ This ensures that no dynamic content renders server-side
    }

    return (
        <section className="relative flex items-center overflow-hidden">
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-20 left-20 h-72 w-72 rounded-full bg-[rgb(148,242,127)] opacity-10 blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                    className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-blue-400 opacity-10 blur-3xl"
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 60, 0],
                        scale: [1, 0.8, 1],
                    }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
                />
            </div>

            <div className="relative z-10 container mx-auto">
                <div className="mt-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="mb-6 text-center text-7xl font-bold"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="bg-gradient-to-r from-[rgba(0,55,32,1)] via-[rgb(148,242,127)] to-[rgba(0,55,32,1)] bg-clip-text text-transparent">
                                Algorithm
                            </span>
                            {/* <br /> */}
                            <span className="text-[rgba(14,15,12,1)]"> Playground</span>
                        </motion.h1>
                        <motion.p
                            className="text-md mb-8 text-center leading-relaxed text-[rgba(106,108,106,1)]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Master algorithms through interactive visualization, connect with expert
                            mentors, and accelerate your coding journey with AI-powered learning
                            paths.
                        </motion.p>
                        {/* <motion.div
                            className="flex gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Button className="bg-[rgb(148,242,127)] px-8 py-6 text-lg font-semibold text-[rgba(0,55,32,1)] hover:bg-[rgb(148,242,127)]/80">
                                Start Learning <Rocket className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                className="border-[rgba(106,108,106,1)] px-8 py-6 text-lg text-[rgba(14,15,12,1)]"
                            >
                                Watch Demo <Play className="ml-2 h-5 w-5" />
                            </Button>
                        </motion.div> */}
                    </motion.div>

                    {/* Enhanced Algorithm Visualizer */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="overflow-hidden rounded-3xl border border-gray-100 bg-white"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[rgb(148,242,127)] to-[rgba(0,55,32,1)] p-6 text-white">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-2xl font-bold">Smart Algorithm Visualizer</h3>
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5" />
                                    <Badge className="border-white/30 bg-white/20 text-white">
                                        AI-Powered
                                    </Badge>
                                </div>
                            </div>
                            <p className="text-white/80">
                                Interactive learning with real-time code execution
                            </p>
                        </div>

                        <div className="p-6">
                            {/* Algorithm Selection */}
                            <div className="mb-6 grid grid-cols-3 gap-2">
                                {algorithms.map((algo, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => {
                                            setActiveAlgorithm(index);
                                            setCurrentStep(0);
                                            setIsPlaying(false);
                                        }}
                                        className={`rounded-xl p-3 text-sm font-medium transition-all ${
                                            activeAlgorithm === index
                                                ? 'bg-[rgb(148,242,127)] text-[rgba(0,55,32,1)] shadow-lg'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div className="font-semibold">{algo.name}</div>
                                        <div className="text-xs opacity-70">{algo.complexity}</div>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Algorithm Info */}
                            <div className="mb-6 rounded-xl bg-gray-50 p-4">
                                <h4 className="mb-2 font-semibold text-[rgba(14,15,12,1)]">
                                    {algorithms[activeAlgorithm].name}
                                </h4>
                                <p className="mb-3 text-sm text-[rgba(106,108,106,1)]">
                                    {algorithms[activeAlgorithm].description}
                                </p>
                                <div className="flex items-center gap-4 text-xs">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {algorithms[activeAlgorithm].complexity}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Zap className="h-3 w-3" />
                                        {algorithms[activeAlgorithm].steps} steps
                                    </span>
                                </div>
                            </div>

                            {/* Visualization */}
                            <div className="mb-4 rounded-xl bg-gray-900 p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="text-sm text-white">
                                        Step {currentStep + 1} of{' '}
                                        {algorithms[activeAlgorithm].steps}
                                    </span>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => setIsPlaying(!isPlaying)}
                                            className="bg-[rgb(148,242,127)] text-[rgba(0,55,32,1)] hover:bg-[rgb(148,242,127)]/80"
                                        >
                                            {isPlaying ? (
                                                <Pause className="h-4 w-4" />
                                            ) : (
                                                <Play className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                setCurrentStep(0);
                                                setIsPlaying(false);
                                            }}
                                            className="border-gray-600 text-white hover:bg-gray-800"
                                        >
                                            <RotateCcw className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Array Visualization */}
                                <div className="mb-6 flex justify-center gap-2">
                                    {algorithms[activeAlgorithm].array.map((value, i) => (
                                        <motion.div
                                            key={i}
                                            className={`relative flex h-16 w-12 items-end justify-center rounded-lg text-xs font-bold text-white ${
                                                i <= currentStep
                                                    ? 'bg-[rgb(148,242,127)]'
                                                    : 'bg-gray-600'
                                            }`}
                                            animate={{
                                                height: i <= currentStep ? [64, 72, 64] : 64,
                                                backgroundColor:
                                                    i === currentStep
                                                        ? [
                                                              'rgb(148,242,127)',
                                                              'rgb(255,215,0)',
                                                              'rgb(148,242,127)',
                                                          ]
                                                        : undefined,
                                                scale: i === currentStep ? [1, 1.1, 1] : 1,
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <span className="absolute bottom-1">{value}</span>
                                            {i === currentStep && (
                                                <motion.div
                                                    className="absolute -top-8 left-1/2 -translate-x-1/2 transform rounded bg-yellow-400 px-2 py-1 text-xs text-black"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    Active
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4 h-2 w-full rounded-full bg-gray-700">
                                    <motion.div
                                        className="h-2 rounded-full bg-gradient-to-r from-[rgb(148,242,127)] to-yellow-400"
                                        animate={{
                                            width: `${((currentStep + 1) / algorithms[activeAlgorithm].steps) * 100}%`,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>

                                {/* Code Preview */}
                                <div className="rounded-lg bg-gray-800 p-4">
                                    <div className="mb-2 flex items-center gap-2">
                                        <Code2 className="h-4 w-4 text-[rgb(148,242,127)]" />
                                        <span className="text-sm font-medium text-[rgb(148,242,127)]">
                                            Code Preview
                                        </span>
                                    </div>
                                    <pre className="overflow-x-auto text-xs text-gray-300">
                                        <code>{algorithms[activeAlgorithm].code}</code>
                                    </pre>
                                </div>
                            </div>

                            {/* Performance Metrics */}
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="rounded-lg bg-blue-50 p-3">
                                    <div className="text-lg font-bold text-blue-600">
                                        {Math.floor(Math.random() * 100) + 50}ms
                                    </div>

                                    <div className="text-xs text-blue-500">Execution Time</div>
                                </div>
                                <div className="rounded-lg bg-green-50 p-3">
                                    <div className="text-lg font-bold text-green-600">
                                        {algorithms[activeAlgorithm].array.length}
                                    </div>
                                    <div className="text-xs text-green-500">Array Size</div>
                                </div>
                                <div className="rounded-lg bg-purple-50 p-3">
                                    <div className="text-lg font-bold text-purple-600">
                                        {currentStep + 1}/{algorithms[activeAlgorithm].steps}
                                    </div>
                                    <div className="text-xs text-purple-500">Progress</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
