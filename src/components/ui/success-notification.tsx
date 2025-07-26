import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface SuccessNotificationProps {
    message: string;
    isVisible: boolean;
    onClose?: () => void;
}

export function SuccessNotification({ message, isVisible, onClose }: SuccessNotificationProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed top-4 left-1/2 z-50 -translate-x-1/2 transform"
                >
                    <div className="mx-auto max-w-md rounded-lg border border-green-200 bg-green-50 p-4 shadow-lg">
                        <div className="flex items-center space-x-3">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                            >
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </motion.div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-green-800">{message}</p>
                            </div>
                            {onClose && (
                                <button
                                    onClick={onClose}
                                    className="text-green-400 transition-colors hover:text-green-600"
                                >
                                    <span className="sr-only">Close</span>
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
