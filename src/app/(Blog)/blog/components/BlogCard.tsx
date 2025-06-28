'use client';

import type React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Calendar, Clock, Eye, Heart, Share2, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/data/blog-data';

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

export default function BlogCard({ post }: BlogCardProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [isHovered, setIsHovered] = useState(false);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
    };

    const handleSave = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSaved(!isSaved);
    };

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.share?.({
            title: post.title,
            text: post.excerpt,
            url: `/blog/${post.slug}`,
        });
    };

    return (
        <Link href={`/blog/${post.slug}`}>
            <article
                className="group relative transform cursor-pointer overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-[#94f27f]/40 hover:shadow-2xl hover:shadow-[#94f27f]/10"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Subtle Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#94f27f]/3 via-transparent to-[#003720]/3 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Category Badge */}
                <div className="absolute top-5 left-5 z-20">
                    <Badge className="rounded-full bg-gradient-to-r from-[#94f27f] to-[#94f27f]/90 px-4 py-1.5 text-xs font-semibold text-[#003720] shadow-lg backdrop-blur-sm">
                        {post.category}
                    </Badge>
                </div>

                {/* Image Section */}
                <div className="relative h-52 overflow-hidden">
                    <Image
                        src={post.image || '/placeholder.svg?height=300&width=400'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Professional Action Buttons */}
                    <div
                        className={`absolute top-5 right-5 flex flex-col space-y-2 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                    >
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLike}
                            className={`h-9 w-9 rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white ${
                                isLiked ? 'text-[#f75353]' : 'text-[#6a6c6a]'
                            }`}
                        >
                            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleSave}
                            className={`h-9 w-9 rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white ${
                                isSaved ? 'text-[#94f27f]' : 'text-[#6a6c6a]'
                            }`}
                        >
                            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleShare}
                            className="h-9 w-9 rounded-full bg-white/90 text-[#6a6c6a] shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#94f27f]"
                        >
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="relative space-y-5 p-7">
                    {/* Author & Meta Info */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#94f27f] to-[#003720] text-sm font-bold text-white shadow-lg">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <p className="font-semibold text-[#0e0f0c]">{post.author}</p>
                                <div className="flex items-center space-x-2 text-[#6a6c6a]">
                                    <Calendar className="h-3 w-3" />
                                    <span className="text-xs">
                                        {new Date(post.publishedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 text-[#6a6c6a]">
                            <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span className="text-xs font-medium">{post.readTime}m</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span className="text-xs font-medium">
                                    {post.views > 1000
                                        ? `${(post.views / 1000).toFixed(1)}k`
                                        : post.views}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="line-clamp-2 text-xl leading-tight font-bold text-[#0e0f0c] transition-colors duration-300 group-hover:text-[#94f27f]">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="line-clamp-2 text-sm leading-relaxed text-[#6a6c6a]">
                        {post.excerpt}
                    </p>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between border-t border-gray-100/80 pt-4">
                        <div className="flex items-center space-x-5">
                            <div className="flex items-center space-x-2 text-sm text-[#6a6c6a]">
                                <Heart
                                    className={`h-4 w-4 ${isLiked ? 'fill-current text-[#f75353]' : ''}`}
                                />
                                <span className="font-medium">{likes}</span>
                            </div>
                            {post.views > 10000 && (
                                <div className="flex items-center space-x-2 text-sm">
                                    <TrendingUp className="h-4 w-4 text-[#94f27f]" />
                                    <span className="text-xs font-semibold text-[#94f27f]">
                                        Trending
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="rounded-full bg-gray-50/80 px-3 py-1.5 text-xs font-medium text-[#6a6c6a]">
                            {post.readTime} min read
                        </div>
                    </div>
                </div>

                {/* Professional Hover Glow Effect */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-[#94f27f]/15" />
                </div>
            </article>
        </Link>
    );
}
