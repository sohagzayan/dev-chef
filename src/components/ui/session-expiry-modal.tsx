'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';

interface SessionExpiryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SessionExpiryModal({ isOpen, onClose }: SessionExpiryModalProps) {
    const { logout, refreshSession } = useAuth();

    // Auto-refresh attempt when modal opens
    useEffect(() => {
        if (isOpen) {
            const attemptRefresh = async () => {
                const success = await refreshSession();
                if (success) {
                    onClose();
                }
            };

            // Try to refresh immediately
            attemptRefresh();
        }
    }, [isOpen, refreshSession, onClose]);

    const handleRefresh = async () => {
        const success = await refreshSession();
        if (success) {
            onClose();
        }
    };

    const handleLogout = async () => {
        await logout();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={onClose}>
                    <DialogContent className="sm:max-w-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <DialogHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                                    </div>
                                    <DialogTitle className="text-lg font-semibold text-gray-900">
                                        Session Expired
                                    </DialogTitle>
                                </div>
                            </DialogHeader>

                            <div className="mt-4 space-y-4">
                                <p className="text-sm text-gray-600">
                                    Your session has expired for security reasons. Please log in
                                    again to continue.
                                </p>

                                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={handleRefresh}
                                        className="flex items-center gap-2"
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                        Try Again
                                    </Button>
                                    <Button
                                        onClick={handleLogout}
                                        className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
                                    >
                                        Log In Again
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    );
}
