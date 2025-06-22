/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, Award, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { certificationQuestions } from '@/data/certification-data';

export default function CertificationPage() {
    const params = useParams();
    const router = useRouter();
    const certId = params.certId as string;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
    const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes in seconds
    const [isCompleted, setIsCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    const questions = certificationQuestions[certId] || [];
    const totalQuestions = questions.length;

    // Timer effect
    useEffect(() => {
        if (!hasStarted || isCompleted) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleSubmitExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [hasStarted, isCompleted]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = (answerIndex: number) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [currentQuestion]: answerIndex,
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleSubmitExam = () => {
        let correctAnswers = 0;
        questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                correctAnswers++;
            }
        });

        const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
        setScore(finalScore);
        setIsCompleted(true);
        setShowResults(true);
    };

    const handleStartExam = () => {
        setHasStarted(true);
    };

    const getCertificationInfo = (certId: string) => {
        const certInfo = {
            'problem-solving-basic': {
                title: 'Problem Solving (Basic)',
                duration: '90 minutes',
                questions: 15,
                passingScore: 70,
                description: 'Test your fundamental problem-solving skills',
            },
            'python-basic': {
                title: 'Python (Basic)',
                duration: '90 minutes',
                questions: 15,
                passingScore: 70,
                description: 'Validate your core Python programming knowledge',
            },
            'java-intermediate': {
                title: 'Java (Intermediate)',
                duration: '120 minutes',
                questions: 20,
                passingScore: 75,
                description: 'Advanced Java development certification',
            },
            'sql-advanced': {
                title: 'SQL (Advanced)',
                duration: '120 minutes',
                questions: 18,
                passingScore: 80,
                description: 'Expert-level database management skills',
            },
        };
        return certInfo[certId as keyof typeof certInfo] || certInfo['problem-solving-basic'];
    };

    const certInfo = getCertificationInfo(certId);
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    const isPassed = score >= certInfo.passingScore;

    if (!hasStarted) {
        return (
            <div className="min-h-screen bg-white">
                <div className="border-b border-gray-100 bg-white">
                    <div className="mx-auto max-w-4xl px-6 py-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push('/')}
                            className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Home
                        </Button>
                    </div>
                </div>

                <div className="mx-auto max-w-4xl px-6 py-12">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                        <Card className="border-0 shadow-xl">
                            <CardHeader className="pb-8 text-center">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600">
                                    <Award className="h-10 w-10 text-white" />
                                </div>
                                <CardTitle className="mb-2 text-3xl font-bold text-gray-900">
                                    {certInfo.title}
                                </CardTitle>
                                <p className="text-lg text-gray-600">{certInfo.description}</p>
                            </CardHeader>

                            <CardContent className="space-y-8">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="rounded-xl bg-blue-50 p-6 text-center">
                                        <Clock className="mx-auto mb-3 h-8 w-8 text-blue-600" />
                                        <div className="font-semibold text-gray-900">Duration</div>
                                        <div className="text-blue-600">{certInfo.duration}</div>
                                    </div>
                                    <div className="rounded-xl bg-green-50 p-6 text-center">
                                        <CheckCircle className="mx-auto mb-3 h-8 w-8 text-green-600" />
                                        <div className="font-semibold text-gray-900">Questions</div>
                                        <div className="text-green-600">{certInfo.questions}</div>
                                    </div>
                                    <div className="rounded-xl bg-orange-50 p-6 text-center">
                                        <Award className="mx-auto mb-3 h-8 w-8 text-orange-600" />
                                        <div className="font-semibold text-gray-900">
                                            Passing Score
                                        </div>
                                        <div className="text-orange-600">
                                            {certInfo.passingScore}%
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="mt-1 h-6 w-6 text-yellow-600" />
                                        <div>
                                            <h3 className="mb-2 font-semibold text-yellow-800">
                                                Important Instructions
                                            </h3>
                                            <ul className="space-y-1 text-sm text-yellow-700">
                                                <li>
                                                    • You have {certInfo.duration} to complete the
                                                    exam
                                                </li>
                                                <li>
                                                    • You need {certInfo.passingScore}% or higher to
                                                    pass
                                                </li>
                                                <li>• You can navigate between questions freely</li>
                                                <li>
                                                    • Make sure you have a stable internet
                                                    connection
                                                </li>
                                                <li>
                                                    • The exam will auto-submit when time expires
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <Button
                                        size="lg"
                                        onClick={handleStartExam}
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 px-12 py-4 text-lg text-white hover:from-blue-700 hover:to-blue-800"
                                    >
                                        Start Certification Exam
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        );
    }

    if (showResults) {
        return (
            <div className="min-h-screen bg-white">
                <div className="mx-auto max-w-4xl px-6 py-12">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <Card className="border-0 shadow-xl">
                            <CardContent className="p-12 text-center">
                                <div
                                    className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full ${
                                        isPassed ? 'bg-green-100' : 'bg-red-100'
                                    }`}
                                >
                                    {isPassed ? (
                                        <CheckCircle className="h-12 w-12 text-green-600" />
                                    ) : (
                                        <XCircle className="h-12 w-12 text-red-600" />
                                    )}
                                </div>

                                <h1 className="mb-4 text-4xl font-bold text-gray-900">
                                    {isPassed ? 'Congratulations!' : 'Better Luck Next Time'}
                                </h1>

                                <p className="mb-8 text-xl text-gray-600">
                                    {isPassed
                                        ? `You've successfully passed the ${certInfo.title} certification!`
                                        : `You scored ${score}%. You need ${certInfo.passingScore}% to pass.`}
                                </p>

                                <div className="mb-8 rounded-xl bg-gray-50 p-8">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-blue-600">
                                                {score}%
                                            </div>
                                            <div className="text-gray-600">Your Score</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-600">
                                                {Object.keys(selectedAnswers).length}/
                                                {totalQuestions}
                                            </div>
                                            <div className="text-gray-600">Questions Answered</div>
                                        </div>
                                        <div className="text-3xl font-bold text-purple-600">
                                            <div className="text-3xl font-bold text-purple-600">
                                                {
                                                    questions.filter(
                                                        (q, i) =>
                                                            selectedAnswers[i] === q.correctAnswer,
                                                    ).length
                                                }
                                            </div>
                                            <div className="text-gray-600">Correct Answers</div>
                                        </div>
                                    </div>
                                </div>

                                {isPassed && (
                                    <div className="mb-8 rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-green-50 p-8">
                                        <div className="mb-4 flex items-center justify-center gap-3">
                                            <Award className="h-8 w-8 text-blue-600" />
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                Certificate Earned!
                                            </h2>
                                        </div>
                                        <p className="mb-6 text-gray-700">
                                            Your {certInfo.title} certificate has been added to your
                                            profile.
                                        </p>
                                        <Button
                                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                                            onClick={() => router.push('/certificates')}
                                        >
                                            View Certificate
                                        </Button>
                                    </div>
                                )}

                                <div className="flex justify-center gap-4">
                                    <Button variant="outline" onClick={() => router.push('/')}>
                                        Back to Home
                                    </Button>
                                    {!isPassed && (
                                        <Button
                                            onClick={() => window.location.reload()}
                                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                                        >
                                            Retake Exam
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        );
    }

    if (questions.length === 0) {
        return <div>Questions not found for this certification</div>;
    }

    const currentQ = questions[currentQuestion];

    return (
        <div className="min-h-screen bg-white">
            {/* Header with Timer */}
            <div className="sticky top-0 z-40 border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{certInfo.title}</h1>
                            <p className="text-sm text-gray-600">
                                Question {currentQuestion + 1} of {totalQuestions}
                            </p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-red-500" />
                                <span
                                    className={`font-mono text-lg font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-900'}`}
                                >
                                    {formatTime(timeLeft)}
                                </span>
                            </div>
                            <Button
                                onClick={handleSubmitExam}
                                className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
                            >
                                Submit Exam
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Progress value={progress} className="h-2" />
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-6 py-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <Badge className="mb-4 border-blue-200 bg-blue-50 text-blue-700">
                                            Question {currentQuestion + 1}
                                        </Badge>
                                        <CardTitle className="text-xl leading-relaxed text-gray-900">
                                            {currentQ.question}
                                        </CardTitle>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {currentQ.options.map((option: any, index: number) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <Card
                                            className={`cursor-pointer transition-all duration-200 ${
                                                selectedAnswers[currentQuestion] === index
                                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                            }`}
                                            onClick={() => handleAnswerSelect(index)}
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                                                            selectedAnswers[currentQuestion] ===
                                                            index
                                                                ? 'border-blue-500 bg-blue-500'
                                                                : 'border-gray-300'
                                                        }`}
                                                    >
                                                        {selectedAnswers[currentQuestion] ===
                                                            index && (
                                                            <CheckCircle className="h-4 w-4 text-white" />
                                                        )}
                                                    </div>
                                                    <span className="text-gray-900">{option}</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestion === 0}
                    >
                        Previous
                    </Button>

                    <div className="flex items-center gap-2">
                        {questions.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentQuestion(index)}
                                className={`h-8 w-8 rounded-full text-sm font-medium transition-colors ${
                                    index === currentQuestion
                                        ? 'bg-blue-600 text-white'
                                        : selectedAnswers[index] !== undefined
                                          ? 'border border-green-300 bg-green-100 text-green-700'
                                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <Button
                        onClick={handleNextQuestion}
                        disabled={currentQuestion === totalQuestions - 1}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
