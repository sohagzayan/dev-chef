'use client';

import { useState } from 'react';
import {
    AcademicCapIcon,
    BookmarkIcon,
    BriefcaseIcon,
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    ClockIcon,
    EyeIcon,
    HeartIcon,
    LightBulbIcon,
    StarIcon,
    UserGroupIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface BehavioralQuestion {
    id: string;
    question: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    estimatedTime: string;
    tags: string[];
    isBookmarked: boolean;
    isAnswered: boolean;
    views: number;
    likes: number;
    dislikes: number;
    starMethod?: {
        situation: string;
        task: string;
        action: string;
        result: string;
    };
    tips?: string[];
    commonMistakes?: string[];
}

export default function BehavioralPrepPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [showAnswered, setShowAnswered] = useState(false);
    const [sortBy, setSortBy] = useState('difficulty');

    const categories = [
        'all',
        'Leadership',
        'Teamwork',
        'Problem Solving',
        'Conflict Resolution',
        'Communication',
        'Adaptability',
        'Time Management',
        'Stress Management',
        'Career Goals',
        'Company Culture',
        'Technical Challenges',
    ];

    const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

    const behavioralQuestions: BehavioralQuestion[] = [
        {
            id: '1',
            question: 'Tell me about a time when you had to work with a difficult team member.',
            category: 'Teamwork',
            difficulty: 'Medium',
            estimatedTime: '15 min',
            tags: ['Teamwork', 'Conflict Resolution', 'Communication', 'Problem Solving'],
            isBookmarked: true,
            isAnswered: false,
            views: 2340,
            likes: 156,
            dislikes: 23,
            starMethod: {
                situation:
                    'I was working on a critical project with a team member who had a very different communication style and often missed deadlines.',
                task: 'I needed to find a way to work effectively with this person while ensuring our project stayed on track.',
                action: 'I scheduled regular one-on-one meetings to understand their perspective, established clear communication protocols, and created a shared project timeline with regular check-ins.',
                result: 'We improved our collaboration significantly, the project was completed on time, and I learned valuable skills in adapting my communication style to work with different personalities.',
            },
            tips: [
                'Focus on the resolution, not just the conflict',
                'Show empathy and understanding',
                'Demonstrate problem-solving skills',
                'Highlight what you learned',
            ],
            commonMistakes: [
                'Blaming the other person entirely',
                'Not showing how you contributed to the solution',
                'Focusing too much on the negative aspects',
            ],
        },
        {
            id: '2',
            question:
                'Describe a situation where you had to lead a team through a challenging project.',
            category: 'Leadership',
            difficulty: 'Hard',
            estimatedTime: '20 min',
            tags: ['Leadership', 'Project Management', 'Team Building', 'Problem Solving'],
            isBookmarked: false,
            isAnswered: true,
            views: 1876,
            likes: 234,
            dislikes: 34,
            starMethod: {
                situation:
                    'I was tasked with leading a team of 8 developers to deliver a major software update in half the usual time.',
                task: 'I needed to motivate the team, manage resources efficiently, and ensure quality while meeting the aggressive deadline.',
                action: 'I restructured the team into smaller, focused groups, implemented daily stand-ups, created a detailed project timeline, and provided regular feedback and support.',
                result: 'We delivered the project on time with high quality, team morale improved, and I was promoted to senior developer.',
            },
            tips: [
                'Show your leadership style and approach',
                'Demonstrate how you motivated and supported the team',
                'Highlight the specific challenges you overcame',
                'Quantify the results when possible',
            ],
            commonMistakes: [
                "Taking all the credit for the team's success",
                'Not showing how you handled setbacks',
                'Being too vague about your specific actions',
            ],
        },
        {
            id: '3',
            question: 'How do you handle stress and pressure in the workplace?',
            category: 'Stress Management',
            difficulty: 'Easy',
            estimatedTime: '10 min',
            tags: ['Stress Management', 'Self-Awareness', 'Coping Strategies', 'Work-Life Balance'],
            isBookmarked: true,
            isAnswered: false,
            views: 3456,
            likes: 189,
            dislikes: 45,
            tips: [
                'Show self-awareness about your stress triggers',
                'Demonstrate healthy coping mechanisms',
                'Explain how you prioritize and organize work',
                'Show that you can maintain performance under pressure',
            ],
            commonMistakes: [
                'Saying you never get stressed',
                'Not having specific examples',
                'Focusing only on work, not personal well-being',
            ],
        },
        {
            id: '4',
            question:
                'Tell me about a time when you failed at something and what you learned from it.',
            category: 'Problem Solving',
            difficulty: 'Medium',
            estimatedTime: '15 min',
            tags: ['Failure', 'Learning', 'Growth Mindset', 'Resilience'],
            isBookmarked: false,
            isAnswered: true,
            views: 2987,
            likes: 267,
            dislikes: 67,
            starMethod: {
                situation:
                    'I was working on a feature that I thought would take 2 weeks but ended up taking 6 weeks due to unexpected technical challenges.',
                task: 'I needed to complete the feature while learning from my initial underestimation and improving my estimation skills.',
                action: 'I broke down the remaining work into smaller tasks, communicated the delay to stakeholders early, and implemented better planning practices.',
                result: 'I completed the feature successfully, improved my estimation skills significantly, and developed better communication habits with stakeholders.',
            },
            tips: [
                'Choose a failure that shows growth and learning',
                'Focus on what you learned, not just what went wrong',
                'Show how you applied the learning to future situations',
                'Demonstrate resilience and adaptability',
            ],
            commonMistakes: [
                'Choosing a failure that makes you look incompetent',
                'Not showing how you grew from the experience',
                'Blaming external factors entirely',
            ],
        },
        {
            id: '5',
            question: 'How do you stay updated with the latest technology trends?',
            category: 'Adaptability',
            difficulty: 'Easy',
            estimatedTime: '12 min',
            tags: ['Learning', 'Technology', 'Continuous Improvement', 'Professional Development'],
            isBookmarked: true,
            isAnswered: false,
            views: 4123,
            likes: 298,
            dislikes: 34,
            tips: [
                'Show specific resources and methods you use',
                'Demonstrate how you apply new knowledge',
                'Show commitment to continuous learning',
                'Connect learning to career growth',
            ],
            commonMistakes: [
                'Being too generic about learning methods',
                'Not showing how you apply what you learn',
                'Focusing only on formal education',
            ],
        },
        {
            id: '6',
            question: 'Describe a time when you had to adapt to a significant change at work.',
            category: 'Adaptability',
            difficulty: 'Medium',
            estimatedTime: '18 min',
            tags: ['Change Management', 'Adaptability', 'Resilience', 'Problem Solving'],
            isBookmarked: false,
            isAnswered: false,
            views: 2345,
            likes: 178,
            dislikes: 56,
            starMethod: {
                situation:
                    'Our company decided to migrate from a monolithic architecture to microservices, which required learning new technologies and changing our development approach.',
                task: 'I needed to quickly learn new technologies, adapt my development practices, and help my team through the transition.',
                action: 'I took online courses, attended workshops, created documentation for the team, and mentored colleagues who were struggling with the change.',
                result: 'I became proficient in the new technologies, helped the team transition smoothly, and was recognized as a change champion.',
            },
            tips: [
                'Show your approach to learning and adapting',
                'Demonstrate how you helped others through the change',
                'Highlight the positive outcomes of the change',
                'Show resilience and positive attitude',
            ],
            commonMistakes: [
                'Focusing only on the challenges, not the opportunities',
                'Not showing how you helped others',
                'Being negative about the change',
            ],
        },
        {
            id: '7',
            question:
                'Tell me about a time when you had to make a decision without all the information you needed.',
            category: 'Problem Solving',
            difficulty: 'Hard',
            estimatedTime: '20 min',
            tags: ['Decision Making', 'Problem Solving', 'Risk Assessment', 'Leadership'],
            isBookmarked: true,
            isAnswered: false,
            views: 1876,
            likes: 145,
            dislikes: 78,
            starMethod: {
                situation:
                    'I was leading a project when a critical team member unexpectedly left, and I had to quickly decide how to proceed with limited information about their work.',
                task: 'I needed to assess the situation, make a decision about project continuation, and communicate the plan to stakeholders.',
                action: 'I quickly analyzed the available information, consulted with remaining team members, assessed risks, and created a revised project plan with clear milestones.',
                result: 'The project was completed successfully, and I developed better risk assessment and contingency planning skills.',
            },
            tips: [
                'Show your decision-making process',
                'Demonstrate risk assessment skills',
                'Show how you gathered available information',
                'Highlight the positive outcome',
            ],
            commonMistakes: [
                'Making the decision seem too easy',
                'Not showing your thought process',
                'Not considering alternatives',
            ],
        },
        {
            id: '8',
            question: 'How do you handle competing priorities and deadlines?',
            category: 'Time Management',
            difficulty: 'Medium',
            estimatedTime: '15 min',
            tags: ['Time Management', 'Prioritization', 'Organization', 'Communication'],
            isBookmarked: false,
            isAnswered: true,
            views: 3456,
            likes: 234,
            dislikes: 45,
            tips: [
                'Show your prioritization framework',
                'Demonstrate communication skills with stakeholders',
                'Show how you organize and track work',
                'Highlight your ability to deliver quality under pressure',
            ],
            commonMistakes: [
                'Saying you work on everything at once',
                'Not showing how you communicate with stakeholders',
                'Focusing only on speed, not quality',
            ],
        },
        {
            id: '9',
            question:
                'Describe a situation where you had to resolve a conflict between team members.',
            category: 'Conflict Resolution',
            difficulty: 'Hard',
            estimatedTime: '18 min',
            tags: ['Conflict Resolution', 'Mediation', 'Communication', 'Leadership'],
            isBookmarked: true,
            isAnswered: false,
            views: 2345,
            likes: 189,
            dislikes: 67,
            starMethod: {
                situation:
                    'Two team members had a disagreement about the technical approach for a feature, which was affecting team productivity and morale.',
                task: 'I needed to mediate the conflict, find a resolution that satisfied both parties, and restore team harmony.',
                action: 'I met with each person individually to understand their perspective, facilitated a joint meeting to discuss the issue, and helped them find common ground and a compromise solution.',
                result: "The conflict was resolved, both team members were satisfied with the outcome, and the team's productivity and morale improved.",
            },
            tips: [
                'Show your mediation and communication skills',
                'Demonstrate impartiality and fairness',
                'Show how you helped find a win-win solution',
                'Highlight the positive outcome for the team',
            ],
            commonMistakes: [
                'Taking sides in the conflict',
                'Not showing the resolution process',
                'Focusing only on the problem, not the solution',
            ],
        },
        {
            id: '10',
            question: 'Where do you see yourself in 5 years?',
            category: 'Career Goals',
            difficulty: 'Easy',
            estimatedTime: '10 min',
            tags: ['Career Planning', 'Goals', 'Professional Development', 'Motivation'],
            isBookmarked: false,
            isAnswered: false,
            views: 5678,
            likes: 345,
            dislikes: 89,
            tips: [
                'Show realistic and achievable goals',
                "Connect your goals to the company's mission",
                'Demonstrate ambition and motivation',
                'Show how you plan to achieve your goals',
            ],
            commonMistakes: [
                'Being too vague about your goals',
                'Not connecting goals to the company',
                'Setting unrealistic expectations',
            ],
        },
    ];

    const filteredQuestions = behavioralQuestions.filter((question) => {
        const matchesSearch =
            question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            question.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory =
            selectedCategory === 'all' || question.category === selectedCategory;
        const matchesDifficulty =
            selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
        const matchesAnswered = showAnswered ? true : !question.isAnswered;

        return matchesSearch && matchesCategory && matchesDifficulty && matchesAnswered;
    });

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Hard':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Leadership':
                return <AcademicCapIcon className="h-4 w-4" />;
            case 'Teamwork':
                return <UserGroupIcon className="h-4 w-4" />;
            case 'Problem Solving':
                return <LightBulbIcon className="h-4 w-4" />;
            case 'Communication':
                return <ChatBubbleLeftRightIcon className="h-4 w-4" />;
            case 'Career Goals':
                return <BriefcaseIcon className="h-4 w-4" />;
            default:
                return <HeartIcon className="h-4 w-4" />;
        }
    };

    const toggleBookmark = (questionId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle bookmark for question:', questionId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Behavioral Interview Prep</h1>
                <p className="text-gray-600">
                    Master behavioral questions with the STAR method and real examples
                </p>
            </div>

            {/* STAR Method Guide */}
            <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900">
                    <StarIcon className="mr-2 h-6 w-6 text-yellow-500" />
                    STAR Method Framework
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-lg bg-blue-50 p-4">
                        <h3 className="mb-2 font-semibold text-blue-800">S - Situation</h3>
                        <p className="text-sm text-blue-700">
                            Describe the context and background of the situation
                        </p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-4">
                        <h3 className="mb-2 font-semibold text-green-800">T - Task</h3>
                        <p className="text-sm text-green-700">
                            Explain your responsibility and what needed to be accomplished
                        </p>
                    </div>
                    <div className="rounded-lg bg-yellow-50 p-4">
                        <h3 className="mb-2 font-semibold text-yellow-800">A - Action</h3>
                        <p className="text-sm text-yellow-700">
                            Detail the specific steps you took to address the situation
                        </p>
                    </div>
                    <div className="rounded-lg bg-red-50 p-4">
                        <h3 className="mb-2 font-semibold text-red-800">R - Result</h3>
                        <p className="text-sm text-red-700">
                            Share the outcomes and what you learned from the experience
                        </p>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search behavioral questions, topics, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>

                    {/* Difficulty Filter */}
                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                    >
                        {difficulties.map((difficulty) => (
                            <option key={difficulty} value={difficulty}>
                                {difficulty === 'all' ? 'All Difficulties' : difficulty}
                            </option>
                        ))}
                    </select>

                    {/* Sort By */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="difficulty">Sort by Difficulty</option>
                        <option value="views">Sort by Views</option>
                        <option value="likes">Sort by Likes</option>
                        <option value="time">Sort by Time</option>
                    </select>

                    {/* Show Answered Toggle */}
                    <label className="flex cursor-pointer items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={showAnswered}
                            onChange={(e) => setShowAnswered(e.target.checked)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">Show Answered</span>
                    </label>
                </div>
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {filteredQuestions.map((question) => (
                    <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Question Header */}
                        <div className="border-b border-gray-100 p-6">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="mb-3 line-clamp-3 text-lg font-semibold text-gray-900">
                                        {question.question}
                                    </h3>

                                    {/* Tags and Metadata */}
                                    <div className="mb-3 flex items-center space-x-2">
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getDifficultyColor(question.difficulty)}`}
                                        >
                                            {question.difficulty}
                                        </span>
                                        <span className="flex inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                            {getCategoryIcon(question.category)}
                                            <span className="ml-1">{question.category}</span>
                                        </span>
                                    </div>

                                    {/* Tags */}
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {question.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-md bg-purple-50 px-2 py-1 text-xs text-purple-700"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Stats and Actions */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                        <ClockIcon className="h-4 w-4" />
                                        <span>{question.estimatedTime}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <EyeIcon className="h-4 w-4" />
                                        <span>{question.views}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
                                        <span>{question.likes}</span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => toggleBookmark(question.id)}
                                        className={`rounded-lg p-2 transition-colors duration-200 ${
                                            question.isBookmarked
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : 'text-gray-400 hover:bg-yellow-50 hover:text-yellow-600'
                                        }`}
                                    >
                                        <BookmarkIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Question Content */}
                        <div className="p-6">
                            {/* STAR Method Example (if available) */}
                            {question.starMethod && (
                                <div className="mb-4">
                                    <h5 className="mb-2 flex items-center text-sm font-medium text-gray-700">
                                        <StarIcon className="mr-2 h-4 w-4 text-yellow-500" />
                                        STAR Method Example
                                    </h5>
                                    <div className="space-y-2">
                                        <div className="rounded-lg bg-blue-50 p-3 text-sm">
                                            <div className="mb-1 font-medium text-blue-800">
                                                Situation:
                                            </div>
                                            <div className="text-sm text-blue-700">
                                                {question.starMethod.situation}
                                            </div>
                                        </div>
                                        <div className="rounded-lg bg-green-50 p-3 text-sm">
                                            <div className="mb-1 font-medium text-green-800">
                                                Task:
                                            </div>
                                            <div className="text-sm text-green-700">
                                                {question.starMethod.task}
                                            </div>
                                        </div>
                                        <div className="rounded-lg bg-yellow-50 p-3 text-sm">
                                            <div className="mb-1 font-medium text-yellow-800">
                                                Action:
                                            </div>
                                            <div className="text-sm text-yellow-700">
                                                {question.starMethod.action}
                                            </div>
                                        </div>
                                        <div className="rounded-lg bg-red-50 p-3 text-sm">
                                            <div className="mb-1 font-medium text-red-800">
                                                Result:
                                            </div>
                                            <div className="text-sm text-red-700">
                                                {question.starMethod.result}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Tips (if available) */}
                            {question.tips && question.tips.length > 0 && (
                                <div className="mb-4">
                                    <h5 className="mb-2 flex items-center text-sm font-medium text-gray-700">
                                        <LightBulbIcon className="mr-2 h-4 w-4 text-yellow-500" />
                                        Tips for Answering
                                    </h5>
                                    <div className="space-y-1">
                                        {question.tips.map((tip, index) => (
                                            <div key={index} className="text-sm text-gray-600">
                                                • {tip}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Common Mistakes (if available) */}
                            {question.commonMistakes && question.commonMistakes.length > 0 && (
                                <div className="mb-4">
                                    <h5 className="mb-2 flex items-center text-sm font-medium text-gray-700">
                                        <XCircleIcon className="mr-2 h-4 w-4 text-red-500" />
                                        Common Mistakes to Avoid
                                    </h5>
                                    <div className="space-y-1">
                                        {question.commonMistakes.map((mistake, index) => (
                                            <div key={index} className="text-sm text-gray-600">
                                                • {mistake}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                <button className="flex-1 rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-purple-700">
                                    Practice Answer
                                </button>
                                <button className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                    View Discussion
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredQuestions.length === 0 && (
                <div className="py-12 text-center">
                    <ChatBubbleLeftRightIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                        No behavioral questions found
                    </h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
}
