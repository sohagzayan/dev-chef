'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, CheckCircle2, Globe, MapPin, Plus, Upload } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function ProfileCompletePage() {
    const [profileCompletion, setProfileCompletion] = useState({
        jobPreferences: true,
        skills: true,
        preferredSalary: true,
        uploadResume: false,
        setLocation: false,
        uploadPhoto: false,
        setLanguage: false,
    });

    const completedSteps = Object.values(profileCompletion).filter(Boolean).length;
    const totalSteps = Object.keys(profileCompletion).length;
    const progressPercentage = (completedSteps / totalSteps) * 100;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-4xl px-4">
                {/* Profile Summary Card */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
                                <span className="text-2xl font-semibold text-gray-500">SO</span>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-900">Sohag</h1>
                                <p className="mt-1 text-gray-600">$2k - $2k per year</p>
                                <a
                                    href="#"
                                    className="mt-1 block text-sm text-blue-600 hover:underline"
                                >
                                    Add location
                                </a>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Badge variant="secondary">Basic Python</Badge>
                                    <Badge variant="secondary">C++</Badge>
                                    <Badge variant="secondary">Java</Badge>
                                </div>
                                <div className="mt-4 flex gap-4">
                                    <Button variant="outline" size="sm">
                                        Message
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Set LinkedIn
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Upload Resume
                                    </Button>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">Last active 2 minutes ago</div>
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Completion Progress */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>
                            Finish your profile and make your job application stand out over other
                            candidates:
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Progress value={progressPercentage} className="h-2" />
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {Object.entries(profileCompletion).map(([key, completed]) => (
                                    <div key={key} className="flex items-center gap-2">
                                        {completed ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        ) : (
                                            <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                                        )}
                                        <span
                                            className={`text-sm ${completed ? 'text-gray-900' : 'text-gray-500'}`}
                                        >
                                            {key.split(/(?=[A-Z])/).join(' ')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Alert */}
                <Alert className="mb-6">
                    <AlertTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        Finish Your Profile
                    </AlertTitle>
                    <AlertDescription>
                        By completing your profile, our team will be able to send you relevant jobs
                        that match your experience. You'll also be able to apply to jobs faster if
                        you choose to fill out your profile completely. After you apply to a job on
                        Dynamite Jobs companies may visit your profile to learn more about you.
                        Having complete profile will move your job application higher over other
                        candidates. Be sure to present yourself professionally.
                    </AlertDescription>
                </Alert>

                {/* Top Skills */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Top Skills</CardTitle>
                        <CardDescription>
                            Your skills are also added automatically from your work experience
                            below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">Basic Python</Badge>
                            <Badge variant="secondary">C++</Badge>
                            <Badge variant="secondary">Java</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Work Experience */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Work Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Add work experience
                        </Button>
                    </CardContent>
                </Card>

                {/* Education & Training */}
                <Card>
                    <CardHeader>
                        <CardTitle>Education & Training</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Add education
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
