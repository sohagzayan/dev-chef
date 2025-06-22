'use client';

import { motion } from 'framer-motion';
import { Award, CheckCircle, Download, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CertificatesPage() {
    // Mock certificates data - in real app, this would come from user's profile
    const certificates = [
        {
            id: 'python-basic',
            title: 'Python (Basic)',
            issuedDate: '2024-01-15',
            score: 85,
            validUntil: '2026-01-15',
            certificateId: 'PY-BASIC-2024-001',
            skills: ['Python Fundamentals', 'Data Types', 'Control Structures', 'Functions'],
        },
    ];

    const handleDownload = (certId: string) => {
        // In a real app, this would generate and download a PDF certificate
        console.log('Downloading certificate:', certId);
    };

    const handleShare = (certId: string) => {
        // In a real app, this would share the certificate
        console.log('Sharing certificate:', certId);
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-8">
                    <div className="text-center">
                        <h1 className="mb-4 text-4xl font-bold text-gray-900">My Certificates</h1>
                        <p className="text-lg text-gray-600">
                            Your professional certifications and achievements
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-12">
                {certificates.length === 0 ? (
                    <div className="py-16 text-center">
                        <Award className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                        <h2 className="mb-2 text-2xl font-bold text-gray-900">
                            No Certificates Yet
                        </h2>
                        <p className="mb-8 text-gray-600">
                            Start taking certification exams to earn your first certificate!
                        </p>
                        <Button
                            onClick={() => (window.location.href = '/')}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                        >
                            Browse Certifications
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {certificates.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="border-0 bg-gradient-to-br from-white to-blue-50 shadow-xl transition-all duration-300 hover:shadow-2xl">
                                    <CardHeader className="pb-4 text-center">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600">
                                            <Award className="h-8 w-8 text-white" />
                                        </div>
                                        <CardTitle className="text-xl font-bold text-gray-900">
                                            {cert.title}
                                        </CardTitle>
                                        <Badge className="border-green-300 bg-green-100 text-green-800">
                                            <CheckCircle className="mr-1 h-3 w-3" />
                                            Certified
                                        </Badge>
                                    </CardHeader>

                                    <CardContent className="space-y-6">
                                        <div className="text-center">
                                            <div className="mb-1 text-3xl font-bold text-blue-600">
                                                {cert.score}%
                                            </div>
                                            <div className="text-sm text-gray-600">Final Score</div>
                                        </div>

                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    Certificate ID:
                                                </span>
                                                <span className="font-mono text-gray-900">
                                                    {cert.certificateId}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Issued:</span>
                                                <span className="text-gray-900">
                                                    {new Date(cert.issuedDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Valid Until:</span>
                                                <span className="text-gray-900">
                                                    {new Date(cert.validUntil).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-2 text-sm font-semibold text-gray-700">
                                                Skills Validated:
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {cert.skills.map((skill, skillIndex) => (
                                                    <Badge
                                                        key={skillIndex}
                                                        variant="secondary"
                                                        className="text-xs"
                                                    >
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                onClick={() => handleDownload(cert.id)}
                                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                                            >
                                                <Download className="mr-1 h-4 w-4" />
                                                Download
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleShare(cert.id)}
                                                className="flex-1"
                                            >
                                                <Share2 className="mr-1 h-4 w-4" />
                                                Share
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
