import { LoginForm } from '@/features/auth/components/LoginForm/LoginForm';

export default function LoginPage() {
    return (
        <div className="relative flex min-h-screen">
            {/* Left Sidebar - Background Image with Testimonial */}
            <div
                className="hidden flex-col justify-between bg-cover bg-center bg-no-repeat p-16 text-white lg:flex lg:w-1/2"
                style={{
                    backgroundImage: 'url(/assets/backgrounds/login_banner.png)',
                }}
            >
                <div className="space-y-8">
                    <div>
                        <h2 className="text-6xl leading-tight font-extrabold">
                            Welcome to our
                            <br />
                            <span>community</span>
                        </h2>
                    </div>
                    <div className="h-px w-24 bg-white" />
                    <div className="flex gap-1 pt-4">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className="h-6 w-6 fill-yellow-400"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                        ))}
                    </div>
                    <p className="max-w-md text-xl leading-relaxed text-white">
                        With Hirely we can better predict, down to the minute, how long tasks should
                        take, therefore making better informed decisions.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="relative flex w-full flex-col bg-white lg:w-1/2">
                {/* Logo - Top Right */}
                <div className="absolute top-6 right-8 z-10 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-xs font-bold text-white">
                        ⭐
                    </div>
                    <span className="text-lg font-bold text-gray-800">Hirely</span>
                </div>

                {/* Top banner */}
                <div className="border-t-2 border-blue-500 bg-blue-50 px-4 py-3 sm:px-6 sm:py-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                        {/* Circular Info Icon */}
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white sm:h-6 sm:w-6">
                            <span className="text-xs font-bold sm:text-sm">i</span>
                        </div>
                        {/* Text Content */}
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-bold text-gray-900 sm:text-base">
                                You have been logged out.
                            </span>
                            <span className="text-xs text-gray-700 sm:text-sm">
                                Don&apos;t worry, you can log back in using the form below.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex flex-1 flex-col justify-center px-12 py-16 md:px-16 lg:px-20">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900">Sign in to Hirely</h1>

                    {/* Login Form */}
                    <div className="mt-8">
                        <LoginForm />
                    </div>

                    {/* Google Login Button */}
                    <div className="mt-4">
                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </button>
                    </div>

                    {/* Sign up link */}
                    <p className="mt-8 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <a href="/register" className="font-medium text-blue-600 hover:underline">
                            Get started
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
