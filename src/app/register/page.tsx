import Link from 'next/link';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-md">
                {/* Back button */}
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Back
                    </Link>
                </div>

                {/* Logo */}
                <Link href="/" className="mb-8 flex items-center justify-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-xs font-bold text-white">
                        ⭐
                    </div>
                    <div>
                        <span className="text-2xl font-bold text-gray-800">Hirely</span>
                        <span className="text-2xl font-bold text-gray-400"> Talent</span>
                    </div>
                </Link>

                {/* Form Title */}
                <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
                    Get Hired, Pay 0% Fees
                </h1>

                {/* Registration Form */}
                <RegisterForm />

                {/* Sign in link */}
                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="font-medium text-blue-600 hover:underline">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
