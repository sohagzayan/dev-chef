'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Info, MoreVertical, Paperclip, Phone, Send, Smile, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'agent';
    timestamp: Date;
    type: 'text' | 'system';
}

export default function LiveChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content:
                "Hello! I'm Sarah, your dedicated support agent. I see you've just subscribed to our support plan. How can I help you today?",
            sender: 'agent',
            timestamp: new Date(),
            type: 'text',
        },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [subscription, setSubscription] = useState<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        // Check if user has subscription
        const savedSubscription = localStorage.getItem('supportSubscription');
        if (!savedSubscription) {
            router.push('/support');
            return;
        }
        setSubscription(JSON.parse(savedSubscription));
    }, [router]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: newMessage,
            sender: 'user',
            timestamp: new Date(),
            type: 'text',
        };

        setMessages((prev) => [...prev, userMessage]);
        setNewMessage('');
        setIsTyping(true);

        // Simulate agent response
        setTimeout(
            () => {
                const responses = [
                    "Thank you for your message! I'm looking into this for you right away.",
                    'I understand your concern. Let me check our documentation and provide you with a solution.',
                    'Great question! I have the perfect solution for this. Let me walk you through it step by step.',
                    'I can definitely help you with that. Based on your subscription plan, I have access to all the tools needed to resolve this.',
                ];

                const randomResponse = responses[Math.floor(Math.random() * responses.length)];

                const agentMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    content: randomResponse,
                    sender: 'agent',
                    timestamp: new Date(),
                    type: 'text',
                };
                setMessages((prev) => [...prev, agentMessage]);
                setIsTyping(false);
            },
            1500 + Math.random() * 1000,
        );
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!subscription) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-4xl">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link href="/support">
                            <Button
                                variant="outline"
                                className="flex items-center space-x-2 bg-transparent"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Back to Support</span>
                            </Button>
                        </Link>
                    </div>

                    {/* Header */}
                    <Card className="mb-6">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage
                                            src="/placeholder.svg?height=48&width=48"
                                            alt="Support Agent"
                                        />
                                        <AvatarFallback
                                            style={{ backgroundColor: '#94f27f', color: '#003720' }}
                                        >
                                            SA
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h2
                                            className="text-xl font-semibold"
                                            style={{ color: '#0e0f0c' }}
                                        >
                                            Sarah Johnson
                                        </h2>
                                        <div className="flex items-center space-x-2">
                                            <Badge
                                                variant="secondary"
                                                style={{
                                                    backgroundColor: '#94f27f',
                                                    color: '#003720',
                                                }}
                                            >
                                                Online
                                            </Badge>
                                            <span className="text-sm" style={{ color: '#6a6c6a' }}>
                                                Senior Support Specialist
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge
                                        variant="outline"
                                        style={{ borderColor: '#94f27f', color: '#003720' }}
                                    >
                                        {subscription.plan}
                                    </Badge>
                                    <Button variant="outline" size="icon">
                                        <Phone className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Video className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Info className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Chat Area */}
                    <Card className="flex h-[600px] flex-col">
                        <CardContent className="flex-1 overflow-hidden p-0">
                            <div className="flex h-full flex-col">
                                {/* Messages */}
                                <div className="flex-1 space-y-4 overflow-y-auto p-6">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`flex max-w-[70%] items-start space-x-3 ${
                                                    message.sender === 'user'
                                                        ? 'flex-row-reverse space-x-reverse'
                                                        : ''
                                                }`}
                                            >
                                                <Avatar className="h-8 w-8">
                                                    {message.sender === 'agent' ? (
                                                        <>
                                                            <AvatarImage
                                                                src="/placeholder.svg?height=32&width=32"
                                                                alt="Agent"
                                                            />
                                                            <AvatarFallback
                                                                style={{
                                                                    backgroundColor: '#94f27f',
                                                                    color: '#003720',
                                                                }}
                                                            >
                                                                SA
                                                            </AvatarFallback>
                                                        </>
                                                    ) : (
                                                        <AvatarFallback
                                                            style={{
                                                                backgroundColor: '#e3f2fd',
                                                                color: '#1976d2',
                                                            }}
                                                        >
                                                            You
                                                        </AvatarFallback>
                                                    )}
                                                </Avatar>
                                                <div
                                                    className="rounded-lg px-4 py-2"
                                                    style={{
                                                        backgroundColor:
                                                            message.sender === 'user'
                                                                ? '#003720'
                                                                : '#f1f5f9',
                                                        color:
                                                            message.sender === 'user'
                                                                ? 'white'
                                                                : '#0e0f0c',
                                                    }}
                                                >
                                                    <p className="text-sm">{message.content}</p>
                                                    <p
                                                        className="mt-1 text-xs"
                                                        style={{
                                                            color:
                                                                message.sender === 'user'
                                                                    ? 'rgba(255,255,255,0.7)'
                                                                    : '#6a6c6a',
                                                        }}
                                                    >
                                                        {message.timestamp.toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Typing Indicator */}
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="flex items-start space-x-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                        src="/placeholder.svg?height=32&width=32"
                                                        alt="Agent"
                                                    />
                                                    <AvatarFallback
                                                        style={{
                                                            backgroundColor: '#94f27f',
                                                            color: '#003720',
                                                        }}
                                                    >
                                                        SA
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className="rounded-lg px-4 py-2"
                                                    style={{ backgroundColor: '#f1f5f9' }}
                                                >
                                                    <div className="flex space-x-1">
                                                        <div
                                                            className="h-2 w-2 animate-bounce rounded-full"
                                                            style={{
                                                                backgroundColor: '#6a6c6a',
                                                                animationDelay: '0ms',
                                                            }}
                                                        />
                                                        <div
                                                            className="h-2 w-2 animate-bounce rounded-full"
                                                            style={{
                                                                backgroundColor: '#6a6c6a',
                                                                animationDelay: '150ms',
                                                            }}
                                                        />
                                                        <div
                                                            className="h-2 w-2 animate-bounce rounded-full"
                                                            style={{
                                                                backgroundColor: '#6a6c6a',
                                                                animationDelay: '300ms',
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="border-t p-4">
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="icon">
                                            <Paperclip className="h-4 w-4" />
                                        </Button>
                                        <div className="relative flex-1">
                                            <Input
                                                placeholder="Type your message..."
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                className="pr-12"
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-1/2 right-1 -translate-y-1/2 transform"
                                            >
                                                <Smile className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <Button
                                            onClick={handleSendMessage}
                                            disabled={!newMessage.trim()}
                                            className="font-semibold"
                                            style={{ backgroundColor: '#003720', color: 'white' }}
                                        >
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Support Info */}
                    <div className="mt-6">
                        <Card>
                            <CardContent className="p-4">
                                <div
                                    className="flex items-center justify-between text-sm"
                                    style={{ color: '#6a6c6a' }}
                                >
                                    <span>
                                        Session started at {new Date().toLocaleTimeString()}
                                    </span>
                                    <span>Response time: {'<'} 2 minutes</span>
                                    <span>Plan: {subscription.plan}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
