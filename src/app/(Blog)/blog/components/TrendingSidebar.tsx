'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Eye, Sparkles, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/data/blog-data';

export default function TrendingSidebar() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const trendingPosts = blogPosts.sort((a, b) => b.views - a.views).slice(0, 5);

    const recentPosts = blogPosts
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 4);

    return (
        <div className="space-y-8">
            {/* Trending Posts */}
            <div
                className={`transform rounded-2xl border border-gray-200/60 bg-white/80 p-7 shadow-lg backdrop-blur-sm transition-all duration-1000 ${
                    isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}
            >
                <div className="mb-7 flex items-center space-x-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#94f27f] to-[#003720] shadow-lg">
                        <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0e0f0c]">Trending Now</h3>
                </div>

                <div className="space-y-5">
                    {trendingPosts.map((post, index) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group flex items-start space-x-4 rounded-xl p-4 transition-all duration-300 hover:bg-gray-50/60"
                        >
                            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl shadow-md">
                                <Image
                                    src={post.image || '/placeholder.svg?height=100&width=100'}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="mb-2 flex items-center space-x-2">
                                    <span className="rounded-full bg-[#94f27f]/10 px-2.5 py-1 text-xs font-bold text-[#94f27f]">
                                        #{index + 1}
                                    </span>
                                    <Badge
                                        variant="outline"
                                        className="border-[#94f27f]/40 text-xs text-[#003720]"
                                    >
                                        {post.category}
                                    </Badge>
                                </div>
                                <h4 className="mb-2 line-clamp-2 text-sm leading-tight font-semibold text-[#0e0f0c] transition-colors group-hover:text-[#94f27f]">
                                    {post.title}
                                </h4>
                                <div className="flex items-center space-x-4 text-xs text-[#6a6c6a]">
                                    <div className="flex items-center space-x-1">
                                        <Eye className="h-3 w-3" />
                                        <span>
                                            {post.views > 1000
                                                ? `${(post.views / 1000).toFixed(1)}k`
                                                : post.views}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-3 w-3" />
                                        <span>{post.readTime}m</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Posts */}
            <div
                className={`transform rounded-2xl border border-gray-200/60 bg-white/80 p-7 shadow-lg backdrop-blur-sm transition-all delay-200 duration-1000 ${
                    isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}
            >
                <div className="mb-7 flex items-center space-x-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#94f27f] to-[#003720] shadow-lg">
                        <Clock className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0e0f0c]">Latest Articles</h3>
                </div>

                <div className="space-y-5">
                    {recentPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group block rounded-xl p-4 transition-all duration-300 hover:bg-gray-50/60"
                        >
                            <div className="mb-3 flex items-center space-x-2">
                                <Badge
                                    variant="outline"
                                    className="border-[#94f27f]/40 text-xs text-[#003720]"
                                >
                                    {post.category}
                                </Badge>
                                <div className="flex items-center space-x-1 text-xs text-[#6a6c6a]">
                                    <Calendar className="h-3 w-3" />
                                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <h4 className="mb-2 line-clamp-2 text-sm leading-tight font-semibold text-[#0e0f0c] transition-colors group-hover:text-[#94f27f]">
                                {post.title}
                            </h4>
                            <p className="line-clamp-2 text-xs leading-relaxed text-[#6a6c6a]">
                                {post.excerpt}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Professional Newsletter Signup */}
            <div
                className={`transform rounded-2xl border border-[#94f27f]/20 bg-gradient-to-br from-[#94f27f]/8 via-white/80 to-[#003720]/5 p-8 shadow-lg backdrop-blur-sm transition-all delay-400 duration-1000 ${
                    isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}
            >
                <div className="text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#94f27f] to-[#003720] shadow-lg">
                        <Sparkles className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-[#0e0f0c]">Stay Informed</h3>
                    <p className="mb-6 text-sm leading-relaxed text-[#6a6c6a]">
                        Get the latest tech insights and industry trends delivered to your inbox
                        weekly.
                    </p>
                    <Button className="w-full rounded-xl bg-gradient-to-r from-[#94f27f] to-[#94f27f]/90 py-3 font-semibold text-[#003720] transition-all duration-300 hover:shadow-lg hover:shadow-[#94f27f]/25">
                        Subscribe Newsletter
                    </Button>
                </div>
            </div>
        </div>
    );
}
