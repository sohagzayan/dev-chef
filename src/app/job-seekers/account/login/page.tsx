import { LoginForm } from '@/features/auth/components/LoginForm/LoginForm';
import SocialButton from '@/features/auth/components/SocialButton/SocialButton';

export default function JobSeekerLoginPage() {
    return (
        <main className="min-h-[70vh] py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-xl rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-8">
                    <h1 className="text-center text-4xl font-extrabold text-gray-900">Sign in</h1>
                    <p className="mt-3 text-center text-gray-600">
                        Sign in to your Job Seeker Account on WWR.
                    </p>
                    <div className="mt-6 space-y-4">
                        <LoginForm />
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <span className="h-px w-16 bg-gray-200" />
                            or sign up with
                            <span className="h-px w-16 bg-gray-200" />
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <SocialButton label="Continue with LinkedIn" href="#">
                                in
                            </SocialButton>
                            <SocialButton label="Continue with Google" href="#">
                                G
                            </SocialButton>
                        </div>
                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <a
                                href="/job-seekers/account/register"
                                className="font-semibold text-red-600 hover:underline"
                            >
                                Create one here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
