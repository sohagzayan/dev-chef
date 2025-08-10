'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Confetti from 'react-confetti';
import Split from 'split.js';
import { useAuth } from '@/context/AuthContext';
import { Problem } from '@/data/problem-data';
import useWindowSize from '@/hooks/useWindowSize';
import DynamicNavbar from './DynamicNavbar';
import LoginBanner from './LoginBanner';
import Playground from './Playground';
import ProblemDescription from './ProblemDescription';

type WorkspaceProps = {
    problem: Problem;
    onSuccessfulSubmission?: () => void;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem, onSuccessfulSubmission }) => {
    const { width, height } = useWindowSize();
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [success, setSuccess] = useState(false);
    const [showAcceptedTab, setShowAcceptedTab] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [navigationLoading, setNavigationLoading] = useState(false);
    const [loginAction, setLoginAction] = useState<'run' | 'submit'>('run');
    const [showAuthBanner, setShowAuthBanner] = useState(false);
    const leftPanelRef = useRef<HTMLDivElement>(null);
    const rightPanelRef = useRef<HTMLDivElement>(null);
    const splitInstanceRef = useRef<Split.Instance | null>(null);

    // Callback to trigger submission in Playground
    const handleSubmitStart = () => {
        setIsSubmitting(true);
    };

    // Initialize split panes
    useEffect(() => {
        if (leftPanelRef.current && rightPanelRef.current) {
            splitInstanceRef.current = Split([leftPanelRef.current, rightPanelRef.current], {
                sizes: [50, 50], // 50% each
                minSize: [300, 400], // minimum widths
                gutterSize: 4,
                snapOffset: 0,
                dragInterval: 1,
                cursor: 'col-resize',
                gutter: () => {
                    const gutter = document.createElement('div');
                    gutter.className = 'gutter gutter-horizontal';
                    gutter.style.cssText = `
                        background-color: #374151;
                        cursor: col-resize;
                        position: relative;
                        transition: background-color 0.2s ease;
                    `;

                    // Add hover effect
                    gutter.addEventListener('mouseenter', () => {
                        gutter.style.backgroundColor = '#4B5563';
                    });

                    gutter.addEventListener('mouseleave', () => {
                        gutter.style.backgroundColor = '#374151';
                    });

                    return gutter;
                },
            });
        }

        return () => {
            if (splitInstanceRef.current) {
                splitInstanceRef.current.destroy();
            }
        };
    }, []);

    // Navigation functions
    const navigateToProblem = async (direction: 'prev' | 'next') => {
        setNavigationLoading(true);
        try {
            // Get current problem's topic
            const topicId = (problem as any).topic?.id;

            if (!topicId) {
                console.error('No topic ID found for current problem');
                return;
            }

            // Fetch problems in the same topic to find next/prev
            const response = await fetch(`/api/v1/problems?topicId=${topicId}&limit=100`);
            if (!response.ok) {
                throw new Error('Failed to fetch problems');
            }

            const result = await response.json();
            if (!result.success) {
                throw new Error(result.message || 'Failed to fetch problems');
            }

            const problems = result.data;
            const currentIndex = problems.findIndex((p: any) => p.id === problem.id);

            if (currentIndex === -1) {
                console.error('Current problem not found in topic');
                return;
            }

            let targetIndex: number;
            if (direction === 'prev') {
                targetIndex = currentIndex - 1;
            } else {
                targetIndex = currentIndex + 1;
            }

            // Check bounds
            if (targetIndex < 0 || targetIndex >= problems.length) {
                console.log(`No ${direction} problem available`);
                return;
            }

            const targetProblem = problems[targetIndex];
            router.push(`/problems/${targetProblem.id}`);
        } catch (error) {
            console.error(`Navigation error:`, error);
        } finally {
            setNavigationLoading(false);
        }
    };

    const handleRunCode = () => {
        if (!isAuthenticated) {
            setLoginAction('run');
            setShowAuthBanner(true);
            return;
        }
        // Set running state to trigger the run in Playground
        setIsRunning(true);
    };

    // Effect to trigger run when isRunning becomes true
    useEffect(() => {
        if (isRunning) {
            // The Playground component will handle the actual run
            // We just need to set the state
        }
    }, [isRunning]);

    const handleRunComplete = (canSubmitNow: boolean) => {
        setIsRunning(false);
        setCanSubmit(canSubmitNow);
    };

    // Remove the handleSubmit function - let Playground handle submission

    const handleSubmitComplete = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 4000);
        setShowAcceptedTab(true);

        // Refresh the problem data to get updated attempt count
        if (onSuccessfulSubmission) {
            onSuccessfulSubmission();
        }
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <>
            <style jsx global>{`
                .gutter {
                    background-color: #374151;
                    transition: background-color 0.2s ease;
                }

                .gutter:hover {
                    background-color: #4b5563;
                }

                .gutter.gutter-horizontal {
                    cursor: col-resize;
                }

                .gutter.gutter-vertical {
                    cursor: row-resize;
                }

                .split {
                    display: flex;
                    flex-direction: row;
                    height: 100%;
                }

                .split.split-horizontal {
                    flex-direction: row;
                }

                .split.split-vertical {
                    flex-direction: column;
                }
            `}</style>

            <div className="flex h-screen w-full flex-col bg-gray-900">
                {/* Dynamic Navbar */}
                <DynamicNavbar
                    onNavigate={navigateToProblem}
                    navigationLoading={navigationLoading}
                    onRefresh={handleRefresh}
                    problemTitle={problem.title}
                />

                {/* Main Content Area - Resizable Panels */}
                <div className="flex flex-1 overflow-hidden">
                    {/* 🧱 2. Left Panel (Problem Description Panel) - Width Resizable */}
                    <div
                        ref={leftPanelRef}
                        className="flex-shrink-0 overflow-y-auto bg-white"
                        style={{ minWidth: '300px' }}
                    >
                        <ProblemDescription
                            problem={problem}
                            showAcceptedTab={showAcceptedTab}
                            onSuccessfulSubmission={() => setShowAcceptedTab(true)}
                        />
                    </div>

                    {/* 🧠 3. Right Panel - Further split vertically */}
                    <div
                        ref={rightPanelRef}
                        className="flex-shrink-0 bg-gray-900"
                        style={{ minWidth: '400px' }}
                    >
                        <Playground
                            problem={problem}
                            setSuccess={setSuccess}
                            setSolved={() => {}}
                            onSuccessfulSubmission={() => setShowAcceptedTab(true)}
                            onRunStart={handleRunCode}
                            onRunComplete={handleRunComplete}
                            onSubmitStart={handleSubmitStart}
                            onSubmitComplete={handleSubmitComplete}
                            isRunning={isRunning}
                            isSubmitting={isSubmitting}
                            setIsSubmitting={setIsSubmitting}
                            canSubmit={canSubmit}
                        />
                    </div>
                </div>

                {/* Confetti for success */}
                {success && (
                    <Confetti
                        gravity={0.3}
                        tweenDuration={4000}
                        width={width - 1}
                        height={height - 1}
                    />
                )}

                {/* Login Banner */}
                {!isAuthenticated && showAuthBanner && (
                    <LoginBanner action={loginAction} onClose={() => setShowAuthBanner(false)} />
                )}
            </div>
        </>
    );
};

export default Workspace;
