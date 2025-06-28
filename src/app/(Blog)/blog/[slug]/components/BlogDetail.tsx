'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bookmark, Calendar, Eye, Heart, Share2, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { blogPosts, type BlogPost } from '@/data/blog-data';

interface BlogDetailProps {
    post: BlogPost;
}

export default function BlogDetail({ post }: BlogDetailProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [likes, setLikes] = useState(post.likes);

    const relatedPosts = blogPosts
        .filter((p) => p.id !== post.id && p.category === post.category)
        .slice(0, 3);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
    };

    const handleSave = () => {
        setIsSaved(!isSaved);
    };

    const handleShare = () => {
        navigator.share?.({
            title: post.title,
            text: post.excerpt,
            url: window.location.href,
        });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4">
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 text-[#6a6c6a] transition-colors hover:text-[#94f27f]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Blog</span>
                    </Link>
                </div>
            </header>

            <article className="container mx-auto max-w-4xl px-4 py-8">
                {/* Article Header */}
                <div className="animate-in slide-in-from-bottom-4 mb-8">
                    <Badge className="mb-4 bg-[#94f27f] text-[#003720] hover:bg-[#94f27f]/90">
                        {post.category}
                    </Badge>
                    <h1 className="mb-6 text-4xl leading-tight font-bold text-[#0e0f0c] md:text-5xl">
                        {post.title}
                    </h1>
                    <p className="mb-6 text-xl text-[#6a6c6a]">{post.excerpt}</p>

                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex items-center space-x-6 text-sm text-[#6a6c6a]">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span className="font-medium">{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Eye className="h-4 w-4" />
                                <span>{post.views.toLocaleString()} views</span>
                            </div>
                            <span>{post.readTime} min read</span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLike}
                                className={`${isLiked ? 'border-[#f75353] text-[#f75353]' : 'text-[#6a6c6a]'} hover:border-[#f75353] hover:text-[#f75353]`}
                            >
                                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                                <span className="ml-1">{likes}</span>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleSave}
                                className={`${isSaved ? 'border-[#94f27f] text-[#94f27f]' : 'text-[#6a6c6a]'} hover:border-[#94f27f] hover:text-[#94f27f]`}
                            >
                                <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleShare}
                                className="bg-transparent text-[#6a6c6a] hover:border-[#94f27f] hover:text-[#94f27f]"
                            >
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div
                    className="animate-in slide-in-from-bottom-4 relative mb-8 h-96 overflow-hidden rounded-xl md:h-[500px]"
                    style={{ animationDelay: '200ms' }}
                >
                    <Image
                        src={post.image || '/placeholder.svg'}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Article Content */}
                <div
                    className="prose prose-lg animate-in slide-in-from-bottom-4 max-w-none"
                    style={{ animationDelay: '400ms' }}
                >
                    <div className="space-y-6 leading-relaxed text-[#0e0f0c]">
                        {post.content.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="text-lg leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                <Separator className="my-12" />

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div
                        className="animate-in slide-in-from-bottom-4"
                        style={{ animationDelay: '600ms' }}
                    >
                        <h2 className="mb-6 text-2xl font-bold text-[#0e0f0c]">Related Articles</h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    href={`/blog/${relatedPost.slug}`}
                                    className="group block overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:border-[#94f27f]/50 hover:shadow-lg"
                                >
                                    <div className="relative h-40 overflow-hidden">
                                        <Image
                                            src={relatedPost.image || '/placeholder.svg'}
                                            alt={relatedPost.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <Badge className="mb-2 bg-[#94f27f] text-xs text-[#003720]">
                                            {relatedPost.category}
                                        </Badge>
                                        <h3 className="mb-2 line-clamp-2 font-semibold text-[#0e0f0c] transition-colors group-hover:text-[#94f27f]">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="line-clamp-2 text-sm text-[#6a6c6a]">
                                            {relatedPost.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
}
