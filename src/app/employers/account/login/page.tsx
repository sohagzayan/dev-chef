import { LoginForm } from '@/features/auth/components/LoginForm/LoginForm';

export default function EmployerLoginPage() {
    return (
        <main className="min-h-[70vh] py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-xl rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-8">
                    <h1 className="text-center text-4xl font-extrabold text-gray-900">Sign in</h1>
                    <p className="mt-3 text-center text-gray-600">
                        Sign in to your Employer Account.
                    </p>
                    <div className="mt-6 space-y-4">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
