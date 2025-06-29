'use client';

import { useEffect, useMemo, useState } from 'react';
import { Calendar, ChevronRight, Eye, Filter, Search, TrendingUp, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { blogPosts, categories, Category } from '@/data/blog-data';
import BlogCard from './BlogCard';
import TrendingSidebar from './TrendingSidebar';

export default function BlogListing() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const postsPerPage = 6;

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const filteredAndSortedPosts = useMemo(() => {
        const filtered = blogPosts.filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.author.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === 'all' || post.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
                case 'oldest':
                    return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
                case 'popular':
                    return b.views - a.views;
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [searchQuery, selectedCategory, sortBy]);

    const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
    const currentPosts = filteredAndSortedPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage,
    );
    const featuredPost = blogPosts[0];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-gray-50/20 to-white">
            {/* Subtle Background Elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-[#94f27f]/8 to-transparent blur-3xl" />
                <div className="absolute top-1/2 -left-40 h-60 w-60 rounded-full bg-gradient-to-br from-[#94f27f]/4 to-transparent blur-2xl" />
            </div>

            {/* Professional Header */}
            <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/90 backdrop-blur-xl">
                <div className="container mx-auto px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-10">
                            {/* Professional Category Navigation */}
                            <nav className="hidden items-center space-x-1 lg:flex">
                                {categories.slice(0, 5).map((category: Category, index: number) => (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            setSelectedCategory(category.id);
                                            setCurrentPage(1);
                                        }}
                                        className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                                            selectedCategory === category.id
                                                ? 'bg-gradient-to-r from-[#94f27f] to-[#94f27f]/90 text-[#003720] shadow-lg shadow-[#94f27f]/20'
                                                : 'text-[#6a6c6a] hover:bg-gray-100/80 hover:text-[#0e0f0c]'
                                        }`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Enhanced Search */}
                        <div className="flex items-center space-x-4">
                            <div className="group relative">
                                <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform text-[#6a6c6a] transition-colors group-focus-within:text-[#94f27f]" />
                                <Input
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-80 rounded-xl border-gray-200/60 bg-white/60 py-3 pr-4 pl-12 shadow-sm backdrop-blur-sm transition-all duration-300 focus:border-[#94f27f] focus:ring-2 focus:ring-[#94f27f]/20"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-10">
                {/* Professional Hero Featured Post */}
                <div
                    className={`mb-16 transform transition-all duration-1000 ${
                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                >
                    <div className="group relative cursor-pointer">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#94f27f]/15 to-[#003720]/15 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100 group-hover:blur-2xl" />
                        <div className="relative overflow-hidden rounded-3xl border border-gray-200/60 bg-white/80 p-10 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl">
                            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-gradient-to-br from-[#94f27f]/8 to-transparent blur-2xl" />
                            <div className="relative z-10">
                                <div className="mb-6 flex items-center space-x-4">
                                    <Badge className="rounded-full bg-gradient-to-r from-[#94f27f] to-[#94f27f]/90 px-5 py-2 text-sm font-semibold text-[#003720] shadow-lg">
                                        ✨ Featured Article
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="rounded-full border-[#94f27f]/40 px-3 py-1 text-[#003720]"
                                    >
                                        {featuredPost.category}
                                    </Badge>
                                </div>
                                <h2 className="mb-6 text-4xl leading-tight font-bold text-[#0e0f0c] md:text-5xl">
                                    {featuredPost.title}
                                </h2>
                                <p className="mb-8 max-w-3xl text-xl leading-relaxed text-[#6a6c6a]">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-8 text-sm text-[#6a6c6a]">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#94f27f] to-[#003720] text-sm font-bold text-white shadow-lg">
                                                {featuredPost.author.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[#0e0f0c]">
                                                    {featuredPost.author}
                                                </p>
                                                <p className="text-xs text-[#6a6c6a]">
                                                    Senior Tech Writer
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>
                                                {new Date(
                                                    featuredPost.publishedAt,
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Eye className="h-4 w-4" />
                                            <span>{featuredPost.views.toLocaleString()} views</span>
                                        </div>
                                    </div>
                                    <Button className="rounded-full bg-gradient-to-r from-[#94f27f] to-[#94f27f]/90 px-8 py-3 font-semibold text-[#003720] transition-all duration-300 hover:shadow-lg hover:shadow-[#94f27f]/25">
                                        Read Article
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-10 lg:flex-row">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Professional Filters */}
                        <div
                            className={`mb-10 flex transform flex-col items-start justify-between gap-6 transition-all delay-300 duration-1000 md:flex-row md:items-center ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3 rounded-xl border border-gray-200/60 bg-white/60 p-2 shadow-sm backdrop-blur-sm">
                                    <Select
                                        value={selectedCategory}
                                        onValueChange={(value) => {
                                            setSelectedCategory(value);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <SelectTrigger className="min-w-52 border-0 bg-transparent focus:ring-0">
                                            <Filter className="mr-2 h-4 w-4 text-[#94f27f]" />
                                            <SelectValue placeholder="Filter by category" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-gray-200/60 bg-white/95 shadow-xl backdrop-blur-xl">
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                    className="rounded-lg"
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center space-x-3 rounded-xl border border-gray-200/60 bg-white/60 p-2 shadow-sm backdrop-blur-sm">
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger className="min-w-52 border-0 bg-transparent focus:ring-0">
                                            <TrendingUp className="mr-2 h-4 w-4 text-[#94f27f]" />
                                            <SelectValue placeholder="Sort by" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-gray-200/60 bg-white/95 shadow-xl backdrop-blur-xl">
                                            <SelectItem value="newest" className="rounded-lg">
                                                Newest First
                                            </SelectItem>
                                            <SelectItem value="oldest" className="rounded-lg">
                                                Oldest First
                                            </SelectItem>
                                            <SelectItem value="popular" className="rounded-lg">
                                                Most Popular
                                            </SelectItem>
                                            <SelectItem value="title" className="rounded-lg">
                                                Title A-Z
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3 rounded-full border border-gray-200/60 bg-white/60 px-5 py-2.5 text-sm text-[#6a6c6a] shadow-sm backdrop-blur-sm">
                                    <Users className="h-4 w-4 text-[#94f27f]" />
                                    <span className="font-medium">
                                        {filteredAndSortedPosts.length} articles
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Blog Posts Grid with Professional Spacing */}
                        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
                            {currentPosts.map((post, index) => (
                                <div
                                    key={post.id}
                                    className={`transform transition-all duration-700 ${
                                        isLoaded
                                            ? 'translate-y-0 opacity-100'
                                            : 'translate-y-10 opacity-0'
                                    }`}
                                    style={{
                                        animationDelay: `${(index + 1) * 150}ms`,
                                        transitionDelay: `${(index + 1) * 150}ms`,
                                    }}
                                >
                                    <BlogCard post={post} index={index} />
                                </div>
                            ))}
                        </div>

                        {/* Professional Pagination */}
                        {totalPages > 1 && (
                            <div
                                className={`flex transform items-center justify-center space-x-3 transition-all delay-700 duration-1000 ${
                                    isLoaded
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-10 opacity-0'
                                }`}
                            >
                                <div className="flex items-center space-x-2 rounded-xl border border-gray-200/60 bg-white/60 p-3 shadow-sm backdrop-blur-sm">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                        (page) => (
                                            <Button
                                                key={page}
                                                variant={currentPage === page ? 'default' : 'ghost'}
                                                size="sm"
                                                onClick={() => handlePageChange(page)}
                                                className={`h-10 min-w-10 rounded-lg transition-all duration-300 ${
                                                    currentPage === page
                                                        ? 'bg-gradient-to-r from-[#94f27f] to-[#94f27f]/90 text-[#003720] shadow-lg shadow-[#94f27f]/20'
                                                        : 'hover:bg-gray-100/80'
                                                }`}
                                            >
                                                {page}
                                            </Button>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Professional Sidebar */}
                    <div className="lg:w-80">
                        <TrendingSidebar />
                    </div>
                </div>
            </main>
        </div>
    );
}
