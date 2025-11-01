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
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-yellow-400 bg-white/10 text-white">
                        <span className="text-3xl font-bold">@</span>
                    </div>
                    <div>
                        <div className="text-xl font-bold">Justin Mitchell</div>
                        <div className="text-lg text-white/90">CEO at Yac</div>
                    </div>
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

                    {/* SSO Link */}
                    <div className="mt-4 text-center">
                        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                            Log in with SSO
                        </a>
                    </div>

                    {/* Sign up link */}
                    <p className="mt-8 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <a href="#" className="font-medium text-blue-600 hover:underline">
                            Get started
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
