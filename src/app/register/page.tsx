import { RegisterForm } from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 flex items-center justify-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-xs font-bold text-white">
                        ⭐
                    </div>
                    <div>
                        <span className="text-2xl font-bold text-gray-800">Hirely</span>
                        <span className="text-2xl font-bold text-gray-400"> Talent</span>
                    </div>
                </div>

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
