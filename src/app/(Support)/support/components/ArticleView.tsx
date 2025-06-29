'use client';

import { useState } from 'react';
import { ArrowLeft, Bookmark, Clock, Share2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ArticleViewProps {
    article: {
        id: string;
        title: string;
        content: string;
        lastUpdated: string;
    };
    onBack: () => void;
    categoryTitle?: string | null;
}

export default function ArticleView({ article, onBack, categoryTitle }: ArticleViewProps) {
    const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleHelpfulClick = (helpful: boolean) => {
        setIsHelpful(helpful);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: `Check out this helpful article: ${article.title}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            // You could add a toast notification here
        }
    };

    const renderContent = (content: string) => {
        const lines = content.split('\n');
        return lines.map((line, index) => {
            // Handle headers
            if (line.startsWith('# ')) {
                return (
                    <h1
                        key={index}
                        className="mt-8 mb-6 text-3xl font-bold"
                        style={{ color: '#0e0f0c' }}
                    >
                        {line.substring(2)}
                    </h1>
                );
            }
            if (line.startsWith('## ')) {
                return (
                    <h2
                        key={index}
                        className="mt-6 mb-4 text-2xl font-semibold"
                        style={{ color: '#0e0f0c' }}
                    >
                        {line.substring(3)}
                    </h2>
                );
            }
            if (line.startsWith('### ')) {
                return (
                    <h3
                        key={index}
                        className="mt-5 mb-3 text-xl font-semibold"
                        style={{ color: '#0e0f0c' }}
                    >
                        {line.substring(4)}
                    </h3>
                );
            }

            // Handle bold text
            if (line.startsWith('- **') && line.includes('**:')) {
                const parts = line.split('**');
                return (
                    <li key={index} className="mb-2" style={{ color: '#454745' }}>
                        <strong style={{ color: '#0e0f0c' }}>{parts[1]}</strong>:{' '}
                        {parts[2].substring(1)}
                    </li>
                );
            }

            // Handle bullet points
            if (line.startsWith('- ')) {
                return (
                    <li key={index} className="mb-2 ml-4" style={{ color: '#454745' }}>
                        {line.substring(2)}
                    </li>
                );
            }

            // Handle numbered lists
            if (/^\d+\./.test(line)) {
                return (
                    <li key={index} className="mb-2 ml-4" style={{ color: '#454745' }}>
                        {line.substring(line.indexOf('.') + 2)}
                    </li>
                );
            }

            // Handle empty lines
            if (line.trim() === '') {
                return <br key={index} />;
            }

            // Handle regular paragraphs
            return (
                <p key={index} className="mb-4 leading-relaxed" style={{ color: '#454745' }}>
                    {line}
                </p>
            );
        });
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
            {/* Header */}
            <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button onClick={onBack} variant="ghost" className="hover:bg-gray-100">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                {categoryTitle ? categoryTitle : 'All Collections'}
                            </Button>
                            {categoryTitle && (
                                <>
                                    <span style={{ color: '#6a6c6a' }}>/</span>
                                    <span style={{ color: '#6a6c6a' }}>{categoryTitle}</span>
                                </>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsBookmarked(!isBookmarked)}
                                className={isBookmarked ? 'border-yellow-200 bg-yellow-50' : ''}
                            >
                                <Bookmark
                                    className={`mr-2 h-4 w-4 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : ''}`}
                                />
                                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                            </Button>
                            <Button variant="outline" size="sm" onClick={handleShare}>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-4xl">
                    <Card>
                        <CardContent className="p-8">
                            {/* Article Header */}
                            <div className="mb-8">
                                <h1
                                    className="mb-4 text-4xl font-bold"
                                    style={{ color: '#0e0f0c' }}
                                >
                                    {article.title}
                                </h1>
                                <div
                                    className="flex items-center space-x-4 text-sm"
                                    style={{ color: '#6a6c6a' }}
                                >
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4" />
                                        <span>Last updated {article.lastUpdated}</span>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        style={{ borderColor: '#94f27f', color: '#003720' }}
                                    >
                                        Help Article
                                    </Badge>
                                </div>
                            </div>

                            <Separator className="mb-8" />

                            {/* Article Body */}
                            <div className="prose prose-lg max-w-none">
                                {renderContent(article.content)}
                            </div>

                            <Separator className="my-8" />

                            {/* Article Footer */}
                            <div className="space-y-6">
                                {/* Helpful Section */}
                                <div className="text-center">
                                    <h3
                                        className="mb-4 text-lg font-semibold"
                                        style={{ color: '#0e0f0c' }}
                                    >
                                        How helpful was this article?
                                    </h3>
                                    <div className="flex items-center justify-center space-x-4">
                                        <Button
                                            variant={isHelpful === false ? 'default' : 'outline'}
                                            onClick={() => handleHelpfulClick(false)}
                                            className={
                                                isHelpful === false
                                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                                    : ''
                                            }
                                        >
                                            <ThumbsDown className="mr-2 h-4 w-4" />
                                            Not helpful
                                        </Button>
                                        <Button
                                            variant={isHelpful === true ? 'default' : 'outline'}
                                            onClick={() => handleHelpfulClick(true)}
                                            className={isHelpful === true ? 'text-white' : ''}
                                            style={{
                                                backgroundColor:
                                                    isHelpful === true ? '#003720' : 'transparent',
                                                borderColor:
                                                    isHelpful === true ? '#003720' : '#e5e7eb',
                                            }}
                                        >
                                            <ThumbsUp className="mr-2 h-4 w-4" />
                                            Helpful
                                        </Button>
                                    </div>
                                    {isHelpful !== null && (
                                        <p className="mt-3 text-sm" style={{ color: '#6a6c6a' }}>
                                            Thank you for your feedback!
                                        </p>
                                    )}
                                </div>

                                {/* Related Articles */}
                                <div className="rounded-lg bg-gray-50 p-6">
                                    <h4 className="mb-3 font-semibold" style={{ color: '#0e0f0c' }}>
                                        Still need help?
                                    </h4>
                                    <div className="space-y-2">
                                        <Button
                                            variant="link"
                                            className="h-auto justify-start p-0 text-left"
                                            style={{ color: '#003720' }}
                                        >
                                            Contact our support team
                                        </Button>
                                        <br />
                                        <Button
                                            variant="link"
                                            className="h-auto justify-start p-0 text-left"
                                            style={{ color: '#003720' }}
                                        >
                                            Browse more articles
                                        </Button>
                                        <br />
                                        <Button
                                            variant="link"
                                            className="h-auto justify-start p-0 text-left"
                                            style={{ color: '#003720' }}
                                        >
                                            Join our community forum
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
