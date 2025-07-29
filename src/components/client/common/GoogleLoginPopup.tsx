'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface GoogleLoginPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (userData: any) => void;
    onError: (error: string) => void;
    userType: 'developer' | 'company';
}

export function GoogleLoginPopup({
    isOpen,
    onClose,
    onSuccess,
    onError,
    userType,
}: GoogleLoginPopupProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [popupWindow, setPopupWindow] = useState<Window | null>(null);
    const popupRef = useRef<Window | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Cleanup function to close popup and clear intervals
    const cleanup = () => {
        if (popupRef.current && !popupRef.current.closed) {
            popupRef.current.close();
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setPopupWindow(null);
        setIsLoading(false);
    };

    // Handle popup close
    useEffect(() => {
        if (!isOpen) {
            cleanup();
        }
    }, [isOpen]);

    // Listen for messages from popup
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Ensure message is from our popup and same origin
            if (event.origin !== window.location.origin) {
                return;
            }

            if (event.data.type === 'GOOGLE_LOGIN_SUCCESS') {
                cleanup();
                onSuccess(event.data.userData);
            } else if (event.data.type === 'GOOGLE_LOGIN_ERROR') {
                cleanup();
                onError(event.data.error);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onSuccess, onError]);

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);

            // Create popup window
            const popup = window.open(
                `/api/auth/google/popup?userType=${userType}`,
                'googleLogin',
                'width=500,height=600,scrollbars=yes,resizable=yes,status=yes,location=yes,toolbar=no,menubar=no',
            );

            if (!popup) {
                throw new Error('Popup blocked. Please allow popups for this site.');
            }

            popupRef.current = popup;
            setPopupWindow(popup);

            // Check if popup is closed by user
            intervalRef.current = setInterval(() => {
                if (popup.closed) {
                    cleanup();
                    onError('Login cancelled by user');
                }
            }, 1000);
        } catch (error) {
            setIsLoading(false);
            onError(error instanceof Error ? error.message : 'Failed to open login popup');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Sign in with Google</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Click the button below to sign in with your Google account. A popup window
                        will open for authentication.
                    </p>

                    <Button onClick={handleGoogleLogin} disabled={isLoading} className="w-full">
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                Opening Google Login...
                            </div>
                        ) : (
                            'Continue with Google'
                        )}
                    </Button>

                    {popupWindow && (
                        <p className="text-center text-xs text-gray-500">
                            If the popup doesn&apos;t open, please check your browser&apos;s popup
                            blocker settings.
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
