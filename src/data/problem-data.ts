import {
    Brain,
    Calculator,
    Code,
    Code2,
    Coffee,
    Cpu,
    Database,
    GitBranch,
    Globe,
    Terminal,
    Zap,
} from 'lucide-react';

export const topics = [
    {
        id: 'algorithms',
        name: 'Algorithms',
        icon: Code2,
        color: 'from-blue-500 to-blue-600',
        problems: 150,
        difficulty: 'Intermediate',
        category: 'Core CS',
        description: 'Master algorithmic thinking and problem-solving techniques',
    },
    {
        id: 'data-structures',
        name: 'Data Structures',
        icon: Database,
        color: 'from-emerald-500 to-emerald-600',
        problems: 120,
        difficulty: 'Beginner',
        category: 'Core CS',
        description: 'Learn fundamental data organization patterns',
    },
    {
        id: 'ai',
        name: 'Artificial Intelligence',
        icon: Brain,
        color: 'from-purple-500 to-purple-600',
        problems: 80,
        difficulty: 'Advanced',
        category: 'Specialized',
        description: 'Explore machine learning and AI algorithms',
    },
    {
        id: 'mathematics',
        name: 'Mathematics',
        icon: Calculator,
        color: 'from-orange-500 to-orange-600',
        problems: 95,
        difficulty: 'Intermediate',
        category: 'Core CS',
        description: 'Mathematical foundations for programming',
    },
    {
        id: 'java',
        name: 'Java',
        icon: Coffee,
        color: 'from-red-500 to-red-600',
        problems: 200,
        difficulty: 'Beginner',
        category: 'Languages',
        description: 'Enterprise-grade Java programming skills',
    },
    {
        id: 'python',
        name: 'Python',
        icon: Terminal,
        color: 'from-yellow-500 to-yellow-600',
        problems: 180,
        difficulty: 'Beginner',
        category: 'Languages',
        description: 'Versatile Python programming mastery',
    },
    {
        id: 'cpp',
        name: 'C++',
        icon: Zap,
        color: 'from-indigo-500 to-indigo-600',
        problems: 160,
        difficulty: 'Intermediate',
        category: 'Languages',
        description: 'High-performance C++ development',
    },
    {
        id: 'sql',
        name: 'SQL',
        icon: Database,
        color: 'from-teal-500 to-teal-600',
        problems: 75,
        difficulty: 'Beginner',
        category: 'Databases',
        description: 'Database querying and management',
    },
    {
        id: 'system-design',
        name: 'System Design',
        icon: Globe,
        color: 'from-slate-500 to-slate-600',
        problems: 45,
        difficulty: 'Advanced',
        category: 'Architecture',
        description: 'Large-scale system architecture patterns',
    },
    {
        id: 'machine-learning',
        name: 'Machine Learning',
        icon: Cpu,
        color: 'from-pink-500 to-pink-600',
        problems: 65,
        difficulty: 'Advanced',
        category: 'Specialized',
        description: 'ML algorithms and model development',
    },
    {
        id: 'web-development',
        name: 'Web Development',
        icon: Code,
        color: 'from-cyan-500 to-cyan-600',
        problems: 110,
        difficulty: 'Intermediate',
        category: 'Development',
        description: 'Modern web development practices',
    },
    {
        id: 'devops',
        name: 'DevOps',
        icon: GitBranch,
        color: 'from-violet-500 to-violet-600',
        problems: 55,
        difficulty: 'Advanced',
        category: 'Operations',
        description: 'CI/CD and infrastructure automation',
    },
];

export const upcomingContests = [
    {
        id: 'START192',
        name: 'Weekly Challenge 192',
        startTime: '25 Jun 2025 Wed 20:30',
        duration: '2 Hrs',
        startsIn: '2 Days 21 Hrs',
        participants: 0,
        prize: '$5,000',
        difficulty: 'Intermediate',
    },
    {
        id: 'MONTHLY01',
        name: 'Monthly Coding Championship',
        startTime: '28 Jun 2025 Sat 14:00',
        duration: '4 Hrs',
        startsIn: '5 Days 17 Hrs',
        participants: 0,
        prize: '$15,000',
        difficulty: 'Advanced',
    },
];

export const pastContests = [
    {
        id: 'DEVWEEKEND03',
        name: 'Weekend Dev Challenge 03',
        startTime: '21 Jun 2025 Sat 0:30',
        duration: '1 Days',
        participants: 2876,
        winner: 'alex_coder',
        prize: '$2,500',
    },
    {
        id: 'START191',
        name: 'Weekly Challenge 191',
        startTime: '18 Jun 2025 Wed 20:30',
        duration: '2 Hrs',
        participants: 21768,
        winner: 'code_master_99',
        prize: '$5,000',
    },
    {
        id: 'DEVWEEKEND02',
        name: 'Weekend Dev Challenge 02',
        startTime: '14 Jun 2025 Sat 0:30',
        duration: '1 Days',
        participants: 3296,
        winner: 'python_ninja',
        prize: '$2,500',
    },
];

export const generateProblems = (topicId: string, page: number) => {
    const problems = [];
    const difficulties = ['Easy', 'Medium', 'Hard'];
    const statuses = ['Solved', 'Attempted', 'Unsolved'];
    const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Uber'];

    for (let i = 0; i < 10; i++) {
        const id = `${topicId}-${page}-${i}`;
        problems.push({
            id,
            title: `${topicId.charAt(0).toUpperCase() + topicId.slice(1)} Challenge ${page * 10 + i + 1}`,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            successRate: Math.floor(Math.random() * 100),
            maxScore: Math.floor(Math.random() * 50) + 10,
            solvedBy: Math.floor(Math.random() * 10000) + 1000,
            tags: [
                'Implementation',
                'Sorting',
                'Greedy',
                'Dynamic Programming',
                'Graph Theory',
            ].slice(0, Math.floor(Math.random() * 3) + 1),
            companies: companies.slice(0, Math.floor(Math.random() * 3) + 1),
            estimatedTime: `${Math.floor(Math.random() * 60) + 15} min`,
        });
    }
    return problems;
};
