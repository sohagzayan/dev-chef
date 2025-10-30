import SignInSelector from './SignInSelector';

export interface SignInCardProps {
    className?: string;
}

// Server component wrapper around tiny interactive selector
export default function SignInCard({ className = '' }: SignInCardProps) {
    return (
        <section className={`py-10 ${className}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-xl rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-8">
                    <h1 className="text-center text-4xl font-extrabold text-gray-900">Sign in</h1>
                    <p className="mt-3 text-center text-gray-600">
                        Join thousands of satisfied job seekers and companies who are already on
                        WWR.
                    </p>

                    <div className="mt-6">
                        <SignInSelector />
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="#" className="font-semibold text-red-600 hover:underline">
                            Create one here
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
