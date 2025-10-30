import SocialButton from '@/features/auth/components/SocialButton/SocialButton';

export default function JobSeekerRegisterPage() {
    return (
        <main className="min-h-[70vh] py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-xl rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-8">
                    <h1 className="text-center text-4xl font-extrabold text-gray-900">
                        Create Your
                    </h1>
                    <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
                        Job Seeker Account
                    </h2>
                    <p className="mt-3 text-center text-gray-600">
                        Sign up to create your Job Seeker Account on WWR.
                    </p>

                    <form className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="mt-1 block w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-200 placeholder:text-gray-400 focus:border-red-300 focus:ring-4 focus:ring-red-100 focus:outline-none"
                                placeholder="Your email"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="mt-1 block w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-200 placeholder:text-gray-400 focus:border-red-300 focus:ring-4 focus:ring-red-100 focus:outline-none"
                                placeholder="Your password"
                                required
                            />
                        </div>

                        <label className="inline-flex items-start gap-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-red-600 shadow-sm transition-colors focus:ring-red-200"
                                required
                            />
                            <span>
                                By signing up, I agree to We Work Remotely&apos;s{' '}
                                <a href="#" className="font-semibold text-red-600 hover:underline">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="font-semibold text-red-600 hover:underline">
                                    Privacy Policy
                                </a>
                                .
                            </span>
                        </label>

                        <button
                            type="submit"
                            className="mt-2 w-full rounded-2xl bg-red-600 px-4 py-3 text-base font-bold text-white shadow-sm transition-colors hover:bg-red-700"
                        >
                            Continue
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                        <span className="h-px w-16 bg-gray-200" />
                        or sign up with
                        <span className="h-px w-16 bg-gray-200" />
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-4">
                        <SocialButton label="Sign up with LinkedIn" href="#">
                            in
                        </SocialButton>
                        <SocialButton label="Sign up with Google" href="#">
                            G
                        </SocialButton>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <a
                            href="/job-seekers/account/login"
                            className="font-semibold text-red-600 hover:underline"
                        >
                            Sign in to your job seeker account
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
