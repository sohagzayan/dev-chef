'use client';

import { useState } from 'react';
import {
    BookOpenIcon,
    CheckCircleIcon,
    CodeBracketIcon,
    DocumentDuplicateIcon,
    EyeIcon,
    FireIcon,
    MagnifyingGlassIcon,
    StarIcon,
    TrophyIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function MySolutionsPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLanguage, setSelectedLanguage] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('date');

    const categories = [
        { id: 'all', label: 'All Solutions', count: 87, icon: '💻' },
        { id: 'arrays', label: 'Arrays', count: 25, icon: '📊' },
        { id: 'strings', label: 'Strings', count: 20, icon: '🔤' },
        { id: 'trees', label: 'Trees', count: 15, icon: '🌳' },
        { id: 'graphs', label: 'Graphs', count: 12, icon: '🕸️' },
        { id: 'dp', label: 'Dynamic Programming', count: 10, icon: '⚡' },
        { id: 'greedy', label: 'Greedy', count: 5, icon: '🎯' },
    ];

    const languages = [
        { id: 'all', label: 'All Languages', count: 87, icon: '💻' },
        { id: 'python', label: 'Python', count: 35, icon: '🐍' },
        { id: 'javascript', label: 'JavaScript', count: 25, icon: '🟨' },
        { id: 'java', label: 'Java', count: 15, icon: '☕' },
        { id: 'cpp', label: 'C++', count: 12, icon: '⚡' },
    ];

    const solutions = [
        {
            id: 1,
            problemTitle: 'Two Sum',
            category: 'arrays',
            language: 'python',
            solution: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            submittedAt: '2024-01-15T10:30:00Z',
            lastModified: '2024-01-15T10:30:00Z',
            rating: 4.8,
            views: 45,
            copies: 12,
            difficulty: 'easy',
            notes: 'Hash table approach for optimal time complexity. Clean and readable solution.',
            tags: ['Hash Table', 'Two Pointers', 'Array'],
            isPublic: true,
            isOptimized: true,
        },
        {
            id: 2,
            problemTitle: 'Valid Parentheses',
            category: 'strings',
            language: 'javascript',
            solution: `function isValid(s) {
    const stack = [];
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (pairs[char]) {
            if (stack.pop() !== pairs[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}`,
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            submittedAt: '2024-01-14T15:45:00Z',
            lastModified: '2024-01-14T16:20:00Z',
            rating: 4.6,
            views: 38,
            copies: 8,
            difficulty: 'easy',
            notes: 'Stack-based solution with early termination. Handles edge cases efficiently.',
            tags: ['Stack', 'String', 'Early Termination'],
            isPublic: true,
            isOptimized: true,
        },
        {
            id: 3,
            problemTitle: 'Merge Sorted Arrays',
            category: 'arrays',
            language: 'python',
            solution: `def merge(nums1, m, nums2, n):
    p1, p2, p = m - 1, n - 1, m + n - 1
    
    while p2 >= 0:
        if p1 >= 0 and nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1`,
            timeComplexity: 'O(m + n)',
            spaceComplexity: 'O(1)',
            submittedAt: '2024-01-13T09:15:00Z',
            lastModified: '2024-01-13T10:30:00Z',
            rating: 4.4,
            views: 32,
            copies: 6,
            difficulty: 'medium',
            notes: 'In-place merge using two pointers. Space-efficient solution.',
            tags: ['Two Pointers', 'In-place', 'Merge'],
            isPublic: true,
            isOptimized: true,
        },
        {
            id: 4,
            problemTitle: 'Binary Tree Inorder Traversal',
            category: 'trees',
            language: 'java',
            solution: `public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    Stack<TreeNode> stack = new Stack<>();
    TreeNode current = root;
    
    while (current != null || !stack.isEmpty()) {
        while (current != null) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        result.add(current.val);
        current = current.right;
    }
    return result;
}`,
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            submittedAt: '2024-01-12T14:20:00Z',
            lastModified: '2024-01-12T15:45:00Z',
            rating: 4.2,
            views: 28,
            copies: 5,
            difficulty: 'medium',
            notes: 'Iterative solution using stack. Avoids recursion stack overflow.',
            tags: ['Stack', 'Iterative', 'Tree Traversal'],
            isPublic: true,
            isOptimized: true,
        },
        {
            id: 5,
            problemTitle: 'Longest Substring Without Repeating Characters',
            category: 'strings',
            language: 'cpp',
            solution: `int lengthOfLongestSubstring(string s) {
    vector<int> chars(128, -1);
    int left = 0, maxLen = 0;
    
    for (int right = 0; right < s.length(); right++) {
        if (chars[s[right]] >= left) {
            left = chars[s[right]] + 1;
        }
        chars[s[right]] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            submittedAt: '2024-01-11T11:10:00Z',
            lastModified: '2024-01-11T12:30:00Z',
            rating: 4.7,
            views: 42,
            copies: 15,
            difficulty: 'hard',
            notes: 'Sliding window with optimized character lookup. Constant space solution.',
            tags: ['Sliding Window', 'Hash Table', 'Optimization'],
            isPublic: true,
            isOptimized: true,
        },
        {
            id: 6,
            problemTitle: 'Regular Expression Matching',
            category: 'dp',
            language: 'python',
            solution: `def isMatch(s, p):
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    
    for j in range(1, n + 1):
        if p[j-1] == '*':
            dp[0][j] = dp[0][j-2]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j-1] == '.' or p[j-1] == s[i-1]:
                dp[i][j] = dp[i-1][j-1]
            elif p[j-1] == '*':
                dp[i][j] = dp[i][j-2]
                if p[j-2] == '.' or p[j-2] == s[i-1]:
                    dp[i][j] |= dp[i-1][j]
    
    return dp[m][n]`,
            timeComplexity: 'O(mn)',
            spaceComplexity: 'O(mn)',
            submittedAt: '2024-01-10T16:30:00Z',
            lastModified: '2024-01-10T18:15:00Z',
            rating: 4.9,
            views: 35,
            copies: 8,
            difficulty: 'expert',
            notes: 'Dynamic programming solution. Handles all regex patterns correctly.',
            tags: ['Dynamic Programming', 'Regex', '2D DP'],
            isPublic: false,
            isOptimized: false,
        },
    ];

    const filteredSolutions = solutions.filter((solution) => {
        const matchesCategory =
            selectedCategory === 'all' || solution.category === selectedCategory;
        const matchesLanguage =
            selectedLanguage === 'all' || solution.language === selectedLanguage;
        const matchesSearch =
            solution.problemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            solution.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
            solution.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesLanguage && matchesSearch;
    });

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return 'text-green-600 bg-green-100';
            case 'medium':
                return 'text-yellow-600 bg-yellow-100';
            case 'hard':
                return 'text-orange-600 bg-orange-100';
            case 'expert':
                return 'text-purple-600 bg-purple-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getLanguageIcon = (language: string) => {
        const lang = languages.find((l) => l.id === language);
        return lang ? lang.icon : '💻';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const truncateCode = (code: string, maxLength: number = 150) => {
        if (code.length <= maxLength) return code;
        return code.substring(0, maxLength) + '...';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold text-gray-900 md:text-4xl"
                    >
                        My Solutions
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-2 text-gray-600"
                    >
                        Manage and review your problem-solving solutions
                    </motion.p>
                </div>

                {/* Stats Overview */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    <div className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <CodeBracketIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">87</div>
                                <div className="text-purple-100">Total Solutions</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">75</div>
                                <div className="text-green-100">Optimized</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <EyeIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">220</div>
                                <div className="text-orange-100">Total Views</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <StarIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">4.6</div>
                                <div className="text-blue-100">Avg Rating</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8 space-y-6"
                >
                    {/* Search Bar */}
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search solutions by problem title, notes, or tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-10 shadow-sm transition-all duration-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                        />
                    </div>

                    {/* Category Filter */}
                    <div>
                        <h3 className="mb-3 text-sm font-medium text-gray-700">Problem Category</h3>
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                                        selectedCategory === category.id
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="text-lg">{category.icon}</span>
                                    <span>{category.label}</span>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs ${
                                            selectedCategory === category.id
                                                ? 'bg-white/20'
                                                : 'bg-gray-100'
                                        }`}
                                    >
                                        {category.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Language Filter */}
                    <div>
                        <h3 className="mb-3 text-sm font-medium text-gray-700">
                            Programming Language
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {languages.map((language) => (
                                <button
                                    key={language.id}
                                    onClick={() => setSelectedLanguage(language.id)}
                                    className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                                        selectedLanguage === language.id
                                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="text-lg">{language.icon}</span>
                                    <span>{language.label}</span>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs ${
                                            selectedLanguage === language.id
                                                ? 'bg-white/20'
                                                : 'bg-gray-100'
                                        }`}
                                    >
                                        {language.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-700">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                            >
                                <option value="date">Submission Date</option>
                                <option value="rating">Rating</option>
                                <option value="views">Views</option>
                                <option value="difficulty">Difficulty</option>
                                <option value="language">Language</option>
                            </select>
                        </div>
                        <div className="text-sm text-gray-600">
                            {filteredSolutions.length} solutions found
                        </div>
                    </div>
                </motion.div>

                {/* Solutions Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid grid-cols-1 gap-6 lg:grid-cols-2"
                >
                    {filteredSolutions.map((solution, index) => (
                        <motion.div
                            key={solution.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                        >
                            {/* Status Badges */}
                            <div className="absolute top-4 right-4 flex flex-col space-y-2">
                                {solution.isOptimized && (
                                    <span className="inline-flex items-center space-x-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                        <TrophyIcon className="h-3 w-3" />
                                        <span>Optimized</span>
                                    </span>
                                )}
                                <span
                                    className={`inline-flex items-center space-x-1 rounded-full px-3 py-1 text-xs font-medium ${
                                        solution.isPublic
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-gray-100 text-gray-600'
                                    }`}
                                >
                                    <EyeIcon className="h-3 w-3" />
                                    <span>{solution.isPublic ? 'Public' : 'Private'}</span>
                                </span>
                            </div>

                            <div className="p-6 pr-32">
                                {/* Header */}
                                <div className="mb-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-purple-600">
                                            {solution.problemTitle}
                                        </h3>
                                        <div className="flex items-center space-x-2">
                                            <span
                                                className={`inline-flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(solution.difficulty)}`}
                                            >
                                                <span className="capitalize">
                                                    {solution.difficulty}
                                                </span>
                                            </span>
                                            <span className="inline-flex items-center space-x-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                                <span className="text-lg">
                                                    {getLanguageIcon(solution.language)}
                                                </span>
                                                <span className="capitalize">
                                                    {solution.language}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <p className="mb-3 text-sm text-gray-600">{solution.notes}</p>

                                    {/* Tags */}
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {solution.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Code Preview */}
                                <div className="mb-4">
                                    <h4 className="mb-2 text-xs font-medium text-gray-500">
                                        Code Preview
                                    </h4>
                                    <div className="rounded-lg bg-gray-900 p-3 font-mono text-xs text-gray-300">
                                        <pre className="whitespace-pre-wrap">
                                            {truncateCode(solution.solution)}
                                        </pre>
                                    </div>
                                </div>

                                {/* Complexity and Stats */}
                                <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Time:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {solution.timeComplexity}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Space:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {solution.spaceComplexity}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Views:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {solution.views}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Copies:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {solution.copies}
                                        </span>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <span>Modified: {formatDate(solution.lastModified)}</span>
                                        <span>Rating: {solution.rating}/5</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-purple-50 hover:text-purple-500">
                                            <EyeIcon className="h-5 w-5" />
                                        </button>
                                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500">
                                            <DocumentDuplicateIcon className="h-5 w-5" />
                                        </button>
                                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-yellow-50 hover:text-yellow-500">
                                            <StarIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredSolutions.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-12 text-center"
                    >
                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                            <CodeBracketIcon className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-gray-900">
                            No solutions found
                        </h3>
                        <p className="mb-6 text-gray-600">
                            Try adjusting your search criteria or filters
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                                setSelectedLanguage('all');
                            }}
                            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700"
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
