'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Brain, Clock, Pause, Play, RotateCcw, Sparkles, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const algorithms = [
    {
        name: 'Bubble Sort',
        steps: 15, // More realistic steps for bubble sort
        complexity: 'O(n²)',
        description: 'Simple comparison-based sorting',
        icon: '🫧',
        array: [64, 34, 25, 12, 22, 11],
        type: 'sorting',
    },
    {
        name: 'Quick Sort',
        steps: 12, // More realistic steps for quick sort
        complexity: 'O(n log n)',
        description: 'Efficient divide-and-conquer',
        icon: '⚡',
        array: [10, 80, 30, 90, 40, 50],
        type: 'sorting',
    },
    {
        name: 'Binary Search',
        steps: 3, // Binary search typically takes log(n) steps
        complexity: 'O(log n)',
        description: 'Fast search in sorted arrays',
        icon: '🎯',
        array: [2, 3, 4, 10, 40, 50, 60, 70],
        type: 'searching',
        target: 40, // Value we're searching for
    },
];

export function HeroSection() {
    const [activeAlgorithm, setActiveAlgorithm] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [arrayState, setArrayState] = useState([...algorithms[0].array]);
    const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
    const [comparisonInfo, setComparisonInfo] = useState<string>('');

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Reset array state when algorithm changes
    useEffect(() => {
        setArrayState([...algorithms[activeAlgorithm].array]);
        setCurrentStep(0);
        setHighlightedIndices([]);
        setComparisonInfo('');
    }, [activeAlgorithm]);

    const updateAlgorithmState = useCallback(
        (step: number) => {
            const algo = algorithms[activeAlgorithm];
            setArrayState((prevArray) => {
                const newArray = [...prevArray];
                const newHighlighted: number[] = [];
                let newComparisonInfo = '';

                if (algo.name === 'Bubble Sort') {
                    // Bubble sort: compare adjacent elements and swap if needed
                    const i = Math.floor(step / 2);
                    const j = i + 1;

                    if (j < newArray.length) {
                        newHighlighted.push(i, j);
                        newComparisonInfo = `Comparing ${newArray[i]} and ${newArray[j]}`;

                        if (step % 2 === 1 && newArray[i] > newArray[j]) {
                            // Swap
                            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
                            newComparisonInfo = `Swapping ${newArray[j]} and ${newArray[i]}`;
                        }
                    }
                } else if (algo.name === 'Quick Sort') {
                    // Quick sort: show pivot selection and partitioning
                    const pivotIndex = Math.floor(newArray.length / 2);
                    newHighlighted.push(pivotIndex);
                    newComparisonInfo = `Pivot: ${newArray[pivotIndex]}`;

                    if (step > 2) {
                        // Show partitioning
                        const leftElements = newArray.filter(
                            (val, idx) => idx < pivotIndex && val < newArray[pivotIndex],
                        );
                        newHighlighted.push(...leftElements.map((_, idx) => idx));
                        newComparisonInfo = `Partitioning around pivot ${newArray[pivotIndex]}`;
                    }
                } else if (algo.name === 'Binary Search') {
                    // Binary search: show the search process
                    const left = 0;
                    const right = newArray.length - 1;
                    const mid = Math.floor((left + right) / 2);

                    newHighlighted.push(mid);
                    newComparisonInfo = `Searching for ${algo.target}, checking index ${mid}`;

                    if (step === 2) {
                        newHighlighted.push(newArray.indexOf(algo.target!));
                        newComparisonInfo = `Found ${algo.target} at index ${newArray.indexOf(algo.target!)}`;
                    }
                }

                setHighlightedIndices(newHighlighted);
                setComparisonInfo(newComparisonInfo);
                return newArray;
            });
        },
        [activeAlgorithm],
    );

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentStep((prev) => {
                    const nextStep = prev + 1;
                    if (nextStep >= algorithms[activeAlgorithm].steps) {
                        setIsPlaying(false);
                        return 0;
                    }

                    // Update array state based on algorithm and step
                    updateAlgorithmState(nextStep);
                    return nextStep;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, activeAlgorithm, updateAlgorithmState]);

    if (!isClient) {
        return null;
    }

    return (
        <section className="relative overflow-hidden py-16">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-10 left-10 h-40 w-40 rounded-full bg-gradient-to-r from-[rgb(148,242,127)] to-blue-400 opacity-20 blur-2xl"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute right-10 bottom-10 h-32 w-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-2xl"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 30, 0],
                        scale: [1, 0.9, 1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-4">
                {/* Header */}
                <motion.div
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className="mb-4 text-5xl font-bold md:text-6xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <span className="bg-gradient-to-r from-[rgb(148,242,127)] via-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Algorithm
                        </span>
                        <span className="text-gray-800"> Playground</span>
                    </motion.h1>
                    <motion.p
                        className="mx-auto max-w-2xl text-lg text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Master algorithms through interactive visualization and AI-powered learning
                        paths
                    </motion.p>
                </motion.div>

                {/* Compact Algorithm Visualizer */}
                <motion.div
                    className="mx-auto max-w-4xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-xl backdrop-blur-sm">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[rgb(148,242,127)] via-blue-500 to-purple-600 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Brain className="h-6 w-6 text-white" />
                                    <h3 className="text-xl font-bold text-white">
                                        Smart Visualizer
                                    </h3>
                                </div>
                                <Badge className="border-white/30 bg-white/20 text-white">
                                    <Sparkles className="mr-1 h-3 w-3" />
                                    AI-Powered
                                </Badge>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Algorithm Selection */}
                            <div className="mb-6 flex justify-center gap-3">
                                <AnimatePresence>
                                    {algorithms.map((algo, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => {
                                                setActiveAlgorithm(index);
                                                setCurrentStep(0);
                                                setIsPlaying(false);
                                            }}
                                            className={`flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition-all ${
                                                activeAlgorithm === index
                                                    ? 'scale-105 bg-[rgb(148,242,127)] text-[rgba(0,55,32,1)] shadow-lg'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <span className="text-lg">{algo.icon}</span>
                                            <div>
                                                <div className="text-sm font-semibold">
                                                    {algo.name}
                                                </div>
                                                <div className="text-xs opacity-70">
                                                    {algo.complexity}
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Algorithm Info & Controls */}
                            <div className="mb-6 flex items-center justify-between rounded-xl bg-gray-50 p-4">
                                <div>
                                    <h4 className="flex items-center gap-2 font-semibold text-gray-800">
                                        {algorithms[activeAlgorithm].icon}{' '}
                                        {algorithms[activeAlgorithm].name}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {algorithms[activeAlgorithm].description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
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
                                            setArrayState([...algorithms[activeAlgorithm].array]);
                                            setHighlightedIndices([]);
                                            setComparisonInfo('');
                                        }}
                                        className="border-gray-300"
                                    >
                                        <RotateCcw className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Compact Visualization */}
                            <div className="rounded-xl bg-gray-900 p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="text-sm text-white">
                                        Step {currentStep + 1} of{' '}
                                        {algorithms[activeAlgorithm].steps}
                                    </span>
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {algorithms[activeAlgorithm].complexity}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Target className="h-3 w-3" />
                                            {algorithms[activeAlgorithm].name === 'Binary Search'
                                                ? `Target: ${algorithms[activeAlgorithm].target}`
                                                : `${arrayState.length} elements`}
                                        </span>
                                    </div>
                                </div>

                                {/* Algorithm-specific Info */}
                                {comparisonInfo && (
                                    <motion.div
                                        className="mb-4 rounded-lg bg-blue-500/20 p-3 text-center"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <span className="text-sm font-medium text-blue-300">
                                            {comparisonInfo}
                                        </span>
                                    </motion.div>
                                )}

                                {/* Array Visualization */}
                                <div className="mb-4 flex justify-center gap-2">
                                    <AnimatePresence>
                                        {arrayState.map((value, i) => {
                                            const isHighlighted = highlightedIndices.includes(i);

                                            return (
                                                <motion.div
                                                    key={`${i}-${value}-${currentStep}`}
                                                    className={`relative flex h-12 w-10 items-end justify-center rounded-lg text-xs font-bold text-white transition-all ${
                                                        isHighlighted
                                                            ? algorithms[activeAlgorithm].name ===
                                                                  'Binary Search' &&
                                                              value ===
                                                                  algorithms[activeAlgorithm].target
                                                                ? 'bg-green-500'
                                                                : 'bg-yellow-500'
                                                            : 'bg-gray-600'
                                                    }`}
                                                    animate={{
                                                        height: isHighlighted ? [48, 56, 48] : 48,
                                                        scale: isHighlighted ? [1, 1.1, 1] : 1,
                                                        backgroundColor: isHighlighted
                                                            ? algorithms[activeAlgorithm].name ===
                                                                  'Binary Search' &&
                                                              value ===
                                                                  algorithms[activeAlgorithm].target
                                                                ? [
                                                                      'rgb(34, 197, 94)',
                                                                      'rgb(34, 197, 94)',
                                                                  ]
                                                                : [
                                                                      'rgb(245, 158, 11)',
                                                                      'rgb(245, 158, 11)',
                                                                  ]
                                                            : undefined,
                                                    }}
                                                    transition={{
                                                        duration: 0.6,
                                                        ease: 'easeInOut',
                                                    }}
                                                    layout
                                                >
                                                    <span className="absolute bottom-1">
                                                        {value}
                                                    </span>
                                                    {isHighlighted && (
                                                        <motion.div
                                                            className={`absolute -top-6 left-1/2 -translate-x-1/2 transform rounded-full px-2 py-1 text-xs text-black ${
                                                                algorithms[activeAlgorithm].name ===
                                                                    'Binary Search' &&
                                                                value ===
                                                                    algorithms[activeAlgorithm]
                                                                        .target
                                                                    ? 'bg-green-400'
                                                                    : 'bg-yellow-400'
                                                            }`}
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0 }}
                                                        >
                                                            {algorithms[activeAlgorithm].name ===
                                                                'Binary Search' &&
                                                            value ===
                                                                algorithms[activeAlgorithm].target
                                                                ? '✓'
                                                                : algorithms[activeAlgorithm]
                                                                        .name === 'Bubble Sort'
                                                                  ? '↔'
                                                                  : '⚡'}
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4 h-2 w-full rounded-full bg-gray-700">
                                    <motion.div
                                        className="h-2 rounded-full bg-gradient-to-r from-[rgb(148,242,127)] to-yellow-400"
                                        animate={{
                                            width: `${((currentStep + 1) / algorithms[activeAlgorithm].steps) * 100}%`,
                                        }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    />
                                </div>

                                {/* Performance Metrics */}
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <motion.div
                                        className="rounded-lg bg-blue-500/20 p-3"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="text-lg font-bold text-blue-400">
                                            {Math.floor(Math.random() * 50) + 20}ms
                                        </div>
                                        <div className="text-xs text-blue-300">Speed</div>
                                    </motion.div>
                                    <motion.div
                                        className="rounded-lg bg-green-500/20 p-3"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="text-lg font-bold text-green-400">
                                            {arrayState.length}
                                        </div>
                                        <div className="text-xs text-green-300">Elements</div>
                                    </motion.div>
                                    <motion.div
                                        className="rounded-lg bg-purple-500/20 p-3"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="text-lg font-bold text-purple-400">
                                            {Math.round(
                                                ((currentStep + 1) /
                                                    algorithms[activeAlgorithm].steps) *
                                                    100,
                                            )}
                                            %
                                        </div>
                                        <div className="text-xs text-purple-300">Progress</div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
