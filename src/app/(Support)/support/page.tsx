'use client';

import { useState } from 'react';
import {
    ArrowLeft,
    ChevronRight,
    Clock,
    FileText,
    MessageCircle,
    Search,
    Users,
    Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { popularArticles, supportCategories } from '@/data/support';
import ArticleView from './components/ArticleView';
import SubscriptionModal from './components/SubscriptionModal';

export default function SupportPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSubscription, setShowSubscription] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedArticle, setSelectedArticle] = useState<any>(null);
    const [viewMode, setViewMode] = useState<'main' | 'category' | 'article'>('main');

    const filteredCategories = supportCategories.filter(
        (category) =>
            category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.articles.some((article) =>
                article.title.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
    );

    const handleCategoryClick = (categoryTitle: string) => {
        setSelectedCategory(categoryTitle);
        setViewMode('category');
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleArticleClick = (article: any) => {
        setSelectedArticle(article);
        setViewMode('article');
    };

    const handleBackToMain = () => {
        setViewMode('main');
        setSelectedCategory(null);
        setSelectedArticle(null);
    };

    const handleBackToCategory = () => {
        setViewMode('category');
        setSelectedArticle(null);
    };

    const getCurrentCategory = () => {
        return supportCategories.find((cat) => cat.title === selectedCategory);
    };

    // Main view
    if (viewMode === 'main') {
        return (
            <div className="min-h-screen" style={{ backgroundColor: 'white' }}>
                {/* Header */}
                <div style={{ backgroundColor: '#0e0f0c', color: 'white', padding: '4rem 0' }}>
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="mb-8 text-4xl font-bold">How can we help?</h1>
                        <div className="relative mx-auto max-w-2xl">
                            <Search
                                className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform"
                                style={{ color: '#6a6c6a' }}
                            />
                            <Input
                                placeholder="Search for articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="rounded-lg border-0 bg-white py-4 pl-12 text-lg"
                                style={{ color: '#0e0f0c' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Live Support CTA */}
                <div className="relative z-10 container mx-auto -mt-8 px-4">
                    <Card
                        className="shadow-lg"
                        style={{
                            background: 'linear-gradient(to right, #94f27f, #003720)',
                            color: 'white',
                        }}
                    >
                        <CardContent className="p-6">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-full bg-white/20 p-3">
                                        <MessageCircle className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="mb-1 text-xl font-semibold">
                                            Need Instant Help?
                                        </h3>
                                        <p className="text-white/90">
                                            Get live support from our experts - Available 24/7
                                        </p>
                                        <div className="mt-2 flex items-center space-x-4">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="h-4 w-4" />
                                                <span className="text-sm">Avg response: 2 min</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Users className="h-4 w-4" />
                                                <span className="text-sm">Expert agents</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Badge
                                        variant="secondary"
                                        className="border-white/30 bg-white/20 text-white"
                                    >
                                        <Zap className="mr-1 h-3 w-3" />
                                        Premium Feature
                                    </Badge>
                                    <Button
                                        onClick={() => setShowSubscription(true)}
                                        className="bg-white px-6 py-2 font-semibold hover:bg-white/90"
                                        style={{ color: '#003720' }}
                                    >
                                        Start Live Chat
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Support Categories */}
                <div className="container mx-auto px-4 py-12">
                    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredCategories.map((category) => (
                            <Card
                                key={category.title}
                                className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg"
                                onClick={() => handleCategoryClick(category.title)}
                            >
                                <CardContent className="p-6 text-center">
                                    <div
                                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                                        style={{ backgroundColor: '#94f27f20' }}
                                    >
                                        <category.icon
                                            className="h-8 w-8"
                                            style={{ color: '#003720' }}
                                        />
                                    </div>
                                    <h3
                                        className="mb-2 text-lg font-semibold"
                                        style={{ color: '#0e0f0c' }}
                                    >
                                        {category.title}
                                    </h3>
                                    <p className="text-sm" style={{ color: '#6a6c6a' }}>
                                        {category.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Popular Articles */}
                    <div>
                        <h2 className="mb-6 text-2xl font-bold" style={{ color: '#0e0f0c' }}>
                            Popular Articles
                        </h2>
                        <div className="space-y-3">
                            {popularArticles.map((article) => (
                                <Card
                                    key={article.id}
                                    className="cursor-pointer transition-all duration-300 hover:shadow-md"
                                    onClick={() => handleArticleClick(article)}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <FileText
                                                    className="h-5 w-5"
                                                    style={{ color: '#6a6c6a' }}
                                                />
                                                <span
                                                    className="font-medium"
                                                    style={{ color: '#0e0f0c' }}
                                                >
                                                    {article.title}
                                                </span>
                                            </div>
                                            <ChevronRight
                                                className="h-5 w-5"
                                                style={{ color: '#6a6c6a' }}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Subscription Modal */}
                <SubscriptionModal open={showSubscription} onOpenChange={setShowSubscription} />
            </div>
        );
    }

    // Category view
    if (viewMode === 'category') {
        const currentCategory = getCurrentCategory();
        if (!currentCategory) return null;

        return (
            <div className="min-h-screen" style={{ backgroundColor: 'white' }}>
                {/* Header */}
                <div style={{ backgroundColor: '#0e0f0c', color: 'white', padding: '2rem 0' }}>
                    <div className="container mx-auto px-4">
                        <Button
                            onClick={handleBackToMain}
                            variant="ghost"
                            className="mb-4 text-white hover:bg-white/10"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            All Collections
                        </Button>
                        <div className="flex items-center space-x-4">
                            <div
                                className="flex h-12 w-12 items-center justify-center rounded-lg"
                                style={{ backgroundColor: '#94f27f20' }}
                            >
                                <currentCategory.icon
                                    className="h-6 w-6"
                                    style={{ color: '#94f27f' }}
                                />
                            </div>
                            <h1 className="text-3xl font-bold">{currentCategory.title}</h1>
                        </div>
                    </div>
                </div>

                {/* Articles List */}
                <div className="container mx-auto px-4 py-8">
                    <div className="space-y-4">
                        {currentCategory.articles.map((article) => (
                            <Card
                                key={article.id}
                                className="cursor-pointer transition-all duration-300 hover:shadow-md"
                                onClick={() => handleArticleClick(article)}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <FileText
                                                className="h-6 w-6"
                                                style={{ color: '#6a6c6a' }}
                                            />
                                            <div>
                                                <h3
                                                    className="text-lg font-semibold"
                                                    style={{ color: '#0e0f0c' }}
                                                >
                                                    {article.title}
                                                </h3>
                                                <p className="text-sm" style={{ color: '#6a6c6a' }}>
                                                    Last updated {article.lastUpdated}
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronRight
                                            className="h-5 w-5"
                                            style={{ color: '#6a6c6a' }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Article view
    if (viewMode === 'article' && selectedArticle) {
        return (
            <ArticleView
                article={selectedArticle}
                onBack={selectedCategory ? handleBackToCategory : handleBackToMain}
                categoryTitle={selectedCategory}
            />
        );
    }

    return null;
}
